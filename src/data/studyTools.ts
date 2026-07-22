export type JornadaGuiada = {
  id: string;
  titulo: string;
  resumo: string;
  objetivo: string;
  eventos: string[];
};

export type CadeiaHistorica = {
  id: string;
  titulo: string;
  explicacao: string;
  eventos: string[];
};

export type Flashcard = {
  id: string;
  frente: string;
  verso: string;
  categoria: string;
};

export type TermoGlossario = {
  termo: string;
  categoria: string;
  definicao: string;
  exemplo: string;
};

export const jornadasGuiadas: JornadaGuiada[] = [
  {
    id: "atenas-ascensao-queda",
    titulo: "Ascensão e queda de Atenas",
    resumo: "Das reformas políticas ao choque com Esparta.",
    objetivo:
      "Entender como Atenas ganhou prestígio, transformou alianças em poder e acabou derrotada na Guerra do Peloponeso.",
    eventos: [
      "atenas-reformas",
      "democracia-ateniense",
      "maratona",
      "salamina-plateia",
      "liga-delos-pericles",
      "peloponeso"
    ]
  },
  {
    id: "esparta-termopilas",
    titulo: "De Esparta às Termópilas",
    resumo: "Sociedade militarizada, falange e resistência contra Xerxes.",
    objetivo:
      "Comparar o modelo espartano com outras pólis e perceber como a batalha virou memória política e cultural.",
    eventos: ["esparta-sociedade", "revolta-jonica", "maratona", "termopilas", "salamina-plateia"]
  },
  {
    id: "alexandre-grande",
    titulo: "A vida de Alexandre, o Grande",
    resumo: "Da Macedônia à formação dos reinos helenísticos.",
    objetivo:
      "Acompanhar por que Alexandre recebeu o título de Grande e como suas conquistas mudaram o Mediterrâneo oriental.",
    eventos: [
      "macedonia-filipe",
      "alexandre-trono",
      "aristoteles-liceu",
      "alexandre-asia-isso",
      "alexandria-egito",
      "gaugamela-persia",
      "alexandre-india-morte",
      "reinos-helenisticos"
    ]
  },
  {
    id: "republica-imperio-roma",
    titulo: "Da República ao Império Romano",
    resumo: "Instituições republicanas, crise política, César, Otaviano e Augusto.",
    objetivo: "Ver a passagem gradual da República para o Principado sem tratar Roma como uma mudança instantânea.",
    eventos: [
      "republica-romana",
      "doze-tabuas",
      "expansao-italia",
      "guerras-punicas",
      "crise-republica",
      "cesar-rubicao",
      "accio-otaviano",
      "augusto-pax"
    ]
  },
  {
    id: "queda-roma",
    titulo: "Por que Roma caiu?",
    resumo: "Crises, divisão administrativa, pressões externas e continuidade oriental.",
    objetivo:
      "Revisar a queda do Ocidente como processo multicausal e lembrar que o Império do Oriente continuou existindo.",
    eventos: [
      "alto-imperio",
      "crise-seculo-iii",
      "diocleciano-constantino",
      "queda-roma-ocidente",
      "justiniano",
      "queda-constantinopla"
    ]
  },
  {
    id: "guerras-mundiais",
    titulo: "Da Primeira à Segunda Guerra Mundial",
    resumo: "Alianças, tratados, crise econômica, totalitarismos e guerra global.",
    objetivo: "Conectar 1914, Versalhes, Grande Depressão, expansionismos e os desfechos de 1945.",
    eventos: [
      "causas-ww1",
      "trincheiras",
      "verdun-somme",
      "versailles",
      "weimar-versailles",
      "crise-1929",
      "fascismo-nazismo-stalinismo",
      "polonia-1939",
      "barbarossa-pearl",
      "stalingrado-pacifico",
      "dia-d-franca",
      "hiroshima-nagasaki",
      "onu-pos-guerra"
    ]
  },
  {
    id: "filosofia-grega",
    titulo: "A evolução da filosofia grega",
    resumo: "Do mito e logos aos sistemas de Platão e Aristóteles.",
    objetivo:
      "Memorizar o encadeamento: pré-socráticos investigam a natureza, Sócrates pergunta, Platão idealiza, Aristóteles observa.",
    eventos: ["pre-socraticos", "socrates", "platao-academia", "aristoteles-liceu"]
  }
];

