import { Component } from 'react';
import { RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development, could send to error tracking service in production
    console.error('Application error:', error);
    console.error('Error info:', errorInfo.componentStack);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-[rgba(139,69,19,0.1)] text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">!</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-[#5C4033] mb-2">
              Something went wrong
            </h1>
            <p className="text-[#6B5344] mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={this.handleRefresh}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5C4033] to-[#8B4513] text-white font-semibold rounded-xl hover:from-[#4a3329] hover:to-[#734011] transition-all shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
