import { BookOpen, FilterX, Search } from "lucide-react";
import { categoriasFiltro, civilizacoesFiltro, periodosFiltro, acontecimentos } from "../../data/generated";
import { FilterSelect } from "../common/Ui";

export function TimelineFilters({
  busca,
  setBusca,
  periodo,
  setPeriodo,
  civilizacao,
  setCivilizacao,
  categoria,
  setCategoria,
  limparFiltros,
  resultados,
  estudados,
  continuarUltimoEvento,
  podeContinuar
}: {
  busca: string;
  setBusca: (value: string) => void;
  periodo: string;
  setPeriodo: (value: string) => void;
  civilizacao: string;
  setCivilizacao: (value: string) => void;
  categoria: string;
  setCategoria: (value: string) => void;
  limparFiltros: () => void;
  resultados: number;
  estudados: number;
  continuarUltimoEvento: () => void;
  podeContinuar: boolean;
}) {
  return (
    <aside className="filters" aria-label="Filtros da linha do tempo">
      <div className="search-box">
        <Search size={18} />
        <input
          id="busca"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          placeholder="Buscar evento, cidade, personagem..."
        />
      </div>
      <FilterSelect label="Período" value={periodo} onChange={setPeriodo} options={periodosFiltro} />
      <FilterSelect
        label="Civilização ou região"
        value={civilizacao}
        onChange={setCivilizacao}
        options={civilizacoesFiltro}
      />
      <FilterSelect label="Categoria" value={categoria} onChange={setCategoria} options={categoriasFiltro} />
      <button className="button secondary full" onClick={limparFiltros}>
        <FilterX size={18} /> Limpar filtros
      </button>
      <button className="button secondary full" onClick={continuarUltimoEvento} disabled={!podeContinuar}>
        <BookOpen size={18} /> Continuar de onde parei
      </button>
      <div className="progress-card">
        <span>{resultados} resultados</span>
        <strong>{estudados} estudados</strong>
        <div className="progress-line">
          <i style={{ width: `${Math.min(100, (estudados / acontecimentos.length) * 100)}%` }} />
        </div>
      </div>
    </aside>
  );
}
