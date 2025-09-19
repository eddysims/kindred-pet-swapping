import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

import type { Metadata } from "next";

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
      <body>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
