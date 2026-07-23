import { culturalCorrespondences } from "../data/mythology/culturalCorrespondences";
import { greekRelations } from "../data/mythology/greekRelations";
import { mythologicalEntities, mythologicalEntitiesById } from "../data/mythology/mythologicalEntities";
import { mythologicalTraditions } from "../data/mythology/traditions";
import { romanRelations } from "../data/mythology/romanRelations";
import { normalizar } from "../lib/history";
import type { MythologyId } from "../types/mythology";
import type {
  MythologicalCategory,
  MythologicalEntity,
  MythologicalEntityType,
  MythologicalRelation,
  FamilyUnion,
  MythologyTreeDepth,
  MythologyTreeEdgeView,
  MythologyTreeFilters,
  MythologyTreeMode,
  MythologyTreeNodeView
} from "../types/mythologyTree";

export const allMythologicalEntities = mythologicalEntities;
export const mythologicalEntityMap = mythologicalEntitiesById;
export const allMythologicalRelations = [...greekRelations, ...romanRelations, ...culturalCorrespondences];
export const mythologicalRelationMap = new Map(allMythologicalRelations.map((relation) => [relation.id, relation]));

const parentTypes = new Set(["parent", "adoptive-parent", "creator", "ancestor"]);
const partnerTypes = new Set(["partner", "spouse"]);
const narrativeTypes = new Set(["rival", "companion"]);
const TREE_HORIZONTAL_GAP = 190;
const TREE_VERTICAL_GAP = 130;
const TREE_NODE_WIDTH = 180;

export const entityTypeLabels: Record<MythologicalEntityType, string> = {
  primordial: "Entidade primordial",
  titan: "Titã",
  deity: "Deus/divindade",
  demigod: "Semideus",
  hero: "Herói",
  mortal: "Mortal",
  creature: "Criatura",
  personification: "Personificação",
  collective: "Coletivo"
};

export const treeCategoryLabels: Record<MythologicalCategory, string> = {
  primordial: "Primordial",
  titan: "Titã",
  olympian: "Olímpico",
  chthonic: "Ctônico",
  sea: "Mar",
  nature: "Natureza",
  war: "Guerra",
  love: "Amor",
  death: "Morte",
  wisdom: "Sabedoria",
  healing: "Cura",
  domestic: "Doméstico",
  heroic: "Heroico",
  monster: "Monstro",
  other: "Outro"
};

export const treeModeLabels: Record<MythologyTreeMode, string> = {
  family: "Família",
  "near-family": "Família próxima",
  complete: "Árvore completa",
  focused: "Família",
  descendants: "Descendentes",
  ancestors: "Antepassados",
  demigods: "Semideuses",
  heroes: "Heróis",
  correspondences: "Correspondências culturais"
};

export const defaultTreeFilters: MythologyTreeFilters = {
  mythology: "grega",
  focusId: "cronos",
  partnerId: "reia",
  entityType: "todos",
  category: "todas",
  tradition: "todas",
  mode: "family",
  depth: "1",
  includeAlternative: true,
  includeCorrespondences: false,
  includeNarrative: false,
  showMinimap: false,
  onlyWithPages: false,
  onlyFavorites: false,
  onlyStudied: false
};

export function getMythologicalEntity(id?: string) {
  return id ? mythologicalEntityMap.get(id) : undefined;
}

export function getEntityRoute(entity?: MythologicalEntity) {
  if (!entity) return "/mitologia/arvore";
  if (entity.hasDedicatedPage) return entity.pageRoute || `/deuses/${entity.id}`;
  if (entity.pageRoute) return entity.pageRoute;
  if (entity.entityType === "hero") return `/herois/${entity.id}`;
  if (entity.entityType === "demigod") return `/semideuses/${entity.id}`;
  return `/mitologia/entidades/${entity.id}`;
}

export function getTreeUrl(entity: MythologicalEntity, mode: MythologyTreeMode = "focused") {
  const params = new URLSearchParams({ mitologia: entity.mythology, foco: entity.id });
  if (mode !== "focused") params.set("modo", mode);
  return `/mitologia/arvore?${params.toString()}`;
}

export function getRelationsForEntity(id: string, relations = allMythologicalRelations) {
  return relations.filter((relation) => relation.sourceId === id || relation.targetId === id);
}

