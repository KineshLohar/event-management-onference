"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { CalendarDays, Car, LucideIcon, PanelLeftClose } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
}

const navItems: NavItem[] = [
    {
        title: "Events",
        href: "/",
        icon: CalendarDays,
    },
    {
        title: "Test",
        href: "/test",
        icon: Car,
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { toggleSidebar } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex items-center justify-between gap-2 py-1.5">
                    <div className="flex flex-col gap-1 leading-none group-data-[collapsible=icon]:hidden">
                        <span className="text-sm font-semibold tracking-tight">
                            OnferenceTV
                        </span>
                        <span className="font-mono text-[10px] capitalize tracking-[0.2em] text-sidebar-foreground/60">
                            Event Console
                        </span>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
                    >
                        <PanelLeftClose className="h-4 w-4" />
                    </button>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1.5">
                            {navItems.map((item) => {
                                const isActive =
                                    item.href === "/"
                                        ? pathname === "/"
                                        : pathname.startsWith(item.href);

                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={false}
                                            tooltip={item.title}
                                            className={cn(
                                                "relative font-mono text-[13px] tracking-tight bg-transparent!",
                                                "transition-colors duration-150",

                                                !isActive && "hover:bg-sidebar-foreground/5! hover:text-sidebar-foreground!",

                                                "before:absolute before:left-0 before:top-1/2 before:h-6 before:w-[2px] before:-translate-y-1/2 before:rounded-r-full before:bg-sidebar-accent-foreground before:opacity-0 before:transition-opacity",
                                                isActive && "before:opacity-100 bg-sidebar-accent-foreground/10!",
                                                "group-data-[collapsible=icon]:before:hidden"
                                            )}
                                        >
                                            <Link href={item.href}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <ThemeToggle />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}