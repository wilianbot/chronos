import type { ReactNode } from "react";
import { Link } from "react-router-dom";

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
    <InstitutionalShell eyebrow="Projeto" title="Sobre a Jornada pela História">
      <article className="mini-card">
        <h3>Finalidade educacional</h3>
        <p>
          A aplicação organiza acontecimentos, personagens, mapas, mitologia e revisão em uma experiência de estudo
          interativa. O conteúdo mitológico é apresentado como tradição religiosa e literária antiga, não como história
          documentada.
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
        <h3>Recursos</h3>
        <p>
          O projeto inclui linha do tempo, catálogo de personagens, mapas, árvore genealógica mitológica, flashcards,
          favoritos e progresso salvo localmente no navegador.
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
        <h3>Anúncios futuros</h3>
        <p>
          O projeto está preparado para anúncios no futuro, mas nenhum rastreador publicitário é ativado sem
          configuração explícita de provedor e atualização desta página.
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
          O conteúdo é destinado a estudo, revisão e exploração cultural. Ele não substitui livros didáticos, aulas,
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
    <InstitutionalShell eyebrow="Contato" title="Sugestões e correções">
      <article className="mini-card">
        <h3>Como contribuir</h3>
        <p>
          Envie correções com o trecho afetado, a fonte sugerida e, quando envolver imagem, a licença e a página
          original do acervo.
        </p>
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
