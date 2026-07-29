import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { BrandHeader } from "../components/brand/BrandHeader";

function InstitutionalShell({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="section route-section institutional-page">
      <div className="section-title">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <div className="institutional-grid">{children}</div>
    </section>
  );
}

export function AboutPage() {
  return (
    <InstitutionalShell eyebrow="Projeto" title="Sobre o Chronos">
      <BrandHeader
        title="Uma jornada pela História"
        text="Chronos foi criado para tornar o estudo da História mais visual, organizado e interativo."
      />
      <article className="mini-card">
        <h3>Experiência de aprendizado</h3>
        <p>
          Chronos conecta acontecimentos históricos, personagens, civilizações, filosofia e mitologia em uma experiência
          moderna de aprendizado. O conteúdo mitológico é apresentado como tradição religiosa e literária antiga, não
          como história documentada.
        </p>
      </article>
      <article className="mini-card">
        <h3>Fontes e contexto</h3>
        <p>
          As páginas privilegiam contexto histórico, fontes institucionais e avisos quando mitos ou genealogias possuem
          versões diferentes conforme autor, região ou época.
        </p>
      </article>
      <article className="mini-card">
        <h3>WR Labs</h3>
        <p>
          O projeto é desenvolvido pela WR Labs. Para sugestões, correções ou contato institucional, escreva para{" "}
          <a href="mailto:wrlabs.apps@gmail.com">wrlabs.apps@gmail.com</a>.
        </p>
      </article>
    </InstitutionalShell>
  );
}

export function PrivacyPage() {
  return (
    <InstitutionalShell eyebrow="Privacidade" title="Dados salvos neste navegador">
      <article className="mini-card">
        <h3>Armazenamento local</h3>
        <p>
          Favoritos, progresso, tema visual e estatísticas de revisão usam localStorage. Esses dados ficam no navegador
          do usuário e não exigem conta.
        </p>
      </article>
      <article className="mini-card">
        <h3>Recursos externos</h3>
        <p>
          Mapas base podem carregar tiles de OpenStreetMap, Esri ou CARTO. Algumas imagens históricas podem ter origem
          em acervos públicos e museus quando não houver cópia local.
        </p>
      </article>
      <article className="mini-card">
        <h3>Chronos e WR Labs</h3>
        <p>
          Chronos é desenvolvido pela WR Labs. Contato:{" "}
          <a href="mailto:wrlabs.apps@gmail.com">wrlabs.apps@gmail.com</a>.
        </p>
      </article>
    </InstitutionalShell>
  );
}

export function TermsPage() {
  return (
    <InstitutionalShell eyebrow="Termos" title="Uso do conteúdo">
      <article className="mini-card">
        <h3>Uso educacional</h3>
        <p>
          Chronos é destinado a estudo, revisão e exploração cultural. Ele não substitui livros didáticos, aulas,
          pesquisa acadêmica ou consulta às fontes primárias.
        </p>
      </article>
      <article className="mini-card">
        <h3>Licenças de imagens</h3>
        <p>
          Créditos e licenças de imagens são preservados nos manifestos do projeto quando aplicável. Imagens externas
          continuam sujeitas aos termos das instituições de origem.
        </p>
      </article>
      <article className="mini-card">
        <h3>Correções</h3>
        <p>
          Como a história e a mitologia envolvem interpretações e tradições variadas, correções de fonte, contexto e
          licença devem priorizar evidências verificáveis.
        </p>
      </article>
    </InstitutionalShell>
  );
}

export function ContactPage() {
  return (
    <InstitutionalShell eyebrow="Contato" title="WR Labs">
      <article className="mini-card">
        <h3>Contato</h3>
        <p>
          Para sugestões, correções e contato sobre o Chronos, fale com a WR Labs pelo e-mail abaixo.
        </p>
        <p>
          <strong>WR Labs</strong>
          <br />
          <a href="mailto:wrlabs.apps@gmail.com">wrlabs.apps@gmail.com</a>
        </p>
        <a className="button primary compact" href="mailto:wrlabs.apps@gmail.com">
          Enviar e-mail
        </a>
      </article>
      <article className="mini-card">
        <h3>Rotas principais</h3>
        <p>
          Para revisar o funcionamento antes de publicar, acesse <Link to="/mapas">mapas</Link>,{" "}
          <Link to="/mitologia">mitologia</Link> e <Link to="/mitologia/arvore">árvore genealógica</Link>.
        </p>
      </article>
    </InstitutionalShell>
  );
}