export const cadeiasHistoricas: CadeiaHistorica[] = [
  {
    id: "guerras-medicas-peloponeso",
    titulo: "Das Guerras Médicas ao Peloponeso",
    explicacao:
      "A vitória contra os persas elevou Atenas, mas o crescimento de seu poder dentro da Liga de Delos alimentou rivalidade com Esparta.",
    eventos: [
      "revolta-jonica",
      "maratona",
      "termopilas",
      "salamina-plateia",
      "liga-delos-pericles",
      "peloponeso",
      "macedonia-filipe"
    ]
  },
  {
    id: "roma-republica-imperio",
    titulo: "Da República ao Principado",
    explicacao:
      "A expansão romana ampliou riqueza e tensões sociais. Guerras civis e lideranças militares abriram caminho para Augusto.",
    eventos: [
      "republica-romana",
      "expansao-italia",
      "guerras-punicas",
      "crise-republica",
      "cesar-rubicao",
      "accio-otaviano",
      "augusto-pax"
    ]
  },
  {
    id: "versales-segunda-guerra",
    titulo: "De Versalhes a 1945",
    explicacao:
      "O pós-Primeira Guerra criou tensões políticas e econômicas que foram exploradas por regimes totalitários e expansionistas.",
    eventos: [
      "versailles",
      "weimar-versailles",
      "crise-1929",
      "fascismo-nazismo-stalinismo",
      "japao-apaziguamento",
      "polonia-1939",
      "queda-berlim",
      "hiroshima-nagasaki",
      "onu-pos-guerra"
    ]
  }
];

export const flashcards: Flashcard[] = [
  {
    id: "polis",
    frente: "O que era uma pólis?",
    verso: "Uma cidade-Estado grega com território, leis, cultos, instituições, exército e identidade cívica próprios.",
    categoria: "Conceito"
  },
  {
    id: "mito-historia",
    frente: "Qual é a diferença entre mito e história documentada?",
    verso:
      "Mito é narrativa simbólica e religiosa de uma tradição. História documentada depende de fontes analisáveis e crítica histórica.",
    categoria: "Método histórico"
  },
  {
    id: "agogê",
    frente: "O que era a agogê espartana?",
    verso:
      "Sistema de educação e disciplina dos jovens espartanos, voltado à formação militar e à obediência coletiva.",
    categoria: "Esparta"
  },
  {
    id: "democracia-direta",
    frente: "A democracia ateniense era igual à democracia atual?",
    verso:
      "Não. Era direta, restrita a cidadãos homens livres atenienses e excluía mulheres, escravizados e estrangeiros residentes.",
    categoria: "Atenas"
  },
  {
    id: "helenismo",
    frente: "O que foi o helenismo?",
    verso:
      "Difusão e mistura da cultura grega com tradições egípcias, persas e asiáticas após as conquistas de Alexandre.",
    categoria: "Helenismo"
  },
  {
    id: "republica-imperio",
    frente: "Qual a diferença básica entre República Romana e Império Romano?",
    verso:
      "Na República, magistrados e Senado estruturavam a política; no Império, o poder se concentrou progressivamente no imperador.",
    categoria: "Roma"
  },
  {
    id: "queda-roma",
    frente: "Roma caiu por uma única causa?",
    verso:
      "Não. A queda do Ocidente envolveu crise política, economia, guerras civis, pressões externas, fronteiras difíceis e divisão administrativa.",
    categoria: "Roma"
  },
  {
    id: "sobre-expansao",
    frente: "O que é sobre-expansão imperial?",
    verso:
      "Quando um império assume territórios, guerras e custos administrativos além da capacidade de sustentar seu poder.",
    categoria: "Impérios"
  },
  {
    id: "versalhes",
    frente: "Por que o Tratado de Versalhes importa para o século XX?",
    verso:
      "Ele encerrou formalmente a guerra com a Alemanha, redesenhou condições políticas e econômicas e alimentou tensões posteriores.",
    categoria: "Primeira Guerra"
  },
  {
    id: "holocausto",
    frente: "Como estudar o Holocausto corretamente?",
    verso:
      "Com precisão, respeito às vítimas e foco na política genocida nazista, sem transformar sofrimento em recurso decorativo.",
    categoria: "Segunda Guerra"
  }
];

