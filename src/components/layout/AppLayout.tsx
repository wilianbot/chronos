import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowUp, Landmark, Menu, Moon, PanelLeftClose, PanelLeftOpen, Sun, X } from "lucide-react";
import { useAppContext } from "../../hooks/useAppContext";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { appRoutes } from "../../app/routes";
import { Logo } from "../brand/Logo";
import { EventModal } from "../timeline/EventModal";

export function AppLayout() {
  useDocumentMeta();
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    tema,
    setTema,
    sidebarCollapsed,
    setSidebarCollapsed,
    eventoAberto,
    favoritos,
    estudados,
    fecharEvento,
    alternarFavorito,
    alternarEstudado,
    compartilhar,
    copiarResumo
  } = useAppContext();

  return (
    <div className={`app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <a href="#conteudo-principal" className="skip-link">
        Ir para o conteúdo principal
      </a>
      <aside className="sidebar" aria-label="Navegação principal">
        <Link className="brand sidebar-brand" to="/">
          <Landmark size={22} />
          <Logo compact />
        </Link>
        <button
          className="button secondary compact sidebar-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          <span>{sidebarCollapsed ? "Abrir" : "Recolher"}</span>
        </button>
        <NavItems onNavigate={() => setMobileOpen(false)} />
      </aside>

      <div className="shell-main">
        <header className="topbar route-topbar">
          <button
            className="icon-button mobile-menu-button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={20} />
          </button>
          <Breadcrumbs />
          <button
            className="icon-button"
            onClick={() => setTema(tema === "escuro" ? "claro" : "escuro")}
            aria-label="Alternar tema"
          >
            {tema === "escuro" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>
        <main id="conteudo-principal" className="route-content" tabIndex={-1}>
          <Outlet />
        </main>
        <footer className="app-footer">
          <div>
            <strong>© 2026 Chronos</strong>
            <span>Uma plataforma educacional desenvolvida pela WR Labs.</span>
            <a href="mailto:wrlabs.apps@gmail.com">wrlabs.apps@gmail.com</a>
          </div>
          <nav aria-label="Links institucionais">
            <Link to="/sobre">Sobre</Link>
            <Link to="/privacidade">Privacidade</Link>
            <Link to="/termos">Termos</Link>
            <Link to="/contato">Contato</Link>
          </nav>
        </footer>
      </div>

      {mobileOpen && (
        <div className="mobile-drawer-backdrop" onMouseDown={() => setMobileOpen(false)}>
          <nav className="mobile-drawer" onMouseDown={(event) => event.stopPropagation()} aria-label="Menu móvel">
            <button className="icon-button modal-close" onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
              <X size={20} />
            </button>
            <NavItems onNavigate={() => setMobileOpen(false)} />
          </nav>
        </div>
      )}

      <button className="to-top" onClick={() => scrollTo({ top: 0, behavior: "smooth" })} aria-label="Voltar ao topo">
        <ArrowUp size={20} />
      </button>

      {eventoAberto && (
        <EventModal
          evento={eventoAberto}
          favorito={favoritos.has(eventoAberto.id)}
          estudado={estudados.has(eventoAberto.id)}
          onFechar={fecharEvento}
          onFavorito={() => alternarFavorito(eventoAberto.id)}
          onEstudado={() => alternarEstudado(eventoAberto.id)}
          onCompartilhar={() => compartilhar(eventoAberto)}
          onCopiar={() => copiarResumo(eventoAberto)}
        />
      )}
    </div>
  );
}

function NavItems({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav className="side-nav" aria-label="Módulos principais">
      {appRoutes.map((route) => {
        const Icon = route.icon;
        return (
          <NavLink key={route.path} to={route.path} onClick={onNavigate} aria-label={route.label}>
            {({ isActive }) => (
              <>
                <Icon size={18} />
                <span>{route.label}</span>
                {isActive && <i aria-hidden="true" />}
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

function Breadcrumbs() {
  const location = useLocation();
  const route = appRoutes.find((item) => item.path === location.pathname);
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Início</Link>
      {route && route.path !== "/" && (
        <>
          <span>/</span>
          <span aria-current="page">{route.label}</span>
        </>
      )}
    </nav>
  );
}
