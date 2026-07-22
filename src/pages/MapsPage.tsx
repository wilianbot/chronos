import { mapas } from "../data/generated";
import { useTimelineFilters } from "../hooks/useTimelineFilters";
import { useAppContext } from "../hooks/useAppContext";
import { HistoryMap } from "../components/maps/HistoryMap";
import { imagensMapasHistoricos } from "../services/historyCatalog";
import { MapPinned } from "lucide-react";

export function MapsPage() {
  const { eventoAberto, abrirEvento } = useAppContext();
  const { eventosFiltrados } = useTimelineFilters();

  return (
    <>
      <section className="section map-section route-section">
        <div className="section-title">
          <span className="eyebrow">Geografia histórica</span>
          <h2>Mapa real dos acontecimentos</h2>
          <p>Marcadores aproximados sobre OpenStreetMap.</p>
        </div>
        <HistoryMap eventos={eventosFiltrados} eventoAtivo={eventoAberto} onSelecionar={abrirEvento} />
      </section>
      <section className="section map-cards">
        <div className="section-title">
          <span className="eyebrow">Mapas e expansões</span>
          <h2>Mapas históricos de referência</h2>
        </div>
        <div className="simple-map-grid">
          {mapas.map((mapa, index) => (
            <article className="mini-card map-reference-card" key={mapa.titulo}>
              <div className="map-reference-head">
                <MapPinned size={26} />
                <span>Referência cartográfica</span>
              </div>
              <h3>{mapa.titulo}</h3>
              <p>{mapa.descricao}</p>
              <small>Foco: {mapa.foco}</small>
              {imagensMapasHistoricos[index] && (
                <a className="map-source-link" href={imagensMapasHistoricos[index]} target="_blank" rel="noreferrer">
                  Abrir mapa de referência
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
