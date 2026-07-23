import type { Deity, DeityCategory, DeityGender } from "../../types/mythology";
import { imageByDeityId, mythologySources } from "./deitySources";

type GreekInput = {
  id: string;
  name: string;
  alternativeNames?: string[];
  gender?: DeityGender;
  category: DeityCategory;
  tags?: DeityCategory[];
  title: string;
  domains: string[];
  symbols: string[];
  parents?: string[];
  siblings?: string[];
  partners?: string[];
  children?: string[];
  equivalentDeityIds?: string[];
  animals?: string[];
  sacredPlants?: string[];
  attributes?: string[];
  myths: string[];
  cult?: string;
  places?: string[];
  legacy?: string;
};

function greek(input: GreekInput): Deity {
  const image = imageByDeityId.get(input.id);
  return {
    id: input.id,
    name: input.name,
    alternativeNames: input.alternativeNames,
    mythology: "grega",
    culture: "Grécia Antiga",
    gender: input.gender || "nao-definido",
    category: input.category,
    tags: Array.from(new Set([input.category, ...(input.tags || [])])),
    title: input.title,
    shortDescription: `${input.name} é associado a ${input.domains.slice(0, 2).join(" e ")} nas tradições gregas.`,
    fullHistory: `${input.name} pertence ao repertório mítico e religioso grego, preservado em versões que variam conforme poeta, cidade, culto e época. ${input.title}. A genealogia apresentada aqui é uma síntese didática, não uma versão universal: autores como Hesíodo, Homero, tragédias áticas e tradições locais podiam organizar parentescos e episódios de modos diferentes.`,
    domains: input.domains,
    symbols: input.symbols,
    sacredAnimals: input.animals,
    sacredPlants: input.sacredPlants,
    attributes: input.attributes,
    parents: input.parents,
    siblings: input.siblings,
    partners: input.partners,
    children: input.children,
    equivalentDeityIds: input.equivalentDeityIds,
    mainMyths: input.myths,
    worshipAndCult:
      input.cult ||
      "Seu culto variava regionalmente, com epítetos, festivais, oferendas e funções cívicas específicas. Mito literário e prática religiosa não devem ser tratados como a mesma coisa.",
    templesAndPlaces: input.places,
    historicalContext:
      "A religião grega antiga não possuía um livro sagrado único. Mitos eram transmitidos por poesia, teatro, rituais, imagens e tradições locais.",
    culturalLegacy:
      input.legacy ||
      "Sua imagem permaneceu influente em literatura, filosofia, artes visuais, astronomia, psicologia e cultura política posteriores.",
    curiosities: [
      "Há versões concorrentes dos mitos.",
      "Correspondências romanas são aproximações culturais, não identidades exatas."
    ],
    image: image || {
      src: "/assets/images/mapa-placeholder.svg",
      alt: `Imagem indisponível para ${input.name}`,
      fit: "contain",
      position: "center"
    },
    sources: mythologySources,
    sourceType: "religiao"
  };
}

