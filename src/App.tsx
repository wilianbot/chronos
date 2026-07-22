import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import L from "leaflet";
import {
  ArrowUp,
  BookOpen,
  CheckCircle2,
  Copy,
  FilterX,
  Heart,
  Landmark,
  MapPinned,
  Moon,
  Search,
  Share2,
  Sparkles,
  Sun,
  X
} from "lucide-react";
import {
  acontecimentos,
  categoriasFiltro,
  civilizacoesFiltro,
  comparadores,
  deusesGregos,
  mapas,
  personagens,
  perguntasRevisao,
  periodosFiltro
} from "./data/generated";
import { ResilientImage } from "./components/ResilientImage";
import { personagemImages } from "./data/personagemImages";
import { obterLocalEvento } from "./data/geo";
import { cadeiasHistoricas, flashcards, glossario, jornadasGuiadas } from "./data/studyTools";
import {
  calcularProgressoPorPeriodo,
  filtrarEventos,
  normalizar,
  ordenarEventos,
  validarEventosDuplicados
} from "./lib/history";
import {
  lerRevisaoStats,
  percentualAcerto,
  registrarRespostaRevisao,
  temasOrdenadosPorRevisao,
  type ResultadoRevisao,
  type RevisaoStats
} from "./lib/revision";
import type { Acontecimento, ComparadorCivilizacao, Personagem, PerguntaRevisao } from "./types";

type Tema = "claro" | "escuro";
type ItemRevisao =
  | { id: string; tipo: "Acontecimento"; tema: string; pergunta: string; resposta: string }
  | { id: string; tipo: "Personagem"; tema: string; pergunta: string; resposta: string }
  | { id: string; tipo: "Pergunta"; tema: string; pergunta: string; resposta: string };

type FonteReferencia = {
  nome: string;
  url: string;
};

const STORAGE = {
  tema: "jh-react-tema",
  favoritos: "jh-react-favoritos",
  estudados: "jh-react-estudados",
  revisados: "jh-react-revisados",
  ultimoEvento: "jh-react-ultimo-evento",
  revisaoStats: "jh-react-revisao-stats"
};

const categoriaCores: Record<string, string> = {
  guerra: "#b74545",
  filosofia: "#5966b6",
  politica: "#8a6a2f",
  política: "#8a6a2f",
  religião: "#7f5aa7",
  religiao: "#7f5aa7",
  mitologia: "#9b4d83",
  ciência: "#2e7e86",
  ciencia: "#2e7e86",
  arte: "#b57931",
  expansão: "#4d7c4f",
  expansao: "#4d7c4f",
  revolução: "#a34f39",
  revolucao: "#a34f39",
  império: "#51617d",
  imperio: "#51617d",
  tratados: "#6d7059",
  personagens: "#8f5f4a"
};

const eventosOrdenados = ordenarEventos(acontecimentos);
const comparadoresMap = comparadores as Record<string, ComparadorCivilizacao>;
const eventosPorId = new Map(eventosOrdenados.map((evento) => [evento.id, evento]));

const imagemPadraoPeriodo: Record<string, string> = {
  "Primeiras Civilizações": "assets/images/ziggurat-ur.jpg",
  "Grécia Antiga": "assets/images/acropole-atenas.jpg",
  "Macedônia e Helenismo": "assets/images/alexander-mosaic.jpg",
  "Roma Antiga": "assets/images/coliseu.jpg",
  "Idade Média": "assets/images/hagia-sophia.jpg",
  Renascimento: "assets/images/leonardo.jpg",
  "Reforma e Grandes Navegações": "assets/images/leonardo.jpg",
  "Absolutismo e Iluminismo": "assets/images/leonardo.jpg",
  Revoluções: "assets/images/bastilha.jpg",
  "Era Napoleônica": "assets/images/bastilha.jpg",
  "Revolução Industrial": "assets/images/cottonopolis.jpg",
  Imperialismo: "assets/images/cottonopolis.jpg",
  "Primeira Guerra Mundial": "assets/images/trincheira-somme.jpg",
  "Período Entre Guerras": "assets/images/bolsa-nyse-1929.jpg",
  "Segunda Guerra Mundial": "assets/images/dia-d.jpg"
};

const imagensMapasHistoricos = [
  "https://commons.wikimedia.org/wiki/Special:FilePath/Map%20ancient%20Greece-en.svg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Achaemenid%20Empire%20500%20BCE.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/MacedonEmpire.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20conquest%20of%20Italy.png",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20Empire%20117.svg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Western%20and%20Eastern%20Roman%20Empires%20476AD%282%29.svg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Europe%20814.svg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Europe%201812%20map%20en.png",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Map%20Europe%20alliances%201914-en.svg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/World%20War%20II%20alliances%20animated%20map.gif"
];

const fontesGerais: FonteReferencia[] = [
  { nome: "Encyclopaedia Britannica", url: "https://www.britannica.com/" },
  { nome: "World History Encyclopedia", url: "https://www.worldhistory.org/" },
  { nome: "The Metropolitan Museum of Art", url: "https://www.metmuseum.org/toah/" },
  { nome: "British Museum", url: "https://www.britishmuseum.org/" }
];

