import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DetailItemProps {
    label: string;
    value?: ReactNode | null;
    icon?: ReactNode;
    className?: string;
    placeholder?: string;
}

export function DetailItem({
    label,
    value,
    icon,
    className,
    placeholder = "Not available",
}: DetailItemProps) {
    const isEmpty =
        value === null ||
        value === undefined ||
        value === "" ||
        (typeof value === "string" && value.trim() === "");

    return (
        <div
            className={cn(
                "rounded-xl border bg-card px-4 py-3 transition-colors",
                "hover:bg-muted/30",
                className
            )}
        >
            <div className="mb-1 flex items-center gap-2">
                <span>
                    {icon}
                </span>

                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                </span>
            </div>

            {isEmpty ? (
                <p className="text-sm italic text-muted-foreground">
                    {placeholder}
                </p>
            ) : (
                <div className="text-[15px] leading-7 break-words">
                    {value}
                </div>
            )}
        </div>
    );
}