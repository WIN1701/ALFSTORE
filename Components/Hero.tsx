import {
  ArrowDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import VideoHero from "./VideoHero";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="
        alf-hero
        relative
        flex
        w-full
        items-center
        overflow-hidden
        bg-black
        pt-20
        text-white
      "
    >
      <VideoHero />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/35" />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-gradient-to-b
          from-black/75
          via-black/10
          to-black
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-gradient-to-r
          from-black/75
          via-transparent
          to-black/45
        "
      />

      {/* REDES SOCIALES FLOTANTES EN LA SECCIÓN 1 (SOLO MÓVIL, DESAPARECEN AL BAJAR) */}
      <div
        className="
          absolute
          right-4
          top-24
          z-30
          flex
          flex-col
          gap-2.5
          md:hidden
        "
      >
        {/* Instagram */}
        <a
          href="https://www.instagram.com/alfstore.sv?igsh=ZTBvbTRsdXUyNzlu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/70
            text-white
            backdrop-blur-md
            transition-colors
            hover:border-red-500
            hover:text-red-500
          "
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@alfstore.sv?_r=1&_t=ZS-97vyM0WHz4k"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/70
            text-white
            backdrop-blur-md
            transition-colors
            hover:border-red-500
            hover:text-red-500
          "
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
          </svg>
        </a>

        {/* WhatsApp (Recuerda cambiar 503XXXXXXXX por tu número real con código de país) */}
        <a
          href="https://wa.me/503XXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/70
            text-white
            backdrop-blur-md
            transition-colors
            hover:border-red-500
            hover:text-red-500
          "
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </a>
      </div>

      <div
        aria-hidden="true"
        className="
          alf-watermark
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[3]
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        ALF
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
          items-center
          px-5
          text-center
          sm:px-8
          lg:items-start
          lg:px-10
          lg:text-left
        "
      >
        <div
          className="
            mb-5
            flex
            items-center
            gap-2
            rounded-full
            border
            border-red-600/50
            bg-black/75
            px-4
            py-2
          "
        >
          <Sparkles
            size={14}
            className="text-red-500"
          />

          <span className="urban-kicker text-[9px] text-zinc-200 sm:text-xs">
            ALF STREETWEAR
          </span>
        </div>

        <h1
          className="
            hero-title
            max-w-5xl
            text-5xl
            text-white
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            xl:text-9xl
          "
        >
          Del caos nace

          <span className="urban-red mt-1 block">
            el carácter
          </span>
        </h1>

        <p
          className="
            mt-7
            max-w-xl
            text-sm
            leading-7
            text-zinc-200
            sm:text-base
            lg:text-lg
          "
        >
          No hacemos ropa. Creamos identidad.
          Diseños urbanos para quienes no nacieron
          para seguir las reglas.
        </p>

        <div
          className="
            mt-9
            flex
            w-full
            flex-col
            items-center
            gap-3
            sm:w-auto
            sm:flex-row
          "
        >
          <a
            href="#catalogo"
            className="
              flex
              min-h-12
              w-full
              items-center
              justify-center
              gap-3
              rounded-full
              bg-red-700
              px-8
              py-4
              text-xs
              font-black
              uppercase
              tracking-wider
              text-white
              sm:w-auto
            "
          >
            Ver colección
            <ArrowRight size={18} />
          </a>

          <a
            href="#historia"
            className="
              flex
              min-h-12
              w-full
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              bg-black/75
              px-8
              py-4
              text-xs
              font-black
              uppercase
              tracking-wider
              text-white
              sm:w-auto
            "
          >
            Nuestra historia
          </a>
        </div>
      </div>

      <a
        href="#catalogo"
        className="
          absolute
          bottom-4
          left-1/2
          z-20
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-2
        "
      >
        <span className="urban-kicker text-[8px] text-zinc-400">
          Explorar
        </span>

        <span
          className="
            flex
            h-10
            w-7
            items-center
            justify-center
            rounded-full
            border
            border-white/25
            bg-black/70
            text-red-500
          "
        >
          <ArrowDown size={16} />
        </span>
      </a>
    </section>
  );
}