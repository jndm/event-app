import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@client/lib/utils";
import { Toaster } from "@client/components/ui/toaster";
import { Header } from "./(components)/header";

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
        <div className="relative">
          <Header />
          <main className="flex flex-col flex-1 items-center px-4 lg:px-24 py-8">
            <div className="z-10 w-full text-sm flex justify-center">
              {children}
            </div>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
