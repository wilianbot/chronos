import { describe, expect, it } from "vitest";
import { getSeoForPath, seoRoutes } from "./seo";

describe("SEO routes", () => {
  it("inclui paginas institucionais de publicacao", () => {
    expect(seoRoutes.map((route) => route.path)).toEqual(
      expect.arrayContaining(["/sobre", "/privacidade", "/termos", "/contato"])
    );
  });

  it("usa metadata especifica para rotas dinamicas de deuses", () => {
    const seo = getSeoForPath("/deuses/zeus");

    expect(seo.title).toBe("Zeus | Chronos");
    expect(seo.description).toContain("Chronos");
  });

  it("usa metadata especifica para rotas dinamicas de eventos", () => {
    const seo = getSeoForPath("/eventos/maratona");

    expect(seo.title).toBe("Batalha de Maratona | Chronos");
    expect(seo.description).toContain("Chronos");
  });

  it("usa metadata especifica para rotas dinamicas de personagens", () => {
    const seo = getSeoForPath("/personagens/alexandre-o-grande");

    expect(seo.title).toBe("Alexandre, o Grande | Chronos");
    expect(seo.description).toContain("Chronos");
  });
});
