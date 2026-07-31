import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { MythologyTreeEdgeView, MythologyTreeEntityNodeView, MythologyTreeNodeView, MythologyTreeUnionNodeView } from "../../../types/mythologyTree";

type Props = {
  nodes: MythologyTreeNodeView[];
  edges: MythologyTreeEdgeView[];
  selectedId?: string;
  favorites: Set<string>;
  studied: Set<string>;
  onSelect: (id: string) => void;
};

type Line = { id: string; d: string; kind: "parent" | "partner" };

const isEntity = (node: MythologyTreeNodeView): node is MythologyTreeEntityNodeView => node.kind === "entity";
const isUnion = (node: MythologyTreeNodeView): node is MythologyTreeUnionNodeView => node.kind === "union";

export function SimpleMythologyTree({ nodes, edges, selectedId, favorites, studied, onSelect }: Props) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  const [lines, setLines] = useState<Line[]>([]);
  const entities = useMemo(() => nodes.filter(isEntity), [nodes]);
  const unions = useMemo(() => nodes.filter(isUnion), [nodes]);
  const rows = useMemo(() => {
    const groups = new Map<number, MythologyTreeEntityNodeView[]>();
    entities.forEach((node) => groups.set(Math.round(node.y), [...(groups.get(Math.round(node.y)) || []), node]));
    return [...groups.entries()].sort(([a], [b]) => a - b).map(([level, items]) => ({
      level,
      label: items[0]?.generationLabel || "Geracao",
      items: [...items].sort((a, b) => a.x - b.x)
    }));
  }, [entities]);
  const graphKey = nodes.map((node) => node.id).join("|") + edges.map((edge) => edge.id).join("|");

  useLayoutEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    const draw = () => {
      const root = surface.getBoundingClientRect();
      const point = (id: string, side: "top" | "bottom") => {
        const rect = cardRefs.current.get(id)?.getBoundingClientRect();
        if (!rect) return;
        return {
          x: rect.left - root.left + rect.width / 2,
          y: (side === "top" ? rect.top : rect.bottom) - root.top
        };
      };
      const next: Line[] = [];
      const unionIds = new Set(unions.map((union) => union.id));

      edges.filter((edge) => !unionIds.has(edge.source) && !unionIds.has(edge.target)).forEach((edge) => {
        const partner = edge.relation.type === "partner" || edge.relation.type === "spouse";
        const source = point(edge.source, partner ? "top" : "bottom");
        const target = point(edge.target, "top");
        if (!source || !target) return;
        const middle = (source.y + target.y) / 2;
        next.push({
          id: edge.id,
          kind: partner ? "partner" : "parent",
          d: partner ? `M ${source.x} ${source.y + 35} H ${target.x}` : `M ${source.x} ${source.y} V ${middle} H ${target.x} V ${target.y}`
        });
      });

      unions.forEach((node) => {
        const parents = node.union.partnerIds.map((id) => point(id, "bottom")).filter(Boolean) as { x: number; y: number }[];
        const children = node.union.childIds.map((id) => point(id, "top")).filter(Boolean) as { x: number; y: number }[];
        if (!parents.length || !children.length) return;
        const jointX = parents.reduce((sum, item) => sum + item.x, 0) / parents.length;
        const parentY = Math.max(...parents.map((item) => item.y));
        const childY = Math.min(...children.map((item) => item.y));
        const jointY = parentY + Math.max(20, (childY - parentY) * 0.3);
        const busY = childY - Math.max(20, (childY - jointY) * 0.35);
        parents.forEach((item, index) => next.push({
          id: `${node.id}-parent-${index}`,
          kind: "partner",
          d: `M ${item.x} ${item.y} V ${jointY} H ${jointX}`
        }));
        next.push({ id: `${node.id}-trunk`, kind: "parent", d: `M ${jointX} ${jointY} V ${busY}` });
        children.forEach((item, index) => next.push({
          id: `${node.id}-child-${index}`,
          kind: "parent",
          d: `M ${jointX} ${busY} H ${item.x} V ${item.y}`
        }));
      });
      setLines(next);
    };
    const frame = requestAnimationFrame(draw);
    const observer = new ResizeObserver(draw);
    observer.observe(surface);
    cardRefs.current.forEach((card) => observer.observe(card));
    window.addEventListener("resize", draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, [edges, graphKey, unions]);

  return (
    <div className="myth-static-tree" aria-label="Arvore genealogica mitologica">
      <div className="myth-static-scroll">
        <div className="myth-static-surface" ref={surfaceRef}>
          <svg className="myth-static-connectors" aria-hidden="true">
            {lines.map((line) => <path key={line.id} d={line.d} className={`myth-static-line ${line.kind}`} />)}
          </svg>
          {rows.map((row) => (
            <section className="myth-static-generation" key={row.level}>
              <span className="myth-static-generation-label">{row.label}</span>
              <div className="myth-static-row">
                {row.items.map((node) => (
                  <button
                    key={node.id}
                    ref={(element) => { if (element) cardRefs.current.set(node.id, element); else cardRefs.current.delete(node.id); }}
                    className={`myth-static-card ${node.id === selectedId ? "selected" : ""}`}
                    type="button"
                    onClick={() => onSelect(node.id)}
                  >
                    <span className="myth-static-avatar">
                      {node.entity.image?.src ? <img src={node.entity.image.src} alt="" /> : node.entity.name[0]}
                    </span>
                    <span>
                      <strong>{node.entity.name}</strong>
                      <small>{node.entity.title || node.entity.shortDescription}</small>
                    </span>
                    {(favorites.has(node.id) || studied.has(node.id)) && <i>{String.fromCharCode(favorites.has(node.id) ? 70 : 69)}</i>}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <div className="myth-static-key"><span><i className="parent" /> Descendencia</span><span><i className="partner" /> Uniao</span></div>
    </div>
  );
}
