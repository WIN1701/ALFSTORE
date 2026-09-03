import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlfStore | Del caos nace el carácter",
  description: "Tienda urbana y de identidad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}