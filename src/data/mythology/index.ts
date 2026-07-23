export { greekDeities } from "./greekDeities";
export { romanDeities } from "./romanDeities";
export { mythologies, availableMythologies } from "./mythologies";
export { deityComparisons } from "./deityRelations";
export { mythologyImageCredits, mythologySources } from "./deitySources";

import { greekDeities } from "./greekDeities";
import { romanDeities } from "./romanDeities";

export const deities = [...greekDeities, ...romanDeities];
export const deitiesById = new Map(deities.map((deity) => [deity.id, deity]));
