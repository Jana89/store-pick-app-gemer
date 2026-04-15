import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Macta Flow - Store Transfer Desk",
  description:
    "Prototype app for store teams to manage pick, pack, and send requests for online order support.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
