import { User, UserRole } from "@prisma/client";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/shared/icons";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

// dashboard
export type SidebarLinkType = {
  href: string;
  label: string;
  icon: keyof typeof Icons;
  badge?: number;
  disabled?: boolean;
  authorizeOnly?: UserRole;
};

export type SidebarSectionType = {
  sectionName: string;
  links: SidebarLinkType[];
};

export type SidebarDashboardType = SidebarSectionType[];
