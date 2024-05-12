import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

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
          <Header />
          <div>{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
