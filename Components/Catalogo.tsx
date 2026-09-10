"use client";

import { useEffect, useState } from "react";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  ShoppingBag,
  X,
  ZoomIn,
} from "lucide-react";

import { supabase } from "../lib/supabase";

import {
  useCart,
  type Talla,
} from "../app/context/cartcontext";

// Definimos la interfaz del producto basada en la tabla de Supabase
interface ProductoSupabase {
  id: string; // UUID de Supabase
  nombre: string;
  descripcion: string | null;
  precio: number;
  imagen: string;
  tallas: string[];
  stock: number;
  activo: boolean;
}

const TALLAS: Talla[] = ["S", "M", "L", "XL"];
const PRODUCTOS_POR_PAGINA = 15;

export default function Catalogo() {
  const {
    agregarAlCarrito,
    abrirCarrito,
  } = useCart();

  const [productos, setProductos] = useState<ProductoSupabase[]>([]);
  const [cargando, setCargando] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState<Record<string, Talla>>({});
  const [productoAgregado, setProductoAgregado] = useState<string | null>(null);
  const [imagenesConError, setImagenesConError] = useState<Record<string, boolean>>({});

  // Cargar productos desde Supabase al iniciar
  useEffect(() => {
    async function cargarProductos() {
      try {
        setCargando(true);
        const { data, error } = await supabase
          .from("productos")
          .select("*")
          .eq("activo", true)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error al obtener productos de Supabase:", error.message);
        } else if (data) {
          setProductos(data);
        }
      } catch (err) {
        console.error("Error inesperado:", err);
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  const totalPaginas = Math.ceil(productos.length / PRODUCTOS_POR_PAGINA) || 1;
  const indiceInicial = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
  const productosVisibles = productos.slice(indiceInicial, indiceInicial + PRODUCTOS_POR_PAGINA);

  useEffect(() => {
    if (!imagenAmpliada) {
      return;
    }

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const cerrarConEscape = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        setImagenAmpliada(null);
      }
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, [imagenAmpliada]);

  const seleccionarTalla = (productoId: string, talla: Talla) => {
    setTallasSeleccionadas((anterior) => ({
      ...anterior,
      [productoId]: talla,
    }));
  };

  const agregarProducto = (producto: ProductoSupabase) => {
    const talla = tallasSeleccionadas[producto.id];

    if (!talla) {
      return;
    }

    // Adaptamos el producto al formato que espera el carrito (mapeando id string/number si es necesario)
    const productoParaCarrito = {
      id: 1, // O ajusta tu cartcontext si ya acepta strings en id
      imagen: producto.imagen,
    };

    agregarAlCarrito(producto as any, talla);
    setProductoAgregado(producto.id);

    window.setTimeout(() => {
      setProductoAgregado(null);
    }, 1000);

    window.setTimeout(() => {
      abrirCarrito();
    }, 250);
  };

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) {
      return;
    }

    setPaginaActual(nuevaPagina);

    window.setTimeout(() => {
      document.getElementById("catalogo")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <>
      <section
        id="catalogo"
        className="scroll-mt-24 overflow-hidden bg-black px-3 py-16 text-white sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-red-600">
              AlfStore
            </p>

            <h2 className="text-3xl font-black uppercase sm:text-5xl">
              Nuestra colección
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-400">
              Selecciona una talla y agrega la camisa al carrito.
            </p>

            {!cargando && productos.length > 0 && (
              <p className="mt-3 text-xs font-bold uppercase text-red-500">
                Página {paginaActual} de {totalPaginas}
              </p>
            )}
          </div>

          {cargando ? (
            <div className="py-20 text-center text-zinc-500 uppercase font-black tracking-widest text-sm">
              Cargando catálogo desde Supabase...
            </div>
          ) : productos.length === 0 ? (
            <div className="py-20 text-center text-zinc-500 uppercase font-black tracking-widest text-sm">
              No hay productos disponibles en este momento.
            </div>
          ) : (
            <>
              <div className="catalogo-grid">
                {productosVisibles.map((producto) => {
                  const tallaSeleccionada = tallasSeleccionadas[producto.id];
                  const agregado = productoAgregado === producto.id;
                  const imagenConError = imagenesConError[producto.id] === true;

                  return (
                    <article key={producto.id} className="producto-card">
                      <button
                        type="button"
                        disabled={imagenConError}
                        onClick={() => {
                          if (!imagenConError) {
                            setImagenAmpliada(producto.imagen);
                          }
                        }}
                        className="producto-media"
                      >
                        {imagenConError ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950 text-zinc-600">
                            <ImageOff size={30} />
                            <span className="text-[9px] font-black uppercase">
                              Imagen no disponible
                            </span>
                          </div>
                        ) : (
                          <img
                            src={`${producto.imagen}?v=7`}
                            alt={producto.nombre}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            onError={() => {
                              setImagenesConError((anterior) => ({
                                ...anterior,
                                [producto.id]: true,
                              }));
                            }}
                            className="producto-foto"
                          />
                        )}

                        {!imagenConError && (
                          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/85 text-white">
                            <ZoomIn size={18} />
                          </span>
                        )}
                      </button>

                      <div className="flex min-h-[175px] flex-1 flex-col border-t border-white/10 p-3 sm:min-h-[195px] sm:p-4">
                        <p className="mb-1 text-center text-[9px] font-bold uppercase text-zinc-500 truncate">
                          {producto.nombre}
                        </p>

                        <p className="mb-4 text-center text-[10px] font-bold uppercase text-zinc-400 sm:text-xs">
                          Selecciona tu talla
                        </p>

                        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                          {TALLAS.map((talla) => (
                            <button
                              key={talla}
                              type="button"
                              onClick={() => seleccionarTalla(producto.id, talla)}
                              className={`flex aspect-square items-center justify-center rounded-full border text-xs font-bold ${
                                tallaSeleccionada === talla
                                  ? "border-red-500 bg-red-700 text-white"
                                  : "border-white/20 bg-black text-zinc-400"
                              }`}
                            >
                              {talla}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          disabled={!tallaSeleccionada || imagenConError}
                          onClick={() => agregarProducto(producto)}
                          className={`mt-auto flex min-h-11 w-11 sm:w-full items-center justify-center gap-2 rounded-xl px-2 text-[8px] font-black uppercase sm:text-xs ${
                            tallaSeleccionada && !imagenConError
                              ? "bg-red-700 text-white"
                              : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                          }`}
                        >
                          {agregado ? <Check size={16} /> : <ShoppingBag size={16} />}
                          <span className="hidden sm:inline">
                            {imagenConError
                              ? "No disponible"
                              : agregado
                              ? "Agregado"
                              : tallaSeleccionada
                              ? "Agregar"
                              : "Elige talla"}
                          </span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {totalPaginas > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => cambiarPagina(paginaActual - 1)}
                    disabled={paginaActual === 1}
                    className="flex h-11 items-center gap-1 rounded-lg border border-white/15 bg-zinc-950 px-3 text-[9px] font-black uppercase disabled:opacity-30"
                  >
                    <ChevronLeft size={17} />
                    Anterior
                  </button>

                  <span className="flex h-11 min-w-16 items-center justify-center rounded-lg border border-red-700/50 bg-red-950/30 px-3 text-xs font-black text-red-400">
                    {paginaActual}/{totalPaginas}
                  </span>

                  <button
                    type="button"
                    onClick={() => cambiarPagina(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                    className="flex h-11 items-center gap-1 rounded-lg border border-white/15 bg-zinc-950 px-3 text-[9px] font-black uppercase disabled:opacity-30"
                  >
                    Siguiente
                    <ChevronRight size={17} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {imagenAmpliada && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4 py-6"
          onClick={() => setImagenAmpliada(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-black"
            onClick={(evento) => evento.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setImagenAmpliada(null)}
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/90 text-white"
            >
              <X size={24} />
            </button>

            <div className="modal-producto">
              <img
                src={`${imagenAmpliada}?v=7`}
                alt="Vista ampliada de la camisa"
                decoding="async"
                draggable={false}
                className="modal-producto-foto"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}