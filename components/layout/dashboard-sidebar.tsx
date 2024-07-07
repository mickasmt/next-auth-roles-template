"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarDashboardType } from "@/types";
import { Menu, Package2, PanelLeftClose, PanelRightClose } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/shared/icons";

import ProjectSwitcher from "../dashboard/project-switcher";
import { ScrollArea } from "../ui/scroll-area";

interface DashboardSidebarProps {
  links: SidebarDashboardType;
}

export function DashboardSidebar({ links }: DashboardSidebarProps) {
  const path = usePathname();

  // NOTE: Use this if you want save in local storage -- Credits: Hosna Qasmei
  //
  // const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     const saved = window.localStorage.getItem("sidebarExpanded");
  //     return saved !== null ? JSON.parse(saved) : true;
  //   }
  //   return true;
  // });

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.localStorage.setItem(
  //       "sidebarExpanded",
  //       JSON.stringify(isSidebarExpanded),
  //     );
  //   }
  // }, [isSidebarExpanded]);

  const { isTablet } = useMediaQuery();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(!isTablet);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    setIsSidebarExpanded(!isTablet);
  }, [isTablet]);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="sticky top-0 h-full">
        <ScrollArea className="h-full overflow-y-auto border-r">
          <aside
            className={cn(
              isSidebarExpanded ? "w-[220px] xl:w-[260px]" : "w-[68px]",
              "hidden h-screen md:block",
            )}
          >
            <div className="flex h-full max-h-screen flex-1 flex-col gap-2">
              <div className="flex h-14 items-center p-4 lg:h-[60px]">
                {isSidebarExpanded ? <ProjectSwitcher /> : null}

                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto size-9 lg:size-8"
                  onClick={toggleSidebar}
                >
                  {isSidebarExpanded ? (
                    <PanelLeftClose
                      size={18}
                      className="stroke-muted-foreground"
                    />
                  ) : (
                    <PanelRightClose
                      size={18}
                      className="stroke-muted-foreground"
                    />
                  )}
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              </div>

              <nav className="flex flex-1 flex-col gap-8 px-4 pt-4">
                {links.map((section) => (
                  <section
                    key={section.sectionName}
                    className="flex flex-col gap-0.5"
                  >
                    {isSidebarExpanded ? (
                      <p className="text-xs text-muted-foreground">
                        {section.sectionName}
                      </p>
                    ) : (
                      <div className="h-[18px]" />
                    )}
                    {section.links.map((item) => {
                      const Icon = Icons[item.icon || "arrowRight"];
                      return (
                        item.href && (
                          <Fragment key={`link-fragment-${item.label}`}>
                            {isSidebarExpanded ? (
                              <Link
                                key={`link-${item.label}`}
                                href={item.disabled ? "/" : item.href}
                                className={cn(
                                  "flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted hover:text-accent-foreground",
                                  path === item.href
                                    ? "bg-muted"
                                    : "text-muted-foreground",
                                  item.disabled &&
                                    "cursor-not-allowed opacity-80",
                                )}
                              >
                                <Icon className="size-5" />
                                {item.label}
                                {item.badge && (
                                  <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
                                    {item.badge}
                                  </Badge>
                                )}
                              </Link>
                            ) : (
                              <Tooltip key={`tooltip-${item.label}`}>
                                <TooltipTrigger asChild>
                                  <Link
                                    key={`link-tooltip-${item.label}`}
                                    href={item.disabled ? "/" : item.href}
                                    className={cn(
                                      "flex items-center gap-3 rounded-md py-2 text-sm font-medium hover:bg-muted hover:text-accent-foreground",
                                      path === item.href
                                        ? "bg-muted"
                                        : "text-muted-foreground",
                                      item.disabled &&
                                        "cursor-not-allowed opacity-80",
                                    )}
                                  >
                                    <span className="flex size-full items-center justify-center">
                                      <Icon className="size-5" />
                                    </span>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                  {item.label}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </Fragment>
                        )
                      );
                    })}
                  </section>
                ))}
              </nav>

              <div className="mt-auto xl:p-4">
                {isSidebarExpanded && !isTablet ? (
                  <Card className="max-xl:rounded-none max-xl:border-none max-xl:pb-6">
                    <CardHeader className="max-xl:p-4">
                      <CardTitle>Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our
                        support team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="max-xl:p-4">
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                ) : null}
              </div>
            </div>
          </aside>
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
}

export function MobileSheetSidebar({ links }: DashboardSidebarProps) {
  const path = usePathname();
  const { isTablet, isMobile } = useMediaQuery();

  if (isTablet || isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="size-9 shrink-0 md:hidden"
          >
            <Menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="flex flex-1 flex-col gap-8 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="size-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>

            <ProjectSwitcher large />

            {links.map((section) => (
              <section key={section.sectionName}>
                <p className="mb-0.5 text-xs text-muted-foreground">
                  {section.sectionName}
                </p>

                {section.links.map((item) => {
                  const Icon = Icons[item.icon || "arrowRight"];
                  return (
                    item.href && (
                      <Fragment key={`link-fragment-${item.label}`}>
                        <Link
                          key={`link-${item.label}`}
                          href={item.disabled ? "/" : item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted hover:text-accent-foreground",
                            path === item.href
                              ? "bg-muted"
                              : "text-muted-foreground",
                            item.disabled && "cursor-not-allowed opacity-80",
                          )}
                        >
                          <Icon className="size-5" />
                          {item.label}
                          {item.badge && (
                            <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </Fragment>
                    )
                  );
                })}
              </section>
            ))}
          </nav>

          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return;
}
