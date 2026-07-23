export { greekDeities } from "./greekDeities";
export { romanDeities } from "./romanDeities";
export { mythologies, availableMythologies } from "./mythologies";
export { deityComparisons } from "./deityRelations";
export { mythologyImageCredits, mythologySources } from "./deitySources";
export { culturalCorrespondences } from "./culturalCorrespondences";
export { greekCreatures } from "./greekCreatures";
export { greekHeroes } from "./greekHeroes";
export { greekMortals } from "./greekMortals";
export { greekRelations } from "./greekRelations";
export { mythologicalEntities, mythologicalEntitiesById } from "./mythologicalEntities";
export { mythologicalTraditions } from "./traditions";
export { romanCreatures } from "./romanCreatures";
export { romanHeroes } from "./romanHeroes";
export { romanMortals } from "./romanMortals";
export { romanRelations } from "./romanRelations";
export { treeSources } from "./mythologySources";

import { greekDeities } from "./greekDeities";
import { romanDeities } from "./romanDeities";

export const deities = [...greekDeities, ...romanDeities];
export const deitiesById = new Map(deities.map((deity) => [deity.id, deity]));
