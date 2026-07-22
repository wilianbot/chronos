export function LoadingState() {
  return (
    <main className="state-screen" aria-live="polite">
      <div className="loader-mark" />
      <span className="eyebrow">Preparando acervo</span>
      <h1>Carregando a jornada</h1>
      <p>Organizando acontecimentos, filtros, mapas e ferramentas de revisão.</p>
    </main>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <main className="state-screen error-state" role="alert">
      <span className="eyebrow">Erro nos dados</span>
      <h1>Não foi possível abrir a linha do tempo</h1>
      <p>{message}</p>
      <p>Corrija a base em `src/data/generated.ts` e recarregue a aplicação.</p>
    </main>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <article className="empty-state">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
