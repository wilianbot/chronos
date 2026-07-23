import type { Deity, DeityCategory, DeityGender } from "../../types/mythology";
import { imageByDeityId, mythologySources } from "./deitySources";

type RomanInput = {
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
  plants?: string[];
  attributes?: string[];
  myths: string[];
  cult?: string;
  places?: string[];
  festivals?: string[];
  legacy?: string;
};

function roman(input: RomanInput): Deity {
  const image = imageByDeityId.get(input.id);
  return {
    id: input.id,
    name: input.name,
    alternativeNames: input.alternativeNames,
    mythology: "romana",
    culture: "Roma Antiga",
    gender: input.gender || "nao-definido",
    category: input.category,
    tags: Array.from(new Set([input.category, ...(input.tags || [])])),
    title: input.title,
    shortDescription: `${input.name} era associado a ${input.domains.slice(0, 2).join(" e ")} na religião romana.`,
    fullHistory: `${input.name} integra a religião romana, que combinava culto doméstico, ritos públicos, sacerdócios, calendário cívico e interpretações literárias. As aproximações com deuses gregos surgem por contato cultural e interpretação romana, mas não tornam as divindades idênticas em culto, função política ou história religiosa.`,
    domains: input.domains,
    symbols: input.symbols,
    sacredAnimals: input.animals,
    sacredPlants: input.plants,
    attributes: input.attributes,
    parents: input.parents,
    siblings: input.siblings,
    partners: input.partners,
    children: input.children,
    equivalentDeityIds: input.equivalentDeityIds,
    mainMyths: input.myths,
    worshipAndCult:
      input.cult ||
      "Seu culto deve ser lido dentro de práticas romanas concretas: votos, sacrifícios, templos, festivais, sacerdócios e culto doméstico ou cívico.",
    templesAndPlaces: input.places,
    festivals: input.festivals,
    historicalContext:
      "A religião romana valorizava rito correto, calendário público, proteção da cidade, autoridade familiar e relações formais entre comunidade e deuses.",
    culturalLegacy:
      input.legacy ||
      "Sua recepção posterior aparece em arte, literatura, nomes planetários, alegorias políticas e linguagem cultural europeia.",
    curiosities: [
      "Nem toda divindade romana tem equivalente grego exato.",
      "Culto romano e narrativa mítica grega não são a mesma coisa."
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

export const romanDeities: Deity[] = [
  roman({
    id: "jupiter",
    name: "Júpiter",
    gender: "masculino",
    category: "olimpico",
    tags: ["guerra"],
    title: "Deus romano do céu, do raio e da soberania pública",
    domains: ["céu", "raio", "Estado", "juramento", "vitória"],
    symbols: ["raio", "águia", "cetro"],
    partners: ["juno"],
    children: ["marte", "minerva"],
    equivalentDeityIds: ["zeus"],
    animals: ["águia"],
    myths: ["Júpiter Capitolino", "proteção do Estado romano", "juramentos públicos"],
    cult: "Júpiter Optimus Maximus era central no Capitólio e no imaginário político romano.",
    places: ["Capitólio", "Templo de Júpiter Optimus Maximus"],
    festivals: ["Ludi Romani"]
  }),
  roman({
    id: "juno",
    name: "Juno",
    gender: "feminino",
    category: "olimpico",
    title: "Deusa do casamento, das mulheres e da comunidade romana",
    domains: ["casamento", "mulheres", "proteção cívica", "nascimento"],
    symbols: ["pavão", "diadema", "cetro"],
    partners: ["jupiter"],
    children: ["marte", "vulcano"],
    equivalentDeityIds: ["hera"],
    animals: ["pavão"],
    myths: ["Juno Regina", "Juno Moneta", "proteção das mulheres romanas"],
    places: ["Capitólio", "Templo de Juno Moneta"],
    festivals: ["Matronalia"]
  }),
  roman({
    id: "netuno",
    name: "Netuno",
    gender: "masculino",
    category: "olimpico",
    tags: ["natureza"],
    title: "Deus romano das águas e, por aproximação, do mar",
    domains: ["águas", "mar", "cavalos", "navegação"],
    symbols: ["tridente", "cavalo", "golfinho"],
    equivalentDeityIds: ["poseidon"],
    animals: ["cavalo", "golfinho"],
    myths: ["Netunália", "aproximação com Poseidon", "proteção de águas e navegação"],
    festivals: ["Neptunalia"]
  }),
  roman({
    id: "plutao",
    name: "Plutão",
    alternativeNames: ["Dis Pater"],
    gender: "masculino",
    category: "ctonico",
    tags: ["morte"],
    title: "Senhor romano das riquezas subterrâneas e do mundo inferior",
    domains: ["submundo", "riqueza", "mortos", "solo profundo"],
    symbols: ["cérbero", "cornucópia", "chave"],
    partners: ["proserpina"],
    equivalentDeityIds: ["hades"],
    myths: ["Prosérpina e o retorno sazonal", "cultos ctônicos", "Dis Pater"],
    places: ["santuários subterrâneos", "tradições dos jogos seculares"]
  }),
  roman({
    id: "minerva",
    name: "Minerva",
    gender: "feminino",
    category: "olimpico",
    tags: ["sabedoria", "guerra"],
    title: "Deusa romana das técnicas, artes, sabedoria e estratégia",
    domains: ["sabedoria", "artes", "técnica", "estratégia", "escola"],
    symbols: ["coruja", "lança", "égide"],
    parents: ["jupiter"],
    equivalentDeityIds: ["atena"],
    animals: ["coruja"],
    myths: ["tríade capitolina", "patrocínio de artesãos", "Quinquatria"],
    festivals: ["Quinquatria"],
    places: ["Capitólio", "Aventino"]
  }),
  roman({
    id: "marte",
    name: "Marte",
    gender: "masculino",
    category: "olimpico",
    tags: ["guerra", "agricola"],
    title: "Deus romano da guerra, da proteção cívica e de antigas funções agrárias",
    domains: ["guerra", "proteção da cidade", "juventude armada", "agricultura antiga"],
    symbols: ["lança", "escudo", "lobo", "pica-pau"],
    parents: ["jupiter", "juno"],
    children: ["romulo", "remo"],
    equivalentDeityIds: ["ares"],
    animals: ["lobo", "pica-pau"],
    myths: ["pai de Rômulo e Remo", "Marte Gradivo", "campanhas militares"],
    festivals: ["Equirria", "Armilustrium"],
    places: ["Campo de Marte"]
  }),
  roman({
    id: "apolo-romano",
    name: "Apolo",
    gender: "masculino",
    category: "olimpico",
    tags: ["cura", "sabedoria"],
    title: "Deus de origem grega integrado ao culto romano da cura, profecia e artes",
    domains: ["cura", "profecia", "música", "purificação"],
    symbols: ["lira", "loureiro", "arco"],
    equivalentDeityIds: ["apolo-grego"],
    myths: ["culto apolíneo em Roma", "Apolo Palatino", "Jogos Apolinares"],
    festivals: ["Ludi Apollinares"],
    places: ["Templo de Apolo Palatino"]
  }),
  roman({
    id: "diana",
    name: "Diana",
    gender: "feminino",
    category: "olimpico",
    tags: ["natureza"],
    title: "Deusa romana da caça, bosques, lua e proteção de mulheres",
    domains: ["caça", "bosques", "lua", "passagens femininas"],
    symbols: ["arco", "cervo", "lua"],
    equivalentDeityIds: ["artemis"],
    animals: ["cervo"],
    myths: ["Diana Nemorensis", "culto no Aventino", "aproximação com Ártemis"],
    places: ["Lago Nemi", "Aventino"]
  }),
  roman({
    id: "venus",
    name: "Vênus",
    gender: "feminino",
    category: "olimpico",
    tags: ["amor"],
    title: "Deusa romana do amor, fertilidade, encanto e ancestralidade juliana",
    domains: ["amor", "beleza", "fertilidade", "linhagem", "vitória"],
    symbols: ["pomba", "mirto", "concha"],
    partners: ["vulcano", "marte"],
    children: ["cupido", "eneias"],
    equivalentDeityIds: ["afrodite"],
    animals: ["pomba"],
    plants: ["mirto", "rosa"],
    myths: ["Vênus Genetrix", "ancestralidade de Eneias", "culto político de César"],
    places: ["Templo de Vênus Genetrix"]
  }),
  roman({
    id: "mercurio",
    name: "Mercúrio",
    gender: "masculino",
    category: "olimpico",
    tags: ["liminar"],
    title: "Deus romano do comércio, ganho, trânsito e mensagens",
    domains: ["comércio", "lucro", "mensagens", "viagens"],
    symbols: ["caduceu", "bolsa", "sandálias aladas"],
    equivalentDeityIds: ["hermes"],
    myths: ["Mercuralia", "proteção de mercadores", "aproximação com Hermes"],
    festivals: ["Mercuralia"]
  }),
  roman({
    id: "vulcano",
    name: "Vulcano",
    gender: "masculino",
    category: "olimpico",
    title: "Deus romano do fogo destrutivo e da forja",
    domains: ["fogo", "forja", "incêndios", "metalurgia"],
    symbols: ["martelo", "tenaz", "bigorna"],
    partners: ["venus"],
    equivalentDeityIds: ["hefesto"],
    myths: ["Vulcanalia", "controle ritual do fogo", "aproximação com Hefesto"],
    festivals: ["Vulcanalia"]
  }),
  roman({
    id: "baco",
    name: "Baco",
    alternativeNames: ["Liber"],
    gender: "masculino",
    category: "olimpico",
    tags: ["natureza"],
    title: "Deus do vinho, êxtase e liberdade ritual",
    domains: ["vinho", "êxtase", "teatro", "liberdade"],
    symbols: ["taça", "videira", "tirso"],
    equivalentDeityIds: ["dionisio"],
    plants: ["videira"],
    myths: ["Bacchanalia", "cultos báquicos", "senatus consultum de Bacchanalibus"],
    festivals: ["Liberalia", "Bacchanalia"]
  }),
  roman({
    id: "ceres",
    name: "Ceres",
    gender: "feminino",
    category: "agricola",
    tags: ["natureza"],
    title: "Deusa romana dos cereais, plebe e fertilidade agrícola",
    domains: ["cereais", "agricultura", "fertilidade", "abastecimento"],
    symbols: ["trigo", "tocha", "cornucópia"],
    children: ["proserpina"],
    equivalentDeityIds: ["demeter"],
    plants: ["trigo", "papoula"],
    myths: ["Cerealia", "culto plebeu no Aventino", "Prosérpina"],
    festivals: ["Cerealia"],
    places: ["Aventino"]
  }),
  roman({
    id: "proserpina",
    name: "Prosérpina",
    gender: "feminino",
    category: "ctonico",
    tags: ["morte", "agricola"],
    title: "Deusa romana ligada ao submundo e ao retorno sazonal",
    domains: ["submundo", "renovação", "primavera", "mistérios"],
    symbols: ["romã", "tocha", "flores"],
    parents: ["ceres"],
    partners: ["plutao"],
    equivalentDeityIds: ["persefone"],
    myths: ["rapto por Plutão", "cultos de Ceres e Prosérpina", "ciclo agrícola"]
  }),
  roman({
    id: "vesta",
    name: "Vesta",
    gender: "feminino",
    category: "domestico",
    title: "Deusa romana do fogo sagrado, lar e continuidade da cidade",
    domains: ["fogo sagrado", "lar", "Estado", "continuidade ritual"],
    symbols: ["chama", "lareira", "véu"],
    equivalentDeityIds: ["hestia"],
    myths: ["Virgens Vestais", "fogo sagrado de Roma", "Vestalia"],
    festivals: ["Vestalia"],
    places: ["Templo de Vesta", "Fórum Romano"]
  }),
  roman({
    id: "saturno",
    name: "Saturno",
    gender: "masculino",
    category: "tita",
    tags: ["agricola"],
    title: "Deus romano da semeadura, do tempo antigo e da Idade de Ouro",
    domains: ["semeadura", "Idade de Ouro", "tempo antigo", "abundância"],
    symbols: ["foice", "manto", "sementes"],
    partners: ["ops"],
    children: ["jupiter", "juno", "netuno", "plutao", "ceres", "vesta"],
    equivalentDeityIds: ["cronos"],
    myths: ["Saturnália", "reinado da Idade de Ouro", "identificação com Cronos"],
    festivals: ["Saturnalia"],
    places: ["Templo de Saturno"]
  }),
  roman({
    id: "ops",
    name: "Ops",
    gender: "feminino",
    category: "agricola",
    tags: ["natureza"],
    title: "Deusa romana da abundância, recursos e fertilidade",
    domains: ["abundância", "fertilidade", "recursos", "colheita"],
    symbols: ["cornucópia", "trigo", "cesta"],
    partners: ["saturno"],
    children: ["jupiter", "juno", "netuno", "plutao", "ceres", "vesta"],
    equivalentDeityIds: ["reia"],
    myths: ["Opiconsivia", "consorte de Saturno", "abundância agrícola"],
    festivals: ["Opiconsivia"]
  }),
  roman({
    id: "cupido",
    name: "Cupido",
    gender: "masculino",
    category: "personificacao",
    tags: ["amor"],
    title: "Divindade romana do desejo amoroso",
    domains: ["amor", "desejo", "atração"],
    symbols: ["arco", "flechas", "asas"],
    parents: ["venus", "marte"],
    equivalentDeityIds: ["eros"],
    myths: ["Cupido e Psiquê", "séquito de Vênus", "poder das flechas amorosas"]
  }),
  roman({
    id: "vitoria",
    name: "Vitória",
    gender: "feminino",
    category: "personificacao",
    title: "Personificação romana da vitória militar e política",
    domains: ["vitória", "triunfo", "poder imperial"],
    symbols: ["asas", "palma", "coroa"],
    equivalentDeityIds: ["nike"],
    myths: ["Altar da Vitória", "triunfos romanos", "iconografia imperial"]
  }),
  roman({
    id: "fortuna",
    name: "Fortuna",
    gender: "feminino",
    category: "personificacao",
    title: "Deusa romana da sorte, destino instável e prosperidade",
    domains: ["sorte", "destino", "prosperidade", "risco"],
    symbols: ["roda", "cornucópia", "leme"],
    myths: ["Fortuna Primigenia", "mudança da sorte", "cultos públicos e privados"],
    places: ["Praeneste"]
  }),
  roman({
    id: "jano",
    name: "Jano",
    gender: "masculino",
    category: "liminar",
    title: "Deus romano das portas, começos, passagens e transições",
    domains: ["portas", "começos", "passagens", "tempo cívico"],
    symbols: ["duas faces", "chave", "porta"],
    myths: ["Janus Geminus", "abertura ritual em guerra", "calendas e começos"],
    places: ["Fórum Romano"]
  }),
  roman({
    id: "quirino",
    name: "Quirino",
    gender: "masculino",
    category: "guerra",
    title: "Antiga divindade romana associada ao povo quirite e a Rômulo divinizado",
    domains: ["comunidade cívica", "cidadãos", "fundação", "guerra arcaica"],
    symbols: ["lança", "cidadão armado"],
    myths: ["Rômulo divinizado", "tríade arcaica", "Quirinalia"],
    festivals: ["Quirinalia"],
    places: ["Monte Quirinal"]
  }),
  roman({
    id: "bellona",
    name: "Bellona",
    gender: "feminino",
    category: "guerra",
    title: "Deusa romana da guerra, fúria marcial e declaração ritual de conflito",
    domains: ["guerra", "fúria", "sangue", "declaração militar"],
    symbols: ["espada", "tocha", "capacete"],
    myths: ["culto guerreiro", "relações com Marte", "ritos de declaração de guerra"],
    places: ["Templo de Bellona"]
  }),
  roman({
    id: "fauno",
    name: "Fauno",
    gender: "masculino",
    category: "natureza",
    title: "Divindade itálica dos campos, bosques, rebanhos e profecia rústica",
    domains: ["campos", "bosques", "rebanhos", "profecia"],
    symbols: ["pele animal", "flauta", "cabra"],
    equivalentDeityIds: ["pan"],
    animals: ["cabra"],
    myths: ["Lupercalia", "Fauno e os pastores", "assimilação parcial a Pan"],
    festivals: ["Lupercalia"]
  }),
  roman({
    id: "lares",
    name: "Lares",
    gender: "outro",
    category: "domestico",
    title: "Divindades protetoras do lar, caminhos, família e lugares",
    domains: ["lar", "ancestralidade", "proteção doméstica", "lugares"],
    symbols: ["larário", "taça", "dança ritual"],
    myths: ["culto doméstico diário", "Lares Compitales", "proteção da casa"],
    places: ["larários domésticos", "encruzilhadas"]
  }),
  roman({
    id: "penates",
    name: "Penates",
    gender: "outro",
    category: "domestico",
    title: "Divindades protetoras da despensa, provisões e continuidade familiar",
    domains: ["provisões", "despensa", "família", "continuidade doméstica"],
    symbols: ["larário", "alimentos", "pequenas estátuas"],
    myths: ["culto doméstico", "Penates públicos de Roma", "tradições de Eneias"],
    places: ["casas romanas", "santuários públicos"]
  })
];
