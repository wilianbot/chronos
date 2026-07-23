import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { normalizeImageSrc } from "../lib/images";

type ResilientImageProps = {
  sources: string[];
  alt: string;
  fallback: ReactNode;
  className?: string;
  loading?: "eager" | "lazy";
  objectFit?: "cover" | "contain";
  objectPosition?: string;
};

export function ResilientImage({
  sources,
  alt,
  fallback,
  className,
  loading = "lazy",
  objectFit,
  objectPosition
}: ResilientImageProps) {
  const validSources = Array.from(new Set(sources.filter(Boolean).map((source) => normalizeImageSrc(source))));
  const [indice, setIndice] = useState(0);
  const [falhou, setFalhou] = useState(validSources.length === 0);
  const chave = validSources.join("|");

  useEffect(() => {
    setIndice(0);
    setFalhou(validSources.length === 0);
  }, [chave, validSources.length]);

  if (falhou || !validSources[indice]) {
    return <>{fallback}</>;
  }

  return (
    <img
      className={className}
      src={validSources[indice]}
      alt={alt}
      loading={loading}
      decoding="async"
      style={{
        objectFit,
        objectPosition
      }}
      onError={() => {
        const proximo = indice + 1;
        if (proximo >= validSources.length) {
          setFalhou(true);
          return;
        }
        setIndice(proximo);
      }}
    />
  );
}
