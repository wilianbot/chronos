import type { MythologicalEntity, MythologicalRelation } from "../../types/mythologyTree";

export const treeSources = {
  hesiodTheogony: {
    title: "Theogony",
    author: "Hesiod",
    institution: "Perseus Digital Library",
    url: "https://catalog.perseus.org/catalog/urn:cts:greekLit:tlg0020.tlg001.perseus-eng1"
  },
  apollodorusLibrary: {
    title: "Library",
    author: "Pseudo-Apollodorus",
    institution: "Perseus Digital Library",
    url: "https://www.perseus.tufts.edu/hopper/text?doc=Apollod.+1.1.1"
  },
  homerIliad: {
    title: "Iliad",
    author: "Homer",
    institution: "Perseus Digital Library",
    url: "https://catalog.perseus.org/catalog/urn:cts:greekLit:tlg0012.tlg001"
  },
  homerOdyssey: {
    title: "Odyssey",
    author: "Homer",
    institution: "Perseus Digital Library",
    url: "https://catalog.perseus.org/catalog/urn:cts:greekLit:tlg0012.tlg002"
  },
  ovidMetamorphoses: {
    title: "Metamorphoses",
    author: "Ovid",
    institution: "Perseus Digital Library",
    url: "https://www.perseus.tufts.edu/hopper/collection?collection=Perseus%3Acorpus%3Aperseus%2Cwork%2COvid%2C+Metamorphoses"
  },
  virgilAeneid: {
    title: "Aeneid",
    author: "Virgil",
    institution: "Perseus Digital Library",
    url: "https://catalog.perseus.org/catalog/urn:cts:latinLit:phi0690.phi003"
  },
  livyRome: {
    title: "History of Rome, Book 1",
    author: "Livy",
    institution: "Perseus Digital Library",
    url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0151%3Abook%3D1"
  },
  theoiIndex: {
    title: "Theoi Greek Mythology",
    institution: "Theoi Project",
    url: "https://www.theoi.com/"
  },
  britannica: {
    title: "Classical mythology reference articles",
    institution: "Encyclopaedia Britannica",
    url: "https://www.britannica.com/topic/Greek-mythology"
  }
} satisfies Record<string, NonNullable<MythologicalEntity["sources"]>[number]>;

export const defaultGreekTreeSources = [
  treeSources.hesiodTheogony,
  treeSources.apollodorusLibrary,
  treeSources.theoiIndex
];
export const defaultRomanTreeSources = [treeSources.virgilAeneid, treeSources.livyRome, treeSources.britannica];

export function relationSources(...sources: Array<keyof typeof treeSources>): MythologicalRelation["sources"] {
  return sources.map((source) => treeSources[source]);
}
