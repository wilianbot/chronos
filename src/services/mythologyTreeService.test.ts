import { describe, expect, it } from "vitest";
import {
  buildMythologyTreeGraph,
  defaultTreeFilters,
  filterMythologyTreeEntities,
  getAncestors,
  getChildren,
  getDescendants,
  getEntityRoute,
  getMythologicalEntity,
  getParents,
  getPartners,
  getSiblings,
  getTreeUrl,
  progressByEntityType,
  searchMythologicalEntities
} from "./mythologyTreeService";
import type { MythologyTreeFilters, MythologyTreeNodeView } from "../types/mythologyTree";

const baseFilters: MythologyTreeFilters = {
  mythology: "grega",
  mode: "family",
  depth: "1",
  entityType: "todos",
  category: "todas",
  tradition: "todas",
  includeAlternative: true,
  includeCorrespondences: false,
  includeNarrative: false
};

function entityNode(nodes: MythologyTreeNodeView[], id: string) {
  const node = nodes.find((item) => item.id === id);
  if (!node || node.kind !== "entity") throw new Error(`Nó de entidade não encontrado: ${id}`);
  return node;
}

function ids(nodes: MythologyTreeNodeView[]) {
  return nodes.filter((node) => node.kind === "entity").map((node) => node.id);
}

