import type { MythologyId } from "./mythology";

export type MythologicalEntityType =
  "primordial" | "titan" | "deity" | "demigod" | "hero" | "mortal" | "creature" | "personification" | "collective";

export type MythologicalCategory =
  | "primordial"
  | "titan"
  | "olympian"
  | "chthonic"
  | "sea"
  | "nature"
  | "war"
  | "love"
  | "death"
  | "wisdom"
  | "healing"
  | "domestic"
  | "heroic"
  | "monster"
  | "other";

export type MythologicalEntity = {
  id: string;
  name: string;
  alternativeNames?: string[];
  mythology: MythologyId;
  culture: string;
  entityType: MythologicalEntityType;
  categories: MythologicalCategory[];
  title?: string;
  shortDescription: string;
  fullDescription?: string;
  domains?: string[];
  symbols?: string[];
  attributes?: string[];
  image?: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    position?: string;
  };
  pageRoute?: string;
  hasDedicatedPage?: boolean;
  sources?: Array<{
    title: string;
    institution?: string;
    author?: string;
    url?: string;
  }>;
};

export type MythologicalRelationType =
  | "parent"
  | "child"
  | "sibling"
  | "partner"
  | "spouse"
  | "adoptive-parent"
  | "adoptive-child"
  | "creator"
  | "created-being"
  | "ancestor"
  | "descendant"
  | "cultural-correspondence"
  | "rival"
  | "companion";

export type MythologicalRelation = {
  id: string;
  sourceId: string;
  targetId: string;
  type: MythologicalRelationType;
  mythology: MythologyId;
  label?: string;
  description?: string;
  tradition?: string;
  sourceAuthor?: string;
  disputed?: boolean;
  alternative?: boolean;
  validFromVersion?: string;
  sources?: Array<{
    title: string;
    author?: string;
    institution?: string;
    url?: string;
  }>;
};

export type MythologicalTradition = {
  id: string;
  mythology: MythologyId;
  name: string;
  description: string;
  author?: string;
  work?: string;
  approximatePeriod?: string;
};

export type MythologyTreeMode =
  | "family"
  | "focused"
  | "near-family"
  | "complete"
  | "descendants"
  | "ancestors"
  | "demigods"
  | "heroes"
  | "correspondences";

export type MythologyTreeDepth = "1" | "2" | "3" | "all";

export type MythologyTreeFilters = {
  mythology: MythologyId;
  entityType?: MythologicalEntityType | "todos";
  category?: MythologicalCategory | "todas";
  tradition?: string | "todas";
  query?: string;
  focusId?: string;
  partnerId?: string;
  mode: MythologyTreeMode;
  depth: MythologyTreeDepth;
  onlyWithPages?: boolean;
  onlyFavorites?: boolean;
  onlyStudied?: boolean;
  includeAlternative?: boolean;
  includeCorrespondences?: boolean;
  includeNarrative?: boolean;
  showMinimap?: boolean;
};

export type FamilyUnion = {
  id: string;
  partnerIds: string[];
  childIds: string[];
  mythology: MythologyId;
  tradition?: string;
  label?: string;
  alternative?: boolean;
};

export type MythologyTreeEntityNodeView = {
  id: string;
  kind: "entity";
  entity: MythologicalEntity;
  x: number;
  y: number;
  highlighted?: boolean;
  relationHint?: string;
  generationLabel?: string;
};

export type MythologyTreeUnionNodeView = {
  id: string;
  kind: "union";
  union: FamilyUnion;
  x: number;
  y: number;
  hidden?: boolean;
};

export type MythologyTreeNodeView = MythologyTreeEntityNodeView | MythologyTreeUnionNodeView;

export type MythologyTreeEdgeView = {
  id: string;
  source: string;
  target: string;
  relation: MythologicalRelation;
};
