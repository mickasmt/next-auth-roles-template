interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-xl font-semibold md:text-2xl">
          {heading}
        </h1>
        {text && (
          <p className="text-sm text-muted-foreground md:text-base">{text}</p>
        )}
      </div>
      {children}
    </div>
  );
}
