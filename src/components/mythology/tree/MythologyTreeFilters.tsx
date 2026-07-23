import {
  entityTypeLabels,
  traditionsForMythology,
  treeCategoryLabels,
  treeModeLabels
} from "../../../services/mythologyTreeService";
import type { MythologyTreeFilters as Filters } from "../../../types/mythologyTree";

export function MythologyTreeFilters({
  filters,
  onChange,
  onReset
}: {
  filters: Filters;
  onChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onReset: () => void;
}) {
  const traditions = traditionsForMythology(filters.mythology);

  return (
    <form className="myth-tree-filters" aria-label="Filtros da árvore genealógica">
      <label>
        <span>Mitologia</span>
        <select
          value={filters.mythology}
          onChange={(event) => onChange("mythology", event.target.value as Filters["mythology"])}
        >
          <option value="grega">Grega</option>
          <option value="romana">Romana</option>
        </select>
      </label>
      <label>
        <span>Modo</span>
        <select value={filters.mode} onChange={(event) => onChange("mode", event.target.value as Filters["mode"])}>
          {Object.entries(treeModeLabels).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Profundidade</span>
        <select value={filters.depth} onChange={(event) => onChange("depth", event.target.value as Filters["depth"])}>
          <option value="1">1 geração</option>
          <option value="2">2 gerações</option>
          <option value="3">3 gerações</option>
          <option value="all">Todas</option>
        </select>
      </label>
      <label>
        <span>Tradição</span>
        <select
          value={filters.tradition || "todas"}
          onChange={(event) => onChange("tradition", event.target.value as Filters["tradition"])}
        >
          <option value="todas">Todas</option>
          {traditions.map((tradition) => (
            <option key={tradition.id} value={tradition.id}>
              {tradition.name}
            </option>
          ))}
        </select>
      </label>
      <details className="myth-tree-advanced">
        <summary>Filtros avançados</summary>
        <label>
          <span>Tipo</span>
          <select
            value={filters.entityType || "todos"}
            onChange={(event) => onChange("entityType", event.target.value as Filters["entityType"])}
          >
            <option value="todos">Todos</option>
            {Object.entries(entityTypeLabels).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Categoria</span>
          <select
            value={filters.category || "todas"}
            onChange={(event) => onChange("category", event.target.value as Filters["category"])}
          >
            <option value="todas">Todas</option>
            {Object.entries(treeCategoryLabels).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <div className="myth-tree-checks">
          <label>
            <input
              type="checkbox"
              checked={Boolean(filters.onlyFavorites)}
              onChange={(event) => onChange("onlyFavorites", event.target.checked)}
            />
            Somente favoritos
          </label>
          <label>
            <input
              type="checkbox"
              checked={Boolean(filters.onlyStudied)}
              onChange={(event) => onChange("onlyStudied", event.target.checked)}
            />
            Somente estudados
          </label>
          <label>
            <input
              type="checkbox"
              checked={Boolean(filters.onlyWithPages)}
              onChange={(event) => onChange("onlyWithPages", event.target.checked)}
            />
            Com página
          </label>
          <label>
            <input
              type="checkbox"
              checked={Boolean(filters.includeAlternative)}
              onChange={(event) => onChange("includeAlternative", event.target.checked)}
            />
            Relações alternativas
          </label>
          <label>
            <input
              type="checkbox"
              checked={Boolean(filters.includeNarrative)}
              onChange={(event) => onChange("includeNarrative", event.target.checked)}
            />
            Incluir relações narrativas
          </label>
          <label>
            <input
              type="checkbox"
              checked={Boolean(filters.showMinimap)}
              onChange={(event) => onChange("showMinimap", event.target.checked)}
            />
            Mostrar minimapa na árvore completa
          </label>
        </div>
      </details>
      <button className="button secondary compact" type="button" onClick={onReset}>
        Limpar filtros
      </button>
    </form>
  );
}
