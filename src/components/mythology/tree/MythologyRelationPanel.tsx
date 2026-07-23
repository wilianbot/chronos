import { getMythologicalEntity } from "../../../services/mythologyTreeService";
import type { MythologyTreeEdgeView } from "../../../types/mythologyTree";
import { relationLabel } from "./MythologyTreeEdge";

function nodeLabel(id: string) {
  if (id.startsWith("union:")) {
    const names = id
      .replace(/^union:/, "")
      .split("__")
      .map((entityId) => getMythologicalEntity(entityId)?.name || entityId);
    return `União de ${names.join(" e ")}`;
  }

  return getMythologicalEntity(id)?.name || id;
}

export function MythologyRelationPanel({ edges }: { edges: MythologyTreeEdgeView[] }) {
  const visibleEdges = edges.filter((edge) => !edge.target.startsWith("union:"));

  return (
    <section id="myth-tree-textual" className="myth-relation-list" aria-label="Lista textual de relações visíveis">
      <h3>Relações visíveis</h3>
      <ul>
        {visibleEdges.slice(0, 60).map((edge) => {
          return (
            <li key={edge.id}>
              <strong>{nodeLabel(edge.source)}</strong> — {relationLabel(edge.relation)} —{" "}
              <strong>{nodeLabel(edge.target)}</strong>
              {edge.relation.alternative || edge.relation.disputed ? <em> alternativa/contestada</em> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