export function getParents(id: string, mythology?: MythologyId, relations = allMythologicalRelations) {
  return relations
    .filter(
      (relation) =>
        relation.targetId === id &&
        parentTypes.has(relation.type) &&
        (!mythology || relation.mythology === mythology) &&
        relation.type !== "cultural-correspondence"
    )
    .map((relation) => mythologicalEntityMap.get(relation.sourceId))
    .filter(Boolean) as MythologicalEntity[];
}

export function getChildren(id: string, mythology?: MythologyId, relations = allMythologicalRelations) {
  return relations
    .filter(
      (relation) =>
        relation.sourceId === id &&
        parentTypes.has(relation.type) &&
        (!mythology || relation.mythology === mythology) &&
        relation.type !== "cultural-correspondence"
    )
    .map((relation) => mythologicalEntityMap.get(relation.targetId))
    .filter(Boolean) as MythologicalEntity[];
}

export function getPartners(id: string, mythology?: MythologyId, relations = allMythologicalRelations) {
  return relations
    .filter(
      (relation) =>
        partnerTypes.has(relation.type) &&
        (!mythology || relation.mythology === mythology) &&
        (relation.sourceId === id || relation.targetId === id)
    )
    .map((relation) => mythologicalEntityMap.get(relation.sourceId === id ? relation.targetId : relation.sourceId))
    .filter(Boolean) as MythologicalEntity[];
}

export function getSiblings(id: string, mythology?: MythologyId, relations = allMythologicalRelations) {
  const parents = getParents(id, mythology, relations);
  const siblings = new Map<string, MythologicalEntity>();
  parents.forEach((parent) => {
    getChildren(parent.id, mythology, relations).forEach((child) => {
      if (child.id !== id) siblings.set(child.id, child);
    });
  });
  return [...siblings.values()];
}

function walkFamily({
  startId,
  direction,
  depth,
  mythology,
  relations
}: {
  startId: string;
  direction: "ancestors" | "descendants";
  depth: MythologyTreeDepth;
  mythology?: MythologyId;
  relations: MythologicalRelation[];
}) {
  const maxDepth = depth === "all" ? Number.POSITIVE_INFINITY : Number(depth);
  const visited = new Set<string>([startId]);
  const result = new Set<string>();
  const queue = [{ id: startId, level: 0 }];

  while (queue.length) {
    const current = queue.shift()!;
    if (current.level >= maxDepth) continue;
    const next =
      direction === "ancestors"
        ? getParents(current.id, mythology, relations)
        : getChildren(current.id, mythology, relations);

    next.forEach((entity) => {
      if (visited.has(entity.id)) return;
      visited.add(entity.id);
      result.add(entity.id);
      queue.push({ id: entity.id, level: current.level + 1 });
    });
  }

  return [...result].map((id) => mythologicalEntityMap.get(id)).filter(Boolean) as MythologicalEntity[];
}

export function getAncestors(
  id: string,
  options: { mythology?: MythologyId; depth?: MythologyTreeDepth; relations?: MythologicalRelation[] } = {}
) {
  return walkFamily({
    startId: id,
    direction: "ancestors",
    depth: options.depth || "all",
    mythology: options.mythology,
    relations: options.relations || allMythologicalRelations
  });
}

export function getDescendants(
  id: string,
  options: { mythology?: MythologyId; depth?: MythologyTreeDepth; relations?: MythologicalRelation[] } = {}
) {
  return walkFamily({
    startId: id,
    direction: "descendants",
    depth: options.depth || "all",
    mythology: options.mythology,
    relations: options.relations || allMythologicalRelations
  });
}

function relationAllowed(relation: MythologicalRelation, filters: MythologyTreeFilters) {
  if (!filters.includeAlternative && (relation.alternative || relation.disputed)) return false;
  if (narrativeTypes.has(relation.type) && !filters.includeNarrative) return false;
  if (filters.tradition && filters.tradition !== "todas" && relation.tradition !== filters.tradition) return false;
  if (relation.type === "cultural-correspondence") {
    return filters.mode === "correspondences" || Boolean(filters.includeCorrespondences);
  }
  return relation.mythology === filters.mythology;
}

