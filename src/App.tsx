import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./app/router";
import { LoadingState, ErrorState } from "./components/common/StateViews";
import { AppProvider } from "./context/AppContext";
import { useAppContext } from "./hooks/useAppContext";

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { carregando, erroInicial } = useAppContext();
  const router = useMemo(() => createAppRouter(), []);

  if (carregando) return <LoadingState />;
  if (erroInicial) return <ErrorState message={erroInicial} />;

  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
}
