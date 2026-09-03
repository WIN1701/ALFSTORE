"use client";

import React, { createContext, useContext, useState } from "react";

export type Talla = "S" | "M" | "L" | "XL";

export interface CartItem {
  id: number;
  imagen: string;
  talla: Talla;
  cantidad: number;
}

interface CartContextType {
  carrito: CartItem[];
  carritoAbierto: boolean;
  cantidadTotal: number;
  abrirCarrito: () => void;
  cerrarCarrito: () => void;
  vaciarCarrito: () => void;
  agregarAlCarrito: (id: number, imagen: string, talla: Talla) => void;
  eliminarDelCarrito: (id: number, talla: Talla) => void;
  aumentarCantidad: (id: number, talla: Talla) => void;
  disminuirCantidad: (id: number, talla: Talla) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const abrirCarrito = () => setCarritoAbierto(true);
  const cerrarCarrito = () => setCarritoAbierto(false);
  const vaciarCarrito = () => setCarrito([]);

  const agregarAlCarrito = (id: number, imagen: string, talla: Talla) => {
    setCarrito((prev) => {
      const index = prev.findIndex((item) => item.id === id && item.talla === talla);
      if (index !== -1) {
        const nuevo = [...prev];
        nuevo[index].cantidad += 1;
        return nuevo;
      }
      return [...prev, { id, imagen, talla, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id: number, talla: Talla) => {
    setCarrito((prev) => prev.filter((item) => !(item.id === id && item.talla === talla)));
  };

  const aumentarCantidad = (id: number, talla: Talla) => {
    setCarrito((prev) =>
      prev.map((item) => (item.id === id && item.talla === talla ? { ...item, cantidad: item.cantidad + 1 } : item))
    );
  };

  const disminuirCantidad = (id: number, talla: Talla) => {
    setCarrito((prev) =>
      prev
        .map((item) => (item.id === id && item.talla === talla ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0)
    );
  };

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        carrito,
        carritoAbierto,
        cantidadTotal,
        abrirCarrito,
        cerrarCarrito,
        vaciarCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        aumentarCantidad,
        disminuirCantidad,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
}