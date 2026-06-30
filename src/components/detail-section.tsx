import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DetailSectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function DetailSection({
  title,
  description,
  icon,
  children,
  className,
}: DetailSectionProps) {
  return (
    <section className={cn("space-y-3", className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-muted/40">
            {icon}
          </div>
        )}

        <div>
          <h3 className=" font-medium opacity-75 ">
            {title}
          </h3>

          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
}