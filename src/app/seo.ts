export type SeoRoute = {
  path: string;
  title: string;
  description: string;
};

export const siteName = "Jornada pela História";
export const siteUrl = "https://jornada-pela-historia.vercel.app";
export const defaultDescription =
  "Museu digital educacional com linha do tempo, mapas, personagens, mitologia, revisão e progresso local.";

export const seoRoutes: SeoRoute[] = [
  { path: "/", title: "Jornada pela História", description: defaultDescription },
  {
    path: "/linha-do-tempo",
    title: "Linha do tempo | Jornada pela História",
    description: "Explore acontecimentos históricos organizados por períodos, causas e consequências."
  },
  {
    path: "/periodos",
    title: "Períodos históricos | Jornada pela História",
    description: "Estude civilizações, eras e processos históricos com cards e progresso local."
  },
  {
    path: "/personagens",
    title: "Personagens históricos | Jornada pela História",
    description: "Conheça personagens importantes da Antiguidade ao século XX."
  },
  {
    path: "/mitologia",
    title: "Mitologia grega e romana | Jornada pela História",
    description: "Catálogo de divindades gregas e romanas com fontes, imagens, relações e filtros."
  },
  {
    path: "/mitologia/arvore",
    title: "Árvore genealógica mitológica | Jornada pela História",
    description: "Grafo genealógico de tradições mitológicas gregas e romanas com modo textual acessível."
  },
  {
    path: "/mapas",
    title: "Mapas históricos | Jornada pela História",
    description: "Mapa interativo com acontecimentos, provedores OpenStreetMap, Esri e CARTO."
  },
  {
    path: "/comparacoes",
    title: "Comparações históricas | Jornada pela História",
    description: "Compare períodos, sociedades, processos e transformações históricas."
  },
  {
    path: "/jornadas",
    title: "Jornadas guiadas | Jornada pela História",
    description: "Percursos de estudo prontos para revisar temas históricos relacionados."
  },
  {
    path: "/revisao",
    title: "Revisão | Jornada pela História",
    description: "Perguntas rápidas para revisar acontecimentos, conceitos e mitologia."
  },
  {
    path: "/flashcards",
    title: "Flashcards | Jornada pela História",
    description: "Flashcards de história e mitologia com filtros de estudo."
  },
  {
    path: "/glossario",
    title: "Glossário histórico | Jornada pela História",
    description: "Conceitos essenciais para estudar história de forma contextualizada."
  },
  {
    path: "/favoritos",
    title: "Favoritos | Jornada pela História",
    description: "Itens favoritos salvos localmente neste navegador."
  },
  {
    path: "/progresso",
    title: "Progresso | Jornada pela História",
    description: "Acompanhe eventos, divindades e revisões estudados neste navegador."
  },
  {
    path: "/sobre",
    title: "Sobre | Jornada pela História",
    description: "Saiba como o projeto organiza conteúdos históricos, mitológicos e educacionais."
  },
  {
    path: "/privacidade",
    title: "Privacidade | Jornada pela História",
    description: "Entenda quais dados ficam salvos localmente e como o projeto prepara anúncios futuros."
  },
  {
    path: "/termos",
    title: "Termos de uso | Jornada pela História",
    description: "Condições gerais para uso educacional do projeto Jornada pela História."
  },
  {
    path: "/contato",
    title: "Contato | Jornada pela História",
    description: "Informações para contato, correções e sugestões sobre o conteúdo educacional."
  }
];

export function getSeoForPath(pathname: string): SeoRoute {
  const exact = seoRoutes.find((route) => route.path === pathname);
  if (exact) return exact;

  if (pathname.startsWith("/deuses/")) {
    return {
      path: pathname,
      title: "Divindade | Jornada pela História",
      description: "Página individual de divindade com história, símbolos, relações e fontes."
    };
  }

  if (pathname.startsWith("/eventos/")) {
    return {
      path: pathname,
      title: "Acontecimento histórico | Jornada pela História",
      description: "Detalhes de acontecimento histórico com contexto, impacto e relações."
    };
  }

  if (pathname.startsWith("/personagens/")) {
    return {
      path: pathname,
      title: "Personagem histórico | Jornada pela História",
      description: "Detalhes de personagem histórico com contexto e relações."
    };
  }

  return {
    path: pathname,
    title: "Página não encontrada | Jornada pela História",
    description: defaultDescription
  };
}
