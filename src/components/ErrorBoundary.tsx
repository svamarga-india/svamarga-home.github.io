import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    // @ts-ignore
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    // @ts-ignore
    const { hasError, error } = this.state;
    // @ts-ignore
    const { children } = this.props;

    if (hasError) {
      let errorMessage = "Something went wrong. Please try again later.";
      
      try {
        // Check if it's a Firestore error JSON
        const parsedError = JSON.parse(error?.message || "");
        if (parsedError.error && parsedError.operationType) {
          errorMessage = `Database Error: ${parsedError.error}. Please check your connection or contact support.`;
        }
      } catch {
        // Not a JSON error, use default
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-cream p-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl max-w-md text-center">
            <h2 className="serif text-3xl font-medium mb-4 text-red-600">Oops!</h2>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-brand-olive text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}