function entityText(entity: MythologicalEntity) {
  const parents = getParents(entity.id, entity.mythology).map((item) => item.name);
  const partners = getPartners(entity.id, entity.mythology).map((item) => item.name);
  const children = getChildren(entity.id, entity.mythology).map((item) => item.name);
  return [
    entity.name,
    ...(entity.alternativeNames || []),
    entity.title,
    entity.shortDescription,
    entity.culture,
    entity.entityType,
    ...entity.categories,
    ...(entity.domains || []),
    ...(entity.symbols || []),
    ...parents,
    ...partners,
    ...children
  ]
    .filter(Boolean)
    .join(" ");
}

export function searchMythologicalEntities(query: string, mythology?: MythologyId) {
  const normalized = normalizar(query);
  if (!normalized) return [];
  return mythologicalEntities.filter((entity) => {
    if (mythology && entity.mythology !== mythology) return false;
    return normalizar(entityText(entity)).includes(normalized);
  });
}

export const treeFamilyPresets = [
  {
    id: "cronos-reia",
    label: "Família de Cronos",
    mythology: "grega" as const,
    focusId: "cronos",
    partnerId: "reia",
    mode: "family" as const,
    depth: "1" as const
  },
  {
    id: "zeus",
    label: "Família de Zeus",
    mythology: "grega" as const,
    focusId: "zeus",
    mode: "near-family" as const,
    depth: "1" as const
  },
  {
    id: "poseidon",
    label: "Família de Poseidon",
    mythology: "grega" as const,
    focusId: "poseidon",
    mode: "family" as const,
    depth: "1" as const
  },
  {
    id: "hades",
    label: "Família de Hades",
    mythology: "grega" as const,
    focusId: "hades",
    partnerId: "persefone",
    mode: "family" as const,
    depth: "1" as const
  },
  {
    id: "zeus-leto",
    label: "Zeus e Leto",
    mythology: "grega" as const,
    focusId: "zeus",
    partnerId: "leto",
    mode: "family" as const,
    depth: "1" as const
  },
  {
    id: "zeus-alcmena",
    label: "Zeus e Alcmena",
    mythology: "grega" as const,
    focusId: "zeus",
    partnerId: "alcmena",
    mode: "family" as const,
    depth: "1" as const
  },
  {
    id: "heracles",
    label: "Família de Héracles",
    mythology: "grega" as const,
    focusId: "heracles",
    mode: "near-family" as const,
    depth: "2" as const
  },
  {
    id: "perseu",
    label: "Linhagem de Perseu",
    mythology: "grega" as const,
    focusId: "perseu",
    mode: "ancestors" as const,
    depth: "2" as const
  },
  {
    id: "aquiles",
    label: "Linhagem de Aquiles",
    mythology: "grega" as const,
    focusId: "aquiles",
    mode: "family" as const,
    depth: "1" as const
  },
  {
    id: "venus-anquises",
    label: "Vênus e Anquises",
    mythology: "romana" as const,
    focusId: "venus",
    partnerId: "anquises-romano",
    mode: "family" as const,
    depth: "1" as const
  },
  {
    id: "fundacao-roma",
    label: "Fundação de Roma",
    mythology: "romana" as const,
    focusId: "romulo",
    mode: "ancestors" as const,
    depth: "all" as const
  },
  {
    id: "marte-reia-silvia",
    label: "Marte e Reia Sílvia",
    mythology: "romana" as const,
    focusId: "marte",
    partnerId: "reia-silvia",
    mode: "family" as const,
    depth: "1" as const
  }
];

function defaultFocusForMythology(mythology: MythologyId) {
  return mythology === "romana" ? "romulo" : "cronos";
}

function defaultPartnerForFocus(focusId: string) {
  const preset = treeFamilyPresets.find((item) => item.focusId === focusId && item.partnerId);
  return preset?.partnerId;
}

function resolveFocusId(filters: MythologyTreeFilters) {
  const explicit = filters.focusId ? mythologicalEntityMap.get(filters.focusId) : undefined;
  if (explicit && (explicit.mythology === filters.mythology || filters.mode === "correspondences")) return explicit.id;
  return defaultFocusForMythology(filters.mythology);
}

function depthNumber(depth: MythologyTreeDepth) {
  return depth === "all" ? Number.POSITIVE_INFINITY : Number(depth);
}

function addEntity(
  selected: Set<string>,
  levels: Map<string, number>,
  hints: Map<string, string>,
  entityId: string,
  level: number,
  hint?: string
) {
  const entity = mythologicalEntityMap.get(entityId);
  if (!entity) return;
  selected.add(entityId);
  const current = levels.get(entityId);
  if (current === undefined || Math.abs(level) < Math.abs(current)) levels.set(entityId, level);
  if (hint && !hints.has(entityId)) hints.set(entityId, hint);
}

