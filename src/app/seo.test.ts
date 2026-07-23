import { describe, expect, it } from "vitest";
import { getSeoForPath, seoRoutes } from "./seo";

describe("SEO routes", () => {
  it("inclui paginas institucionais de publicacao", () => {
    expect(seoRoutes.map((route) => route.path)).toEqual(
      expect.arrayContaining(["/sobre", "/privacidade", "/termos", "/contato"])
    );
  });

  it("usa metadata generica para rotas dinamicas de deuses", () => {
    const seo = getSeoForPath("/deuses/zeus");

    expect(seo.title).toContain("Divindade");
    expect(seo.description).toContain("Página individual");
  });
});
