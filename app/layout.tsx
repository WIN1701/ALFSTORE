import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { CartProvider } from "@/app/context/cartcontext";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlfStore | Del caos nace el carácter",
  description: "AlfStore Streetwear - Catálogo oficial",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-black">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <CartProvider>
          {children}
          <ServiceWorkerRegister />
        </CartProvider>
      </body>
    </html>
  );
}