import { Component, ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Recover from transient DOM reconciliation errors (often caused by
    // browser extensions like Google Translate / Grammarly mutating the DOM).
    console.warn("ErrorBoundary caught:", error);
    // Auto-recover on next tick
    setTimeout(() => this.setState({ hasError: false }), 0);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
