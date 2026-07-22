import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { filtrarEventos } from "../lib/history";
import { eventosOrdenados } from "../services/historyCatalog";

export function useTimelineFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [busca, setBusca] = useState(searchParams.get("busca") || "");
  const [periodo, setPeriodoState] = useState(searchParams.get("periodo") || "");
  const [civilizacao, setCivilizacaoState] = useState(searchParams.get("civilizacao") || "");
  const [categoria, setCategoriaState] = useState(searchParams.get("categoria") || "");
  const [quantidade, setQuantidade] = useState(24);

  const sync = (next: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    setSearchParams(params, { replace: true });
  };

  const setPeriodo = (value: string) => {
    setPeriodoState(value);
    sync({ periodo: value });
  };

  const setCivilizacao = (value: string) => {
    setCivilizacaoState(value);
    sync({ civilizacao: value });
  };

  const setCategoria = (value: string) => {
    setCategoriaState(value);
    sync({ categoria: value });
  };

  const setBuscaSincronizada = (value: string) => {
    setBusca(value);
    sync({ busca: value });
  };

  const limparFiltros = () => {
    setBusca("");
    setPeriodoState("");
    setCivilizacaoState("");
    setCategoriaState("");
    setQuantidade(24);
    setSearchParams({}, { replace: true });
  };

  const eventosFiltrados = useMemo(
    () => filtrarEventos(eventosOrdenados, { busca, periodo, civilizacao, categoria }),
    [busca, periodo, civilizacao, categoria]
  );

  return {
    busca,
    setBusca: setBuscaSincronizada,
    periodo,
    setPeriodo,
    civilizacao,
    setCivilizacao,
    categoria,
    setCategoria,
    quantidade,
    setQuantidade,
    eventosFiltrados,
    eventosVisiveis: eventosFiltrados.slice(0, quantidade),
    limparFiltros
  };
}
