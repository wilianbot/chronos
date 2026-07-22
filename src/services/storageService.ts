export const STORAGE_KEYS = {
  tema: "jh-react-tema",
  favoritos: "jh-react-favoritos",
  estudados: "jh-react-estudados",
  revisados: "jh-react-revisados",
  ultimoEvento: "jh-react-ultimo-evento",
  revisaoStats: "jh-react-revisao-stats",
  sidebarCollapsed: "jh-react-sidebar-collapsed"
};

export function readString(key: string, fallback = "") {
  return localStorage.getItem(key) || fallback;
}

export function writeString(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function readSet(key: string) {
  try {
    return new Set<string>(JSON.parse(localStorage.getItem(key) || "[]"));
  } catch {
    return new Set<string>();
  }
}

export function writeSet(key: string, value: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...value]));
}

export function readBoolean(key: string, fallback = false) {
  const value = localStorage.getItem(key);
  if (value === null) return fallback;
  return value === "true";
}

export function writeBoolean(key: string, value: boolean) {
  localStorage.setItem(key, String(value));
}
