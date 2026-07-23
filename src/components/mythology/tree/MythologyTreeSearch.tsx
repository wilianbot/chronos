import type { MythologicalEntity } from "../../../types/mythologyTree";

export function MythologyTreeSearch({
  query,
  results,
  onQueryChange,
  onSelect
}: {
  query?: string;
  results: MythologicalEntity[];
  onQueryChange: (value: string) => void;
  onSelect: (entity: MythologicalEntity) => void;
}) {
  return (
    <div className="myth-tree-search">
      <label>
        <span>Pesquisar entidade</span>
        <input
          value={query || ""}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Zeus, Héracles, Rômulo, mortal, trovão..."
        />
      </label>
      {query && (
        <div className="myth-tree-search-results" role="listbox" aria-label="Resultados da pesquisa da árvore">
          {results.length ? (
            results.slice(0, 8).map((entity) => (
              <button
                key={entity.id}
                type="button"
                role="option"
                onClick={() => onSelect(entity)}
                aria-selected="false"
              >
                <strong>{entity.name}</strong>
                <span>
                  {entity.mythology} · {entity.entityType}
                </span>
              </button>
            ))
          ) : (
            <p>Nenhuma entidade encontrada.</p>
          )}
        </div>
      )}
    </div>
  );
}
