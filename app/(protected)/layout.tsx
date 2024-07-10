import { redirect } from "next/navigation";

import { sidebarLinks } from "@/config/dashboard";
import { getCurrentUser } from "@/lib/session";
import { SearchCommand } from "@/components/dashboard/search-command";
import {
  DashboardSidebar,
  MobileSheetSidebar,
} from "@/components/layout/dashboard-sidebar";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { UserAccountNav } from "@/components/layout/user-account-nav";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const filteredLinks = sidebarLinks.map((section) => ({
    ...section,
    items: section.items.filter(
      ({ authorizeOnly }) => !authorizeOnly || authorizeOnly === user.role,
    ),
  }));

  return (
    <MaxWidthWrapper className="max-w-[1650px] px-0">
      <div className="relative flex min-h-screen w-full">
        <DashboardSidebar links={filteredLinks} />

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-50 flex h-14 items-center gap-3 bg-background px-4 lg:h-[60px] xl:px-10">
            <MobileSheetSidebar links={filteredLinks} />

            <div className="w-full flex-1">
              <SearchCommand links={filteredLinks} />
            </div>

            {/* <Notifications /> */}
            <ModeToggle />
            <UserAccountNav />
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 xl:px-10">
            {children}
          </main>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