describe("mythologyTreeService", () => {
  it("obtém pais, filhos, irmãos e parceiros sem duplicar relações inversas", () => {
    expect(getParents("zeus", "grega").map((entity) => entity.id)).toEqual(["cronos", "reia"]);
    expect(getChildren("cronos", "grega").map((entity) => entity.id)).toContain("zeus");
    expect(getSiblings("zeus", "grega").map((entity) => entity.id)).toContain("hera");
    expect(getPartners("zeus", "grega").map((entity) => entity.id)).toContain("hera");
  });

  it("calcula antepassados e descendentes com limite de profundidade e sem ciclo infinito", () => {
    expect(getAncestors("heracles", { mythology: "grega", depth: "1" }).map((entity) => entity.id)).toEqual(
      expect.arrayContaining(["zeus", "alcmena", "anfitriao"])
    );
    expect(getAncestors("heracles", { mythology: "grega", depth: "2" }).map((entity) => entity.id)).toContain("cronos");
    expect(getDescendants("cronos", { mythology: "grega", depth: "1" }).map((entity) => entity.id)).toContain("zeus");
    expect(getDescendants("cronos", { mythology: "grega", depth: "3" }).length).toBeGreaterThan(6);
  });

  it("mantém genealogias gregas e romanas separadas", () => {
    const greekGraph = buildMythologyTreeGraph({
      ...baseFilters,
      mythology: "grega",
      mode: "focused",
      focusId: "zeus",
      depth: "2"
    });
    const romanGraph = buildMythologyTreeGraph({
      ...baseFilters,
      mythology: "romana",
      mode: "focused",
      focusId: "romulo",
      depth: "2"
    });

    expect(greekGraph.nodes.every((node) => node.kind === "union" || node.entity.mythology === "grega")).toBe(true);
    expect(romanGraph.nodes.map((node) => node.id)).toEqual(
      expect.arrayContaining(["romulo", "remo", "marte", "reia-silvia"])
    );
  });

  it("representa correspondência cultural sem parentesco", () => {
    const graph = buildMythologyTreeGraph({
      ...baseFilters,
      mythology: "grega",
      mode: "correspondences",
      depth: "1",
      includeCorrespondences: true
    });

    const zeusJupiter = graph.edges.find((edge) => edge.source === "zeus" && edge.target === "jupiter");
    expect(zeusJupiter?.relation.type).toBe("cultural-correspondence");
    expect(getParents("jupiter", "grega").map((entity) => entity.id)).not.toContain("zeus");
  });

  it("filtra, busca, foca e gera URLs estáveis", () => {
    expect(searchMythologicalEntities("Héracles").map((entity) => entity.id)).toContain("heracles");
    expect(searchMythologicalEntities("trovão", "grega").map((entity) => entity.id)).toContain("zeus");

    const demigods = filterMythologyTreeEntities({
      ...baseFilters,
      mythology: "grega",
      mode: "demigods",
      depth: "2",
      entityType: "demigod"
    });
    expect(demigods.map((entity) => entity.id)).toEqual(expect.arrayContaining(["heracles", "perseu", "aquiles"]));

    const zeus = getMythologicalEntity("zeus")!;
    expect(getTreeUrl(zeus)).toBe("/mitologia/arvore?mitologia=grega&foco=zeus");
    expect(getEntityRoute(getMythologicalEntity("heracles"))).toBe("/mitologia/entidades/heracles");
  });

  it("calcula progresso por tipo preservando ids antigos de estudados", () => {
    const progress = progressByEntityType(new Set(["zeus", "heracles", "odisseu"]), "grega");

    expect(progress.find((item) => item.type === "deity")?.done).toBeGreaterThanOrEqual(1);
    expect(progress.find((item) => item.type === "demigod")?.done).toBeGreaterThanOrEqual(1);
    expect(progress.find((item) => item.type === "hero")?.done).toBeGreaterThanOrEqual(1);
  });

  it("abre por padrão uma família focada, não a base inteira", () => {
    const graph = buildMythologyTreeGraph(defaultTreeFilters);
    const nodeIds = ids(graph.nodes);

    expect(defaultTreeFilters.mode).toBe("family");
    expect(defaultTreeFilters.focusId).toBe("cronos");
    expect(defaultTreeFilters.partnerId).toBe("reia");
    expect(defaultTreeFilters.depth).toBe("all");
    expect(nodeIds).toEqual(
      expect.arrayContaining(["cronos", "reia", "hestia", "demeter", "hera", "hades", "poseidon", "zeus"])
    );
    expect(nodeIds).toEqual(expect.arrayContaining(["apolo-grego", "artemis", "heracles", "persefone"]));
  });

  it("calcula profundidade a partir do foco sem trazer entidades desconectadas", () => {
    const depthOne = buildMythologyTreeGraph({
      ...baseFilters,
      focusId: "cronos",
      partnerId: "reia",
      depth: "1"
    });
    const depthTwo = buildMythologyTreeGraph({
      ...baseFilters,
      focusId: "cronos",
      partnerId: "reia",
      depth: "2"
    });

    expect(ids(depthOne.nodes)).not.toContain("apolo-grego");
    expect(ids(depthTwo.nodes)).toContain("apolo-grego");
    expect(ids(depthOne.nodes)).not.toContain("heracles");
    expect(ids(depthOne.nodes)).not.toContain("jupiter");
  });

  it("posiciona pais acima, parceiros no mesmo nível e filhos abaixo da união", () => {
    const graph = buildMythologyTreeGraph({
      ...baseFilters,
      focusId: "zeus",
      partnerId: "leto",
      depth: "1"
    });
    const zeus = entityNode(graph.nodes, "zeus");
    const leto = entityNode(graph.nodes, "leto");
    const apollo = entityNode(graph.nodes, "apolo-grego");
    const artemis = entityNode(graph.nodes, "artemis");
    const cronos = entityNode(graph.nodes, "cronos");
    const union = graph.nodes.find(
      (node) =>
        node.kind === "union" && node.union.partnerIds.includes("zeus") && node.union.partnerIds.includes("leto")
    );

    expect(cronos.y).toBeLessThan(zeus.y);
    expect(leto.y).toBe(zeus.y);
    expect(apollo.y).toBeGreaterThan(zeus.y);
    expect(artemis.y).toBe(apollo.y);
    expect(union?.kind).toBe("union");
    expect(union?.y).toBeGreaterThan(zeus.y);
    expect(union?.y).toBeLessThan(apollo.y);
    expect(
      graph.edges.some((edge) => edge.source === "zeus" && edge.target === "leto" && edge.relation.type === "partner")
    ).toBe(true);
    expect(graph.edges.some((edge) => edge.source === union?.id && edge.target === "apolo-grego")).toBe(true);
  });

  it("normaliza a família padrão dentro de uma área vertical legível", () => {
    const graph = buildMythologyTreeGraph(defaultTreeFilters);
    const entityNodes = graph.nodes.filter((node) => node.kind === "entity");
    const yValues = entityNodes.map((node) => node.y);

    expect(Math.min(...yValues)).toBe(0);
    expect(Math.max(...yValues)).toBeGreaterThan(260);
    expect(entityNode(graph.nodes, "gaia").y).toBeLessThan(entityNode(graph.nodes, "cronos").y);
    expect(entityNode(graph.nodes, "zeus").y).toBeGreaterThan(entityNode(graph.nodes, "cronos").y);
  });

  it("foca Héracles com pais diretos e sem renderizar toda a genealogia", () => {
    const graph = buildMythologyTreeGraph({
      ...baseFilters,
      focusId: "heracles",
      mode: "near-family",
      depth: "1"
    });

    expect(ids(graph.nodes)).toEqual(expect.arrayContaining(["heracles", "zeus", "alcmena", "anfitriao"]));
    expect(ids(graph.nodes)).not.toContain("romulo");
    expect(ids(graph.nodes).length).toBeLessThan(18);
  });

  it("oculta correspondências culturais e relações narrativas por padrão", () => {
    const graph = buildMythologyTreeGraph({
      ...baseFilters,
      mode: "complete",
      depth: "all",
      includeCorrespondences: false,
      includeNarrative: false
    });

    expect(graph.edges.some((edge) => edge.relation.type === "cultural-correspondence")).toBe(false);
    expect(graph.edges.some((edge) => edge.relation.type === "rival" || edge.relation.type === "companion")).toBe(
      false
    );
  });

  it("inclui relações narrativas somente quando solicitado", () => {
    const graph = buildMythologyTreeGraph({
      ...baseFilters,
      mode: "complete",
      depth: "all",
      includeNarrative: true
    });

    expect(graph.edges.some((edge) => edge.source === "heracles" && edge.target === "hidra-lerna")).toBe(true);
  });

  it("mantém árvore completa como modo explícito separado da família", () => {
    const family = buildMythologyTreeGraph({
      ...baseFilters,
      focusId: "zeus",
      mode: "family",
      depth: "1"
    });
    const complete = buildMythologyTreeGraph({
      ...baseFilters,
      mode: "complete",
      depth: "all"
    });

    expect(family.isComplete).toBe(false);
    expect(complete.isComplete).toBe(true);
    expect(complete.nodes.length).toBeGreaterThan(family.nodes.length);
  });
  it("inclui todos os filhos cadastrados e somente ligacoes com pontas visiveis", () => {
    const graph = buildMythologyTreeGraph({
      ...baseFilters,
      focusId: "zeus",
      mode: "near-family",
      depth: "1"
    });
    const nodeIds = new Set(graph.nodes.map((node) => node.id));
    const children = getChildren("zeus", "grega").map((entity) => entity.id);

    expect(children.length).toBeGreaterThan(8);
    expect(ids(graph.nodes)).toEqual(expect.arrayContaining(children));
    expect(graph.edges.every((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target))).toBe(true);
  });

});
