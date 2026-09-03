"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, ZoomIn, Check, ChevronLeft, ChevronRight, Plus, Minus, Trash2, Flame, Shield, Crown } from "lucide-react";
import { useCart, Talla } from "@/app/context/cartcontext";

const TALLAS: Talla[] = ["S", "M", "L", "XL"];
const TOTAL_PRODUCTOS = 30;
const PRODUCTOS_POR_PAGINA = 15;
const WHATSAPP_NUMERO = "50360197818";
const INSTAGRAM_URL = "https://instagram.com";
const TIKTOK_URL = "https://tiktok.com";

export default function AlfStoreApp() {
  const { carrito, carritoAbierto, cantidadTotal, abrirCarrito, cerrarCarrito, vaciarCarrito, agregarAlCarrito, eliminarDelCarrito, aumentarCantidad, disminuirCantidad } = useCart();
  
  const [montado, setMontado] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [tallas, setTallas] = useState<Record<number, Talla>>({});
  const [agregadoId, setAgregadoId] = useState<number | null>(null);
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  useEffect(() => {
    setMontado(true);
  }, []);

  const productos = Array.from({ length: TOTAL_PRODUCTOS }, (_, i) => ({
    id: i + 1,
    imagen: `/productos/camisa${String(i + 1).padStart(3, "0")}.webp`,
  }));

  const totalPaginas = Math.ceil(productos.length / PRODUCTOS_POR_PAGINA);
  const productosVisibles = productos.slice((paginaActual - 1) * PRODUCTOS_POR_PAGINA, paginaActual * PRODUCTOS_POR_PAGINA);

  const enviarWhatsAppGeneral = () => {
    const msg = "Hola, ¡quiero más información sobre los productos de AlfStore!";
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const enviarWhatsAppPedido = () => {
    if (carrito.length === 0) return;
    const detalle = carrito.map((i, index) => `*${index + 1}.* Camisa #${i.id} | Talla: *${i.talla}* | Cantidad: ${i.cantidad}`).join("\n");
    const msg = `Hola, quiero hacer este pedido en *AlfStore*:\n\n${detalle}\n\n*Total items: ${cantidadTotal}*`;
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-red-600 selection:text-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 h-20 flex items-center justify-between">
        <a href="#inicio" className="text-2xl font-black uppercase tracking-tighter">Alf<span className="text-red-600">Store</span></a>
        
        <nav className="hidden md:flex gap-8 text-xs font-black uppercase tracking-widest text-zinc-400">
          <a href="#inicio" className="hover:text-red-500 transition">Inicio</a>
          <a href="#historia" className="hover:text-red-500 transition">Historia</a>
          <a href="#catalogo" className="hover:text-red-500 transition">Colección</a>
        </nav>

        <div className="flex items-center gap-3">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/20 bg-zinc-950 hover:border-red-600 transition flex items-center justify-center w-9 h-9" title="Instagram">
            <img src="/icono/instagram.png" alt="Instagram" className="w-4 h-4 object-contain" />
          </a>

          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/20 bg-zinc-950 hover:border-red-600 transition flex items-center justify-center w-9 h-9" title="TikTok">
            <img src="/icono/tiktok.png" alt="TikTok" className="w-4 h-4 object-contain" />
          </a>

          <button onClick={enviarWhatsAppGeneral} className="p-2.5 rounded-full border border-white/20 bg-zinc-950 hover:border-green-600 transition flex items-center justify-center w-9 h-9" title="WhatsApp">
            <img src="/icono/whatsapp.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
          </button>

          <button onClick={abrirCarrito} className="relative p-2.5 rounded-full border border-white/20 bg-zinc-950 hover:border-red-600 text-zinc-300 hover:text-white transition">
            <ShoppingBag size={18} />
            {montado && cantidadTotal > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center">{cantidadTotal}</span>}
          </button>

          <button onClick={() => setMenuAbierto(!menuAbierto)} className="md:hidden p-2.5 rounded-full border border-white/20 bg-zinc-950">
            {menuAbierto ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* MENÚ MÓVIL */}
      {menuAbierto && (
        <div className="fixed inset-x-0 top-20 z-40 bg-black/95 backdrop-blur-lg border-b border-white/10 p-6 flex flex-col gap-4 md:hidden">
          <a href="#inicio" onClick={() => setMenuAbierto(false)} className="text-sm font-black uppercase">Inicio</a>
          <a href="#historia" onClick={() => setMenuAbierto(false)} className="text-sm font-black uppercase">Historia</a>
          <a href="#catalogo" onClick={() => setMenuAbierto(false)} className="text-sm font-black uppercase">Colección</a>
          <div className="flex gap-4 pt-4 border-t border-white/10 items-center">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-zinc-400">
              <img src="/icono/instagram.png" alt="Instagram" className="w-4 h-4 object-contain" /> Instagram
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-zinc-400">
              <img src="/icono/tiktok.png" alt="TikTok" className="w-4 h-4 object-contain" /> TikTok
            </a>
            <button onClick={enviarWhatsAppGeneral} className="flex items-center gap-2 text-xs font-bold text-green-500">
              <img src="/icono/whatsapp.png" alt="WhatsApp" className="w-4 h-4 object-contain" /> WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section id="inicio" className="relative h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden pt-20">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
          <source src="/videos/hero-alfstore.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-600/40 bg-red-950/40 backdrop-blur-md text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <Flame size={12} /> Alfstore Streetwear
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none drop-shadow-lg">
            Del caos nace <span className="text-red-600 block mt-1">el carácter</span>
          </h1>
          
          <p className="text-zinc-300 mt-4 text-xs sm:text-sm max-w-md font-medium drop-shadow">
            No hacemos ropa. Creamos identidad. Diseños urbanos para quienes no nacieron para seguir las reglas.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full sm:w-auto">
            <a href="#catalogo" className="bg-red-700 hover:bg-red-600 text-white text-xs font-black uppercase px-8 py-3.5 rounded-full tracking-wider transition shadow-lg shadow-red-900/40">
              Ver colección →
            </a>
            <a href="#historia" className="border border-white/20 hover:border-white text-white text-xs font-black uppercase px-8 py-3.5 rounded-full tracking-wider transition bg-black/40 backdrop-blur-sm">
              Nuestra historia
            </a>
          </div>
        </div>
      </section>

      {/* HISTORIA SECTION */}
      <section id="historia" className="py-28 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 flex flex-col justify-end p-8">
          <img src="/fondos/historia.jpg" alt="Historia AlfStore" className="absolute inset-0 w-full h-full object-cover opacity-80" onError={(e)=>{(e.target as HTMLElement).style.display='none'}} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Nuestra Esencia</span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase mt-2">Del caos nace el carácter</h3>
          </div>
        </div>
        <div>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-red-500">Nuestra Historia</span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase mt-3 leading-tight">Más que una marca, un estilo de vida.</h2>
          <p className="text-zinc-400 mt-6 text-sm leading-relaxed">
            AlfStore nace de una visión urbana, auténtica y diferente. Cada diseño representa carácter, rebeldía y la seguridad de vestir sin seguir las reglas de los demás.
          </p>
          <p className="text-zinc-400 mt-4 text-sm leading-relaxed">
            No hacemos solamente ropa. Creamos identidad para quienes entienden que vestir también es una forma de expresar quiénes son.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-zinc-950 border border-white/10 p-4 rounded-2xl text-center">
              <Flame className="text-red-500 mx-auto mb-2" size={20} />
              <h4 className="text-xs font-black uppercase tracking-wider">Carácter</h4>
              <p className="text-[10px] text-zinc-500 mt-1">Diseños con personalidad.</p>
            </div>
            <div className="bg-zinc-950 border border-white/10 p-4 rounded-2xl text-center">
              <Shield className="text-red-500 mx-auto mb-2" size={20} />
              <h4 className="text-xs font-black uppercase tracking-wider">Identidad</h4>
              <p className="text-[10px] text-zinc-500 mt-1">Viste lo que representas.</p>
            </div>
            <div className="bg-zinc-950 border border-white/10 p-4 rounded-2xl text-center">
              <Crown className="text-red-500 mx-auto mb-2" size={20} />
              <h4 className="text-xs font-black uppercase tracking-wider">Exclusividad</h4>
              <p className="text-[10px] text-zinc-500 mt-1">Not for everyone.</p>
            </div>
          </div>

          <div className="mt-8">
            <a href="#catalogo" className="inline-block bg-red-700 hover:bg-red-600 text-white text-xs font-black uppercase px-8 py-4 rounded-full tracking-wider transition shadow-lg shadow-red-900/40">
              Ver colección
            </a>
          </div>
        </div>
      </section>

      {/* CATÁLOGO SECTION */}
      <section id="catalogo" className="py-28 px-4 max-w-[1600px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-red-500">Alfstore</span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase mt-2">Nuestra Colección</h2>
          <p className="text-zinc-400 text-sm mt-3">Selecciona una talla y agrega la camisa al carrito.</p>
          <p className="text-xs font-black text-red-500 mt-2 tracking-widest uppercase">Página {paginaActual} de {totalPaginas}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {productosVisibles.map((prod) => {
            const tallaSeleccionada = tallas[prod.id];
            const esAgregado = agregadoId === prod.id;

            return (
              <div key={prod.id} className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden flex flex-col group">
                <div className="relative aspect-[3/4] bg-black cursor-pointer flex items-center justify-center overflow-hidden" onClick={() => setZoomImg(prod.imagen)}>
                  <img src={prod.imagen} alt={`Camisa ${prod.id}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" onError={(e)=>{(e.target as HTMLElement).style.display='none'}} />
                  <span className="absolute inset-0 flex items-center justify-center text-zinc-700 text-[10px] font-bold uppercase pointer-events-none">Camisa #{prod.id}</span>
                  <span className="absolute bottom-3 right-3 p-2 rounded-full bg-black/80 text-white opacity-0 group-hover:opacity-100 transition"><ZoomIn size={16} /></span>
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase text-center mb-2">Camisa #{prod.id}</p>
                  <div className="grid grid-cols-4 gap-1 mb-3">
                    {TALLAS.map((t) => (
                      <button key={t} onClick={() => setTallas({ ...tallas, [prod.id]: t })} className={`py-1.5 text-[10px] font-black rounded border transition ${tallaSeleccionada === t ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-900/50" : "border-white/20 text-zinc-400 bg-black hover:border-white/50"}`}>{t}</button>
                    ))}
                  </div>
                  <button
                    disabled={!tallaSeleccionada}
                    onClick={() => {
                      if (!tallaSeleccionada) return;
                      agregarAlCarrito(prod.id, prod.imagen, tallaSeleccionada);
                      setAgregadoId(prod.id);
                      setTimeout(() => setAgregadoId(null), 1000);
                      setTimeout(() => abrirCarrito(), 200);
                    }}
                    className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-1.5 transition ${tallaSeleccionada ? "bg-red-700 text-white hover:bg-red-600 shadow-md shadow-red-900/30" : "bg-zinc-900 text-zinc-600 cursor-not-allowed"}`}
                  >
                    {esAgregado ? <Check size={14} /> : <ShoppingBag size={14} />}
                    {esAgregado ? "¡Listo!" : tallaSeleccionada ? "Agregar" : "Elige Talla"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* PAGINACIÓN */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} disabled={paginaActual === 1} className="px-5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs font-black disabled:opacity-30 flex items-center gap-1.5 hover:border-white/30 transition"><ChevronLeft size={16} /> Anterior</button>
          <span className="text-xs font-black text-red-500 tracking-wider">{paginaActual} / {totalPaginas}</span>
          <button onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))} disabled={paginaActual === totalPaginas} className="px-5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs font-black disabled:opacity-30 flex items-center gap-1.5 hover:border-white/30 transition">Siguiente <ChevronRight size={16} /></button>
        </div>
      </section>

      {/* BANNER INFERIOR "NOT FOR EVERYONE" */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-3xl border border-white/10 bg-zinc-950 p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-red-950/20 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              <Flame size={14} /> Not for everyone
            </div>
            <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">La calle no sigue tendencias.<br /><span className="text-red-600">Las crea.</span></h3>
            <div className="mt-8">
              <a href="#catalogo" className="inline-block bg-red-700 hover:bg-red-600 text-white text-xs font-black uppercase px-8 py-4 rounded-full tracking-wider transition shadow-lg shadow-red-900/40">
                Explorar colección →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-6 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-6 text-xs text-zinc-500">
        <p>© 2026 AlfStore. Del caos nace el carácter.</p>
        <div className="flex gap-6 items-center">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1.5">
            <img src="/icono/instagram.png" alt="Instagram" className="w-4 h-4 object-contain" /> Instagram
          </a>
          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1.5">
            <img src="/icono/tiktok.png" alt="TikTok" className="w-4 h-4 object-contain" /> TikTok
          </a>
          <button onClick={enviarWhatsAppGeneral} className="hover:text-green-500 transition flex items-center gap-1.5">
            <img src="/icono/whatsapp.png" alt="WhatsApp" className="w-4 h-4 object-contain" /> WhatsApp
          </button>
        </div>
      </footer>

      {/* ZOOM MODAL */}
      {zoomImg && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setZoomImg(null)}>
          <div className="relative max-w-md w-full bg-zinc-950 border border-white/20 rounded-2xl overflow-hidden p-3 shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setZoomImg(null)} className="absolute top-4 right-4 z-10 p-2 bg-black/80 hover:bg-red-600 rounded-full text-white transition"><X size={18} /></button>
            <img src={zoomImg} alt="Zoom" className="w-full h-auto object-contain max-h-[80vh] rounded-xl" />
          </div>
        </div>
      )}

      {/* CARRITO DRAWER */}
      {montado && carritoAbierto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end transition" onClick={cerrarCarrito}>
          <div className="w-full max-w-md bg-zinc-950 border-l border-white/10 h-full flex flex-col p-6 text-white shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h3 className="font-black uppercase text-base flex items-center gap-2"><ShoppingBag size={18} /> Tu Carrito</h3>
              <button onClick={cerrarCarrito} className="p-2 rounded-full border border-white/10 hover:border-white transition"><X size={18} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {carrito.length === 0 ? (
                <div className="text-center text-zinc-500 mt-32 space-y-2">
                  <ShoppingBag size={36} className="mx-auto opacity-30" />
                  <p className="text-xs uppercase font-bold">Tu carrito está vacío</p>
                </div>
              ) : (
                carrito.map((item) => (
                  <div key={`${item.id}-${item.talla}`} className="flex gap-3 bg-black border border-white/10 p-3 rounded-xl items-center">
                    <div className="w-14 h-18 bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center">
                      <img src={item.imagen} alt={`Camisa ${item.id}`} className="w-full h-full object-cover" onError={(e)=>{(e.target as HTMLElement).style.display='none'}} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black uppercase">Camisa #{item.id}</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Talla: <span className="text-red-500 font-black">{item.talla}</span></p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex border border-white/20 rounded-lg overflow-hidden bg-zinc-950">
                          <button onClick={() => disminuirCantidad(item.id, item.talla)} className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 transition"><Minus size={12} /></button>
                          <span className="px-3 py-1 text-xs font-black flex items-center">{item.cantidad}</span>
                          <button onClick={() => aumentarCantidad(item.id, item.talla)} className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 transition"><Plus size={12} /></button>
                        </div>
                        <button onClick={() => eliminarDelCarrito(item.id, item.talla)} className="text-red-500 hover:text-red-400 p-1"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {carrito.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between items-center text-xs font-black uppercase text-zinc-400 px-1">
                  <span>Total de productos:</span>
                  <span className="text-white text-sm">{cantidadTotal}</span>
                </div>
                <button onClick={enviarWhatsAppPedido} className="w-full bg-green-600 hover:bg-green-500 text-white font-black uppercase text-xs py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-green-900/30">
                  <ShoppingBag size={18} /> Enviar Pedido por WhatsApp
                </button>
                <button onClick={vaciarCarrito} className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-black uppercase text-[10px] py-3 rounded-xl flex items-center justify-center gap-1.5 transition">
                  <Trash2 size={14} /> Vaciar Carrito
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}