const fontesPorPeriodo: Record<string, FonteReferencia[]> = {
  "Grécia Antiga": [
    { nome: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/" },
    { nome: "Theoi Greek Mythology", url: "https://www.theoi.com/" }
  ],
  "Macedônia e Helenismo": [
    { nome: "World History Encyclopedia - Alexander", url: "https://www.worldhistory.org/Alexander_the_Great/" }
  ],
  "Roma Antiga": [
    { nome: "Livius - Roman History", url: "https://www.livius.org/" },
    { nome: "Fordham Ancient History Sourcebook", url: "https://sourcebooks.fordham.edu/ancient/asbook.asp" }
  ],
  "Idade Média": [{ nome: "Fordham Medieval Sourcebook", url: "https://sourcebooks.fordham.edu/sbook.asp" }],
  Renascimento: [{ nome: "National Gallery - Renaissance", url: "https://www.nationalgallery.org.uk/" }],
  "Primeira Guerra Mundial": [{ nome: "Imperial War Museums", url: "https://www.iwm.org.uk/history/first-world-war" }],
  "Período Entre Guerras": [
    { nome: "United States Holocaust Memorial Museum", url: "https://encyclopedia.ushmm.org/" }
  ],
  "Segunda Guerra Mundial": [
    { nome: "United States Holocaust Memorial Museum", url: "https://encyclopedia.ushmm.org/" },
    { nome: "National WWII Museum", url: "https://www.nationalww2museum.org/" }
  ]
};

const perguntasExtras: PerguntaRevisao[] = [
  {
    tipo: "Verdadeiro ou falso",
    pergunta: "A democracia ateniense incluía todos os moradores de Atenas?",
    resposta:
      "Falso. Mulheres, escravizados, estrangeiros residentes e muitos outros grupos eram excluídos da cidadania."
  },
  {
    tipo: "Verdadeiro ou falso",
    pergunta: "A Guerra de Troia dos poemas homéricos deve ser tratada exatamente como fato documentado?",
    resposta: "Falso. Ela combina tradição literária, mito e possíveis memórias de conflitos antigos."
  },
  {
    tipo: "Múltipla escolha",
    pergunta: "Qual cidade ficou associada à agogê: Atenas, Esparta ou Alexandria?",
    resposta: "Esparta. A agogê era o sistema de educação e disciplina dos jovens espartanos."
  },
  {
    tipo: "Múltipla escolha",
    pergunta: "Quem fundou a Academia: Sócrates, Platão ou Aristóteles?",
    resposta: "Platão fundou a Academia em Atenas."
  },
  {
    tipo: "Múltipla escolha",
    pergunta: "Qual batalha naval foi decisiva contra Xerxes: Maratona, Salamina ou Gaugamela?",
    resposta: "Salamina, em 480 a.C."
  },
  {
    tipo: "Ordenação",
    pergunta: "Ordene: Liga de Delos, Guerras Médicas, Guerra do Peloponeso.",
    resposta: "Guerras Médicas, Liga de Delos, Guerra do Peloponeso."
  },
  {
    tipo: "Ordenação",
    pergunta: "Ordene: Rubicão, Áccio, Augusto.",
    resposta: "Travessia do Rubicão, Batalha de Áccio, Augusto inaugura o Império."
  },
  {
    tipo: "Data",
    pergunta: "Em que ano tradicionalmente se situa a fundação de Roma?",
    resposta: "753 a.C., como data tradicional da narrativa romana."
  },
  {
    tipo: "Data",
    pergunta: "Em que ano caiu o Império Romano do Ocidente?",
    resposta: "476 d.C., com a deposição de Rômulo Augusto por Odoacro."
  },
  {
    tipo: "Conceito",
    pergunta: "O que era uma pólis?",
    resposta: "Uma cidade-Estado grega, com território, leis, cultos, instituições e identidade cívica própria."
  },
  {
    tipo: "Conceito",
    pergunta: "O que foi o helenismo?",
    resposta: "A difusão e mistura da cultura grega com tradições locais após as conquistas de Alexandre."
  },
  {
    tipo: "Personagem",
    pergunta: "Qual relação Aristóteles teve com Alexandre?",
    resposta: "Aristóteles foi professor de Alexandre antes de sua ascensão ao trono macedônico."
  },
  {
    tipo: "Personagem",
    pergunta: "Quem foi Aníbal?",
    resposta: "General cartaginês que enfrentou Roma nas Guerras Púnicas e atravessou os Alpes."
  },
  {
    tipo: "Personagem",
    pergunta: "Quem foi Cipião Africano?",
    resposta: "General romano associado à derrota de Cartago e de Aníbal."
  },
  {
    tipo: "Personagem",
    pergunta: "Quem foi Justiniano?",
    resposta: "Imperador bizantino ligado ao Código de Justiniano e à construção de Hagia Sophia."
  },
  {
    tipo: "Personagem",
    pergunta: "Quem foi Joana d'Arc?",
    resposta: "Figura francesa da Guerra dos Cem Anos, posteriormente canonizada pela Igreja Católica."
  },
  {
    tipo: "Mitologia",
    pergunta: "O que foi a Titanomaquia?",
    resposta: "Narrativa mítica da guerra entre os deuses olímpicos e os Titãs."
  },
  {
    tipo: "Mitologia",
    pergunta: "Quem era Caronte na tradição grega?",
    resposta: "O barqueiro associado à passagem dos mortos por rios do submundo."
  },
  { tipo: "Mitologia", pergunta: "Qual é o equivalente romano de Zeus?", resposta: "Júpiter." },
  {
    tipo: "Roma",
    pergunta: "Roma caiu por uma única causa?",
    resposta: "Não. A queda envolveu fatores militares, políticos, econômicos, administrativos e externos."
  },
  {
    tipo: "Roma",
    pergunta: "O que foi a Pax Romana?",
    resposta: "Período de relativa estabilidade e integração no mundo romano, associado ao Alto Império."
  },
  {
    tipo: "Roma",
    pergunta: "Qual era a função dos Tribunos da Plebe?",
    resposta: "Defender interesses plebeus e atuar como contrapeso institucional na República."
  },
  {
    tipo: "Idade Média",
    pergunta: "A Idade Média deve ser resumida como 'idade das trevas'?",
    resposta:
      "Não. O período teve crises, mas também inovação, comércio, universidades, arte, filosofia e diversidade política."
  },
  {
    tipo: "Idade Média",
    pergunta: "O que foi o feudalismo?",
    resposta:
      "Um conjunto de relações políticas, militares, sociais e econômicas baseadas em terra, dependência e hierarquias locais."
  },
  {
    tipo: "Idade Média",
    pergunta: "Por que 1453 é uma data importante?",
    resposta: "Marca a queda de Constantinopla para os otomanos e costuma simbolizar transições para a modernidade."
  },
  {
    tipo: "Renascimento",
    pergunta: "O que foi o humanismo renascentista?",
    resposta: "Valorização dos estudos clássicos, da ação humana, da educação e da cultura letrada."
  },
  {
    tipo: "Renascimento",
    pergunta: "Qual foi a importância da imprensa de Gutenberg?",
    resposta: "Ampliou a circulação de livros e ideias, afetando religião, ciência e política."
  },
  {
    tipo: "Reforma",
    pergunta: "Quem foi Martinho Lutero?",
    resposta: "Monge e teólogo ligado à Reforma Protestante e às 95 teses."
  },
  { tipo: "Iluminismo", pergunta: "Que ideia Montesquieu ajudou a popularizar?", resposta: "A separação dos poderes." },
  {
    tipo: "Iluminismo",
    pergunta: "Que crítica iluminista atingia o absolutismo?",
    resposta: "A crítica ao poder concentrado e a defesa de direitos, razão e limites ao governo."
  },
  {
    tipo: "Revoluções",
    pergunta: "O que a queda da Bastilha simbolizou?",
    resposta: "A crise do absolutismo francês e a força política da Revolução Francesa."
  },
  {
    tipo: "Revoluções",
    pergunta: "O que foi o período do Terror?",
    resposta:
      "Fase radical e repressiva da Revolução Francesa, associada a Robespierre e ao Comitê de Salvação Pública."
  },
  {
    tipo: "Napoleão",
    pergunta: "O que foi o bloqueio continental?",
    resposta:
      "Tentativa napoleônica de enfraquecer economicamente a Inglaterra ao restringir comércio europeu com os britânicos."
  },
  {
    tipo: "Napoleão",
    pergunta: "O que significa sobre-expansão imperial?",
    resposta:
      "Quando um império amplia seus compromissos militares e administrativos além de sua capacidade de sustentação."
  },
  {
    tipo: "Industrialização",
    pergunta: "Qual foi a importância da máquina a vapor?",
    resposta: "Ela impulsionou fábricas, transportes, mineração e produção mecanizada."
  },
  {
    tipo: "Industrialização",
    pergunta: "Que problemas sociais acompanharam a industrialização?",
    resposta: "Urbanização acelerada, jornadas longas, exploração do trabalho e más condições de moradia."
  },
  {
    tipo: "Século XIX",
    pergunta: "Quem foi Bismarck?",
    resposta: "Líder prussiano ligado à unificação alemã e à política de poder no século XIX."
  },
  {
    tipo: "Imperialismo",
    pergunta: "O que foi a Conferência de Berlim no contexto imperialista?",
    resposta: "Um marco da partilha colonial europeia da África, tema recomendado para ampliação futura."
  },
  {
    tipo: "Primeira Guerra",
    pergunta: "Quais fatores ajudam a explicar a Primeira Guerra Mundial?",
    resposta: "Alianças, nacionalismo, imperialismo, militarismo e a crise após o assassinato de Francisco Ferdinando."
  },
  {
    tipo: "Primeira Guerra",
    pergunta: "O que caracterizou a guerra de trincheiras?",
    resposta: "Frentes estáticas, desgaste extremo, artilharia, metralhadoras, lama, doenças e enorme mortalidade."
  },
  {
    tipo: "Primeira Guerra",
    pergunta: "Qual tratado encerrou formalmente a guerra com a Alemanha?",
    resposta: "O Tratado de Versalhes, em 1919."
  },
  {
    tipo: "Entre Guerras",
    pergunta: "O que foi a República de Weimar?",
    resposta:
      "Regime alemão do período entre guerras, pressionado por crise econômica, instabilidade política e tensões sociais."
  },
  {
    tipo: "Entre Guerras",
    pergunta: "O que foi a crise de 1929?",
    resposta: "Colapso financeiro que desencadeou a Grande Depressão e afetou economias e políticas em escala global."
  },
  {
    tipo: "Totalitarismos",
    pergunta: "Como estudar Hitler, Mussolini e Stalin sem glorificação?",
    resposta: "Contextualizando violência, propaganda, perseguição, repressão e consequências humanas dos regimes."
  },
  {
    tipo: "Segunda Guerra",
    pergunta: "O que foi a Blitzkrieg?",
    resposta: "Estratégia alemã de guerra rápida, combinando blindados, aviação e movimento coordenado."
  },
  {
    tipo: "Segunda Guerra",
    pergunta: "Por que Stalingrado foi importante?",
    resposta: "Foi uma virada decisiva na frente oriental, com enorme custo humano e recuo alemão."
  },
  {
    tipo: "Segunda Guerra",
    pergunta: "O que foi o Dia D?",
    resposta: "Desembarque aliado na Normandia em 1944, abrindo ampla frente ocidental contra a Alemanha nazista."
  },
  {
    tipo: "Holocausto",
    pergunta: "Como o Holocausto deve ser tratado em um material educativo?",
    resposta: "Com precisão, respeito às vítimas e contextualização da política genocida nazista."
  },
  {
    tipo: "Segunda Guerra",
    pergunta: "Quais cidades sofreram ataques atômicos em 1945?",
    resposta: "Hiroshima e Nagasaki."
  },
  {
    tipo: "Pós-guerra",
    pergunta: "Qual organização internacional foi criada em 1945?",
    resposta: "A Organização das Nações Unidas, ONU."
  }
];

const bancoRevisao = [...perguntasRevisao, ...perguntasExtras];

function carregarSet(chave: string) {
  try {
    return new Set<string>(JSON.parse(localStorage.getItem(chave) || "[]"));
  } catch {
    return new Set<string>();
  }
}

function salvarSet(chave: string, valor: Set<string>) {
  localStorage.setItem(chave, JSON.stringify([...valor]));
}

function imagem(src?: string) {
  if (!src) return "/assets/images/mapa-placeholder.svg";
  if (src.startsWith("assets/")) return `/${src}`;
  return src;
}

function fontesEvento(evento: Acontecimento) {
  return [evento.imagem, imagemPadraoPeriodo[evento.periodo], "assets/images/mapa-placeholder.svg"].filter(Boolean);
}

const imagensLocaisEspecificas = new Set([
  "primeiras-cidades",
  "piramides-gize",
  "renascimento",
  "revolucao-francesa",
  "primeira-industrial",
  "trincheiras",
  "verdun-somme",
  "crise-1929",
  "dia-d-franca"
]);

function deveUsarImagemNoCard(evento: Acontecimento) {
  if (evento.imagem.startsWith("http")) return true;
  return imagensLocaisEspecificas.has(evento.id);
}

function fontesPersonagem(personagem: Personagem) {
  const imagensLocais = personagemImages as Record<string, string>;
  return [imagensLocais[personagem.id], personagem.fotoRemota, personagem.foto].filter(Boolean);
}

function fontesHistoricas(evento: Acontecimento) {
  const fontes = [...fontesGerais, ...(fontesPorPeriodo[evento.periodo] || [])];
  if (normalizar(evento.tipoFonte).includes("mito") || normalizar(evento.categoria).includes("mitologia")) {
    fontes.push({ nome: "Theoi Greek Mythology", url: "https://www.theoi.com/" });
  }

  return Array.from(new Map(fontes.map((fonte) => [fonte.nome, fonte])).values()).slice(0, 5);
}

function escolherRevisao(): ItemRevisao {
  const tipo = Math.floor(Math.random() * 3);
  if (tipo === 0) {
    const evento = eventosOrdenados[Math.floor(Math.random() * eventosOrdenados.length)];
    return {
      id: `evento:${evento.id}`,
      tipo: "Acontecimento",
      tema: evento.periodo,
      pergunta: `O que aconteceu em ${evento.ano}: ${evento.titulo}?`,
      resposta: `${evento.resumo} ${evento.legado}`
    };
  }

  if (tipo === 1) {
    const personagem = personagens[Math.floor(Math.random() * personagens.length)];
    return {
      id: `personagem:${personagem.id}`,
      tipo: "Personagem",
      tema: personagem.periodo,
      pergunta: `Quem foi ${personagem.nome}?`,
      resposta: `${personagem.ocupacao}. ${personagem.feitos} Impacto: ${personagem.impacto}`
    };
  }

  const pergunta = bancoRevisao[Math.floor(Math.random() * bancoRevisao.length)] as PerguntaRevisao;
  return {
    id: `pergunta:${normalizar(pergunta.tipo)}:${normalizar(pergunta.pergunta).slice(0, 64)}`,
    tipo: "Pergunta",
    tema: pergunta.tipo,
    pergunta: pergunta.pergunta,
    resposta: pergunta.resposta
  };
}

export function App() {
  const [carregando, setCarregando] = useState(true);
  const [erroInicial, setErroInicial] = useState("");
  const [tema, setTema] = useState<Tema>(() => (localStorage.getItem(STORAGE.tema) as Tema) || "escuro");
  const [busca, setBusca] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [civilizacao, setCivilizacao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [eventoAberto, setEventoAberto] = useState<Acontecimento | null>(null);
  const [favoritos, setFavoritos] = useState<Set<string>>(() => carregarSet(STORAGE.favoritos));
  const [estudados, setEstudados] = useState<Set<string>>(() => carregarSet(STORAGE.estudados));
  const [revisados, setRevisados] = useState<Set<string>>(() => carregarSet(STORAGE.revisados));
  const [revisaoStats, setRevisaoStats] = useState<RevisaoStats>(() =>
    lerRevisaoStats(localStorage.getItem(STORAGE.revisaoStats))
  );
  const [revisao, setRevisao] = useState<ItemRevisao>(() => escolherRevisao());
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [comparacaoA, setComparacaoA] = useState("Atenas");
  const [comparacaoB, setComparacaoB] = useState("Esparta");
  const [ultimoEventoId, setUltimoEventoId] = useState(() => localStorage.getItem(STORAGE.ultimoEvento) || "");
  const [jornadaAtivaId, setJornadaAtivaId] = useState(jornadasGuiadas[0]?.id || "");
  const [capituloJornada, setCapituloJornada] = useState(0);
  const [flashcardAtual, setFlashcardAtual] = useState(0);
  const [flashcardVirado, setFlashcardVirado] = useState(false);
  const [termoGlossario, setTermoGlossario] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    localStorage.setItem(STORAGE.tema, tema);
  }, [tema]);

  useEffect(() => salvarSet(STORAGE.favoritos, favoritos), [favoritos]);
  useEffect(() => salvarSet(STORAGE.estudados, estudados), [estudados]);
  useEffect(() => salvarSet(STORAGE.revisados, revisados), [revisados]);
  useEffect(() => localStorage.setItem(STORAGE.revisaoStats, JSON.stringify(revisaoStats)), [revisaoStats]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const duplicados = validarEventosDuplicados(acontecimentos);
      if (duplicados.length) {
        setErroInicial(`Foram encontrados IDs duplicados em acontecimentos: ${duplicados.join(", ")}.`);
      }
      setCarregando(false);
    }, 180);

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

  const eventosFiltrados = useMemo(
    () => filtrarEventos(eventosOrdenados, { busca, periodo, civilizacao, categoria }),
    [busca, periodo, civilizacao, categoria]
  );

  const estatisticas = useMemo(() => {
    const civilizacoes = new Set(acontecimentos.map((item) => item.civilizacao)).size;
    const nomes = new Set(acontecimentos.flatMap((item) => item.personagens).concat(personagens.map((p) => p.nome)));
    return {
      eventos: acontecimentos.length,
      civilizacoes,
      personagens: nomes.size,
      periodo: `${eventosOrdenados[0]?.ano ?? ""} até ${eventosOrdenados[eventosOrdenados.length - 1]?.ano ?? ""}`
    };
  }, []);

  const progressoPorPeriodo = useMemo(
    () => calcularProgressoPorPeriodo(periodosFiltro, acontecimentos, estudados),
    [estudados]
  );

  const limparFiltros = () => {
    setBusca("");
    setPeriodo("");
    setCivilizacao("");
    setCategoria("");
  };

  const abrirEvento = (evento: Acontecimento) => {
    setEventoAberto(evento);
    setUltimoEventoId(evento.id);
    localStorage.setItem(STORAGE.ultimoEvento, evento.id);
  };

  const continuarUltimoEvento = () => {
    const evento = eventosOrdenados.find((item) => item.id === ultimoEventoId);
    if (evento) abrirEvento(evento);
  };

  const alternarFavorito = (id: string) => {
    setFavoritos((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(id)) {
        proximo.delete(id);
      } else {
        proximo.add(id);
      }
      return proximo;
    });
  };

  const alternarEstudado = (id: string) => {
    setEstudados((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(id)) {
        proximo.delete(id);
      } else {
        proximo.add(id);
      }
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

  const opcoesComparacao = Object.keys(comparadoresMap);
  const comparadorA = comparadoresMap[comparacaoA];
  const comparadorB = comparadoresMap[comparacaoB];
  const jornadaAtiva = jornadasGuiadas.find((jornada) => jornada.id === jornadaAtivaId) || jornadasGuiadas[0];
  const eventosDaJornada = jornadaAtiva.eventos.map((id) => eventosPorId.get(id)).filter(Boolean) as Acontecimento[];
  const capituloAtual = eventosDaJornada[Math.min(capituloJornada, Math.max(eventosDaJornada.length - 1, 0))];
  const termosFiltrados = glossario.filter((item) => {
    const termo = normalizar(termoGlossario.trim());
    return !termo || normalizar([item.termo, item.categoria, item.definicao, item.exemplo].join(" ")).includes(termo);
  });
  const flashcard = flashcards[flashcardAtual % flashcards.length];
  const temasRevisao = temasOrdenadosPorRevisao(revisaoStats);
  const percentualGeralRevisao = percentualAcerto(revisaoStats);

  const selecionarJornada = (id: string) => {
    setJornadaAtivaId(id);
    setCapituloJornada(0);
  };

  const avancarFlashcard = () => {
    setFlashcardAtual((atual) => (atual + 1) % flashcards.length);
    setFlashcardVirado(false);
  };

  const responderRevisao = (resultado: ResultadoRevisao) => {
    setRevisaoStats((atual) => registrarRespostaRevisao(atual, revisao.tema, resultado));
    setRevisados((atual) => new Set(atual).add(revisao.id));
    setRevisao(escolherRevisao());
    setMostrarResposta(false);
  };

  if (carregando) {
    return (
      <div className="app">
        <main className="state-screen" aria-live="polite">
          <div className="loader-mark" />
          <span className="eyebrow">Preparando acervo</span>
          <h1>Carregando a jornada</h1>
          <p>Organizando acontecimentos, filtros, mapas e ferramentas de revisão.</p>
        </main>
      </div>
    );
  }

  if (erroInicial) {
    return (
      <div className="app">
        <main className="state-screen error-state" role="alert">
          <span className="eyebrow">Erro nos dados</span>
          <h1>Não foi possível abrir a linha do tempo</h1>
          <p>{erroInicial}</p>
          <p>Corrija a base em `src/data/generated.ts` e recarregue a aplicação.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ir para o inicio">
          <Landmark size={22} />
          <span>Jornada pela História</span>
        </a>
        <nav aria-label="Navegacao principal">
          <a href="#jornadas">Jornadas</a>
          <a href="#timeline">Linha do tempo</a>
          <a href="#mapa">Mapa</a>
          <a href="#estudo">Estudo</a>
          <a href="#personagens">Personagens</a>
          <a href="#revisao">Revisão</a>
        </nav>
        <button
          className="icon-button"
          onClick={() => setTema(tema === "escuro" ? "claro" : "escuro")}
          aria-label="Alternar tema"
        >
          {tema === "escuro" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Museu histórico digital</span>
            <h1>Jornada pela História</h1>
            <p>
              Viaje das primeiras cidades da Antiguidade até 1945, explorando conflitos, ideias, impérios, mitos,
              personagens e legados em uma linha do tempo interativa.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#timeline">
                <BookOpen size={18} /> Começar a jornada
              </a>
              <a className="button secondary" href="#periodos">
                <MapPinned size={18} /> Explorar periodos
              </a>
            </div>
            <p className="legacy-line">
              Civilizações surgem, crescem, entram em conflito e deixam rastros que ainda estudamos.
            </p>
          </div>
          <div className="hero-art" aria-label="Composição visual histórica">
            <SmartImage
              sources={["assets/images/acropole-atenas.jpg", "assets/images/mapa-placeholder.svg"]}
              alt="Acrópole de Atenas"
            />
            <div className="hero-art-card">
              <span>c. 3500 a.C. - 1945</span>
              <strong>Da escrita cuneiforme ao pós-guerra</strong>
            </div>
          </div>
        </section>

        <section className="stats-grid" aria-label="Indicadores do acervo">
          <Stat label="Acontecimentos" value={estatisticas.eventos} />
          <Stat label="Civilizações" value={estatisticas.civilizacoes} />
          <Stat label="Personagens" value={estatisticas.personagens} />
          <Stat label="Periodo coberto" value={estatisticas.periodo} small />
        </section>

        <section id="periodos" className="section">
          <div className="section-title">
            <span className="eyebrow">Organização cronológica</span>
            <h2>Períodos históricos</h2>
          </div>
          <div className="period-grid">
            {periodosFiltro.map((nome) => (
              <button key={nome} onClick={() => setPeriodo(nome)} className={periodo === nome ? "selected" : ""}>
                <strong>{progressoPorPeriodo[nome]?.total || 0}</strong>
                <span>{nome}</span>
                <small>
                  {progressoPorPeriodo[nome]?.percentual || 0}% estudado
                  {progressoPorPeriodo[nome]?.total
                    ? ` (${progressoPorPeriodo[nome].feitos}/${progressoPorPeriodo[nome].total})`
                    : ""}
                </small>
              </button>
            ))}
          </div>
        </section>

        <section id="jornadas" className="section guided-section">
          <div className="section-title">
            <span className="eyebrow">Percursos prontos</span>
            <h2>Jornadas guiadas</h2>
            <p>Escolha um tema e avance capítulo por capítulo, sem precisar procurar os eventos manualmente.</p>
          </div>
          <div className="guided-layout">
            <div className="journey-list" role="tablist" aria-label="Jornadas de estudo">
              {jornadasGuiadas.map((jornada) => (
                <button
                  key={jornada.id}
                  className={jornada.id === jornadaAtiva.id ? "selected" : ""}
                  onClick={() => selecionarJornada(jornada.id)}
                  role="tab"
                  aria-selected={jornada.id === jornadaAtiva.id}
                >
                  <strong>{jornada.titulo}</strong>
                  <span>{jornada.resumo}</span>
                  <small>{jornada.eventos.length} capítulos</small>
                </button>
              ))}
            </div>
            <article className="journey-panel">
              <span className="eyebrow">Jornada ativa</span>
              <h3>{jornadaAtiva.titulo}</h3>
              <p>{jornadaAtiva.objetivo}</p>
              {capituloAtual && (
                <div className="journey-current">
                  <small>
                    Capítulo {Math.min(capituloJornada + 1, eventosDaJornada.length)} de {eventosDaJornada.length}
                  </small>
                  <strong>
                    {capituloAtual.ano} - {capituloAtual.titulo}
                  </strong>
                  <p>{capituloAtual.resumo}</p>
                  <div className="review-actions">
                    <button className="button primary" onClick={() => abrirEvento(capituloAtual)}>
                      Abrir capítulo
                    </button>
                    <button
                      className="button secondary"
                      onClick={() => setCapituloJornada((atual) => Math.max(0, atual - 1))}
                      disabled={capituloJornada === 0}
                    >
                      Anterior
                    </button>
                    <button
                      className="button secondary"
                      onClick={() => setCapituloJornada((atual) => Math.min(eventosDaJornada.length - 1, atual + 1))}
                      disabled={capituloJornada >= eventosDaJornada.length - 1}
                    >
                      Próximo capítulo
                    </button>
                  </div>
                </div>
              )}
              <ol className="journey-steps">
                {eventosDaJornada.map((evento, index) => (
                  <li key={evento.id} className={index === capituloJornada ? "active" : ""}>
                    <button onClick={() => setCapituloJornada(index)}>
                      <span>{evento.ano}</span>
                      <strong>{evento.titulo}</strong>
                    </button>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </section>

        <section className="section cause-section">
          <div className="section-title">
            <span className="eyebrow">Causas e consequências</span>
            <h2>Como os acontecimentos se conectam</h2>
            <p>
              Alguns processos históricos ficam mais claros quando vistos como sequência de pressões, decisões e
              efeitos.
            </p>
          </div>
          <div className="cause-grid">
            {cadeiasHistoricas.map((cadeia) => (
              <article className="cause-card" key={cadeia.id}>
                <h3>{cadeia.titulo}</h3>
                <p>{cadeia.explicacao}</p>
                <div className="cause-flow">
                  {cadeia.eventos.map((id) => {
                    const evento = eventosPorId.get(id);
                    if (!evento) return null;
                    return (
                      <button key={id} onClick={() => abrirEvento(evento)}>
                        <span>{evento.ano}</span>
                        <strong>{evento.titulo}</strong>
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="estudo" className="section study-section">
          <div className="section-title">
            <span className="eyebrow">Memorização</span>
            <h2>Flashcards e glossário</h2>
            <p>Use cartões rápidos para revisar conceitos e consulte termos-chave sem sair da página.</p>
          </div>
          <div className="study-grid">
            <article className={`flashcard ${flashcardVirado ? "flipped" : ""}`}>
              <span>{flashcard.categoria}</span>
              <h3>{flashcardVirado ? flashcard.verso : flashcard.frente}</h3>
              <div className="review-actions">
                <button className="button primary" onClick={() => setFlashcardVirado((valor) => !valor)}>
                  {flashcardVirado ? "Ver frente" : "Mostrar verso"}
                </button>
                <button className="button secondary" onClick={avancarFlashcard}>
                  Próximo cartão
                </button>
              </div>
              <small>
                {flashcardAtual + 1} de {flashcards.length}
              </small>
            </article>
            <article className="glossary-panel">
              <div className="search-box">
                <Search size={18} />
                <input
                  value={termoGlossario}
                  onChange={(event) => setTermoGlossario(event.target.value)}
                  placeholder="Buscar termo, tema ou exemplo..."
                  aria-label="Buscar no glossário"
                />
              </div>
              <div className="glossary-list">
                {termosFiltrados.map((item) => (
                  <section key={item.termo}>
                    <span>{item.categoria}</span>
                    <h3>{item.termo}</h3>
                    <p>{item.definicao}</p>
                    <small>{item.exemplo}</small>
                  </section>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="timeline" className="section timeline-layout">
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
            <Select label="Periodo" value={periodo} onChange={setPeriodo} options={periodosFiltro} />
            <Select
              label="Civilização ou região"
              value={civilizacao}
              onChange={setCivilizacao}
              options={civilizacoesFiltro}
            />
            <Select label="Categoria" value={categoria} onChange={setCategoria} options={categoriasFiltro} />
            <button className="button secondary full" onClick={limparFiltros}>
              <FilterX size={18} /> Limpar filtros
            </button>
            <button className="button secondary full" onClick={continuarUltimoEvento} disabled={!ultimoEventoId}>
              <BookOpen size={18} /> Continuar de onde parei
            </button>
            <div className="progress-card">
              <span>{eventosFiltrados.length} resultados</span>
              <strong>{estudados.size} estudados</strong>
              <div className="progress-line">
                <i style={{ width: `${Math.min(100, (estudados.size / acontecimentos.length) * 100)}%` }} />
              </div>
            </div>
          </aside>

          <div className="timeline-content">
            <div className="section-title inline">
              <span className="eyebrow">Linha do tempo principal</span>
              <h2>{eventosFiltrados.length ? "Explore os acontecimentos" : "Nenhum resultado encontrado"}</h2>
            </div>
            <div className="timeline-list" aria-live="polite">
              {eventosFiltrados.map((evento) => (
                <EventoCard
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
          </div>
        </section>

        <section id="mapa" className="section map-section">
          <div className="section-title">
            <span className="eyebrow">Geografia historica</span>
            <h2>Mapa real dos acontecimentos</h2>
            <p>
              Marcadores aproximados sobre OpenStreetMap. Para processos amplos, o ponto representa uma cidade, batalha,
              centro político ou região de referência.
            </p>
          </div>
          <MapaInterativo eventos={eventosFiltrados} eventoAtivo={eventoAberto} onSelecionar={abrirEvento} />
        </section>

        <section className="section">
          <div className="section-title">
            <span className="eyebrow">Mitologia e religião</span>
            <h2>Deuses gregos e equivalentes romanos</h2>
          </div>
          <div className="deity-grid">
            {deusesGregos.map((deus) => (
              <article className="mini-card" key={deus.nome}>
                <span className="symbol">{deus.simbolo}</span>
                <h3>{deus.nome}</h3>
                <p>
                  <strong>Domínio:</strong> {deus.dominio}
                </p>
                <p>
                  <strong>Parentesco:</strong> {deus.parentesco}
                </p>
                <p>{deus.historia}</p>
                <small className="roman-equivalent">
                  <span>Equivalente romano:</span>
                  <strong>{deus.romano}</strong>
                </small>
              </article>
            ))}
          </div>
        </section>

        <section className="section deity-tree-section">
          <div className="section-title">
            <span className="eyebrow">Mitologia organizada</span>
            <h2>Árvore genealógica dos deuses</h2>
            <p>
              Diagrama simplificado para memorizar parentescos centrais da tradição grega, sem tratar mito como fato
              histórico.
            </p>
          </div>
          <div className="deity-tree" aria-label="Árvore genealógica simplificada dos deuses gregos">
            <div className="tree-row">
              <span>Gaia</span>
              <i>+</i>
              <span>Urano</span>
            </div>
            <div className="tree-line" />
            <div className="tree-row wide">
              <span>Titãs</span>
              <span>Cronos</span>
              <span>Reia</span>
            </div>
            <div className="tree-line" />
            <div className="tree-row olympians">
              {["Zeus", "Hera", "Poseidon", "Hades", "Deméter", "Héstia"].map((nome) => (
                <span key={nome}>{nome}</span>
              ))}
            </div>
            <p>
              A Titanomaquia narra a disputa entre os deuses olímpicos e os Titãs. É uma tradição mítica e religiosa,
              útil para entender imaginário, culto e literatura, não um acontecimento histórico documentado.
            </p>
          </div>
        </section>

        <section className="section compare-section">
          <div className="section-title">
            <span className="eyebrow">Comparador</span>
            <h2>Civilizações lado a lado</h2>
          </div>
          <div className="compare-controls">
            <Select
              label="Primeira civilizacao"
              value={comparacaoA}
              onChange={setComparacaoA}
              options={opcoesComparacao}
            />
            <Select
              label="Segunda civilizacao"
              value={comparacaoB}
              onChange={setComparacaoB}
              options={opcoesComparacao}
            />
          </div>
          <div className="compare-grid">
            <ComparacaoCard nome={comparacaoA} dados={comparadorA} />
            <ComparacaoCard nome={comparacaoB} dados={comparadorB} />
          </div>
        </section>

        <section id="personagens" className="section">
          <div className="section-title">
            <span className="eyebrow">Galeria</span>
            <h2>Grandes personagens</h2>
          </div>
          <div className="people-grid">
            {personagens.map((personagem) => (
              <PersonagemCard
                key={personagem.id}
                personagem={personagem}
                favorito={favoritos.has(personagem.id)}
                onFavorito={() => alternarFavorito(personagem.id)}
              />
            ))}
          </div>
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

        <section id="revisao" className="section review-section">
          <div className="section-title">
            <span className="eyebrow">Revisão rápida</span>
            <h2>Uma pergunta por vez</h2>
          </div>
          <article className="review-card">
            <span>
              {revisao.tipo} - {revisao.tema}
            </span>
            <h3>{revisao.pergunta}</h3>
            {mostrarResposta && <p>{revisao.resposta}</p>}
            <div className="review-score">
              <div>
                <strong>{percentualGeralRevisao}%</strong>
                <span>acerto geral</span>
              </div>
              <div>
                <strong>{revisaoStats.acertos}</strong>
                <span>acertos</span>
              </div>
              <div>
                <strong>{revisaoStats.dificil}</strong>
                <span>difíceis</span>
              </div>
              <div>
                <strong>{revisaoStats.erros}</strong>
                <span>erros</span>
              </div>
            </div>
            <div className="review-actions">
              <button className="button secondary" onClick={() => setMostrarResposta((valor) => !valor)}>
                <Sparkles size={18} /> {mostrarResposta ? "Ocultar resposta" : "Mostrar resposta"}
              </button>
              <button className="button secondary" onClick={() => responderRevisao("erro")}>
                Errei
              </button>
              <button className="button secondary" onClick={() => responderRevisao("dificil")}>
                Difícil
              </button>
              <button className="button primary" onClick={() => responderRevisao("acerto")}>
                Acertei
              </button>
              <button
                className="button secondary"
                onClick={() => {
                  setRevisao(escolherRevisao());
                  setMostrarResposta(false);
                }}
              >
                Próxima pergunta
              </button>
            </div>
            <div className="review-topic-grid" aria-label="Porcentagem por tema dentro da revisão">
              {temasRevisao.length ? (
                temasRevisao.slice(0, 8).map((tema) => (
                  <div key={tema.tema}>
                    <span>{tema.tema}</span>
                    <strong>{tema.percentual}%</strong>
                    <small>
                      {tema.acertos}/{tema.total} acertos
                    </small>
                    <i>
                      <b style={{ width: `${tema.percentual}%` }} />
                    </i>
                  </div>
                ))
              ) : (
                <p>Responda uma pergunta para gerar porcentagem por tema.</p>
              )}
            </div>
            <small>{revisados.size} itens revisados salvos neste navegador.</small>
          </article>
        </section>

        <section className="references">
          <h2>Referencias de estudo</h2>
          <p>
            Conteúdo preparado para revisão educacional com base em sínteses históricas de Britannica, World History
            Encyclopedia, British Museum, Metropolitan Museum of Art, Stanford Encyclopedia of Philosophy, museus,
            universidades e documentação histórica de domínio público.
          </p>
        </section>
      </main>

      <button className="to-top" onClick={() => scrollTo({ top: 0, behavior: "smooth" })} aria-label="Voltar ao topo">
        <ArrowUp size={20} />
      </button>

      {eventoAberto && (
        <ModalEvento
          evento={eventoAberto}
          favorito={favoritos.has(eventoAberto.id)}
          estudado={estudados.has(eventoAberto.id)}
          onFechar={() => setEventoAberto(null)}
          onFavorito={() => alternarFavorito(eventoAberto.id)}
          onEstudado={() => alternarEstudado(eventoAberto.id)}
          onCompartilhar={() => compartilhar(eventoAberto)}
          onCopiar={() => copiarResumo(eventoAberto)}
        />
      )}
    </div>
  );
}

function Stat({ label, value, small = false }: { label: string; value: string | number; small?: boolean }) {
  return (
    <article className="stat">
      <strong className={small ? "small" : ""}>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function Select({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="select-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Todos</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function EventoCard({
  evento,
  favorito,
  estudado,
  onAbrir,
  onFavorito,
  onEstudado
}: {
  evento: Acontecimento;
  favorito: boolean;
  estudado: boolean;
  onAbrir: () => void;
  onFavorito: () => void;
  onEstudado: () => void;
}) {
  const cor = categoriaCores[normalizar(evento.categoria)] || "#8a6a2f";
  return (
    <article className="event-card" style={{ "--accent": cor } as CSSProperties}>
      <div className="event-year">{evento.ano}</div>
      <EventoImagem evento={evento} />
      <div className="event-body">
        <div className="event-meta">
          <span>{evento.periodo}</span>
          <span>{evento.categoria}</span>
          <span>{evento.tipoFonte}</span>
        </div>
        <h3>{evento.titulo}</h3>
        <p>{evento.resumo}</p>
        <div className="card-actions">
          <button className="button primary compact" onClick={onAbrir}>
            Ver detalhes
          </button>
          <button
            className={`icon-button ${favorito ? "active" : ""}`}
            onClick={onFavorito}
            aria-label="Favoritar acontecimento"
          >
            <Heart size={18} />
          </button>
          <button
            className={`icon-button ${estudado ? "active" : ""}`}
            onClick={onEstudado}
            aria-label="Marcar como estudado"
          >
            <CheckCircle2 size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}

function EventoImagem({ evento }: { evento: Acontecimento }) {
  return (
    <ResilientImage
      sources={deveUsarImagemNoCard(evento) ? [imagem(evento.imagem)] : []}
      alt={evento.alt || evento.titulo}
      fallback={<EventoPlaceholder evento={evento} />}
    />
  );
}

function EventoPlaceholder({ evento }: { evento: Acontecimento }) {
  const etiqueta = evento.tipoFonte.toLowerCase().includes("mito") ? "Mito e tradição" : evento.categoria;

  return (
    <div className="event-placeholder" role="img" aria-label={`Representação textual de ${evento.titulo}`}>
      <span>{evento.ano}</span>
      <strong>{etiqueta}</strong>
      <small>{evento.civilizacao}</small>
    </div>
  );
}

function MapaInterativo({
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

  useEffect(() => {
    if (!mapElement.current || mapRef.current) return;

    const map = L.map(mapElement.current, {
      worldCopyJump: true,
      zoomControl: true,
      minZoom: 2
    }).setView([34, 18], 3);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const layer = L.layerGroup().addTo(map);
    mapRef.current = map;
    layerRef.current = layer;

    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    layer.clearLayers();
    eventos.forEach((evento) => {
      const local = obterLocalEvento(evento);
      const cor = categoriaCores[normalizar(evento.categoria)] || "#b78d3b";
      L.circleMarker([local.lat, local.lng], {
        radius: 7,
        color: "#f5e7bf",
        weight: 1.5,
        fillColor: cor,
        fillOpacity: 0.92
      })
        .bindPopup(`<strong>${evento.ano}</strong><br />${evento.titulo}<br /><small>${local.nome}</small>`)
        .on("click", () => onSelecionar(evento))
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
      <div
        ref={mapElement}
        className="leaflet-map"
        aria-label="Mapa interativo com localizacao aproximada dos acontecimentos"
      />
      <div className="map-side">
        <strong>{eventos.length} marcadores</strong>
        <p>Use zoom, arraste o mapa e clique nos pontos para abrir detalhes do acontecimento.</p>
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

function ModalEvento({
  evento,
  favorito,
  estudado,
  onFechar,
  onFavorito,
  onEstudado,
  onCompartilhar,
  onCopiar
}: {
  evento: Acontecimento;
  favorito: boolean;
  estudado: boolean;
  onFechar: () => void;
  onFavorito: () => void;
  onEstudado: () => void;
  onCompartilhar: () => void;
  onCopiar: () => void;
}) {
  const index = eventosOrdenados.findIndex((item) => item.id === evento.id);
  const anterior = eventosOrdenados[index - 1];
  const posterior = eventosOrdenados[index + 1];

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={onFechar}
    >
      <article className="modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" onClick={onFechar} aria-label="Fechar detalhes">
          <X size={20} />
        </button>
        <SmartImage className="modal-image" sources={fontesEvento(evento)} alt={evento.alt || evento.titulo} />
        <div className="modal-content">
          <div className="event-meta">
            <span>{evento.ano}</span>
            <span>{evento.periodo}</span>
            <span>{evento.civilizacao}</span>
            <span>{evento.tipoFonte}</span>
          </div>
          <h2 id="modal-title">{evento.titulo}</h2>
          <p className="lead">{evento.descricao}</p>
          <div className="modal-actions">
            <button className={`button secondary ${favorito ? "active" : ""}`} onClick={onFavorito}>
              <Heart size={18} /> Favorito
            </button>
            <button className={`button secondary ${estudado ? "active" : ""}`} onClick={onEstudado}>
              <CheckCircle2 size={18} /> Estudado
            </button>
            <button className="button secondary" onClick={onCompartilhar}>
              <Share2 size={18} /> Compartilhar
            </button>
            <button className="button secondary" onClick={onCopiar}>
              <Copy size={18} /> Copiar resumo
            </button>
          </div>
          <div className="detail-grid">
            <Info title="Contexto" text={evento.contexto} />
            <List title="Causas" items={evento.causas} />
            <List title="Consequências e legado" items={[...evento.consequencias, evento.legado]} />
            <List
              title="Curiosidades"
              items={
                evento.curiosidades.length
                  ? evento.curiosidades
                  : ["Observe o tipo de fonte para distinguir história documentada, tradição, lenda e mito."]
              }
            />
            <Info
              title="Personagens envolvidos"
              text={evento.personagens.length ? evento.personagens.join(", ") : "Sem personagem individual destacado."}
            />
            <References title="Fontes de estudo" sources={fontesHistoricas(evento)} />
            <ImageCredit evento={evento} />
          </div>
          <div className="relation">
            {anterior && (
              <span>
                <strong>Antes:</strong> {anterior.ano} - {anterior.titulo}
              </span>
            )}
            {posterior && (
              <span>
                <strong>Depois:</strong> {posterior.ano} - {posterior.titulo}
              </span>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <h3>{title}</h3>
      <p>{text}</p>
    </section>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function References({ title, sources }: { title: string; sources: FonteReferencia[] }) {
  return (
    <section>
      <h3>{title}</h3>
      <ul className="source-list">
        {sources.map((source) => (
          <li key={source.nome}>
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.nome}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ImageCredit({ evento }: { evento: Acontecimento }) {
  const isRemote = evento.imagem.startsWith("http");
  return (
    <section>
      <h3>Imagem</h3>
      <p>{evento.creditoImagem}</p>
      {isRemote && (
        <p>
          <a href={evento.imagem} target="_blank" rel="noreferrer">
            Abrir fonte da imagem
          </a>
        </p>
      )}
    </section>
  );
}

function ComparacaoCard({ nome, dados }: { nome: string; dados: ComparadorCivilizacao }) {
  return (
    <article className="compare-card">
      <h3>{nome}</h3>
      {Object.entries(dados).map(([chave, valor]) => (
        <p key={chave}>
          <strong>{chave}:</strong> {valor}
        </p>
      ))}
    </article>
  );
}

function PersonagemCard({
  personagem,
  favorito,
  onFavorito
}: {
  personagem: Personagem;
  favorito: boolean;
  onFavorito: () => void;
}) {
  return (
    <article className="person-card">
      <PersonagemImagem personagem={personagem} />
      <div className="person-content">
        <div>
          <h3>{personagem.nome}</h3>
          <p>
            {personagem.periodo} - {personagem.origem}
          </p>
        </div>
        <p>
          <strong>Ocupação:</strong> {personagem.ocupacao}
        </p>
        <p>
          <strong>Feitos:</strong> {personagem.feitos}
        </p>
        <p>
          <strong>Impacto:</strong> {personagem.impacto}
        </p>
        <p>
          <strong>Curiosidade:</strong> {personagem.curiosidade}
        </p>
        <button className={`button secondary compact ${favorito ? "active" : ""}`} onClick={onFavorito}>
          <Heart size={16} /> Favoritar
        </button>
      </div>
    </article>
  );
}

function PersonagemImagem({ personagem }: { personagem: Personagem }) {
  const fontes = fontesPersonagem(personagem).map((source) => imagem(source));
  const [indice, setIndice] = useState(0);
  const [falhou, setFalhou] = useState(fontes.length === 0);
  const chave = fontes.join("|");

  useEffect(() => {
    setIndice(0);
    setFalhou(fontes.length === 0);
  }, [chave, fontes.length]);

  if (falhou || !fontes[indice]) {
    const iniciais = personagem.nome
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0])
      .join("");

    return (
      <div className="person-placeholder" role="img" aria-label={`Imagem indisponível para ${personagem.nome}`}>
        <span>{iniciais}</span>
        <strong>{personagem.nome}</strong>
        <small>Imagem específica indisponível</small>
      </div>
    );
  }

  return (
    <img
      src={fontes[indice]}
      alt={`Imagem de ${personagem.nome}`}
      loading="lazy"
      onError={() => {
        const proximo = indice + 1;
        if (proximo >= fontes.length) {
          setFalhou(true);
          return;
        }
        setIndice(proximo);
      }}
    />
  );
}

function SmartImage({
  sources,
  alt,
  className,
  loading = "lazy"
}: {
  sources: Array<string | undefined>;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  const lista = sources.map((source) => imagem(source)).filter(Boolean);
  const [indice, setIndice] = useState(0);
  const chave = lista.join("|");

  useEffect(() => {
    setIndice(0);
  }, [chave]);

  const atual = lista[indice] || "/assets/images/mapa-placeholder.svg";
  return (
    <img
      className={className}
      src={atual}
      alt={alt}
      loading={loading}
      onError={() => setIndice((valor) => Math.min(valor + 1, lista.length - 1))}
    />
  );
}
