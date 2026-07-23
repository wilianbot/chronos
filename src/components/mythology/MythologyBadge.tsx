import { deityCategoryLabels, getMythologyName } from "../../services/mythologyService";
import type { DeityCategory, MythologyId } from "../../types/mythology";

export function MythologyBadge({ children }: { children: string }) {
  return <span className="mythology-badge">{children}</span>;
}

export function MythologyNameBadge({ mythology }: { mythology: MythologyId }) {
  return <MythologyBadge>{getMythologyName(mythology)}</MythologyBadge>;
}

export function DeityCategoryBadge({ category }: { category: DeityCategory }) {
  return <MythologyBadge>{deityCategoryLabels[category]}</MythologyBadge>;
}
