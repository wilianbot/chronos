import type { DeityImage, DeitySource } from "../../types/mythology";

export const mythologySources: DeitySource[] = [
  { title: "Theoi Greek Mythology", institution: "Theoi Project", url: "https://www.theoi.com/" },
  { title: "Encyclopaedia Britannica", institution: "Britannica", url: "https://www.britannica.com/" },
  { title: "Perseus Digital Library", institution: "Tufts University", url: "https://www.perseus.tufts.edu/" },
  { title: "The Metropolitan Museum of Art", institution: "The Met", url: "https://www.metmuseum.org/" },
  { title: "British Museum Collection", institution: "British Museum", url: "https://www.britishmuseum.org/collection" }
];

export type MythologyImageCredit = DeityImage & {
  deityId: string;
  fileName: string;
  remoteUrl: string;
};

const commons = (fileName: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;

export const mythologyImageCredits: MythologyImageCredit[] = [
  ["zeus", "grega", "Zeus Otricoli Pio-Clementino Inv257.jpg", "Busto antigo de Zeus, conhecido como Zeus de Otricoli"],
  ["hera", "grega", "Hera Campana Louvre Ma2283.jpg", "Estátua antiga de Hera"],
  ["poseidon", "grega", "Poseidon sculpture Copenhagen 2005 hand.jpg", "Estátua antiga associada a Poseidon"],
  ["hades", "grega", "Hades and Cerberus in Heraklion Museum.jpg", "Representação de Hades com Cérbero"],
  ["atena", "grega", "Athena Varvakeion Glyptothek Munich 213.jpg", "Estátua de Atena com atributos militares"],
  ["ares", "grega", "Ares Borghese Louvre Ma866 n2.jpg", "Estátua antiga de Ares"],
  ["apolo-grego", "grega", "Apollo Belvedere Pio-Clementino Inv1015.jpg", "Estátua de Apolo Belvedere"],
  ["artemis", "grega", "Diane de Versailles Leochares.jpg", "Estátua de Ártemis caçadora"],
  [
    "afrodite",
    "grega",
    "Venus de Milo Louvre Ma399 n4.jpg",
    "Estátua antiga de Afrodite, conhecida como Vênus de Milo"
  ],
  ["hermes", "grega", "Hermes Ingenui Pio-Clementino Inv544.jpg", "Estátua antiga de Hermes"],
  ["hefesto", "grega", "Hephaistos Louvre G150.jpg", "Representação antiga de Hefesto"],
  ["dionisio", "grega", "Dionysos Louvre Ma87 n2.jpg", "Estátua antiga de Dionísio"],
  ["demeter", "grega", "Demeter of Knidos BM 1300.jpg", "Estátua de Deméter de Cnido"],
  ["persefone", "grega", "Pinax with Persephone and Hades from Locri.jpg", "Placa votiva com Perséfone e Hades"],
  ["hestia", "grega", "Hestia Giustiniani.jpg", "Estátua conhecida como Héstia Giustiniani"],
  ["cronos", "grega", "Saturnus Caravaggio.jpg", "Pintura histórica de Saturno/Cronos"],
  ["reia", "grega", "Rhea presenting the stone wrapped in cloth to Cronus.jpg", "Reia entregando a pedra a Cronos"],
  ["gaia", "grega", "Gaia Anselm Feuerbach.jpg", "Representação artística de Gaia"],
  ["urano", "grega", "Vasari The Mutiliation of Uranus by Saturn.jpg", "Urano em cena mitológica pintada por Vasari"],
  ["prometeu", "grega", "Prometheus Bound - Peter Paul Rubens.jpg", "Prometeu acorrentado em pintura histórica"],
  ["hecate", "grega", "Hekate Chiaramonti Inv1922.jpg", "Estátua tríplice de Hécate"],
  ["nemesis", "grega", "Nemesis and Tyche Smyrna.jpg", "Representação de Nêmesis e Tique"],
  ["nike", "grega", "Nike of Samothrace Louvre Ma2369 n4.jpg", "Vitória de Samotrácia"],
  ["eros", "grega", "Eros Farnese Naples MAN 6353.jpg", "Estátua antiga de Eros"],
  ["hipnos", "grega", "Hypnos British Museum Bronze Head.jpg", "Cabeça de bronze associada a Hipnos"],
  [
    "tanatos",
    "grega",
    "Sleep and his Half-brother Death by John William Waterhouse.jpg",
    "Sono e Morte em pintura histórica"
  ],
  ["asclepio", "grega", "Asklepios Epidaurus Louvre Ma785.jpg", "Estátua de Asclépio com bastão"],
  ["pan", "grega", "Pan teaching Daphnis to play the pipes Pompeii.jpg", "Pan ensinando música em pintura de Pompeia"],
  ["jupiter", "romana", "Jupiter Smyrna Louvre Ma13.jpg", "Estátua romana associada a Júpiter"],
  ["juno", "romana", "Juno Sospita Vatican Inv2784.jpg", "Estátua de Juno Sospita"],
  ["netuno", "romana", "Neptune sculpture Copenhagen 2005 hand.jpg", "Estátua associada a Netuno"],
  ["plutao", "romana", "Pluto Serapis with Cerberus Statue.jpg", "Representação de Plutão com Cérbero"],
  ["minerva", "romana", "Minerva Giustiniani Musei Vaticani.jpg", "Estátua romana de Minerva"],
  ["marte", "romana", "Mars Ultor Musei Capitolini MC0058.jpg", "Estátua de Marte Ultor"],
  [
    "apolo-romano",
    "romana",
    "Apollo Belvedere Pio-Clementino Inv1015.jpg",
    "Estátua de Apolo cultuada no mundo romano"
  ],
  ["diana", "romana", "Diane de Versailles Leochares.jpg", "Estátua de Diana caçadora"],
  ["venus", "romana", "Venus de Milo Louvre Ma399 n4.jpg", "Estátua antiga associada a Vênus"],
  ["mercurio", "romana", "Mercury by Giambologna Bargello.jpg", "Mercúrio em escultura histórica"],
  ["vulcano", "romana", "Vulcanus by Rubens.jpg", "Vulcano em pintura histórica"],
  ["baco", "romana", "Bacchus Caravaggio.jpg", "Baco em pintura histórica"],
  ["ceres", "romana", "Ceres Vatican Museums.jpg", "Estátua romana de Ceres"],
  ["proserpina", "romana", "Proserpina sarcophagus Louvre Ma 312.jpg", "Cena romana associada a Prosérpina"],
  ["vesta", "romana", "Vesta Giustiniani Louvre Ma 2595.jpg", "Estátua de Vesta"],
  ["saturno", "romana", "Saturnus Caravaggio.jpg", "Saturno em pintura histórica"],
  ["ops", "romana", "Abundance Rubens.jpg", "Alegoria de abundância associada a Ops"],
  ["cupido", "romana", "Cupid and Psyche Louvre MR1777.jpg", "Cupido e Psiquê em escultura"],
  ["vitoria", "romana", "Nike of Samothrace Louvre Ma2369 n4.jpg", "Vitória alada em escultura helenística"],
  ["fortuna", "romana", "Fortuna Musei Vaticani.jpg", "Estátua de Fortuna"],
  ["jano", "romana", "Janus Vatican Museum.jpg", "Representação bifronte de Jano"],
  ["quirino", "romana", "Quirinus denarius.jpg", "Moeda romana associada a Quirino"],
  ["bellona", "romana", "Bellona Rembrandt.jpg", "Bellona em pintura histórica"],
  ["fauno", "romana", "Barberini Faun Munich Glyptothek.jpg", "Fauno em escultura antiga"],
  ["lares", "romana", "Lararium Pompeii.jpg", "Larário doméstico romano"],
  ["penates", "romana", "Lararium with Penates Pompeii.jpg", "Santuário doméstico com divindades protetoras"]
].map(([deityId, mythology, fileName, alt]) => ({
  deityId,
  fileName,
  remoteUrl: commons(fileName),
  src: `/assets/images/mitologia/${mythology}/${deityId}.jpg`,
  alt,
  fit: "contain",
  position: "center",
  author: "Autor antigo ou artista histórico, conforme acervo",
  institution: "Wikimedia Commons / acervo indicado na página original",
  license: "Domínio público ou licença livre indicada na página original",
  sourceUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName).replace(/%20/g, "_")}`
}));

export const imageByDeityId = new Map(mythologyImageCredits.map((credit) => [credit.deityId, credit]));
