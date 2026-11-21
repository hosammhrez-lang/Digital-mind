import { GoogleDriveFileItem } from '../types/magazine';

const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3/files';
const DRIVE_UPLOAD_BASE = 'https://www.googleapis.com/upload/drive/v3/files';

export async function listDriveFiles(params: {
  token: string;
  query?: string;
  pageSize?: number;
}): Promise<GoogleDriveFileItem[]> {
  const { token, query = '', pageSize = 20 } = params;
  const searchClauses = ['trashed = false'];
  if (query.trim()) {
    const escaped = query.trim().replace(/'/g, "\\'");
    searchClauses.push(`name contains '${escaped}'`);
  }

  const url = new URL(DRIVE_API_BASE);
  url.searchParams.set('pageSize', String(pageSize));
  url.searchParams.set('q', searchClauses.join(' and '));
  url.searchParams.set('orderBy', 'modifiedTime desc');
  url.searchParams.set(
    'fields',
    'files(id,name,mimeType,modifiedTime,webViewLink,thumbnailLink,size)'
  );

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errPayload = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
    throw new Error(errPayload.error?.message || `Google Drive request failed (${res.status})`);
  }

  const data = (await res.json()) as { files?: GoogleDriveFileItem[] };
  return Array.isArray(data.files) ? data.files : [];
}

export async function uploadFileToDrive(params: {
  token: string;
  fileName: string;
  content: string;
  mimeType?: string;
}): Promise<GoogleDriveFileItem> {
  const { token, fileName, content, mimeType = 'application/json' } = params;
  const metadata = {
    name: fileName,
    mimeType,
  };

  const boundary = `digital_minds_${Date.now()}`;
  const body =
    `--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
    `${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: ${mimeType}; charset=UTF-8\r\n\r\n` +
    `${content}\r\n` +
    `--${boundary}--`;

  const res = await fetch(
    `${DRIVE_UPLOAD_BASE}?uploadType=multipart&fields=id,name,mimeType,modifiedTime,webViewLink`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body,
    }
  );

  if (!res.ok) {
    const errPayload = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
    throw new Error(errPayload.error?.message || `Google Drive upload failed (${res.status})`);
  }

  return (await res.json()) as GoogleDriveFileItem;
}

export async function renameDriveFile(params: {
  token: string;
  fileId: string;
  newName: string;
}): Promise<GoogleDriveFileItem> {
  const { token, fileId, newName } = params;
  const res = await fetch(
    `${DRIVE_API_BASE}/${encodeURIComponent(fileId)}?fields=id,name,mimeType,modifiedTime,webViewLink`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName.trim() }),
    }
  );

  if (!res.ok) {
    const errPayload = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
    throw new Error(errPayload.error?.message || `Rename failed (${res.status})`);
  }

  return (await res.json()) as GoogleDriveFileItem;
}

export async function trashDriveFile(params: {
  token: string;
  fileId: string;
}): Promise<void> {
  const { token, fileId } = params;
  const res = await fetch(`${DRIVE_API_BASE}/${encodeURIComponent(fileId)}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ trashed: true }),
  });

  if (!res.ok) {
    const errPayload = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
    throw new Error(errPayload.error?.message || `Move to trash failed (${res.status})`);
  }
}
