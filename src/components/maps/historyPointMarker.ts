import type L from "leaflet";

export const HISTORY_POINT_RADIUS = 7;

export function createHistoryPointOptions(fillColor: string, renderer?: L.Renderer): L.CircleMarkerOptions {
  return {
    radius: HISTORY_POINT_RADIUS,
    color: "#f5e7bf",
    weight: 1.5,
    fillColor,
    fillOpacity: 0.92,
    renderer
  };
}
