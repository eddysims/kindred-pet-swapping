import "./globals.css";

import { Navigation } from "@/components/Navigation";

import type { Metadata } from "next";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "Pet Swap - Find Your Perfect Pet-Sitting Match",
  description: "Kindred take-home project for pet swapping and pet-sitting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col">
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
