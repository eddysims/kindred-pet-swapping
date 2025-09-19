import { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