function getPairChildren(
  parentId: string,
  partnerId: string,
  mythology: MythologyId,
  relations: MythologicalRelation[]
) {
  const firstChildren = new Set(getChildren(parentId, mythology, relations).map((entity) => entity.id));
  return getChildren(partnerId, mythology, relations).filter((entity) => firstChildren.has(entity.id));
}

function collectLineage(
  selected: Set<string>,
  levels: Map<string, number>,
  hints: Map<string, string>,
  startId: string,
  filters: MythologyTreeFilters,
  relations: MythologicalRelation[],
  direction: "ancestors" | "descendants"
) {
  const maxDepth = depthNumber(filters.depth);
  const queue = [{ id: startId, level: 0, distance: 0 }];
  const visited = new Set<string>([startId]);

  while (queue.length) {
    const current = queue.shift()!;
    if (current.distance >= maxDepth) continue;
    const next =
      direction === "ancestors"
        ? getParents(current.id, filters.mythology, relations)
        : getChildren(current.id, filters.mythology, relations);
    next.forEach((entity) => {
      if (visited.has(entity.id)) return;
      visited.add(entity.id);
      const level = direction === "ancestors" ? current.level - 1 : current.level + 1;
      addEntity(selected, levels, hints, entity.id, level, direction === "ancestors" ? "Antepassado" : "Descendente");
      queue.push({ id: entity.id, level, distance: current.distance + 1 });
      if (direction === "descendants") {
        getPartners(entity.id, filters.mythology, relations).forEach((partner) => {
          if (
            getPairChildren(entity.id, partner.id, filters.mythology, relations).some((child) => visited.has(child.id))
          ) {
            addEntity(selected, levels, hints, partner.id, level, "Parceiro");
          }
        });
      }
    });
  }
}

function collectFocusedFamily(filters: MythologyTreeFilters, relations: MythologicalRelation[]) {
  const selected = new Set<string>();
  const levels = new Map<string, number>();
  const hints = new Map<string, string>();
  const focusId = resolveFocusId(filters);
  const focus = mythologicalEntityMap.get(focusId);
  if (!focus) return { selected, levels, hints, focusId };

  const partnerId = filters.partnerId || defaultPartnerForFocus(focusId);
  const partner = partnerId ? mythologicalEntityMap.get(partnerId) : undefined;
  const maxDepth = depthNumber(filters.mode === "near-family" && filters.depth === "1" ? "2" : filters.depth);

  addEntity(selected, levels, hints, focus.id, 0, "Foco");

  if (filters.mode === "ancestors") {
    collectLineage(selected, levels, hints, focus.id, filters, relations, "ancestors");
    return { selected, levels, hints, focusId };
  }

  if (filters.mode === "descendants") {
    collectLineage(selected, levels, hints, focus.id, filters, relations, "descendants");
    return { selected, levels, hints, focusId };
  }

  if (partner?.mythology === filters.mythology) {
    addEntity(selected, levels, hints, partner.id, 0, "Parceiro");
    const children = getPairChildren(focus.id, partner.id, filters.mythology, relations);
    children.forEach((child) => addEntity(selected, levels, hints, child.id, 1, "Filho(a)"));
  } else {
    const partners = getPartners(focus.id, filters.mythology, relations).slice(0, focus.id === "zeus" ? 4 : 8);
    partners.forEach((item) => addEntity(selected, levels, hints, item.id, 0, "Parceiro"));
    getChildren(focus.id, filters.mythology, relations)
      .slice(0, focus.id === "zeus" ? 8 : 16)
      .forEach((child) => addEntity(selected, levels, hints, child.id, 1, "Filho(a)"));
  }

  getParents(focus.id, filters.mythology, relations).forEach((parent) =>
    addEntity(selected, levels, hints, parent.id, -1, "Pai/mãe")
  );
  if (partner?.mythology === filters.mythology) {
    getParents(partner.id, filters.mythology, relations).forEach((parent) =>
      addEntity(selected, levels, hints, parent.id, -1, "Pai/mãe")
    );
  }

  const siblings = getSiblings(focus.id, filters.mythology, relations);
  if (siblings.length <= 8 && !partner) {
    siblings.forEach((sibling) => addEntity(selected, levels, hints, sibling.id, 0, "Irmão/irmã"));
  }

  if (maxDepth >= 2) {
    [...selected].forEach((id) => {
      const level = levels.get(id) || 0;
      if (level === -1) {
        getParents(id, filters.mythology, relations).forEach((parent) =>
          addEntity(selected, levels, hints, parent.id, -2, "Avô/avó")
        );
      }
      if (level === 1) {
        getChildren(id, filters.mythology, relations).forEach((child) =>
          addEntity(selected, levels, hints, child.id, 2, "Neto(a)")
        );
      }
    });
  }

  if (maxDepth >= 3) {
    [...selected].forEach((id) => {
      const level = levels.get(id) || 0;
      if (level === -2) {
        getParents(id, filters.mythology, relations).forEach((parent) =>
          addEntity(selected, levels, hints, parent.id, -3, "Bisavô/bisavó")
        );
      }
      if (level === 2) {
        getChildren(id, filters.mythology, relations).forEach((child) =>
          addEntity(selected, levels, hints, child.id, 3, "Bisneto(a)")
        );
      }
    });
  }

  return { selected, levels, hints, focusId };
}

