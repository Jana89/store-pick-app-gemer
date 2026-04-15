import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Macta Store Pick App",
  description: "Store-side picking and send-to-warehouse app for retail employees."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
