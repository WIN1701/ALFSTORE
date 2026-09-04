// app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import { CartProvider } from "./context/cartcontext";
import Carrito from "../Components/carrito";
import ServiceWorkerRegister from "../Components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "AlfStore",
  description:
    "AlfStore Streetwear. Del caos nace el carácter.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-dvh bg-black text-white antialiased overflow-x-hidden flex flex-col selection:bg-neutral-800 selection:text-white">
        <CartProvider>
          <ServiceWorkerRegister />
          <div className="flex flex-col flex-1 w-full">
            {children}
          </div>
          <Carrito />
        </CartProvider>
      </body>
    </html>
  );
}