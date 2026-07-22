import {
  BookOpen,
  GitCompare,
  Heart,
  Home,
  Landmark,
  MapPinned,
  Route,
  ScrollText,
  Search,
  Sparkles,
  Trees,
  Trophy,
  Users
} from "lucide-react";

export const appRoutes = [
  { path: "/", label: "Início", icon: Home },
  { path: "/linha-do-tempo", label: "Linha do tempo", icon: ScrollText },
  { path: "/periodos", label: "Períodos", icon: Landmark },
  { path: "/personagens", label: "Personagens", icon: Users },
  { path: "/mitologia", label: "Mitologia", icon: Trees },
  { path: "/mapas", label: "Mapas", icon: MapPinned },
  { path: "/comparacoes", label: "Comparações", icon: GitCompare },
  { path: "/jornadas", label: "Jornadas", icon: Route },
  { path: "/revisao", label: "Revisão", icon: Sparkles },
  { path: "/flashcards", label: "Flashcards", icon: BookOpen },
  { path: "/glossario", label: "Glossário", icon: Search },
  { path: "/favoritos", label: "Favoritos", icon: Heart },
  { path: "/progresso", label: "Progresso", icon: Trophy }
];
