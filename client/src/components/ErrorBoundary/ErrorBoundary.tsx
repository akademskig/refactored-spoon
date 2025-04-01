import { Component, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('Caught by ErrorBoundary:', error);
    window.dispatchEvent(
      new CustomEvent('toast', {
        detail: { message: 'Something broke 😢', type: 'error' },
      }),
    );
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ padding: '2rem' }}>Oops! Something went wrong.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
