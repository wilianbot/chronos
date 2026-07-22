import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type ResilientImageProps = {
  sources: string[];
  alt: string;
  fallback: ReactNode;
  className?: string;
  loading?: "eager" | "lazy";
};

export function ResilientImage({ sources, alt, fallback, className, loading = "lazy" }: ResilientImageProps) {
  const validSources = sources.filter(Boolean);
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
