import type { MythologicalEntity } from "../../types/mythologyTree";
import { defaultGreekTreeSources } from "./mythologySources";

const heroImage = {
  src: "/assets/images/mapa-placeholder.svg",
  alt: "Imagem de apoio para entidade mitológica ainda sem obra local validada",
  fit: "contain" as const,
  position: "center"
};

function greekHero(
  entity: Omit<MythologicalEntity, "mythology" | "culture" | "sources" | "image">
): MythologicalEntity {
  return {
    mythology: "grega",
    culture: "Tradições gregas antigas",
    sources: defaultGreekTreeSources,
    image: heroImage,
    ...entity
  };
}

export const greekHeroes: MythologicalEntity[] = [
  greekHero({
    id: "heracles",
    name: "Héracles",
    alternativeNames: ["Herakles", "Hercules"],
    entityType: "demigod",
    categories: ["heroic"],
    title: "Semideus e herói dos doze trabalhos",
    shortDescription: "Filho de Zeus e Alcmena em tradições recorrentes; tornou-se modelo heroico pan-helênico.",
    pageRoute: "/mitologia/entidades/heracles"
  }),
  greekHero({
    id: "perseu",
    name: "Perseu",
    entityType: "demigod",
    categories: ["heroic"],
    title: "Herói ligado à morte da Medusa",
    shortDescription: "Tradicionalmente filho de Zeus e Dânae, ligado ao ciclo de Argos e à linhagem de Héracles.",
    pageRoute: "/mitologia/entidades/perseu"
  }),
  greekHero({
    id: "aquiles",
    name: "Aquiles",
    entityType: "demigod",
    categories: ["heroic"],
    title: "Herói da Ilíada",
    shortDescription: "Filho de Peleu e da deusa Tétis; sua condição heroica não equivale a culto divino universal.",
    pageRoute: "/herois/aquiles"
  }),
  greekHero({
    id: "teseu",
    name: "Teseu",
    entityType: "hero",
    categories: ["heroic"],
    title: "Herói ateniense do Minotauro",
    shortDescription: "Figura heroica ligada a Atenas; tradições variam entre Egeu e Poseidon como pai.",
    pageRoute: "/herois/teseu"
  }),
  greekHero({
    id: "eneias-grego",
    name: "Eneias",
    entityType: "hero",
    categories: ["heroic"],
    title: "Herói troiano",
    shortDescription: "Na tradição grega, é herói troiano filho de Afrodite e Anquises, antes da recepção romana.",
    pageRoute: "/herois/eneias-grego"
  }),
  greekHero({
    id: "helena",
    name: "Helena de Troia",
    entityType: "demigod",
    categories: ["heroic"],
    title: "Figura central do ciclo troiano",
    shortDescription: "Frequentemente apresentada como filha de Zeus e Leda, embora versões antigas variem.",
    pageRoute: "/mitologia/entidades/helena"
  }),
  greekHero({
    id: "minos",
    name: "Minos",
    entityType: "demigod",
    categories: ["heroic"],
    title: "Rei mítico de Creta",
    shortDescription: "Tradicionalmente filho de Zeus e Europa; associado a Creta e ao ciclo do Minotauro.",
    pageRoute: "/herois/minos"
  }),
  greekHero({
    id: "radamanto",
    name: "Radamanto",
    entityType: "demigod",
    categories: ["heroic", "chthonic"],
    title: "Juiz mítico dos mortos em algumas tradições",
    shortDescription: "Filho de Zeus e Europa em tradições genealógicas; associado depois ao mundo dos mortos.",
    pageRoute: "/mitologia/entidades/radamanto"
  }),
  greekHero({
    id: "sarpedon",
    name: "Sarpédon",
    entityType: "demigod",
    categories: ["heroic"],
    title: "Herói ligado a Zeus em tradições diferentes",
    shortDescription: "O nome aparece em tradições distintas; aqui é tratado como relação variável com Zeus.",
    pageRoute: "/herois/sarpedon"
  }),
  greekHero({
    id: "orfeu",
    name: "Orfeu",
    entityType: "hero",
    categories: ["heroic"],
    title: "Músico mítico e figura órfica",
    shortDescription: "Herói ou figura mítica com parentesco variável; não é tratado como semideus obrigatório.",
    pageRoute: "/herois/orfeu"
  }),
  greekHero({
    id: "jasao",
    name: "Jasão",
    entityType: "hero",
    categories: ["heroic"],
    title: "Líder dos Argonautas",
    shortDescription: "Herói mortal do ciclo argonáutico, sem filiação divina direta nesta visualização.",
    pageRoute: "/herois/jasao"
  }),
  greekHero({
    id: "belerofonte",
    name: "Belerofonte",
    entityType: "hero",
    categories: ["heroic"],
    title: "Herói associado a Pégaso e à Quimera",
    shortDescription: "Herói com genealogia variável; a árvore mostra apenas relações seguras nesta versão.",
    pageRoute: "/herois/belerofonte"
  }),
  greekHero({
    id: "odisseu",
    name: "Odisseu",
    alternativeNames: ["Ulisses"],
    entityType: "hero",
    categories: ["heroic"],
    title: "Herói da Odisseia",
    shortDescription: "Herói de Ítaca, não filho direto de uma divindade na tradição principal apresentada.",
    pageRoute: "/herois/odisseu"
  }),
  greekHero({
    id: "atalanta",
    name: "Atalanta",
    entityType: "hero",
    categories: ["heroic"],
    title: "Heroína caçadora",
    shortDescription: "Figura heroica associada à caça, à corrida e a tradições regionais variadas.",
    pageRoute: "/herois/atalanta"
  }),
  greekHero({
    id: "castor",
    name: "Castor",
    entityType: "hero",
    categories: ["heroic"],
    title: "Um dos Dióscuros",
    shortDescription: "Irmão de Pólux e Helena; sua mortalidade varia conforme a versão.",
    pageRoute: "/herois/castor"
  }),
  greekHero({
    id: "polux",
    name: "Pólux",
    alternativeNames: ["Polideuces"],
    entityType: "demigod",
    categories: ["heroic"],
    title: "Um dos Dióscuros",
    shortDescription: "Frequentemente filho de Zeus e Leda, em contraste com versões sobre Castor.",
    pageRoute: "/mitologia/entidades/polux"
  }),
  greekHero({
    id: "edipo",
    name: "Édipo",
    entityType: "hero",
    categories: ["heroic"],
    title: "Herói trágico tebano",
    shortDescription: "Herói humano do ciclo tebano; não é classificado como semideus.",
    pageRoute: "/herois/edipo"
  }),
  greekHero({
    id: "cadmo",
    name: "Cadmo",
    entityType: "hero",
    categories: ["heroic"],
    title: "Fundador mítico de Tebas",
    shortDescription: "Herói fundador associado a Tebas e à linhagem de Sêmele e Dionísio.",
    pageRoute: "/herois/cadmo"
  })
];
