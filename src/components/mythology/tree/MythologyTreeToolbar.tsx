import { Link } from "react-router-dom";
import { Copy, Focus, Maximize2, RotateCcw } from "lucide-react";
import type { MythologicalEntity } from "../../../types/mythologyTree";

export function MythologyTreeToolbar({
  selectedEntity,
  onFocus,
  onFullTree,
  onCopy
}: {
  selectedEntity?: MythologicalEntity;
  onFocus: () => void;
  onFullTree: () => void;
  onCopy: () => void;
}) {
  return (
    <div className="myth-tree-toolbar" aria-label="Controles da árvore">
      <button className="button secondary compact" type="button" onClick={onFullTree}>
        <RotateCcw size={16} /> Árvore completa
      </button>
      <button className="button secondary compact" type="button" onClick={onFocus} disabled={!selectedEntity}>
        <Focus size={16} /> Ver família
      </button>
      <button className="button secondary compact" type="button" onClick={onCopy} disabled={!selectedEntity}>
        <Copy size={16} /> Copiar link
      </button>
      {selectedEntity?.pageRoute && (
        <Link className="button primary compact" to={selectedEntity.pageRoute}>
          <Maximize2 size={16} /> Ver página completa
        </Link>
      )}
    </div>
  );
}
