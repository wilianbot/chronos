import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  erro: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { erro: null };

  static getDerivedStateFromError(erro: Error): ErrorBoundaryState {
    return { erro };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erro inesperado na aplicação", error, errorInfo);
  }

  render() {
    if (this.state.erro) {
      return (
        <main className="state-screen error-state" role="alert">
          <span className="eyebrow">Erro inesperado</span>
          <h1>Algo impediu a exibição do Chronos</h1>
          <p>{this.state.erro.message}</p>
          <button className="button primary" onClick={() => location.reload()}>
            Recarregar aplicação
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