function collectIdsForMode(filters: MythologyTreeFilters, relations: MythologicalRelation[]) {
  if (filters.mode === "correspondences") {
    const selected = new Set<string>();
    culturalCorrespondences.forEach((relation) => {
      selected.add(relation.sourceId);
      selected.add(relation.targetId);
    });
    return { selected, levels: new Map<string, number>(), hints: new Map<string, string>(), focusId: filters.focusId };
  }

  if (filters.mode === "complete") {
    const selected = new Set<string>();
    const levels = new Map<string, number>();
    const hints = new Map<string, string>();
    mythologicalEntities
      .filter((entity) => entity.mythology === filters.mythology)
      .forEach((entity) => {
        selected.add(entity.id);
        levels.set(entity.id, generationFor(entity));
      });
    return { selected, levels, hints, focusId: resolveFocusId(filters) };
  }

  if (filters.mode === "demigods" || filters.mode === "heroes") {
    const selected = new Set<string>();
    const levels = new Map<string, number>();
    const hints = new Map<string, string>();
    mythologicalEntities
      .filter((entity) => {
        if (entity.mythology !== filters.mythology) return false;
        if (filters.mode === "demigods") return entity.entityType === "demigod";
        return entity.entityType === "hero" || entity.entityType === "demigod";
      })
      .forEach((entity) => {
        addEntity(selected, levels, hints, entity.id, 1, filters.mode === "demigods" ? "Semideus" : "Herói");
        getParents(entity.id, filters.mythology, relations).forEach((parent) =>
          addEntity(selected, levels, hints, parent.id, 0, "Pai/mãe")
        );
      });
    return { selected, levels, hints, focusId: resolveFocusId(filters) };
  }

  return collectFocusedFamily(filters, relations);
}

export function filterMythologyTreeEntities(
  filters: MythologyTreeFilters,
  state: { favorites?: Set<string>; studied?: Set<string> } = {}
) {
  const query = normalizar(filters.query || "");
  const allowedRelations = allMythologicalRelations.filter((relation) => relationAllowed(relation, filters));
  const { selected: modeIds } = collectIdsForMode(filters, allowedRelations);

  return mythologicalEntities.filter((entity) => {
    if (!modeIds.has(entity.id)) return false;
    if (filters.mode !== "correspondences" && entity.mythology !== filters.mythology) return false;
    if (filters.entityType && filters.entityType !== "todos" && entity.entityType !== filters.entityType) return false;
    if (filters.category && filters.category !== "todas" && !entity.categories.includes(filters.category)) return false;
    if (filters.onlyWithPages && !entity.hasDedicatedPage) return false;
    if (filters.onlyFavorites && !state.favorites?.has(entity.id)) return false;
    if (filters.onlyStudied && !state.studied?.has(entity.id)) return false;
    if (query && !normalizar(entityText(entity)).includes(query)) return false;
    return true;
  });
}

function generationFor(entity: MythologicalEntity) {
  if (entity.entityType === "primordial") return 0;
  if (entity.entityType === "titan" || entity.categories.includes("titan")) return 1;
  if (
    entity.categories.includes("olympian") ||
    entity.entityType === "deity" ||
    entity.entityType === "personification"
  ) {
    return 2;
  }
  if (entity.entityType === "mortal") return 3;
  if (entity.entityType === "demigod" || entity.entityType === "hero") return 4;
  if (entity.entityType === "creature") return 5;
  return 3;
}

