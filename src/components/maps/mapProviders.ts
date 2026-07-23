import type L from "leaflet";

export type MapProvider = {
  id: string;
  name: string;
  url: string;
  attribution: string;
  maxZoom?: number;
  subdomains?: string;
  requiresApiKey?: boolean;
};

type ViteImportMeta = ImportMeta & {
  env?: {
    VITE_MAP_API_KEY?: string;
  };
};

export const tileProviders: MapProvider[] = [
  {
    id: "osm",
    name: "OpenStreetMap",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  },
  {
    id: "esri-street",
    name: "Esri World Street Map",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri, Garmin, FAO, NOAA, USGS, OpenStreetMap contributors and the GIS User Community",
    maxZoom: 19
  },
  {
    id: "esri-topo",
    name: "Esri Topographic",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri, USGS, NOAA, OpenStreetMap contributors and the GIS User Community",
    maxZoom: 19
  },
  {
    id: "esri-imagery",
    name: "Esri World Imagery",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri, Maxar, Earthstar Geographics and the GIS User Community",
    maxZoom: 19
  },
  {
    id: "carto",
    name: "CARTO Voyager",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
    subdomains: "abcd"
  }
];

function mapApiKey() {
  return (import.meta as ViteImportMeta).env?.VITE_MAP_API_KEY;
}

export function getAvailableMapProviders(apiKey = mapApiKey()) {
  return tileProviders.filter((provider) => !provider.requiresApiKey || apiKey);
}

export function tileLayerOptions(provider: MapProvider): L.TileLayerOptions {
  const options: L.TileLayerOptions = {
    attribution: provider.attribution,
    maxZoom: provider.maxZoom || 19
  };
  if (provider.subdomains) options.subdomains = provider.subdomains;
  return options;
}
