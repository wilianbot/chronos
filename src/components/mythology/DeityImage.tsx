import { ResilientImage } from "../ResilientImage";
import type { Deity } from "../../types/mythology";

export function DeityImage({ deity, className = "deity-image" }: { deity: Deity; className?: string }) {
  return (
    <ResilientImage
      sources={[deity.image.src]}
      alt={deity.image.alt}
      className={className}
      objectFit={deity.image.fit || "contain"}
      objectPosition={deity.image.position || "center"}
      fallback={
        <div className={`${className} deity-image-fallback`} role="img" aria-label={deity.image.alt}>
          <span>{deity.name.slice(0, 2).toUpperCase()}</span>
        </div>
      }
    />
  );
}
