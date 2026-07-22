import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { obterLocalEvento } from "../../data/geo";
import { categoriaCores } from "../../services/historyCatalog";
import { normalizar } from "../../lib/history";
import type { Acontecimento } from "../../types";

const tileProviders = [
  {
    id: "esri-street",
    nome: "Esri World Street Map",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    options: {
      attribution: "Tiles &copy; Esri, Garmin, FAO, NOAA, USGS, OpenStreetMap contributors and the GIS User Community",
      maxZoom: 19
    }
  },
  {
    id: "esri-topo",
    nome: "Esri Topographic",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    options: {
      attribution: "Tiles &copy; Esri, USGS, NOAA, OpenStreetMap contributors and the GIS User Community",
      maxZoom: 19
    }
  },
  {
    id: "esri-imagery",
    nome: "Esri World Imagery",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    options: {
      attribution: "Tiles &copy; Esri, Maxar, Earthstar Geographics and the GIS User Community",
      maxZoom: 19
    }
  },
  {
    id: "osm",
    nome: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }
  },
  {
    id: "carto",
    nome: "CARTO Voyager",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    options: {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
      subdomains: "abcd"
    }
  }
];

export function HistoryMap({
  eventos,
  eventoAtivo,
  onSelecionar
}: {
  eventos: Acontecimento[];
  eventoAtivo: Acontecimento | null;
  onSelecionar: (evento: Acontecimento) => void;
}) {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [tileProviderIndex, setTileProviderIndex] = useState(0);
  const [tileError, setTileError] = useState(false);
  const [remoteVisible, setRemoteVisible] = useState(false);

  useEffect(() => {
    if (!mapElement.current || mapRef.current) return;

    const map = L.map(mapElement.current, {
      worldCopyJump: true,
      zoomControl: true,
      minZoom: 2
    }).setView([34, 18], 3);

    const layer = L.layerGroup().addTo(map);
    mapRef.current = map;
    layerRef.current = layer;
    setMapReady(true);
    window.setTimeout(() => map.invalidateSize(), 120);

    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map) return;

    const provider = tileProviders[tileProviderIndex];
    let errors = 0;
    let loaded = false;
    let switched = false;

    setRemoteVisible(false);
    setTileError(false);

    const tiles = L.tileLayer(provider.url, provider.options)
      .on("tileload", () => {
        loaded = true;
        setRemoteVisible(true);
        setTileError(false);
      })
      .on("tileerror", () => {
        errors += 1;
        if (errors < 4 || loaded || switched) return;

        switched = true;
        if (tileProviderIndex < tileProviders.length - 1) {
          setTileProviderIndex((index) => index + 1);
          return;
        }

        setTileError(true);
        setRemoteVisible(false);
      })
      .addTo(map);

    window.setTimeout(() => map.invalidateSize(), 120);

    return () => {
      tiles.off();
      tiles.removeFrom(map);
    };
  }, [mapReady, tileProviderIndex]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    layer.clearLayers();
    eventos.forEach((evento) => {
      const local = obterLocalEvento(evento);
      const cor = categoriaCores[normalizar(evento.categoria)] || "#b78d3b";
      L.circleMarker([local.lat, local.lng], {
        radius: 7,
        color: "#f5e7bf",
        weight: 1.5,
        fillColor: cor,
        fillOpacity: 0.92
      })
        .bindPopup(`<strong>${evento.ano}</strong><br />${evento.titulo}<br /><small>${local.nome}</small>`)
        .on("click", () => onSelecionar(evento))
        .addTo(layer);
    });
  }, [eventos, onSelecionar]);

  useEffect(() => {
    if (!eventoAtivo || !mapRef.current) return;
    const local = obterLocalEvento(eventoAtivo);
    mapRef.current.flyTo([local.lat, local.lng], Math.max(mapRef.current.getZoom(), 5), { duration: 0.8 });
  }, [eventoAtivo]);

  return (
    <div className="map-shell">
      <div className="map-visual">
        {!remoteVisible && <FallbackWorldMap />}
        <div
          ref={mapElement}
          className={`leaflet-map ${!remoteVisible ? "leaflet-map-fallback" : ""}`}
          aria-label="Mapa interativo dos acontecimentos"
        />
        {tileError && (
          <p className="map-tile-warning" role="status">
            A rede bloqueou os provedores remotos testados. Mantive a base local simplificada com marcadores
            aproximados.
          </p>
        )}
      </div>
      <div className="map-side">
        <strong>{eventos.length} marcadores</strong>
        <p>Use zoom, arraste o mapa e clique nos pontos para abrir detalhes do acontecimento.</p>
        <label className="map-provider-select">
          <span>Mapa base</span>
          <select
            value={tileProviderIndex}
            onChange={(event) => {
              setTileProviderIndex(Number(event.target.value));
              setTileError(false);
            }}
          >
            {tileProviders.map((provider, index) => (
              <option key={provider.id} value={index}>
                {provider.nome}
              </option>
            ))}
          </select>
        </label>
        <div className="legend">
          {Object.entries(categoriaCores)
            .slice(0, 10)
            .map(([nome, cor]) => (
              <span key={nome}>
                <i style={{ background: cor }} />
                {nome}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

function FallbackWorldMap() {
  return (
    <svg
      className="fallback-world-map"
      viewBox="0 0 1000 620"
      role="img"
      aria-label="Mapa base local simplificado da Europa, norte da África e oeste da Ásia"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="fallbackSea" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#9fc2d1" />
          <stop offset="100%" stopColor="#5f8ea8" />
        </linearGradient>
        <filter id="fallbackShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#244152" floodOpacity="0.25" />
        </filter>
      </defs>
      <rect width="1000" height="620" fill="url(#fallbackSea)" />
      <path
        d="M32 205 C105 160 173 150 240 166 C309 183 339 145 412 139 C505 131 583 177 641 233 C610 270 548 274 502 254 C452 232 426 252 381 292 C326 342 236 337 189 301 C144 268 82 271 32 205Z"
        className="fallback-land"
      />
      <path
        d="M566 224 C655 194 759 205 881 261 C961 300 974 364 913 392 C838 425 748 387 684 407 C618 426 551 398 527 349 C507 309 528 254 566 224Z"
        className="fallback-land"
      />
      <path
        d="M390 337 C457 305 541 313 609 352 C687 396 746 473 724 555 C660 591 555 594 470 566 C383 537 330 468 351 404 C358 379 372 355 390 337Z"
        className="fallback-land"
      />
      <path
        d="M298 247 C321 255 343 266 366 287 C337 303 304 295 281 273 C260 253 268 238 298 247Z"
        className="fallback-island"
      />
      <path
        d="M442 257 C466 246 492 253 505 273 C483 291 449 288 430 271 C424 265 430 259 442 257Z"
        className="fallback-island"
      />
      <path d="M302 214 C356 196 421 196 488 213" className="fallback-route" />
      <path d="M453 282 C515 291 583 302 648 336" className="fallback-route" />
      <path d="M594 250 C661 237 729 250 792 285" className="fallback-route" />
      <text x="235" y="220">
        Europa
      </text>
      <text x="460" y="410">
        África
      </text>
      <text x="720" y="282">
        Ásia
      </text>
      <text x="420" y="308">
        Mediterrâneo
      </text>
      <text x="575" y="332">
        Oriente Médio
      </text>
    </svg>
  );
}