function generationLabel(level: number, entity: MythologicalEntity) {
  if (entity.entityType === "primordial") return "Primordiais";
  if (entity.entityType === "titan" || entity.categories.includes("titan")) return "Titãs";
  if (level <= -2) return "Antepassados";
  if (level === -1) return "Pais";
  if (level === 0) return "Família central";
  if (level === 1) return "Filhos";
  if (entity.entityType === "demigod" || entity.entityType === "hero") return "Semideuses e heróis";
  return "Descendentes";
}

function orderScore(entity: MythologicalEntity, focusId?: string, partnerId?: string) {
  if (entity.id === focusId) return -2;
  if (entity.id === partnerId) return -1;
  return 0;
}

function layoutEntityNodes(
  entities: MythologicalEntity[],
  levels: Map<string, number>,
  hints: Map<string, string>,
  focusId?: string,
  partnerId?: string
) {
  const rows = new Map<number, MythologicalEntity[]>();
  entities.forEach((entity) => {
    const level = levels.get(entity.id) ?? generationFor(entity);
    rows.set(level, [...(rows.get(level) || []), entity]);
  });

  const nodes: MythologyTreeNodeView[] = [];
  const orderedRows = [...rows.entries()].sort(([a], [b]) => a - b);
  const minLevel = orderedRows[0]?.[0] ?? 0;

  orderedRows
    .sort(([a], [b]) => a - b)
    .forEach(([level, items]) => {
      const sorted = [...items].sort((a, b) => {
        const score = orderScore(a, focusId, partnerId) - orderScore(b, focusId, partnerId);
        return score || a.name.localeCompare(b.name);
      });
      const rowWidth = (sorted.length - 1) * TREE_HORIZONTAL_GAP + TREE_NODE_WIDTH;
      const startX = -rowWidth / 2;
      sorted.forEach((entity, index) => {
        nodes.push({
          id: entity.id,
          kind: "entity",
          entity,
          x: startX + index * TREE_HORIZONTAL_GAP,
          y: (level - minLevel) * TREE_VERTICAL_GAP,
          highlighted: entity.id === focusId,
          relationHint: hints.get(entity.id),
          generationLabel: generationLabel(level, entity)
        });
      });
    });
  return nodes;
}

function syntheticRelation(
  id: string,
  sourceId: string,
  targetId: string,
  type: MythologicalRelation["type"],
  mythology: MythologyId,
  options: Partial<MythologicalRelation> = {}
): MythologicalRelation {
  return {
    id,
    sourceId,
    targetId,
    type,
    mythology,
    ...options
  };
}

function primaryParentsForChild(
  childId: string,
  nodeIds: Set<string>,
  filters: MythologyTreeFilters,
  relations: MythologicalRelation[]
) {
  const parentRelations = relations.filter(
    (relation) =>
      relation.targetId === childId &&
      parentTypes.has(relation.type) &&
      relation.mythology === filters.mythology &&
      nodeIds.has(relation.sourceId)
  );
  const primary = parentRelations.filter((relation) => !relation.alternative && !relation.disputed);
  const picked = (primary.length >= 2 ? primary : parentRelations).slice(0, 2);
  return {
    parents: picked.map((relation) => relation.sourceId),
    extra: parentRelations.filter((relation) => !picked.some((item) => item.id === relation.id))
  };
}

