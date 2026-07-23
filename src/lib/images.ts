export const FALLBACK_IMAGE_SRC = "/assets/images/mapa-placeholder.svg";

export function normalizeImageSrc(src?: string): string {
  const value = src?.trim();
  if (!value) return FALLBACK_IMAGE_SRC;

  if (/^https?:\/\//i.test(value)) return value;

  const withoutPublic = value.replace(/^public[\\/]/i, "");
  const normalizedSlashes = withoutPublic.replace(/\\/g, "/").replace(/\/{2,}/g, "/");

  return normalizedSlashes.startsWith("/") ? normalizedSlashes : `/${normalizedSlashes}`;
}

export function isRemoteImageSrc(src?: string): boolean {
  return /^https?:\/\//i.test(src?.trim() || "");
}

export function isLocalAssetImageSrc(src?: string): boolean {
  const normalized = normalizeImageSrc(src);
  return normalized.startsWith("/assets/images/");
}
