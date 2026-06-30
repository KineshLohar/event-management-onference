"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface EventsPaginationProps {
    currentPage: number;
    totalPages: number;
    totalEvents: number;
    start: number;
    end: number;
}

export function EventsPagination({
    currentPage,
    totalPages,
    totalEvents,
    start,
    end,
}: EventsPaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams);

        if (page <= 1) {
            params.delete("page");
        } else {
            params.set("page", page.toString());
        }

        const query = params.toString();

        return query ? `${pathname}?${query}` : pathname;
    };

    if (totalEvents === 0) {
        return null;
    }

    const pages: number[] = [];

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(
        totalPages,
        currentPage + 2
    );

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="mt-6 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                    {start}
                </span>{" "}
                to{" "}
                <span className="font-medium text-foreground">
                    {end}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                    {totalEvents}
                </span>{" "}
                events
            </p>

            <div className="flex items-center gap-1">
                {currentPage > 1 ? (
                    <Button asChild variant="outline" size="icon">
                        <Link href={createPageUrl(currentPage - 1)}>
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                ) : (
                    <Button variant="outline" size="icon" disabled>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                )}

                {pages.map((page) => (
                    <Button
                        key={page}
                        disabled={currentPage === page}
                        variant={
                            page === currentPage
                                ? "default"
                                : "outline"
                        }
                        size="icon"
                    >
                        <Link href={createPageUrl(page)}>
                            {page}
                        </Link>
                    </Button>
                ))}

                {
                    currentPage === totalPages
                        ?
                        <Button variant="outline" size="icon" disabled>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        :
                        <Button
                            asChild
                            variant="outline"
                            size="icon"
                            disabled={currentPage === totalPages}
                        >
                            <Link
                                href={createPageUrl(currentPage + 1)}
                                aria-disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </Button>
                }

            </div>
        </div>
    );
}