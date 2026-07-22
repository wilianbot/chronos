/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense, type ComponentType } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { LoadingState } from "../components/common/StateViews";

const HomePage = lazy(() => import("../pages/HomePage").then((module) => ({ default: module.HomePage })));
const TimelinePage = lazy(() => import("../pages/TimelinePage").then((module) => ({ default: module.TimelinePage })));
const PeriodsPage = lazy(() => import("../pages/PeriodsPage").then((module) => ({ default: module.PeriodsPage })));
const CharactersPage = lazy(() =>
  import("../pages/CharactersPage").then((module) => ({ default: module.CharactersPage }))
);
const MythologyPage = lazy(() =>
  import("../pages/MythologyPage").then((module) => ({ default: module.MythologyPage }))
);
const MapsPage = lazy(() => import("../pages/MapsPage").then((module) => ({ default: module.MapsPage })));
const ComparisonsPage = lazy(() =>
  import("../pages/ComparisonsPage").then((module) => ({ default: module.ComparisonsPage }))
);
const JourneysPage = lazy(() => import("../pages/StudyPages").then((module) => ({ default: module.JourneysPage })));
const ReviewPage = lazy(() => import("../pages/StudyPages").then((module) => ({ default: module.ReviewPage })));
const FlashcardsPage = lazy(() => import("../pages/StudyPages").then((module) => ({ default: module.FlashcardsPage })));
const GlossaryPage = lazy(() => import("../pages/StudyPages").then((module) => ({ default: module.GlossaryPage })));
const FavoritesPage = lazy(() => import("../pages/StudyPages").then((module) => ({ default: module.FavoritesPage })));
const ProgressPage = lazy(() => import("../pages/StudyPages").then((module) => ({ default: module.ProgressPage })));
const EventDetailPage = lazy(() =>
  import("../pages/StudyPages").then((module) => ({ default: module.EventDetailPage }))
);
const CharacterDetailPage = lazy(() =>
  import("../pages/StudyPages").then((module) => ({ default: module.CharacterDetailPage }))
);
const GodDetailPage = lazy(() => import("../pages/StudyPages").then((module) => ({ default: module.GodDetailPage })));
const NotFoundPage = lazy(() => import("../pages/StudyPages").then((module) => ({ default: module.NotFoundPage })));

function page(Component: ComponentType) {
  return (
    <Suspense fallback={<LoadingState />}>
      <Component />
    </Suspense>
  );
}

export function createAppRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: page(HomePage) },
        { path: "linha-do-tempo", element: page(TimelinePage) },
        { path: "periodos", element: page(PeriodsPage) },
        { path: "personagens", element: page(CharactersPage) },
        { path: "mitologia", element: page(MythologyPage) },
        { path: "mapas", element: page(MapsPage) },
        { path: "comparacoes", element: page(ComparisonsPage) },
        { path: "jornadas", element: page(JourneysPage) },
        { path: "revisao", element: page(ReviewPage) },
        { path: "flashcards", element: page(FlashcardsPage) },
        { path: "glossario", element: page(GlossaryPage) },
        { path: "favoritos", element: page(FavoritesPage) },
        { path: "progresso", element: page(ProgressPage) },
        { path: "eventos/:id", element: page(EventDetailPage) },
        { path: "personagens/:id", element: page(CharacterDetailPage) },
        { path: "deuses/:id", element: page(GodDetailPage) },
        { path: "*", element: page(NotFoundPage) }
      ]
    }
  ]);
}
