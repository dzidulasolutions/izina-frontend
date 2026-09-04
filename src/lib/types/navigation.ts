import { ComponentType } from "react";

export type NavigationLink = {
  name: string;
  href: string;
  icon: ComponentType<{
    size?: number;
    color?: string;
    className?: string;
  }>;
};

export type NavigationLinks = {
  navigation: NavigationLink[];
};