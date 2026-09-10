"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Talla = "S" | "M" | "L" | "XL";

export interface ProductoBase {
  id: string; // ID de Supabase (UUID)
  imagen: string;
}

export interface ProductoCarrito {
  id: string;
  imagen: string;
  talla: Talla;
  cantidad: number;
}

interface CartContextType {
  carrito: ProductoCarrito[];
  carritoAbierto: boolean;
  cantidadTotal: number;

  agregarAlCarrito: (
    producto: ProductoBase,
    talla: Talla,
    cantidad?: number
  ) => void;

  eliminarDelCarrito: (
    productoId: string,
    talla: Talla
  ) => void;

  aumentarCantidad: (
    productoId: string,
    talla: Talla
  ) => void;

  disminuirCantidad: (
    productoId: string,
    talla: Talla
  ) => void;

  abrirCarrito: () => void;
  cerrarCarrito: () => void;
  vaciarCarrito: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<
  CartContextType | undefined
>(undefined);

export function CartProvider({
  children,
}: CartProviderProps) {
  const [carrito, setCarrito] = useState<
    ProductoCarrito[]
  >([]);

  const [carritoAbierto, setCarritoAbierto] =
    useState(false);

  const agregarAlCarrito = (
    producto: ProductoBase,
    talla: Talla,
    cantidad: number = 1
  ) => {
    setCarrito((carritoAnterior) => {
      const existente = carritoAnterior.find(
        (item) =>
          item.id === producto.id &&
          item.talla === talla
      );

      if (existente) {
        return carritoAnterior.map((item) =>
          item.id === producto.id &&
          item.talla === talla
            ? {
                ...item,
                cantidad: item.cantidad + cantidad,
              }
            : item
        );
      }

      return [
        ...carritoAnterior,
        {
          id: producto.id,
          imagen: producto.imagen,
          talla,
          cantidad,
        },
      ];
    });
  };

  const eliminarDelCarrito = (
    productoId: string,
    talla: Talla
  ) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.filter(
        (item) =>
          !(
            item.id === productoId &&
            item.talla === talla
          )
      )
    );
  };

  const aumentarCantidad = (
    productoId: string,
    talla: Talla
  ) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((item) =>
        item.id === productoId &&
        item.talla === talla
          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }
          : item
      )
    );
  };

  const disminuirCantidad = (
    productoId: string,
    talla: Talla
  ) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior
        .map((item) =>
          item.id === productoId &&
          item.talla === talla
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const cantidadTotal = useMemo(() => {
    return carrito.reduce(
      (total, item) => total + item.cantidad,
      0
    );
  }, [carrito]);

  const valorContexto: CartContextType = {
    carrito,
    carritoAbierto,
    cantidadTotal,
    agregarAlCarrito,
    eliminarDelCarrito,
    aumentarCantidad, // Corregido el error tipográfico
    disminuirCantidad,
    abrirCarrito: () =>
      setCarritoAbierto(true),
    cerrarCarrito: () =>
      setCarritoAbierto(false),
    vaciarCarrito: () => setCarrito([]),
  };

  return (
    <CartContext.Provider value={valorContexto}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const contexto = useContext(CartContext);

  if (!contexto) {
    throw new Error(
      "useCart debe utilizarse dentro de CartProvider"
    );
  }

  return contexto;
}