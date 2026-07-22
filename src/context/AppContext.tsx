import { useEffect, useMemo, useState, type ReactNode } from "react";
import { acontecimentos, periodosFiltro } from "../data/generated";
import { calcularProgressoPorPeriodo, validarEventosDuplicados } from "../lib/history";
import {
  lerRevisaoStats,
  percentualAcerto,
  registrarRespostaRevisao,
  temasOrdenadosPorRevisao,
  type ResultadoRevisao,
  type RevisaoStats
} from "../lib/revision";
import { escolherRevisao, eventosOrdenados, type ItemRevisao, type Tema } from "../services/historyCatalog";
import {
  readBoolean,
  readSet,
  readString,
  STORAGE_KEYS,
  writeBoolean,
  writeSet,
  writeString
} from "../services/storageService";
import type { Acontecimento } from "../types";
import { AppContext } from "./appContextCore";

export function AppProvider({ children }: { children: ReactNode }) {
  const [carregando, setCarregando] = useState(true);
  const [erroInicial, setErroInicial] = useState("");
  const [tema, setTema] = useState<Tema>(() => (readString(STORAGE_KEYS.tema, "escuro") as Tema) || "escuro");
  const [sidebarCollapsed, setSidebarCollapsedState] = useState(() => readBoolean(STORAGE_KEYS.sidebarCollapsed));
  const [eventoAberto, setEventoAberto] = useState<Acontecimento | null>(null);
  const [favoritos, setFavoritos] = useState<Set<string>>(() => readSet(STORAGE_KEYS.favoritos));
  const [estudados, setEstudados] = useState<Set<string>>(() => readSet(STORAGE_KEYS.estudados));
  const [revisados, setRevisados] = useState<Set<string>>(() => readSet(STORAGE_KEYS.revisados));
  const [revisaoStats, setRevisaoStats] = useState<RevisaoStats>(() =>
    lerRevisaoStats(localStorage.getItem(STORAGE_KEYS.revisaoStats))
  );
  const [revisao, setRevisao] = useState<ItemRevisao>(() => escolherRevisao());
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [ultimoEventoId, setUltimoEventoId] = useState(() => readString(STORAGE_KEYS.ultimoEvento));

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    writeString(STORAGE_KEYS.tema, tema);
  }, [tema]);

  useEffect(() => writeSet(STORAGE_KEYS.favoritos, favoritos), [favoritos]);
  useEffect(() => writeSet(STORAGE_KEYS.estudados, estudados), [estudados]);
  useEffect(() => writeSet(STORAGE_KEYS.revisados, revisados), [revisados]);
  useEffect(() => writeString(STORAGE_KEYS.revisaoStats, JSON.stringify(revisaoStats)), [revisaoStats]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const duplicados = validarEventosDuplicados(acontecimentos);
      if (duplicados.length) {
        setErroInicial(`Foram encontrados IDs duplicados em acontecimentos: ${duplicados.join(", ")}.`);
      }
      setCarregando(false);
    }, 120);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEventoAberto(null);
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        document.getElementById("busca")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const progressoPorPeriodo = useMemo(
    () => calcularProgressoPorPeriodo(periodosFiltro, acontecimentos, estudados),
    [estudados]
  );

  const temasRevisao = useMemo(() => temasOrdenadosPorRevisao(revisaoStats), [revisaoStats]);
  const percentualGeralRevisao = percentualAcerto(revisaoStats);

  const setSidebarCollapsed = (value: boolean) => {
    setSidebarCollapsedState(value);
    writeBoolean(STORAGE_KEYS.sidebarCollapsed, value);
  };

  const abrirEvento = (evento: Acontecimento) => {
    setEventoAberto(evento);
    setUltimoEventoId(evento.id);
    writeString(STORAGE_KEYS.ultimoEvento, evento.id);
  };

  const continuarUltimoEvento = () => {
    const evento = eventosOrdenados.find((item) => item.id === ultimoEventoId);
    if (evento) abrirEvento(evento);
  };

  const alternarFavorito = (id: string) => {
    setFavoritos((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(id)) proximo.delete(id);
      else proximo.add(id);
      return proximo;
    });
  };

  const alternarEstudado = (id: string) => {
    setEstudados((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(id)) proximo.delete(id);
      else proximo.add(id);
      return proximo;
    });
  };

  const compartilhar = async (evento: Acontecimento) => {
    const texto = `${evento.ano} - ${evento.titulo}: ${evento.resumo}`;
    if (navigator.share) {
      await navigator.share({ title: evento.titulo, text: texto, url: location.href });
      return;
    }
    await navigator.clipboard.writeText(texto);
  };

  const copiarResumo = async (evento: Acontecimento) => {
    await navigator.clipboard.writeText(`${evento.ano} - ${evento.titulo}: ${evento.resumo}`);
  };

  const proximaRevisao = () => {
    setRevisao(escolherRevisao());
    setMostrarResposta(false);
  };

  const responderRevisao = (resultado: ResultadoRevisao) => {
    setRevisaoStats((atual) => registrarRespostaRevisao(atual, revisao.tema, resultado));
    setRevisados((atual) => new Set(atual).add(revisao.id));
    proximaRevisao();
  };

  const value = {
    carregando,
    erroInicial,
    tema,
    setTema,
    sidebarCollapsed,
    setSidebarCollapsed,
    favoritos,
    estudados,
    revisados,
    revisaoStats,
    revisao,
    mostrarResposta,
    setMostrarResposta,
    eventoAberto,
    ultimoEventoId,
    progressoPorPeriodo,
    percentualGeralRevisao,
    temasRevisao,
    abrirEvento,
    fecharEvento: () => setEventoAberto(null),
    continuarUltimoEvento,
    alternarFavorito,
    alternarEstudado,
    compartilhar,
    copiarResumo,
    responderRevisao,
    proximaRevisao
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
