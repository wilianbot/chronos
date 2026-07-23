import { describe, expect, it } from "vitest";
import { getAvailableMapProviders, tileProviders } from "./mapProviders";

describe("provedores do mapa histórico", () => {
  it("usa OpenStreetMap sem chave como primeiro provedor", () => {
    expect(tileProviders[0]).toMatchObject({
      id: "osm",
      url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    });
    expect(tileProviders[0].requiresApiKey).toBeUndefined();
  });

  it("mantém apenas provedores disponíveis e com atribuição", () => {
    const available = getAvailableMapProviders("");

    expect(available.length).toBeGreaterThanOrEqual(2);
    expect(available.map((provider) => provider.id)).toContain("esri-street");
    expect(available.every((provider) => provider.attribution.length > 0)).toBe(true);
  });
});