function buildUnionNodesAndEdges(
  entityNodes: MythologyTreeNodeView[],
  filters: MythologyTreeFilters,
  relations: MythologicalRelation[]
) {
  const entityNodeIds = new Set(entityNodes.filter((node) => node.kind === "entity").map((node) => node.id));
  const nodeById = new Map(entityNodes.map((node) => [node.id, node]));
  const unionMap = new Map<string, FamilyUnion>();
  const edges: MythologyTreeEdgeView[] = [];

  entityNodeIds.forEach((childId) => {
    const { parents, extra } = primaryParentsForChild(childId, entityNodeIds, filters, relations);
    if (parents.length >= 2) {
      const parentKey = [...parents].sort().join("__");
      const unionId = `union:${parentKey}`;
      const isNewUnion = !unionMap.has(unionId);
      const union = unionMap.get(unionId) || {
        id: unionId,
        partnerIds: parents,
        childIds: [],
        mythology: filters.mythology,
        label: "união"
      };
      if (!union.childIds.includes(childId)) union.childIds.push(childId);
      unionMap.set(unionId, union);

      if (isNewUnion) {
        edges.push({
          id: `edge:${parents[0]}:${parents[1]}:partner-line`,
          source: parents[0],
          target: parents[1],
          relation: syntheticRelation(
            `rel:${parents[0]}:${parents[1]}:partner-line`,
            parents[0],
            parents[1],
            "partner",
            filters.mythology,
            {
              label: "união"
            }
          )
        });
      }

      if (isNewUnion) {
        parents.forEach((parentId) => {
          edges.push({
            id: `edge:${parentId}:${unionId}`,
            source: parentId,
            target: unionId,
            relation: syntheticRelation(`rel:${parentId}:${unionId}`, parentId, unionId, "partner", filters.mythology, {
              label: "união"
            })
          });
        });
      }
      edges.push({
        id: `edge:${unionId}:${childId}`,
        source: unionId,
        target: childId,
        relation: syntheticRelation(`rel:${unionId}:${childId}`, unionId, childId, "parent", filters.mythology, {
          label: "descendência"
        })
      });
    } else if (parents.length === 1) {
      edges.push({
        id: `edge:${parents[0]}:${childId}`,
        source: parents[0],
        target: childId,
        relation: syntheticRelation(`rel:${parents[0]}:${childId}`, parents[0], childId, "parent", filters.mythology, {
          label: "descendência"
        })
      });
    }

    extra.forEach((relation) => {
      edges.push({
        id: relation.id,
        source: relation.sourceId,
        target: relation.targetId,
        relation
      });
    });
  });

  relations
    .filter(
      (relation) =>
        partnerTypes.has(relation.type) &&
        nodeById.has(relation.sourceId) &&
        nodeById.has(relation.targetId) &&
        ![...unionMap.values()].some(
          (union) => union.partnerIds.includes(relation.sourceId) && union.partnerIds.includes(relation.targetId)
        )
    )
    .forEach((relation) =>
      edges.push({
        id: relation.id,
        source: relation.sourceId,
        target: relation.targetId,
        relation
      })
    );

  relations
    .filter(
      (relation) =>
        !parentTypes.has(relation.type) &&
        !partnerTypes.has(relation.type) &&
        nodeById.has(relation.sourceId) &&
        nodeById.has(relation.targetId)
    )
    .forEach((relation) =>
      edges.push({
        id: relation.id,
        source: relation.sourceId,
        target: relation.targetId,
        relation
      })
    );

  const unionNodes: MythologyTreeNodeView[] = [...unionMap.values()].map((union) => {
    const partners = union.partnerIds.map((id) => nodeById.get(id)).filter(Boolean) as MythologyTreeNodeView[];
    const children = union.childIds.map((id) => nodeById.get(id)).filter(Boolean) as MythologyTreeNodeView[];
    const xValues = [...partners, ...children].map((node) => node.x);
    const partnerY = partners[0]?.y ?? 0;
    const childY = children[0]?.y ?? partnerY + TREE_VERTICAL_GAP;
    return {
      id: union.id,
      kind: "union",
      union,
      x: xValues.length ? xValues.reduce((sum, value) => sum + value, 0) / xValues.length : 0,
      y: partnerY + (childY - partnerY) / 2,
      hidden: true
    };
  });

  return { unionNodes, edges };
}

export function buildMythologyTreeGraph(
  filters: MythologyTreeFilters,
  state: { favorites?: Set<string>; studied?: Set<string> } = {}
) {
  const allowedRelations = allMythologicalRelations.filter((relation) => relationAllowed(relation, filters));
  const { levels, hints, focusId } = collectIdsForMode(filters, allowedRelations);
  const entities = filterMythologyTreeEntities(filters, state);
  const entityNodes = layoutEntityNodes(entities, levels, hints, focusId, filters.partnerId);
  const { unionNodes, edges } =
    filters.mode === "correspondences"
      ? {
          unionNodes: [],
          edges: culturalCorrespondences
            .filter((relation) => entityNodes.some((node) => node.id === relation.sourceId))
            .filter((relation) => entityNodes.some((node) => node.id === relation.targetId))
            .map((relation) => ({ id: relation.id, source: relation.sourceId, target: relation.targetId, relation }))
        }
      : buildUnionNodesAndEdges(entityNodes, filters, allowedRelations);

  return {
    nodes: [...entityNodes, ...unionNodes],
    edges,
    focusId,
    isComplete: filters.mode === "complete"
  };
}

