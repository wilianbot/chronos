type LogoProps = {
  compact?: boolean;
  tagline?: string;
};

export function Logo({ compact = false, tagline = "Uma jornada pela História" }: LogoProps) {
  return (
    <span className={`logo ${compact ? "logo-compact" : ""}`} aria-label="Chronos, Uma jornada pela História">
      <span className="logo-word">Chronos</span>
      {!compact && <span className="logo-tagline">{tagline}</span>}
    </span>
  );
}
