import { Link } from "react-router-dom";
import { CheckCircle2, Copy, Crosshair, Heart, Maximize2, Users } from "lucide-react";
import {
  entityTypeLabels,
  getAncestors,
  getChildren,
  getDescendants,
  getEntityRoute,
  getParents,
  getPartners,
  getRelationsForEntity,
  getSiblings,
  getTextualFamilySummary,
  getTreeUrl,
  treeCategoryLabels
} from "../../../services/mythologyTreeService";
import type { MythologicalEntity, MythologyTreeMode } from "../../../types/mythologyTree";
import { relationLabel } from "./MythologyTreeEdge";

function EntityLinks({ title, items }: { title: string; items: MythologicalEntity[] }) {
  if (!items.length) return null;
  return (
    <section>
      <h4>{title}</h4>
      <div className="deity-link-list">
        {items.map((item) => (
          <Link key={item.id} to={getEntityRoute(item)}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function MythologyEntityPanel({
  entity,
  favorite,
  studied,
  onFocus,
  onModeChange,
  showCorrespondences,
  showNarrative,
  onToggleFavorite,
  onToggleStudied,
  onCopy
}: {
  entity?: MythologicalEntity;
  favorite: boolean;
  studied: boolean;
  onFocus: (id: string) => void;
  onModeChange: (mode: MythologyTreeMode) => void;
  showCorrespondences?: boolean;
  showNarrative?: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleStudied: (id: string) => void;
  onCopy: (url: string) => void;
}) {
  if (!entity) {
    return (
      <aside className="myth-entity-panel" aria-live="polite">
        <h3>Selecione uma entidade</h3>
        <p>Escolha um nó para ver parentesco, tradição, observações e fontes.</p>
      </aside>
    );
  }

  const parents = getParents(entity.id, entity.mythology);
  const siblings = getSiblings(entity.id, entity.mythology);
  const partners = getPartners(entity.id, entity.mythology);
  const children = getChildren(entity.id, entity.mythology);
  const ancestors = getAncestors(entity.id, { mythology: entity.mythology, depth: "2" });
  const descendants = getDescendants(entity.id, { mythology: entity.mythology, depth: "2" });
  const relations = getRelationsForEntity(entity.id)
    .filter((relation) => relation.type !== "parent")
    .filter((relation) => showCorrespondences || relation.type !== "cultural-correspondence")
    .filter((relation) => showNarrative || (relation.type !== "rival" && relation.type !== "companion"))
    .slice(0, 8);
  const treeUrl = getTreeUrl(entity);

  return (
    <aside className="myth-entity-panel" aria-live="polite" aria-label={`Detalhes de ${entity.name}`}>
      <div className="myth-panel-header">
        {entity.image?.src && (
          <img
            src={entity.image.src}
            alt={entity.image.alt}
            loading="lazy"
            decoding="async"
            style={{ objectFit: entity.image.fit || "cover", objectPosition: entity.image.position || "center" }}
          />
        )}
        <div>
          <span className="eyebrow">{entity.mythology === "grega" ? "Mitologia Grega" : "Mitologia Romana"}</span>
          <h3>{entity.name}</h3>
          <p>
            {entityTypeLabels[entity.entityType]} ·{" "}
            {entity.categories.map((item) => treeCategoryLabels[item]).join(", ")}
          </p>
        </div>
      </div>

      <p>{entity.shortDescription}</p>
      <p className="tree-note compact-note">
        Conteúdo tratado como tradição mitológica ou religiosa antiga. Genealogias variam por fonte, região e época.
      </p>

      <div className="myth-panel-actions">
        <button
          className={`button secondary compact ${favorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(entity.id)}
        >
          <Heart size={16} /> Favoritar
        </button>
        <button
          className={`button secondary compact ${studied ? "active" : ""}`}
          onClick={() => onToggleStudied(entity.id)}
        >
          <CheckCircle2 size={16} /> Estudado
        </button>
        <button className="button secondary compact" onClick={() => onFocus(entity.id)}>
          <Crosshair size={16} /> Centralizar
        </button>
        <button
          className="button secondary compact"
          onClick={() => {
            onFocus(entity.id);
            onModeChange("family");
          }}
        >
          Ver família
        </button>
        <button
          className="button secondary compact"
          onClick={() => {
            onFocus(entity.id);
            onModeChange("ancestors");
          }}
        >
          Ver antepassados
        </button>
        <button
          className="button secondary compact"
          onClick={() => {
            onFocus(entity.id);
            onModeChange("descendants");
          }}
        >
          Ver descendentes
        </button>
        <button className="button secondary compact" onClick={() => onCopy(treeUrl)}>
          <Copy size={16} /> Copiar link
        </button>
        <Link className="button primary compact" to={getEntityRoute(entity)}>
          <Maximize2 size={16} /> Ver página completa
        </Link>
      </div>

      <div className="deity-family-grid">
        <EntityLinks title="Pais" items={parents} />
        <EntityLinks title="Irmãos" items={siblings} />
        <EntityLinks title="Parceiros" items={partners} />
        <EntityLinks title="Filhos" items={children} />
        <EntityLinks title="Antepassados" items={ancestors} />
        <EntityLinks title="Descendentes" items={descendants} />
      </div>

      {relations.length > 0 && (
        <section className="myth-panel-relations">
          <h4>
            <Users size={16} /> Relações principais
          </h4>
          <ul>
            {relations.map((relation) => (
              <li key={relation.id}>
                <strong>{relationLabel(relation)}:</strong> {relation.description || relation.label || relation.type}
                {relation.alternative || relation.disputed ? <em> relação alternativa/contestada</em> : null}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="myth-panel-text">
        <h4>Resumo textual</h4>
        <ul>
          {getTextualFamilySummary(entity.id).map((item) => (
            <li key={item.label}>
              <strong>{item.label}:</strong> {item.values.join(", ")}
            </li>
          ))}
        </ul>
      </section>

      {entity.sources?.length ? (
        <section className="myth-panel-sources">
          <h4>Fontes</h4>
          <ul>
            {entity.sources.slice(0, 4).map((source) => (
              <li key={`${source.title}-${source.url || source.institution}`}>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title}
                  </a>
                ) : (
                  source.title
                )}
                {source.author ? `, ${source.author}` : ""}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
