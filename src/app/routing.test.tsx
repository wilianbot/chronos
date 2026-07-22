import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { App } from "../App";

const lazyRouteTimeout = { timeout: 4000 };

function renderAt(path: string) {
  window.history.pushState({}, "", path);
  render(<App />);
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
});

describe("rotas e navegação", () => {
  it("renderiza a página inicial como painel resumido", async () => {
    renderAt("/");

    expect(
      await screen.findByRole("heading", { name: /Jornada pela História/i }, lazyRouteTimeout)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Começar a jornada/i })).toHaveAttribute("href", "/linha-do-tempo");
  });

  it("navega pelo menu lateral para personagens", async () => {
    const user = userEvent.setup();
    renderAt("/");

    await screen.findByRole("heading", { name: /Jornada pela História/i }, lazyRouteTimeout);
    const menu = screen.getByRole("navigation", { name: /Módulos principais/i });
    await user.click(within(menu).getByRole("link", { name: /Personagens/i }));

    expect(await screen.findByRole("heading", { name: /Grandes personagens/i }, lazyRouteTimeout)).toBeInTheDocument();
  });

  it("renderiza rota inexistente com estado vazio", async () => {
    renderAt("/rota-que-nao-existe");

    expect(await screen.findByText(/Página não encontrada/i, undefined, lazyRouteTimeout)).toBeInTheDocument();
  });

  it("preserva filtros da linha do tempo pela URL", async () => {
    renderAt("/linha-do-tempo?periodo=Gr%C3%A9cia%20Antiga&categoria=guerra");

    expect(
      await screen.findByRole("heading", { name: /Explore os acontecimentos/i }, lazyRouteTimeout)
    ).toBeInTheDocument();
    const filtros = screen.getAllByRole("combobox");
    expect(filtros[0]).toHaveValue("Grécia Antiga");
    expect(filtros[2]).toHaveValue("guerra");
  });

  it("mostra progresso salvo em localStorage", async () => {
    localStorage.setItem("jh-react-estudados", JSON.stringify(["maratona"]));
    renderAt("/progresso");

    expect(await screen.findByText(/acontecimentos estudados/i, undefined, lazyRouteTimeout)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("mostra favoritos salvos em localStorage", async () => {
    localStorage.setItem("jh-react-favoritos", JSON.stringify(["maratona"]));
    renderAt("/favoritos");

    expect(await screen.findByText(/Batalha de Maratona/i, undefined, lazyRouteTimeout)).toBeInTheDocument();
  });

  it("alterna e preserva tema", async () => {
    const user = userEvent.setup();
    renderAt("/");

    await screen.findByRole("heading", { name: /Jornada pela História/i }, lazyRouteTimeout);
    await user.click(screen.getByRole("button", { name: /Alternar tema/i }));

    await waitFor(() => expect(document.documentElement.dataset.theme).toBe("claro"));
    expect(localStorage.getItem("jh-react-tema")).toBe("claro");
  });

  it("abre rota direta de evento", async () => {
    renderAt("/eventos/maratona");

    expect(await screen.findByRole("heading", { name: /Batalha de Maratona/i }, lazyRouteTimeout)).toBeInTheDocument();
  });

  it("abre menu móvel pelo botão hambúrguer", async () => {
    const user = userEvent.setup();
    renderAt("/");

    await screen.findByRole("heading", { name: /Jornada pela História/i }, lazyRouteTimeout);
    await user.click(screen.getByRole("button", { name: /Abrir menu/i }));

    expect(screen.getByLabelText(/Menu móvel/i)).toBeInTheDocument();
  });

  it("fecha modal de evento com Escape", async () => {
    const user = userEvent.setup();
    renderAt("/linha-do-tempo?busca=Maratona");

    await screen.findByRole("heading", { name: /Explore os acontecimentos/i }, lazyRouteTimeout);
    await user.click(screen.getAllByRole("button", { name: /Ver detalhes/i })[0]);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
