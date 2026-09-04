import {
  IconlyHome,
  IconlyLogo,
  IconlySearch,
  IconlySetting,
  IconlyStar,
} from "../components/ui/icons";
import { NavigationLinks } from "./types/navigation";

export const LINKS: NavigationLinks[] = [
  {
    navigation: [
      {
        name: "accueil",
        href: "/izina/accueil",
        icon: IconlyHome,
      },
      {
        name: "decouvrir",
        href: "/izina/decouvrir",
        icon: IconlySearch,
      },
      {
        name: "contributions",
        href: "/izina/contributions",
        icon: IconlyLogo,
      },

      {
        name: "surprise",
        href: "/izina/surprise",
        icon: IconlyStar,
      },
      {
        name: "paramètres",
        href: "/izina/parametres",
        icon: IconlySetting,
      },
    ],
  },
];
