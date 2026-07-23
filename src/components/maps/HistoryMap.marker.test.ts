import { describe, expect, it } from "vitest";
import L from "leaflet";
import { createHistoryPointOptions, HISTORY_POINT_RADIUS } from "./historyPointMarker";

describe("marcadores do mapa historico", () => {
  it("usa CircleMarker com raio fixo em pixels", () => {
    const options = createHistoryPointOptions("#b78d3b");

    expect(options.radius).toBe(HISTORY_POINT_RADIUS);
    expect(options.radius).toBe(7);
    expect(options.fillOpacity).toBe(0.92);
  });

  it("preserva renderer Canvas para evitar escala visual no zoom", () => {
    const renderer = L.canvas({ padding: 0.5 });
    const options = createHistoryPointOptions("#743242", renderer);

    expect(options.renderer).toBe(renderer);
  });
});
