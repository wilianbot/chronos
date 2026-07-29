import type { ReactNode } from "react";
import { Logo } from "./Logo";

type BrandHeaderProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
  children?: ReactNode;
};

export function BrandHeader({
  eyebrow = "Chronos",
  title = "Explore o passado. Entenda o presente.",
  text,
  children
}: BrandHeaderProps) {
  return (
    <header className="brand-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <Logo />
      </div>
      <div className="brand-header-copy">
        <h2>{title}</h2>
        {text && <p>{text}</p>}
        {children}
      </div>
    </header>
  );
}