export const greekDeities: Deity[] = [
  greek({
    id: "zeus",
    name: "Zeus",
    gender: "masculino",
    category: "olimpico",
    tags: ["guerra"],
    title: "Soberano olímpico do céu, do trovão e da ordem jurada",
    domains: ["céu", "trovão", "soberania", "juramentos", "hospitalidade"],
    symbols: ["raio", "águia", "carvalho", "cetro"],
    parents: ["cronos", "reia"],
    siblings: ["hera", "poseidon", "hades", "demeter", "hestia"],
    partners: ["hera"],
    children: ["atena", "ares", "apolo-grego", "artemis", "hermes", "dionisio"],
    equivalentDeityIds: ["jupiter"],
    animals: ["águia", "touro"],
    myths: ["Titanomaquia", "partilha do cosmos", "nascimento de Atena", "mitos de hospitalidade violada"],
    cult: "Recebia culto pan-helênico em Olímpia e cultos locais como Zeus Xenios, Zeus Horkios e Zeus Polieus.",
    places: ["Olímpia", "Dodona", "Monte Olimpo"]
  }),
  greek({
    id: "hera",
    name: "Hera",
    gender: "feminino",
    category: "olimpico",
    title: "Rainha olímpica ligada ao casamento, linhagem e legitimidade",
    domains: ["casamento", "família", "realeza", "nascimento legítimo"],
    symbols: ["pavão", "diadema", "cetro", "romã"],
    parents: ["cronos", "reia"],
    siblings: ["zeus", "poseidon", "hades", "demeter", "hestia"],
    partners: ["zeus"],
    children: ["ares", "hefesto"],
    equivalentDeityIds: ["juno"],
    animals: ["pavão", "vaca"],
    myths: ["julgamento de Páris", "perseguições a Héracles", "conflitos conjugais de Zeus"],
    places: ["Argos", "Samos", "Olímpia"]
  }),
  greek({
    id: "poseidon",
    name: "Poseidon",
    gender: "masculino",
    category: "olimpico",
    tags: ["natureza"],
    title: "Senhor do mar, dos terremotos e dos cavalos",
    domains: ["mar", "terremotos", "cavalos", "navegação"],
    symbols: ["tridente", "cavalo", "golfinho"],
    parents: ["cronos", "reia"],
    siblings: ["zeus", "hades", "hera", "demeter", "hestia"],
    partners: ["anfhitrite"],
    children: ["tritao"],
    equivalentDeityIds: ["netuno"],
    animals: ["cavalo", "golfinho", "touro"],
    myths: ["disputa por Atenas", "ira contra Odisseu", "muralhas de Troia"],
    places: ["Ísthmia", "Cabo Súnio"]
  }),
  greek({
    id: "hades",
    name: "Hades",
    gender: "masculino",
    category: "ctonico",
    tags: ["morte"],
    title: "Governante do mundo dos mortos e das riquezas subterrâneas",
    domains: ["submundo", "mortos", "riqueza mineral", "invisibilidade"],
    symbols: ["cérbero", "elmo", "chave", "cornucópia"],
    parents: ["cronos", "reia"],
    siblings: ["zeus", "poseidon", "hera", "demeter", "hestia"],
    partners: ["persefone"],
    equivalentDeityIds: ["plutao"],
    animals: ["cão"],
    myths: ["rapto de Perséfone", "descidas heroicas ao submundo", "Orfeu e Eurídice"],
    places: ["Eleusis", "Nekromanteion de Aqueronte"]
  }),
  greek({
    id: "atena",
    name: "Atena",
    alternativeNames: ["Pallas Athena"],
    gender: "feminino",
    category: "olimpico",
    tags: ["sabedoria", "guerra"],
    title: "Deusa da sabedoria estratégica, das técnicas e da proteção cívica",
    domains: ["sabedoria", "estratégia", "artesanato", "cidade", "guerra defensiva"],
    symbols: ["coruja", "oliveira", "égide", "lança"],
    parents: ["zeus", "metis"],
    siblings: ["ares", "apolo-grego", "artemis", "hermes", "dionisio"],
    equivalentDeityIds: ["minerva"],
    animals: ["coruja", "serpente"],
    myths: ["nascimento da cabeça de Zeus", "disputa com Poseidon", "auxílio a Odisseu", "Aracne"],
    cult: "Atena Polias e Atena Parthenos eram centrais para a identidade cívica ateniense.",
    places: ["Acrópole de Atenas", "Partenon"]
  }),
  greek({
    id: "ares",
    name: "Ares",
    gender: "masculino",
    category: "olimpico",
    tags: ["guerra"],
    title: "Deus da violência bélica e do ímpeto marcial",
    domains: ["guerra", "violência", "coragem bruta"],
    symbols: ["lança", "escudo", "javali", "cão"],
    parents: ["zeus", "hera"],
    siblings: ["atena", "hefesto"],
    partners: ["afrodite"],
    children: ["eros"],
    equivalentDeityIds: ["marte"],
    animals: ["javali", "cão", "abutre"],
    myths: ["Ares e Afrodite", "julgamento no Areópago", "Guerra de Troia"]
  }),
  greek({
    id: "apolo-grego",
    name: "Apolo",
    gender: "masculino",
    category: "olimpico",
    tags: ["cura", "sabedoria"],
    title: "Deus da profecia, música, cura e purificação",
    domains: ["oráculos", "música", "cura", "arco", "purificação"],
    symbols: ["lira", "loureiro", "arco", "sol"],
    parents: ["zeus", "leto"],
    siblings: ["artemis"],
    children: ["asclepio"],
    equivalentDeityIds: ["apolo-romano"],
    animals: ["corvo", "cisne", "golfinho"],
    sacredPlants: ["loureiro"],
    myths: ["nascimento em Delos", "morte da serpente Píton", "Dafne", "Marsias"],
    places: ["Delfos", "Delos"]
  }),
  greek({
    id: "artemis",
    name: "Ártemis",
    gender: "feminino",
    category: "olimpico",
    tags: ["natureza"],
    title: "Deusa da caça, da vida selvagem e das passagens da juventude",
    domains: ["caça", "animais selvagens", "parto", "juventude", "lua"],
    symbols: ["arco", "cervo", "lua crescente"],
    parents: ["zeus", "leto"],
    siblings: ["apolo-grego"],
    equivalentDeityIds: ["diana"],
    animals: ["cervo", "urso"],
    myths: ["Acteão", "Ifigênia", "Órion"],
    places: ["Éfeso", "Brauron", "Delos"]
  }),
  greek({
    id: "afrodite",
    name: "Afrodite",
    gender: "feminino",
    category: "olimpico",
    tags: ["amor"],
    title: "Deusa do amor, desejo, beleza e poder de atração",
    domains: ["amor", "desejo", "beleza", "sexualidade", "união"],
    symbols: ["pomba", "concha", "mirto", "rosa"],
    partners: ["hefesto", "ares"],
    children: ["eros"],
    equivalentDeityIds: ["venus"],
    animals: ["pomba", "cisne", "pardal"],
    sacredPlants: ["mirto", "rosa"],
    myths: ["nascimento da espuma", "julgamento de Páris", "Adônis", "Ares e Afrodite"],
    places: ["Chipre", "Citera", "Corinto"]
  }),
  greek({
    id: "hermes",
    name: "Hermes",
    gender: "masculino",
    category: "olimpico",
    tags: ["liminar"],
    title: "Mensageiro divino, guia de viajantes e condutor de almas",
    domains: ["mensagens", "comércio", "estradas", "limites", "psicopompo"],
    symbols: ["caduceu", "sandálias aladas", "pétaso"],
    parents: ["zeus", "maia"],
    children: ["pan"],
    equivalentDeityIds: ["mercurio"],
    animals: ["tartaruga", "carneiro"],
    myths: ["roubo do gado de Apolo", "invenção da lira", "guia de heróis"],
    places: ["Arcádia", "estradas e marcos de fronteira"]
  }),
  greek({
    id: "hefesto",
    name: "Hefesto",
    gender: "masculino",
    category: "olimpico",
    title: "Deus do fogo técnico, da metalurgia e dos artesãos",
    domains: ["fogo", "forja", "metalurgia", "artesanato", "engenho"],
    symbols: ["martelo", "bigorna", "tenaz"],
    parents: ["hera"],
    partners: ["afrodite"],
    equivalentDeityIds: ["vulcano"],
    myths: ["queda do Olimpo", "rede de Hefesto", "armas de Aquiles", "Pandora"],
    places: ["Lemnos", "Atenas"]
  }),
  greek({
    id: "dionisio",
    name: "Dionísio",
    gender: "masculino",
    category: "olimpico",
    tags: ["natureza"],
    title: "Deus do vinho, êxtase ritual, teatro e transformação",
    domains: ["vinho", "teatro", "êxtase", "vegetação", "máscara"],
    symbols: ["tirso", "videira", "máscara", "pantera"],
    parents: ["zeus", "semele"],
    equivalentDeityIds: ["baco"],
    animals: ["pantera", "touro"],
    sacredPlants: ["videira", "hera"],
    myths: ["nascimento de Sêmele", "Penteu", "Ariadne", "piratas transformados em golfinhos"],
    places: ["Tebas", "Naxos", "Atenas"]
  }),
  greek({
    id: "demeter",
    name: "Deméter",
    gender: "feminino",
    category: "olimpico",
    tags: ["agricola", "natureza"],
    title: "Deusa dos cereais, da fertilidade agrícola e dos ciclos sazonais",
    domains: ["agricultura", "cereais", "fertilidade", "estações"],
    symbols: ["trigo", "tocha", "porco", "cornucópia"],
    parents: ["cronos", "reia"],
    siblings: ["zeus", "hera", "poseidon", "hades", "hestia"],
    children: ["persefone"],
    equivalentDeityIds: ["ceres"],
    animals: ["porco", "serpente"],
    sacredPlants: ["trigo", "papoula"],
    myths: ["busca por Perséfone", "mistérios de Elêusis", "Triptolemo"],
    places: ["Elêusis", "Sicília"]
  }),
  greek({
    id: "persefone",
    name: "Perséfone",
    alternativeNames: ["Kore"],
    gender: "feminino",
    category: "ctonico",
    tags: ["morte", "agricola"],
    title: "Rainha do submundo e figura dos retornos sazonais",
    domains: ["submundo", "primavera", "renovação", "mistérios"],
    symbols: ["romã", "tocha", "flores"],
    parents: ["zeus", "demeter"],
    partners: ["hades"],
    equivalentDeityIds: ["proserpina"],
    sacredPlants: ["romã", "narciso"],
    myths: ["rapto por Hades", "retorno periódico", "mistérios de Elêusis"],
    places: ["Elêusis", "Sicília"]
  }),
  greek({
    id: "hestia",
    name: "Héstia",
    gender: "feminino",
    category: "olimpico",
    tags: ["domestico"],
    title: "Deusa da lareira, do centro doméstico e do fogo comunitário",
    domains: ["lareira", "casa", "cidade", "fogo ritual"],
    symbols: ["chama", "lareira", "véu"],
    parents: ["cronos", "reia"],
    siblings: ["zeus", "hera", "poseidon", "hades", "demeter"],
    equivalentDeityIds: ["vesta"],
    myths: ["lugar no Olimpo", "votos de virgindade", "fogo comum da pólis"],
    places: ["lareiras domésticas", "pritaneus cívicos"]
  }),
  greek({
    id: "cronos",
    name: "Cronos",
    gender: "masculino",
    category: "tita",
    title: "Titã associado à geração anterior aos olímpicos",
    domains: ["tempo mítico", "realeza titânica", "sucessão divina"],
    symbols: ["foice", "pedra", "colheita"],
    parents: ["gaia", "urano"],
    partners: ["reia"],
    children: ["zeus", "hera", "poseidon", "hades", "demeter", "hestia"],
    equivalentDeityIds: ["saturno"],
    myths: ["castração de Urano", "devoração dos filhos", "Titanomaquia"],
    places: ["Olímpia", "tradições da Idade de Ouro"]
  }),
  greek({
    id: "reia",
    name: "Reia",
    gender: "feminino",
    category: "tita",
    title: "Titânide mãe de importantes deuses olímpicos",
    domains: ["maternidade divina", "continuidade geracional", "montanhas"],
    symbols: ["leão", "tambor", "coroa mural"],
    parents: ["gaia", "urano"],
    partners: ["cronos"],
    children: ["zeus", "hera", "poseidon", "hades", "demeter", "hestia"],
    equivalentDeityIds: ["ops"],
    animals: ["leão"],
    myths: ["salvação de Zeus", "pedra entregue a Cronos", "mãe dos olímpicos"],
    places: ["Creta", "Monte Ida"]
  }),
  greek({
    id: "gaia",
    name: "Gaia",
    gender: "feminino",
    category: "primordial",
    tags: ["natureza"],
    title: "Terra primordial e matriz genealógica do cosmos mítico",
    domains: ["terra", "origem", "fertilidade primordial", "profecia antiga"],
    symbols: ["terra", "frutos", "serpente"],
    children: ["urano", "cronos", "reia"],
    myths: ["cosmogonia de Hesíodo", "nascimento de Urano", "queda de Urano", "geração dos Titãs"],
    places: ["Delfos em tradições antigas", "santuários ctônicos"]
  }),
  greek({
    id: "urano",
    name: "Urano",
    gender: "masculino",
    category: "primordial",
    title: "Céu primordial e ancestral dos Titãs",
    domains: ["céu", "cosmos primordial", "geração divina"],
    symbols: ["abóbada celeste", "estrelas"],
    parents: ["gaia"],
    partners: ["gaia"],
    children: ["cronos", "reia"],
    myths: ["união de Céu e Terra", "castração por Cronos", "origem de Afrodite em algumas versões"]
  }),
  greek({
    id: "prometeu",
    name: "Prometeu",
    gender: "masculino",
    category: "tita",
    tags: ["heroi-divinizado", "sabedoria"],
    title: "Titã benfeitor associado ao fogo e à astúcia cultural",
    domains: ["fogo", "técnica", "previsão", "humanidade"],
    symbols: ["tocha", "correntes", "águia"],
    parents: ["iapeto", "climene"],
    equivalentDeityIds: [],
    myths: ["roubo do fogo", "sacrifício de Mecone", "castigo no Cáucaso", "libertação por Héracles"],
    legacy: "Tornou-se símbolo moderno de técnica, rebeldia, sofrimento e ambivalência do progresso."
  }),
  greek({
    id: "hecate",
    name: "Hécate",
    gender: "feminino",
    category: "ctonico",
    tags: ["liminar"],
    title: "Deusa das encruzilhadas, limiares, noite e poderes ambíguos",
    domains: ["encruzilhadas", "limiares", "magia", "noite", "proteção"],
    symbols: ["tochas", "chaves", "cães", "tríplice forma"],
    animals: ["cão"],
    myths: ["busca de Deméter por Perséfone", "cultos em encruzilhadas", "associações mágicas tardias"],
    places: ["Lagina", "encruzilhadas"]
  }),
  greek({
    id: "nemesis",
    name: "Nêmesis",
    gender: "feminino",
    category: "personificacao",
    title: "Personificação da retribuição contra excesso e arrogância",
    domains: ["retribuição", "equilíbrio", "limite", "justiça distributiva"],
    symbols: ["roda", "balança", "freio", "espada"],
    myths: ["punição da hybris", "Narciso", "culto em Ramnunte"],
    places: ["Ramnunte"]
  }),
  greek({
    id: "nike",
    name: "Nike",
    gender: "feminino",
    category: "personificacao",
    title: "Personificação alada da vitória",
    domains: ["vitória", "glória", "triunfo"],
    symbols: ["asas", "coroa", "palma"],
    parents: ["palas", "estige"],
    equivalentDeityIds: ["vitoria"],
    myths: ["aliança com Zeus na Titanomaquia", "vitórias militares e atléticas"],
    places: ["Acrópole de Atenas"]
  }),
  greek({
    id: "eros",
    name: "Eros",
    gender: "masculino",
    category: "personificacao",
    tags: ["amor"],
    title: "Força do desejo amoroso e da atração",
    domains: ["amor", "desejo", "atração", "fecundidade"],
    symbols: ["arco", "flechas", "asas"],
    parents: ["ares", "afrodite"],
    equivalentDeityIds: ["cupido"],
    myths: ["Eros cosmogônico em algumas tradições", "Eros e Psiquê", "séquito de Afrodite"]
  }),
  greek({
    id: "hipnos",
    name: "Hipnos",
    gender: "masculino",
    category: "personificacao",
    title: "Personificação do sono",
    domains: ["sono", "repouso", "sonhos"],
    symbols: ["papoula", "asas", "chifre de sono"],
    siblings: ["tanatos"],
    myths: ["Sono de Zeus na Ilíada", "morada próxima ao mundo noturno"],
    sacredPlants: ["papoula"]
  }),
  greek({
    id: "tanatos",
    name: "Tânatos",
    gender: "masculino",
    category: "personificacao",
    tags: ["morte"],
    title: "Personificação da morte não violenta",
    domains: ["morte", "fim da vida", "passagem"],
    symbols: ["asas", "tocha invertida", "espada"],
    siblings: ["hipnos"],
    myths: ["Sísifo acorrenta Tânatos", "corpo de Sarpédon levado por Sono e Morte"]
  }),
  greek({
    id: "asclepio",
    name: "Asclépio",
    gender: "masculino",
    category: "heroi-divinizado",
    tags: ["cura"],
    title: "Herói divinizado e deus da medicina",
    domains: ["cura", "medicina", "sonhos terapêuticos"],
    symbols: ["bastão com serpente", "serpente", "taça"],
    parents: ["apolo-grego", "coronis"],
    children: ["higieia", "panaceia"],
    animals: ["serpente"],
    myths: ["aprendizado da medicina", "ressurreições e punição por Zeus", "culto incubatório"],
    places: ["Epidauro", "Cós", "Pérgamo"]
  }),
  greek({
    id: "pan",
    name: "Pan",
    gender: "masculino",
    category: "natureza",
    title: "Deus rústico dos pastores, montanhas, música e natureza selvagem",
    domains: ["pastores", "montanhas", "música", "natureza selvagem", "pânico"],
    symbols: ["flauta de pã", "chifres", "cajado"],
    parents: ["hermes"],
    animals: ["cabra"],
    myths: ["Siringe", "pânico em batalhas", "cultos arcádicos"],
    places: ["Arcádia", "grutas rústicas"]
  })
];
