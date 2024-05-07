import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@client/lib/utils";
import { Toaster } from "@client/components/ui/toaster";
import Link from "next/link";
import { Button, buttonVariants } from "@client/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event app",
  description: "Event app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen antialiased", inter.className)}>
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background ">
          <div className="flex items-center justify-between px-24 h-12">
            <Link className="text-xl font-bold" href={"/"}>
              Event app
            </Link>
            <div className="flex flex-row items-center gap-4">
              <Link
                className={buttonVariants({ variant: "outline" })}
                href={"/events"}
              >
                Create Event
              </Link>
              <Link
                className={buttonVariants({ variant: "outline" })}
                href={"/login"}
              >
                Login
              </Link>
            </div>
          </div>
        </header>
        <main className="flex flex-col items-center px-24 py-8">
          <div className="z-10 max-w-5xl w-full text-sm lg:flex lg:justify-center ">
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
