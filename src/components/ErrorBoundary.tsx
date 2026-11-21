import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || 'Unexpected application error.',
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center p-6">
          <div className="max-w-lg w-full rounded-lg border border-[#9A3412]/30 bg-white p-6 space-y-4">
            <h1 className="font-display text-xl font-semibold text-[#9A3412]">
              حدث خطأ أثناء تشغيل البوابة — Application Error
            </h1>
            <p className="text-sm text-[#57534E] font-mono-tabular break-words">
              {this.state.message}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-md bg-[#1E3A8A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#172554] cursor-pointer"
            >
              إعادة تحميل الصفحة · Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
