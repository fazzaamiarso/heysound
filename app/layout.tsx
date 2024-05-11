import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hey!Sound",
  description: "Audio upload hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-neutral-200")}>
        <div className="mx-auto w-11/12 max-w-2xl py-12">
          <header className="rounded-md bg-white px-4 py-6">
            <h1 className="text-2xl font-bold">Hey!Sound</h1>
          </header>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
