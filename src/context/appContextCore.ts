import { createContext } from "react";
import type { ResultadoRevisao, RevisaoStats, temasOrdenadosPorRevisao } from "../lib/revision";
import type { ItemRevisao, Tema } from "../services/historyCatalog";
import type { Acontecimento } from "../types";

export type AppContextValue = {
  carregando: boolean;
  erroInicial: string;
  tema: Tema;
  setTema: (tema: Tema) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (value: boolean) => void;
  favoritos: Set<string>;
  estudados: Set<string>;
  revisados: Set<string>;
  revisaoStats: RevisaoStats;
  revisao: ItemRevisao;
  mostrarResposta: boolean;
  setMostrarResposta: (value: boolean | ((value: boolean) => boolean)) => void;
  eventoAberto: Acontecimento | null;
  ultimoEventoId: string;
  progressoPorPeriodo: Record<string, { total: number; feitos: number; percentual: number }>;
  percentualGeralRevisao: number;
  temasRevisao: ReturnType<typeof temasOrdenadosPorRevisao>;
  abrirEvento: (evento: Acontecimento) => void;
  fecharEvento: () => void;
  continuarUltimoEvento: () => void;
  alternarFavorito: (id: string) => void;
  alternarEstudado: (id: string) => void;
  compartilhar: (evento: Acontecimento) => Promise<void>;
  copiarResumo: (evento: Acontecimento) => Promise<void>;
  responderRevisao: (resultado: ResultadoRevisao) => void;
  proximaRevisao: () => void;
};

export const AppContext = createContext<AppContextValue | null>(null);
