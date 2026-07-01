import { AppSidebar } from "@/components/layout/sidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Event Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <TooltipProvider delayDuration={0}>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
                  <SidebarTrigger />
                  <Separator orientation="vertical" className="h-4" />
                  {/* <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    / events
                  </span> */}
                </header>
                {children}
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
