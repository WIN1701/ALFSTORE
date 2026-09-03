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
            AlfStore Streetwear
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