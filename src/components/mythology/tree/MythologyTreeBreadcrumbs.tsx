import { Link } from "react-router-dom";
import type { MythologicalEntity } from "../../../types/mythologyTree";

export function MythologyTreeBreadcrumbs({ selectedEntity }: { selectedEntity?: MythologicalEntity }) {
  return (
    <nav className="myth-tree-breadcrumbs" aria-label="Navegação da árvore de mitologia">
      <Link to="/mitologia">Mitologia</Link>
      <span>/</span>
      <Link to="/mitologia/arvore">Árvore genealógica</Link>
      {selectedEntity && (
        <>
          <span>/</span>
          <span aria-current="page">{selectedEntity.name}</span>
        </>
      )}
    </nav>
  );
}
