import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { useTimelineFilters } from "../hooks/useTimelineFilters";
import { TimelineFilters } from "../components/timeline/TimelineFilters";
import { TimelineEventCard } from "../components/timeline/TimelineEventCard";
import { EmptyState } from "../components/common/StateViews";

export function TimelinePage() {
  const [modo, setModo] = useState<"lista" | "linha">("linha");
  const {
    favoritos,
    estudados,
    ultimoEventoId,
    abrirEvento,
    alternarFavorito,
    alternarEstudado,
    continuarUltimoEvento
  } = useAppContext();
  const filtros = useTimelineFilters();

  return (
    <section className="section timeline-layout route-section">
      <TimelineFilters
        busca={filtros.busca}
        setBusca={filtros.setBusca}
        periodo={filtros.periodo}
        setPeriodo={filtros.setPeriodo}
        civilizacao={filtros.civilizacao}
        setCivilizacao={filtros.setCivilizacao}
        categoria={filtros.categoria}
        setCategoria={filtros.setCategoria}
        limparFiltros={filtros.limparFiltros}
        resultados={filtros.eventosFiltrados.length}
        estudados={estudados.size}
        continuarUltimoEvento={continuarUltimoEvento}
        podeContinuar={Boolean(ultimoEventoId)}
      />

      <div className="timeline-content">
        <div className="section-title inline">
          <div>
            <span className="eyebrow">Linha do tempo principal</span>
            <h2>{filtros.eventosFiltrados.length ? "Explore os acontecimentos" : "Nenhum resultado encontrado"}</h2>
          </div>
          <div className="segmented-control" aria-label="Modo da linha do tempo">
            <button className={modo === "linha" ? "active" : ""} onClick={() => setModo("linha")}>
              Linha
            </button>
            <button className={modo === "lista" ? "active" : ""} onClick={() => setModo("lista")}>
              Lista
            </button>
          </div>
        </div>
        {filtros.eventosVisiveis.length ? (
          <>
            <div className={`timeline-list ${modo === "lista" ? "compact-list" : ""}`} aria-live="polite">
              {filtros.eventosVisiveis.map((evento) => (
                <TimelineEventCard
                  key={evento.id}
                  evento={evento}
                  favorito={favoritos.has(evento.id)}
                  estudado={estudados.has(evento.id)}
                  onAbrir={() => abrirEvento(evento)}
                  onFavorito={() => alternarFavorito(evento.id)}
                  onEstudado={() => alternarEstudado(evento.id)}
                />
              ))}
            </div>
            {filtros.quantidade < filtros.eventosFiltrados.length && (
              <button className="button secondary full" onClick={() => filtros.setQuantidade(filtros.quantidade + 24)}>
                Mostrar mais acontecimentos
              </button>
            )}
          </>
        ) : (
          <EmptyState
            title="Nada encontrado"
            text="Ajuste a busca ou limpe os filtros para voltar ao acervo completo."
          />
        )}
      </div>
    </section>
  );
}
