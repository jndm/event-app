import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@client/lib/utils";
import { Toaster } from "@client/components/ui/toaster";

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
        <main className="flex flex-col items-center justify-between px-24">
          <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
