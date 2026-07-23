import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import { obterLocalEvento } from "../../data/geo";
import { categoriaCores } from "../../services/historyCatalog";
import { normalizar } from "../../lib/history";
import type { Acontecimento } from "../../types";
import { createHistoryPointOptions } from "./historyPointMarker";
import { getAvailableMapProviders, tileLayerOptions } from "./mapProviders";

type ViteImportMeta = ImportMeta & {
  env?: {
    DEV?: boolean;
  };
};

function viteEnv() {
  return (import.meta as ViteImportMeta).env || {};
}

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
  const markerRendererRef = useRef<L.Canvas | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [tileProviderIndex, setTileProviderIndex] = useState(0);
  const [failedProviderIds, setFailedProviderIds] = useState<string[]>([]);
  const [tileError, setTileError] = useState(false);
  const availableProviders = useMemo(() => getAvailableMapProviders(), []);

  useEffect(() => {
    if (!mapElement.current || mapRef.current) return;

    const map = L.map(mapElement.current, {
      worldCopyJump: true,
      zoomControl: true,
      minZoom: 2,
      preferCanvas: true
    }).setView([34, 18], 3);

    markerRendererRef.current = L.canvas({ padding: 0.5 });
    const layer = L.layerGroup().addTo(map);
    mapRef.current = map;
    layerRef.current = layer;
    setMapReady(true);

    const updateSize = () => {
      window.requestAnimationFrame(() => {
        map.invalidateSize({ pan: false, debounceMoveend: true });
      });
    };
    updateSize();

    const delayedUpdates = [80, 250, 600, 1200].map((delay) => window.setTimeout(updateSize, delay));
    const observer = new ResizeObserver(updateSize);
    observer.observe(mapElement.current);
    if (mapElement.current.parentElement) observer.observe(mapElement.current.parentElement);
    window.addEventListener("resize", updateSize);
    window.addEventListener("orientationchange", updateSize);
    document.addEventListener("visibilitychange", updateSize);

    return () => {
      observer.disconnect();
      delayedUpdates.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("orientationchange", updateSize);
      document.removeEventListener("visibilitychange", updateSize);
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
      markerRendererRef.current = null;
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map) return;

    const provider = availableProviders[tileProviderIndex] || availableProviders[0];
    if (!provider) return;

    let errors = 0;
    let loaded = false;
    let switched = false;

    setTileError(false);

    const tiles = L.tileLayer(provider.url, tileLayerOptions(provider))
      .on("tileload", () => {
        loaded = true;
        setTileError(false);
      })
      .on("tileerror", () => {
        errors += 1;
        if (errors < 4 || loaded || switched) return;

        switched = true;
        setFailedProviderIds((current) => Array.from(new Set([...current, provider.id])));
        if (viteEnv().DEV) {
          console.warn(`Provedor de mapa falhou: ${provider.name}`);
        }

        if (tileProviderIndex < availableProviders.length - 1) {
          setTileProviderIndex((index) => index + 1);
          return;
        }

        setTileError(true);
      })
      .addTo(map);

    const delayedUpdates = [120, 360, 900].map((delay) =>
      window.setTimeout(() => map.invalidateSize({ pan: false, debounceMoveend: true }), delay)
    );

    return () => {
      delayedUpdates.forEach((timer) => window.clearTimeout(timer));
      tiles.off();
      tiles.removeFrom(map);
    };
  }, [availableProviders, mapReady, tileProviderIndex]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    layer.clearLayers();
    eventos.forEach((evento) => {
      const local = obterLocalEvento(evento);
      const cor = categoriaCores[normalizar(evento.categoria)] || "#b78d3b";
      L.circleMarker([local.lat, local.lng], createHistoryPointOptions(cor, markerRendererRef.current || undefined))
        .bindPopup(`<strong>${evento.ano}</strong><br />${evento.titulo}<br /><small>${local.nome}</small>`)
        .on("click", () => onSelecionar(evento))
        .on("mouseover", (event) => event.target.bringToFront())
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
        {tileError && <FallbackWorldMap />}
        <div ref={mapElement} className="leaflet-map" aria-label="Mapa interativo dos acontecimentos" />
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
            {availableProviders.map((provider, index) => (
              <option key={provider.id} value={index}>
                {provider.name}
              </option>
            ))}
          </select>
        </label>
        {failedProviderIds.length > 0 && (
          <small className="map-provider-status">Falhas tratadas: {failedProviderIds.join(", ")}</small>
        )}
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
