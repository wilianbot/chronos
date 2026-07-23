import { describe, expect, it } from "vitest";
import { allDeities, filterDeities, getDeityById, getEquivalentDeities, progressByMythology } from "./mythologyService";

describe("mythologyService", () => {
  it("filtra divindades gregas", () => {
    const result = filterDeities({ mythology: "grega" });

    expect(result.length).toBe(28);
    expect(result.every((deity) => deity.mythology === "grega")).toBe(true);
  });

  it("filtra divindades romanas", () => {
    const result = filterDeities({ mythology: "romana" });

    expect(result.length).toBe(26);
    expect(result.every((deity) => deity.mythology === "romana")).toBe(true);
  });

  it("combina mitologia, categoria e domínio", () => {
    const result = filterDeities({ mythology: "grega", category: "olimpico", domain: "guerra" });

    expect(result.map((deity) => deity.id)).toContain("ares");
    expect(result.every((deity) => deity.mythology === "grega")).toBe(true);
  });

  it("pesquisa por nome e domínio", () => {
    expect(filterDeities({ query: "Atena" }).map((deity) => deity.id)).toContain("atena");
    expect(filterDeities({ query: "duas faces" }).map((deity) => deity.id)).toContain("jano");
  });

  it("resolve correspondências como aproximações culturais", () => {
    const zeus = getDeityById("zeus");

    expect(zeus).toBeTruthy();
    expect(getEquivalentDeities(zeus!).map((deity) => deity.id)).toEqual(["jupiter"]);
  });

  it("calcula progresso por mitologia usando os ids existentes", () => {
    const progress = progressByMythology(new Set(["zeus", "jupiter", "juno"]));

    expect(progress.find((item) => item.mythology.id === "grega")).toMatchObject({ total: 28, done: 1 });
    expect(progress.find((item) => item.mythology.id === "romana")).toMatchObject({ total: 26, done: 2 });
  });

  it("mantém ids únicos para rotas individuais", () => {
    expect(new Set(allDeities.map((deity) => deity.id)).size).toBe(allDeities.length);
    expect(getDeityById("deus-inexistente")).toBeUndefined();
  });
});
