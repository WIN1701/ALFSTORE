"use client";

import { useState } from "react";
import {
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";

import { useCart } from "../app/context/cartcontext";

// Íconos personalizados en SVG para redes sociales
const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const { cantidadTotal, abrirCarrito } = useCart();

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header
      className="
        fixed
        left-0
        top-0
        z-[1000]
        w-full
        border-b
        border-white/10
        bg-black
        text-white
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          w-full
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* LOGO ALFSTORE */}
        <a
          href="#inicio"
          onClick={cerrarMenu}
          className="
            alf-logo
            alf-logo-navbar
          "
          aria-label="Ir al inicio de AlfStore"
        >
          <span className="alf-logo-white">Alf</span>
          <span className="alf-logo-red">Store</span>
        </a>

        {/* MENÚ PARA COMPUTADORA + REDES SOCIALES */}
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8">
            <a
              href="#inicio"
              className="
                text-xs
                font-black
                uppercase
                tracking-wider
                text-zinc-300
                transition-colors
                hover:text-red-500
              "
            >
              Inicio
            </a>

            <a
              href="#historia"
              className="
                text-xs
                font-black
                uppercase
                tracking-wider
                text-zinc-300
                transition-colors
                hover:text-red-500
              "
            >
              Historia
            </a>

            <a
              href="#catalogo"
              className="
                text-xs
                font-black
                uppercase
                tracking-wider
                text-zinc-300
                transition-colors
                hover:text-red-500
              "
            >
              Colección
            </a>
          </nav>

          {/* REDES SOCIALES (COMPUTADORA) */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <a
              href="https://www.instagram.com/alfstore.sv?igsh=ZTBvbTRsdXUyNzlu" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de AlfStore"
              className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@alfstore.sv?_r=1&_t=ZS-97vyM0WHz4k"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de AlfStore"
              className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
            >
              <TikTokIcon size={20} />
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de AlfStore"
              className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
            >
              <WhatsAppIcon size={20} />
            </a>
          </div>
        </div>

        {/* CARRITO Y MENÚ MÓVIL */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={abrirCarrito}
            className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-zinc-950
              text-white
              transition-colors
              hover:border-red-600/60
            "
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={22} />

            {cantidadTotal > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-600
                  px-1
                  text-[10px]
                  font-black
                  text-white
                "
              >
                {cantidadTotal > 99 ? "99+" : cantidadTotal}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setMenuAbierto((estadoActual) => !estadoActual);
            }}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-zinc-950
              text-white
              transition-colors
              hover:border-red-600/60
              md:hidden
            "
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
          >
            {menuAbierto ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {/* MENÚ PARA TELÉFONO */}
      {menuAbierto && (
        <nav
          className="
            border-t
            border-white/10
            bg-black
            px-5
            py-5
            md:hidden
          "
        >
          <div className="flex flex-col gap-2">
            <a
              href="#inicio"
              onClick={cerrarMenu}
              className="
                rounded-xl
                px-4
                py-3
                text-sm
                font-black
                uppercase
                tracking-wider
                text-zinc-300
                transition-colors
                hover:bg-white/5
                hover:text-red-500
              "
            >
              Inicio
            </a>

            <a
              href="#historia"
              onClick={cerrarMenu}
              className="
                rounded-xl
                px-4
                py-3
                text-sm
                font-black
                uppercase
                tracking-wider
                text-zinc-300
                transition-colors
                hover:bg-white/5
                hover:text-red-500
              "
            >
              Historia
            </a>

            <a
              href="#catalogo"
              onClick={cerrarMenu}
              className="
                rounded-xl
                px-4
                py-3
                text-sm
                font-black
                uppercase
                tracking-wider
                text-zinc-300
                transition-colors
                hover:bg-white/5
                hover:text-red-500
              "
            >
              Colección
            </a>

            {/* REDES SOCIALES (MÓVIL) */}
            <div className="flex items-center justify-around pt-4 mt-2 border-t border-white/10">
              <a
                href="https://www.instagram.com/alfstore.sv?igsh=ZTBvbTRsdXUyNzlu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-red-500 py-2"
              >
                <InstagramIcon size={18} /> Instagram
              </a>
              <a
                href="https://www.tiktok.com/@alfstore.sv?_r=1&_t=ZS-97vyM0WHz4k"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-red-500 py-2"
              >
                <TikTokIcon size={18} /> TikTok
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-red-500 py-2"
              >
                <WhatsAppIcon size={18} /> WhatsApp
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}