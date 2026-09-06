import {
    IconlyCalendar,
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
        href: "/accueil",
        icon: IconlyHome,
      },
      {
        name: "decouvrir",
        href: "/decouvrir",
        icon: IconlySearch,
      },
      {
        name: "contributions",
        href: "/contributions",
        icon: IconlyLogo,
      },

      {
        name: "surprise",
        href: "/surprise",
        icon: IconlyStar,
      },
      {
        name: "calendrier",
        href: "/calendrier",
        icon: IconlyCalendar,
      },
      {
        name: "paramètres",
        href: "/parametres",
        icon: IconlySetting,
      },
    ],
  },
];
