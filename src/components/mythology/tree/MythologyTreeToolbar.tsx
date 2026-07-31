import { Copy, Focus, Maximize2, RotateCcw } from "lucide-react";
import type { MythologicalEntity } from "../../../types/mythologyTree";

export function MythologyTreeToolbar({
  selectedEntity,
  onFocus,
  onFullTree,
  onCopy,
  onFullscreen
}: {
  selectedEntity?: MythologicalEntity;
  onFocus: () => void;
  onFullTree: () => void;
  onCopy: () => void;
  onFullscreen: () => void;
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
      <button className="button primary compact myth-full-page-button" type="button" onClick={onFullscreen}>
          <Maximize2 size={16} /> Ver página completa
      </button>
    </div>
  );
}
