import { useMemo, useState } from "react";
import { jornadasGuiadas } from "../data/studyTools";
import { eventosPorId } from "../services/historyCatalog";
import type { Acontecimento } from "../types";

export function useGuidedJourneys() {
  const [jornadaAtivaId, setJornadaAtivaId] = useState(jornadasGuiadas[0]?.id || "");
  const [capituloJornada, setCapituloJornada] = useState(0);

  const jornadaAtiva = jornadasGuiadas.find((jornada) => jornada.id === jornadaAtivaId) || jornadasGuiadas[0];
  const eventosDaJornada = useMemo(
    () => jornadaAtiva.eventos.map((id) => eventosPorId.get(id)).filter(Boolean) as Acontecimento[],
    [jornadaAtiva]
  );
  const capituloAtual = eventosDaJornada[Math.min(capituloJornada, Math.max(eventosDaJornada.length - 1, 0))];

  const selecionarJornada = (id: string) => {
    setJornadaAtivaId(id);
    setCapituloJornada(0);
  };

  return {
    jornadasGuiadas,
    jornadaAtiva,
    eventosDaJornada,
    capituloAtual,
    capituloJornada,
    setCapituloJornada,
    selecionarJornada
  };
}
