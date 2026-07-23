import { Link, useParams } from "react-router-dom";
import { MythologyTree } from "../components/mythology/tree/MythologyTree";
import { MythologyEntityPanel } from "../components/mythology/tree/MythologyEntityPanel";
import { EmptyState } from "../components/common/StateViews";
import { useAppContext } from "../hooks/useAppContext";
import { getEntityRoute, getMythologicalEntity, getTreeUrl } from "../services/mythologyTreeService";

export function MythologyTreePage() {
  return <MythologyTree />;
}

export function MythologyEntityPage() {
  const { id } = useParams();
  const entity = getMythologicalEntity(id);
  const { favoritos, estudados, alternarFavorito, alternarEstudado } = useAppContext();

  if (!entity) {
    return (
      <section className="section route-section">
        <EmptyState
          title="Entidade não encontrada"
          text="Esta entidade ainda não está cadastrada no grafo mitológico."
        />
        <Link className="button primary" to="/mitologia/arvore">
          Abrir árvore genealógica
        </Link>
      </section>
    );
  }

  return (
    <section className="section route-section">
      <div className="section-title">
        <span className="eyebrow">{entity.entityType}</span>
        <h2>{entity.name}</h2>
        <p>{entity.fullDescription || entity.shortDescription}</p>
      </div>
      <div className="myth-entity-route-grid">
        <MythologyEntityPanel
          entity={entity}
          favorite={favoritos.has(entity.id)}
          studied={estudados.has(entity.id)}
          onFocus={() => undefined}
          onModeChange={() => undefined}
          onToggleFavorite={alternarFavorito}
          onToggleStudied={alternarEstudado}
          onCopy={async (url) => navigator.clipboard?.writeText(`${location.origin}${url}`)}
        />
        <div className="deity-prose">
          <h3>Família e genealogia</h3>
          <p>
            Esta página resumida usa a mesma base do grafo mitológico. Quando houver uma página dedicada anterior, ela é
            preservada e a rota correta continua disponível.
          </p>
          <div className="filter-actions">
            <Link className="button primary" to={getTreeUrl(entity)}>
              Ver na árvore genealógica
            </Link>
            {entity.hasDedicatedPage && (
              <Link className="button secondary" to={getEntityRoute(entity)}>
                Abrir página de divindade
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
