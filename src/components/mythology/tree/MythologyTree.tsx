import { useCallback } from "react";
import { useAppContext } from "../../../hooks/useAppContext";
import { useMythologyTree } from "../../../hooks/useMythologyTree";
import { useMythologyTreeFilters } from "../../../hooks/useMythologyTreeFilters";
import { treeFamilyPresets } from "../../../services/mythologyTreeService";
import type { MythologicalEntity } from "../../../types/mythologyTree";
import { MythologyEntityPanel } from "./MythologyEntityPanel";
import { MythologyRelationPanel } from "./MythologyRelationPanel";
import { MythologyTraditionSelector } from "./MythologyTraditionSelector";
import { MythologyTreeBreadcrumbs } from "./MythologyTreeBreadcrumbs";
import { SimpleMythologyTree } from "./SimpleMythologyTree";
import { MythologyTreeEmptyState } from "./MythologyTreeEmptyState";
import { MythologyTreeFilters } from "./MythologyTreeFilters";
import { MythologyTreeLegend } from "./MythologyTreeLegend";
import { MythologyTreeSearch } from "./MythologyTreeSearch";
import { MythologyTreeToolbar } from "./MythologyTreeToolbar";

export function MythologyTree() {
  const { favoritos, estudados, alternarFavorito, alternarEstudado } = useAppContext();
  const { filters, updateFilter, resetFilters } = useMythologyTreeFilters();
  const { graph, selectedEntity, searchResults } = useMythologyTree({
    filters,
    favorites: favoritos,
    studied: estudados
  });

  const selectEntity = useCallback(
    (id: string) => {
      updateFilter("focusId", id);
      updateFilter("partnerId", undefined);
      if (filters.mode === "complete") updateFilter("mode", "focused");
    },
    [filters.mode, updateFilter]
  );

  const copyUrl = useCallback(async (url?: string) => {
    const href = `${location.origin}${url || location.pathname + location.search}`;
    await navigator.clipboard?.writeText(href);
  }, []);

  const handleSearchSelect = (entity: MythologicalEntity) => {
    updateFilter("mythology", entity.mythology);
    updateFilter("entityType", "todos");
    updateFilter("category", "todas");
    updateFilter("focusId", entity.id);
    updateFilter("partnerId", undefined);
    updateFilter("mode", "focused");
  };

  const applyPreset = (preset: (typeof treeFamilyPresets)[number]) => {
    updateFilter("mythology", preset.mythology);
    updateFilter("focusId", preset.focusId);
    updateFilter("partnerId", preset.partnerId);
    updateFilter("mode", preset.mode);
    updateFilter("depth", preset.depth);
    updateFilter("includeCorrespondences", false);
  };

  return (
    <section className="section route-section mythology-tree-page">
      <MythologyTreeBreadcrumbs selectedEntity={selectedEntity} />
      <div className="section-title">
        <span className="eyebrow">Grafo mitológico</span>
        <h2>Árvore genealógica interativa</h2>
        <p>
          Esta visualização organiza parentescos e relações narrativas de tradições antigas. Ela não apresenta uma
          genealogia definitiva: versões variam conforme autor, cidade, época e prática religiosa.
        </p>
      </div>

      <a className="skip-link inline-skip" href="#myth-tree-textual">
        Pular canvas e ver versão textual
      </a>

      <div className="myth-tree-shell">
        <div className="myth-tree-sidebar">
          <section className="myth-family-presets" aria-label="Famílias sugeridas">
            <h3>Famílias</h3>
            <div>
              {treeFamilyPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={
                    filters.focusId === preset.focusId && filters.partnerId === preset.partnerId ? "active" : ""
                  }
                  onClick={() => applyPreset(preset)}
                >
                  {preset.label}
                </button>
              ))}
              <button
                type="button"
                className={filters.mode === "complete" ? "active" : ""}
                onClick={() => {
                  updateFilter("mode", "complete");
                  updateFilter("partnerId", undefined);
                  updateFilter("showMinimap", true);
                }}
              >
                Árvore completa
              </button>
            </div>
          </section>
          <MythologyTreeSearch
            query={filters.query}
            results={searchResults}
            onQueryChange={(value) => updateFilter("query", value)}
            onSelect={handleSearchSelect}
          />
          <MythologyTreeFilters filters={filters} onChange={updateFilter} onReset={resetFilters} />
          <MythologyTraditionSelector filters={filters} onChange={updateFilter} />
          <MythologyTreeLegend />
        </div>

        <div className="myth-tree-main">
          <MythologyTreeToolbar
            selectedEntity={selectedEntity}
            onFocus={() => selectedEntity && selectEntity(selectedEntity.id)}
            onFullTree={() => {
              updateFilter("mode", "complete");
              updateFilter("focusId", undefined);
              updateFilter("partnerId", undefined);
              updateFilter("showMinimap", true);
            }}
            onCopy={() => copyUrl()}
            onFullscreen={() => {
              const tree = document.querySelector<HTMLElement>(".myth-tree-shell");
              if (!document.fullscreenElement) void tree?.requestFullscreen();
              else void document.exitFullscreen();
            }}
          />
          {graph.isComplete ? (
            <p className="tree-note compact-note myth-tree-complete-note">
              A árvore completa reúne muitas entidades e pode reduzir o zoom. Para leitura genealógica, use uma família
              sugerida, antepassados ou descendentes de uma entidade em foco.
            </p>
          ) : null}
          {graph.nodes.length ? (
            <SimpleMythologyTree
              nodes={graph.nodes}
              edges={graph.edges}
              selectedId={selectedEntity?.id}
              favorites={favoritos}
              studied={estudados}
              onSelect={selectEntity}
            />
          ) : (
            <MythologyTreeEmptyState />
          )}
          <MythologyRelationPanel edges={graph.edges} />
        </div>

        <MythologyEntityPanel
          entity={selectedEntity}
          favorite={selectedEntity ? favoritos.has(selectedEntity.id) : false}
          studied={selectedEntity ? estudados.has(selectedEntity.id) : false}
          onFocus={selectEntity}
          onModeChange={(mode) => updateFilter("mode", mode)}
          showCorrespondences={filters.mode === "correspondences" || Boolean(filters.includeCorrespondences)}
          showNarrative={Boolean(filters.includeNarrative)}
          onToggleFavorite={alternarFavorito}
          onToggleStudied={alternarEstudado}
          onCopy={copyUrl}
        />
      </div>
    </section>
  );
}