export function getTextualFamilySummary(entityId: string) {
  const entity = mythologicalEntityMap.get(entityId);
  if (!entity) return [];
  const mythology = entity.mythology;
  const parents = getParents(entityId, mythology).map((item) => item.name);
  const siblings = getSiblings(entityId, mythology).map((item) => item.name);
  const partners = getPartners(entityId, mythology).map((item) => item.name);
  const children = getChildren(entityId, mythology).map((item) => item.name);
  return [
    { label: "Pais", values: parents },
    { label: "Irmãos", values: siblings },
    { label: "Parceiros", values: partners },
    { label: "Filhos exibidos", values: children }
  ].filter((item) => item.values.length);
}

export function progressByEntityType(studied: Set<string>, mythology: MythologyId) {
  const groups = new Map<MythologicalEntityType, { total: number; done: number }>();
  mythologicalEntities
    .filter((entity) => entity.mythology === mythology)
    .forEach((entity) => {
      const current = groups.get(entity.entityType) || { total: 0, done: 0 };
      current.total += 1;
      current.done += studied.has(entity.id) ? 1 : 0;
      groups.set(entity.entityType, current);
    });
  return [...groups.entries()].map(([type, values]) => ({
    type,
    label: entityTypeLabels[type],
    total: values.total,
    done: values.done,
    percent: values.total ? Math.round((values.done / values.total) * 100) : 0
  }));
}

export function traditionsForMythology(mythology: MythologyId) {
  return mythologicalTraditions.filter((tradition) => tradition.mythology === mythology);
}

export function mythologyTreeReviewItems() {
  const questions = [
    [
      "tree-parents-zeus",
      "Mitologia Grega",
      "Segundo a tradição apresentada nesta plataforma, quem eram os pais de Zeus?",
      "Cronos e Reia."
    ],
    [
      "tree-cronos-children",
      "Mitologia Grega",
      "Quais deuses eram filhos de Cronos e Reia nesta visualização?",
      "Héstia, Deméter, Hera, Hades, Poseidon e Zeus."
    ],
    [
      "tree-heracles",
      "Mitologia Grega",
      "Quem eram os pais de Héracles nesta tradição?",
      "Zeus e Alcmena, com Anfitrião como pai humano/social em algumas leituras."
    ],
    [
      "tree-achilles",
      "Mitologia Grega",
      "Qual divindade era mãe de Aquiles?",
      "Tétis, a nereida, distinta da Titânide Tétis."
    ],
    ["tree-perseus", "Mitologia Grega", "Quem eram os pais de Perseu?", "Zeus e Dânae, segundo tradição recorrente."],
    ["tree-apollo-artemis", "Mitologia Grega", "Quem eram os pais de Apolo e Ártemis?", "Zeus e Leto."],
    [
      "tree-venus-aeneas",
      "Mitologia Romana",
      "Qual era a relação entre Vênus e Eneias?",
      "Vênus era apresentada como mãe de Eneias na tradição romana da Eneida."
    ],
    [
      "tree-mars-romulus",
      "Mitologia Romana",
      "Qual era a relação entre Marte e Rômulo?",
      "Marte era apresentado como pai de Rômulo e Remo na tradição fundadora romana."
    ],
    [
      "tree-heracles-type",
      "Mitologia Grega",
      "Héracles era deus, mortal, herói ou semideus nesta classificação?",
      "Semideus e herói."
    ],
    [
      "tree-odysseus-type",
      "Mitologia Grega",
      "Odisseu era filho direto de uma divindade nesta visualização?",
      "Não. Ele é classificado como herói, não como semideus."
    ],
    [
      "tree-zeus-jupiter",
      "Mitologia Comparada",
      "Qual é a correspondência romana aproximada de Zeus?",
      "Júpiter, como correspondência cultural aproximada, não identidade absoluta."
    ]
  ] as const;

  return questions.map(([id, tema, pergunta, resposta]) => ({
    id,
    tipo: "Pergunta" as const,
    tema,
    pergunta,
    resposta
  }));
}
