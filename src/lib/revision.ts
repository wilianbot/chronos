export type ResultadoRevisao = "acerto" | "dificil" | "erro";

export type RevisaoTemaStats = {
  total: number;
  acertos: number;
  erros: number;
  dificil: number;
};

export type RevisaoStats = RevisaoTemaStats & {
  porTema: Record<string, RevisaoTemaStats>;
};

export const revisaoStatsInicial: RevisaoStats = {
  total: 0,
  acertos: 0,
  erros: 0,
  dificil: 0,
  porTema: {}
};

function criarTemaStats(): RevisaoTemaStats {
  return { total: 0, acertos: 0, erros: 0, dificil: 0 };
}

function incrementar(stats: RevisaoTemaStats, resultado: ResultadoRevisao) {
  stats.total += 1;
  if (resultado === "acerto") stats.acertos += 1;
  if (resultado === "erro") stats.erros += 1;
  if (resultado === "dificil") stats.dificil += 1;
}

export function registrarRespostaRevisao(stats: RevisaoStats, tema: string, resultado: ResultadoRevisao): RevisaoStats {
  const proximo: RevisaoStats = {
    total: stats.total,
    acertos: stats.acertos,
    erros: stats.erros,
    dificil: stats.dificil,
    porTema: Object.fromEntries(Object.entries(stats.porTema).map(([chave, valor]) => [chave, { ...valor }]))
  };

  incrementar(proximo, resultado);
  const chaveTema = tema || "Geral";
  proximo.porTema[chaveTema] = proximo.porTema[chaveTema] || criarTemaStats();
  incrementar(proximo.porTema[chaveTema], resultado);

  return proximo;
}

export function percentualAcerto(stats: RevisaoTemaStats) {
  return stats.total ? Math.round((stats.acertos / stats.total) * 100) : 0;
}

export function temasOrdenadosPorRevisao(stats: RevisaoStats) {
  return Object.entries(stats.porTema)
    .map(([tema, dados]) => ({ tema, ...dados, percentual: percentualAcerto(dados) }))
    .sort((a, b) => b.total - a.total || a.tema.localeCompare(b.tema, "pt-BR"));
}

export function lerRevisaoStats(valor: string | null): RevisaoStats {
  if (!valor) return revisaoStatsInicial;

  try {
    const parsed = JSON.parse(valor) as Partial<RevisaoStats>;
    return {
      total: parsed.total || 0,
      acertos: parsed.acertos || 0,
      erros: parsed.erros || 0,
      dificil: parsed.dificil || 0,
      porTema: parsed.porTema || {}
    };
  } catch {
    return revisaoStatsInicial;
  }
}
