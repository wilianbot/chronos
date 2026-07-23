import type { Node, NodeProps } from "@xyflow/react";
import { BookOpen, CircleDot, Crown, Gem, Landmark, Shield, Skull, Sparkles, User, Users } from "lucide-react";
import { entityTypeLabels, treeCategoryLabels } from "../../../services/mythologyTreeService";
import type { MythologicalEntity } from "../../../types/mythologyTree";

export type MythologyNodeData = {
  entity: MythologicalEntity;
  favorite: boolean;
  studied: boolean;
  highlighted?: boolean;
  relationHint?: string;
  generationLabel?: string;
  onSelect: (id: string) => void;
};

const icons = {
  primordial: Sparkles,
  titan: Crown,
  deity: Landmark,
  demigod: Shield,
  hero: BookOpen,
  mortal: User,
  creature: Skull,
  personification: Gem,
  collective: Users
};

const shortTypeLabels = {
  primordial: "Primordial",
  titan: "Titã",
  deity: "Deus",
  demigod: "Semideus",
  hero: "Herói",
  mortal: "Mortal",
  creature: "Criatura",
  personification: "Personificação",
  collective: "Coletivo"
};

export function MythologyTreeNode({ data }: NodeProps<Node<MythologyNodeData>>) {
  const Icon = icons[data.entity.entityType] || CircleDot;
  const primaryCategory = data.entity.categories[0];

  return (
    <button
      type="button"
      className={`myth-tree-node myth-node-${data.entity.entityType} ${data.highlighted ? "highlighted" : ""}`}
      onClick={() => data.onSelect(data.entity.id)}
      aria-label={`${data.entity.name}, ${entityTypeLabels[data.entity.entityType]}`}
    >
      <span className="myth-node-media" aria-hidden="true">
        {data.entity.image?.src ? (
          <img
            src={data.entity.image.src}
            alt=""
            loading="lazy"
            decoding="async"
            style={{
              objectFit: data.entity.image.fit || "cover",
              objectPosition: data.entity.image.position || "center"
            }}
          />
        ) : (
          <Icon size={24} />
        )}
      </span>
      <span className="myth-node-body">
        {data.relationHint ? <b>{data.relationHint}</b> : null}
        <strong>{data.entity.name}</strong>
        <small>
          <Icon size={13} /> {shortTypeLabels[data.entity.entityType]}
        </small>
        {primaryCategory ? <i>{treeCategoryLabels[primaryCategory]}</i> : null}
      </span>
      {(data.favorite || data.studied) && (
        <span className="myth-node-status" aria-hidden="true">
          {data.favorite ? "★" : ""}
          {data.studied ? "✓" : ""}
        </span>
      )}
    </button>
  );
}
