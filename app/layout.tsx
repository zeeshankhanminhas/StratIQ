import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strat IQ — Business decisions, better informed",
  description:
    "Structured investigation, market intelligence and disciplined execution for important business decisions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