export const glossario: TermoGlossario[] = [
  {
    termo: "Pólis",
    categoria: "Grécia",
    definicao: "Cidade-Estado grega com governo, leis, cultos, território e identidade política próprios.",
    exemplo: "Atenas, Esparta, Corinto e Tebas eram pólis."
  },
  {
    termo: "Helenismo",
    categoria: "Macedônia",
    definicao:
      "Processo de circulação e mistura da cultura grega com outras tradições após as conquistas de Alexandre.",
    exemplo: "Alexandria, no Egito, tornou-se símbolo do mundo helenístico."
  },
  {
    termo: "Falange",
    categoria: "Militar",
    definicao: "Formação de infantaria pesada que dependia de disciplina, escudos, lanças e ação coletiva.",
    exemplo: "Esparta e Macedônia usaram modelos de falange, com diferenças de equipamento e tática."
  },
  {
    termo: "República",
    categoria: "Política",
    definicao:
      "Forma de organização política em que cargos e instituições públicas estruturam o governo, sem monarquia hereditária direta.",
    exemplo: "A República Romana tinha cônsules, Senado, magistrados e assembleias."
  },
  {
    termo: "Império",
    categoria: "Política",
    definicao:
      "Estrutura de poder que domina vários povos ou territórios, frequentemente com centro político forte e administração ampla.",
    exemplo: "O Império Persa, o Romano e o Napoleônico tinham escalas e formas diferentes."
  },
  {
    termo: "Democracia direta",
    categoria: "Atenas",
    definicao:
      "Sistema em que cidadãos participam diretamente de decisões políticas, sem representantes como eixo principal.",
    exemplo: "Atenas praticou uma democracia direta, mas com cidadania muito limitada."
  },
  {
    termo: "Absolutismo",
    categoria: "Era Moderna",
    definicao:
      "Modelo político em que o monarca concentra grande autoridade e justifica o poder por tradição, direito dinástico ou religião.",
    exemplo: "Luís XIV e Versalhes são referências clássicas do absolutismo francês."
  },
  {
    termo: "Imperialismo",
    categoria: "Século XIX",
    definicao: "Expansão política, econômica e militar de potências sobre outros territórios e povos.",
    exemplo: "A partilha colonial da África e da Ásia marcou o imperialismo europeu."
  },
  {
    termo: "Nacionalismo",
    categoria: "Século XIX",
    definicao:
      "Ideia de pertencimento político e cultural a uma nação, que pode unir populações ou intensificar rivalidades.",
    exemplo: "O nacionalismo ajudou unificações e também agravou tensões antes de 1914."
  },
  {
    termo: "Totalitarismo",
    categoria: "Entre Guerras",
    definicao:
      "Regime que busca controlar política, sociedade, propaganda e oposição, geralmente com violência de Estado.",
    exemplo: "Nazismo, fascismo e stalinismo devem ser estudados por suas práticas repressivas e consequências humanas."
  },
  {
    termo: "Armistício",
    categoria: "Guerras Mundiais",
    definicao: "Acordo para interromper combates, sem necessariamente resolver todas as questões políticas da guerra.",
    exemplo: "O armistício de 1918 encerrou os combates da Primeira Guerra na Frente Ocidental."
  },
  {
    termo: "Sobre-expansão imperial",
    categoria: "Impérios",
    definicao: "Situação em que conquistas, fronteiras e custos superam a capacidade de manutenção do império.",
    exemplo: "A campanha da Rússia mostrou limites críticos do poder napoleônico."
  }
];
