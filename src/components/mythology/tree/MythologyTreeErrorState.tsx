export function MythologyTreeErrorState({ message }: { message: string }) {
  return (
    <div className="empty-state myth-tree-state" role="alert">
      <h3>Não foi possível montar a árvore</h3>
      <p>{message}</p>
    </div>
  );
}
