import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

type StudyMode = 'summarize' | 'study-guide' | 'explain' | 'quiz' | 'chat';
type Lang = 'ar' | 'en' | 'fr';

interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

interface StudyRequestBody {
  mode?: StudyMode;
  prompt?: string;
  sourceText?: string;
  subject?: string;
  gradeLevel?: string;
  lang?: Lang;
  history?: ChatTurn[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT) || 3000;
const MODEL_NAME = 'gemini-4-hydrogen';

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function buildSystemInstruction(lang: Lang, gradeLevel: string, subject: string): string {
  const languageDirective =
    lang === 'ar'
      ? 'Respond in clear, structured, encouraging Arabic tailored to school students. Use clean headings and bullet points.'
      : lang === 'fr'
        ? 'Respond in clear, structured, encouraging French tailored to school students. Use clean headings and bullet points.'
        : 'Respond in clear, structured, encouraging English tailored to school students. Use clean headings and bullet points.';

  return [
    'You are Nuha (نُهى), the personal AI study mentor inside Digital Minds (عقول رقمية), the student technology & learning magazine of Egyptian Language School.',
    languageDirective,
    gradeLevel ? `Target student level: ${gradeLevel}.` : 'Target level: Primary, Prep, or Secondary school student.',
    subject ? `Subject focus: ${subject}.` : '',
    'Guidelines:',
    '- Help students understand concepts deeply rather than promoting mindless copying.',
    '- Keep study summaries crisp, well-organized, and exam-ready using plain readable Markdown headings (###), bullet lists (-), and numbered steps.',
    '- When asked to summarize text, preserve factual accuracy and end with 1–2 quick self-check questions.',
    '- Stay friendly, respectful, age-appropriate, and concise.',
  ]
    .filter(Boolean)
    .join('\n');
}

function buildModeUserPrompt(body: StudyRequestBody): string {
  const mode = body.mode ?? 'summarize';
  const prompt = (body.prompt ?? '').trim();
  const sourceText = (body.sourceText ?? '').trim();
  const subject = (body.subject ?? '').trim();
  const gradeLevel = (body.gradeLevel ?? '').trim();

  if (mode === 'summarize') {
    return [
      'Task: Summarize the following study material or article into clear bullet points, a 1-sentence core takeaway, and 2 quick review questions.',
      subject ? `Subject: ${subject}` : '',
      gradeLevel ? `Grade: ${gradeLevel}` : '',
      prompt ? `Student focus/instruction: ${prompt}` : '',
      sourceText ? `Source text:\n${sourceText}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');
  }

  if (mode === 'study-guide') {
    return [
      'Task: Create a complete, printable Study Summary Sheet (ملخص دراسي منظم) with: 1) Core Idea, 2) Key Concepts & Definitions, 3) Common Mistakes to Avoid, 4) 3 Quick Practice Questions with Answers at the end.',
      subject ? `Subject: ${subject}` : '',
      gradeLevel ? `Grade: ${gradeLevel}` : '',
      prompt ? `Topic / Notes:\n${prompt}` : '',
      sourceText ? `Reference text:\n${sourceText}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');
  }

  if (mode === 'explain') {
    return [
      'Task: Explain this concept step-by-step using a relatable everyday school analogy and one concrete example.',
      subject ? `Subject: ${subject}` : '',
      gradeLevel ? `Grade: ${gradeLevel}` : '',
      `Question / Concept:\n${prompt || sourceText}`,
    ]
      .filter(Boolean)
      .join('\n\n');
  }

  if (mode === 'quiz') {
    return [
      'Task: Create 4 interactive review questions (mix of multiple-choice and short answer) based on the material below, followed by a clear Answer Key.',
      subject ? `Subject: ${subject}` : '',
      gradeLevel ? `Grade: ${gradeLevel}` : '',
      prompt ? `Topic: ${prompt}` : '',
      sourceText ? `Material:\n${sourceText}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');
  }

  return prompt || sourceText;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'digital-minds-server' });
  });

  app.post('/api/assistant/study', async (req, res) => {
    const body = (req.body ?? {}) as StudyRequestBody;
    const mode: StudyMode = body.mode ?? 'summarize';
    const lang: Lang = body.lang === 'en' || body.lang === 'fr' ? body.lang : 'ar';
    const prompt = (body.prompt ?? '').trim();
    const sourceText = (body.sourceText ?? '').trim();
    const subject = (body.subject ?? '').trim();
    const gradeLevel = (body.gradeLevel ?? '').trim();

    if (!prompt && !sourceText) {
      res.status(400).json({
        error:
          lang === 'ar'
            ? 'يرجى كتابة سؤالك أو لصق النص المطلوب تلخيصه أولاً.'
            : lang === 'fr'
              ? 'Veuillez saisir votre question ou coller le texte à résumer.'
              : 'Please enter a topic, question, or paste text to summarize.',
        code: 'EMPTY_INPUT',
      });
      return;
    }

    const ai = getAiClient();
    if (!ai) {
      res.status(503).json({
        error:
          lang === 'ar'
            ? 'مفتاح GEMINI_API_KEY غير مفعّل حاليًا في إعدادات الخادم (Settings > Secrets).'
            : lang === 'fr'
              ? 'La clé GEMINI_API_KEY n’est pas configurée dans les paramètres serveur (Settings > Secrets).'
              : 'GEMINI_API_KEY is not configured in server secrets (Settings > Secrets).',
        code: 'MISSING_API_KEY',
      });
      return;
    }

    try {
      const systemInstruction = buildSystemInstruction(lang, gradeLevel, subject);

      if (mode === 'chat') {
        const priorHistory = Array.isArray(body.history)
          ? body.history
              .filter((turn) => turn && (turn.role === 'user' || turn.role === 'model') && typeof turn.text === 'string' && turn.text.trim().length > 0)
              .slice(-12)
              .map((turn) => ({
                role: turn.role,
                parts: [{ text: turn.text.trim() }],
              }))
          : [];

        const chat = ai.chats.create({
          model: MODEL_NAME,
          history: priorHistory,
          config: {
            systemInstruction,
          },
        });

        const messageText = sourceText
          ? `${prompt}\n\n[Context]\n${sourceText}`
          : prompt;
        const response = await chat.sendMessage({ message: messageText });
        const reply = (response.text ?? '').trim();

        if (!reply) {
          res.status(502).json({ error: 'Empty response from AI model.', code: 'EMPTY_RESPONSE' });
          return;
        }

        res.json({
          reply,
          mode,
          model: MODEL_NAME,
        });
        return;
      }

      const fullPrompt = buildModeUserPrompt(body);
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: fullPrompt,
        config: {
          systemInstruction,
        },
      });

      const reply = (response.text ?? '').trim();
      if (!reply) {
        res.status(502).json({ error: 'Empty response from AI model.', code: 'EMPTY_RESPONSE' });
        return;
      }

      res.json({
        reply,
        mode,
        model: MODEL_NAME,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to reach Gemini API.';
      const status =
        typeof (err as { status?: unknown })?.status === 'number'
          ? (err as { status: number }).status
          : 500;
      console.error('[/api/assistant/study] Gemini error:', message);
      res.status(status >= 400 && status < 600 ? status : 500).json({
        error: message,
        code: 'GEMINI_UPSTREAM_ERROR',
      });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const indexHtml = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        const template = await vite.transformIndexHtml(url, indexHtml);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Digital Minds full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
