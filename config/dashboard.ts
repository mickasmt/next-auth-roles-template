import { UserRole } from "@prisma/client";

import { SidebarDashboardType } from "types";

export const sidebarLinks: SidebarDashboardType = [
  {
    sectionName: "MENU",
    links: [
      {
        href: "/admin",
        icon: "laptop",
        label: "Admin Panel",
        authorizeOnly: UserRole.ADMIN,
      },
      { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
      { href: "/dashboard/charts", icon: "lineChart", label: "Charts" },
      {
        href: "/admin/orders",
        icon: "package",
        label: "Orders",
        badge: 2,
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "#",
        icon: "post",
        label: "Posts",
        badge: 6,
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/users",
        icon: "user",
        label: "User Only",
        authorizeOnly: UserRole.USER,
      },
    ],
  },
  {
    sectionName: "OPTIONS",
    links: [
      { href: "/dashboard/settings", icon: "settings", label: "Settings" },
      { href: "/docs", icon: "bookOpen", label: "Documentation" },
      {
        href: "#",
        icon: "messages",
        label: "Support",
        authorizeOnly: UserRole.USER,
      },
    ],
  },
];
