import type { MythologicalEntity } from "../../types/mythologyTree";
import { defaultGreekTreeSources } from "./mythologySources";

function mortal(input: Omit<MythologicalEntity, "mythology" | "culture" | "entityType" | "categories" | "sources">) {
  return {
    mythology: "grega" as const,
    culture: "Tradições gregas antigas",
    entityType: "mortal" as const,
    categories: ["other" as const],
    sources: defaultGreekTreeSources,
    ...input
  };
}

function minorDeity(input: Omit<MythologicalEntity, "mythology" | "culture" | "entityType" | "sources">) {
  return {
    mythology: "grega" as const,
    culture: "Tradições gregas antigas",
    entityType: "deity" as const,
    sources: defaultGreekTreeSources,
    ...input
  };
}

export const greekMortals: MythologicalEntity[] = [
  mortal({
    id: "alcmena",
    name: "Alcmena",
    title: "Mãe de Héracles",
    shortDescription: "Mortal tebana ligada ao nascimento de Héracles.",
    pageRoute: "/mitologia/entidades/alcmena"
  }),
  mortal({
    id: "anfitriao",
    name: "Anfitrião",
    title: "Marido de Alcmena",
    shortDescription: "Mortal tebano ligado à tradição do nascimento de Héracles."
  }),
  mortal({
    id: "danae",
    name: "Dânae",
    title: "Mãe de Perseu",
    shortDescription: "Filha de Acrísio em tradições argivas; mãe de Perseu por Zeus."
  }),
  mortal({
    id: "acrisio",
    name: "Acrísio",
    title: "Rei mítico de Argos",
    shortDescription: "Pai de Dânae e avô de Perseu em tradições genealógicas."
  }),
  mortal({
    id: "europa",
    name: "Europa",
    title: "Mãe de Minos, Radamanto e Sarpédon",
    shortDescription: "Figura mítica fenícia/cretense associada a Zeus e à linhagem cretense."
  }),
  mortal({
    id: "leda",
    name: "Leda",
    title: "Mãe de Helena e dos Dióscuros",
    shortDescription: "Rainha espartana em tradições sobre Helena, Castor e Pólux."
  }),
  mortal({
    id: "semele",
    name: "Sêmele",
    title: "Mãe de Dionísio",
    shortDescription: "Mortal tebana, filha de Cadmo e Harmonia, ligada ao nascimento de Dionísio."
  }),
  mortal({
    id: "peleu",
    name: "Peleu",
    title: "Pai de Aquiles",
    shortDescription: "Herói mortal casado com a deusa marinha Tétis."
  }),
  mortal({
    id: "etra",
    name: "Etra",
    title: "Mãe de Teseu",
    shortDescription: "Mortal ligada às tradições de nascimento de Teseu."
  }),
  mortal({
    id: "egeu",
    name: "Egeu",
    title: "Rei mítico de Atenas",
    shortDescription: "Pai humano de Teseu em uma tradição importante."
  }),
  mortal({
    id: "anquises-grego",
    name: "Anquises",
    title: "Pai de Eneias",
    shortDescription: "Mortal troiano ligado a Afrodite e ao nascimento de Eneias."
  }),
  mortal({
    id: "coronis",
    name: "Corônis",
    title: "Mãe de Asclépio",
    shortDescription: "Mortal associada a Apolo e ao nascimento de Asclépio."
  }),
  minorDeity({
    id: "maia",
    name: "Maia",
    categories: ["other"],
    title: "Mãe de Hermes",
    shortDescription: "Plêiade associada a Zeus e ao nascimento de Hermes."
  }),
  mortal({
    id: "harmonia",
    name: "Harmonia",
    title: "Mãe de Sêmele",
    shortDescription: "Figura ligada à casa tebana; em algumas tradições é filha de Ares e Afrodite."
  }),
  mortal({
    id: "jocasta",
    name: "Jocasta",
    title: "Mãe e esposa de Édipo na tradição trágica",
    shortDescription: "Figura mortal central no ciclo tebano."
  }),
  mortal({
    id: "laio",
    name: "Laio",
    title: "Pai de Édipo",
    shortDescription: "Rei tebano ligado à genealogia trágica de Édipo."
  }),
  minorDeity({
    id: "metis",
    name: "Métis",
    categories: ["wisdom"],
    title: "Divindade da astúcia e mãe de Atena",
    shortDescription: "Consorte de Zeus em tradições sobre o nascimento de Atena."
  }),
  minorDeity({
    id: "leto",
    name: "Leto",
    categories: ["other"],
    title: "Mãe de Apolo e Ártemis",
    shortDescription: "Titânide ou deusa associada a Zeus e ao nascimento dos gêmeos de Delos."
  }),
  minorDeity({
    id: "tetis-nereida",
    name: "Tétis",
    alternativeNames: ["Thetis"],
    categories: ["sea"],
    title: "Nereida e mãe de Aquiles",
    shortDescription: "Deusa marinha distinta da Titânide Tétis."
  })
];
