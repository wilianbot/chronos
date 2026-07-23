import { useEffect, useMemo } from "react";
import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
  type NodeTypes,
  useReactFlow
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { MythologyTreeEdgeView, MythologyTreeNodeView } from "../../../types/mythologyTree";
import { relationClassName, relationEdgeStyle, relationLabel } from "./MythologyTreeEdge";
import { MythologyTreeNode, type MythologyNodeData } from "./MythologyTreeNode";

const nodeTypes: NodeTypes = {
  mythologyEntity: MythologyTreeNode,
  familyUnion: FamilyUnionNode
};

function FamilyUnionNode() {
  return <span className="myth-family-union-node" aria-hidden="true" />;
}

function TreeViewportHandler({ graphKey, completeTree }: { graphKey: string; completeTree?: boolean }) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fitView({
        padding: completeTree ? 0.18 : 0.08,
        minZoom: completeTree ? 0.38 : 0.68,
        maxZoom: 1.06
      });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [completeTree, fitView, graphKey]);

  return null;
}

export function MythologyTreeCanvas({
  nodes,
  edges,
  selectedId,
  favorites,
  studied,
  showMinimap,
  completeTree,
  onSelect
}: {
  nodes: MythologyTreeNodeView[];
  edges: MythologyTreeEdgeView[];
  selectedId?: string;
  favorites: Set<string>;
  studied: Set<string>;
  showMinimap?: boolean;
  completeTree?: boolean;
  onSelect: (id: string) => void;
}) {
  const flowNodes = useMemo<Node[]>(
    () =>
      nodes.map((node) => ({
        id: node.id,
        type: node.kind === "union" ? "familyUnion" : "mythologyEntity",
        position: { x: node.x, y: node.y },
        draggable: node.kind === "entity",
        selectable: node.kind === "entity",
        data:
          node.kind === "entity"
            ? ({
                entity: node.entity,
                highlighted: node.highlighted || node.id === selectedId,
                favorite: favorites.has(node.id),
                studied: studied.has(node.id),
                relationHint: node.relationHint,
                generationLabel: node.generationLabel,
                onSelect
              } satisfies MythologyNodeData)
            : { union: node.union }
      })),
    [favorites, nodes, onSelect, selectedId, studied]
  );

  const flowEdges = useMemo<Edge[]>(
    () =>
      edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.relation.type === "partner" || edge.relation.type === "spouse" ? "straight" : "smoothstep",
        animated: Boolean(edge.relation.alternative || edge.relation.disputed),
        label: relationLabel(edge.relation),
        markerEnd:
          edge.relation.type === "parent"
            ? {
                type: MarkerType.ArrowClosed,
                width: 16,
                height: 16,
                color: String(relationEdgeStyle(edge.relation).stroke || "#d7ad54")
              }
            : undefined,
        className: relationClassName(edge.relation),
        style: relationEdgeStyle(edge.relation)
      })),
    [edges]
  );
  const graphKey = useMemo(() => flowNodes.map((node) => node.id).join("|"), [flowNodes]);

  return (
    <div className="myth-tree-canvas" role="application" aria-label="Grafo genealógico mitológico interativo">
      <ReactFlow
        key={graphKey}
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: completeTree ? 0.18 : 0.08, minZoom: completeTree ? 0.38 : 0.68, maxZoom: 1.06 }}
        minZoom={completeTree ? 0.35 : 0.62}
        maxZoom={1.28}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
        onNodeClick={(_, node) => {
          if (node.type === "mythologyEntity") onSelect(node.id);
        }}
      >
        <Background gap={28} size={1} />
        <TreeViewportHandler graphKey={graphKey} completeTree={completeTree} />
        <Controls showInteractive={false} />
        {showMinimap && completeTree ? <MiniMap pannable zoomable className="myth-tree-minimap" /> : null}
      </ReactFlow>
    </div>
  );
}
