/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";

import {
  Crown,
  Flame,
  ImageOff,
  Shield,
} from "lucide-react";

const RUTAS_HISTORIA = [
  "/fondos/historia.jpg",
  "/fondo/historia.jpg",
  "/fondos/historia.jpeg",
  "/fondo/historia.jpeg",
  "/fondos/historia.webp",
  "/fondo/historia.webp",
  "/fondos/historia.png",
  "/fondo/historia.png",
];

export default function Historia() {
  const [indiceRuta, setIndiceRuta] =
    useState(0);

  const sinImagen =
    indiceRuta >= RUTAS_HISTORIA.length;

  const rutaActual =
    RUTAS_HISTORIA[indiceRuta];

  return (
    <section
      id="historia"
      className="
        urban-section
        scroll-mt-24
        overflow-hidden
        border-y
        border-white/10
        px-4
        py-16
        text-white
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-28
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        <article
          className="
            overflow-hidden
            rounded-[28px]
            border
            border-white/15
            bg-black
          "
        >
          <div className="grid lg:grid-cols-2">
            <div
              className="
                historia-media
                border-b
                border-white/10
                lg:border-b-0
                lg:border-r
              "
            >
              {!sinImagen ? (
                <img
                  key={rutaActual}
                  src={rutaActual}
                  alt="Historia urbana de AlfStore"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  onError={() => {
                    setIndiceRuta(
                      (indiceActual) =>
                        indiceActual + 1
                    );
                  }}
                  className="historia-foto"
                />
              ) : (
                <div
                  className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    bg-[#050505]
                    px-6
                    text-center
                    text-zinc-500
                  "
                >
                  <ImageOff size={38} />

                  <p className="urban-kicker text-[9px]">
                    Imagen no encontrada
                  </p>

                  <p className="max-w-xs text-xs leading-5 text-zinc-600">
                    Revisa que el archivo sea
                    public/fondos/historia.jpg
                  </p>
                </div>
              )}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/85
                  via-transparent
                  to-black/15
                "
              />

              <div
                className="
                  absolute
                  bottom-6
                  left-5
                  right-5
                  z-10
                  sm:bottom-8
                  sm:left-8
                  sm:right-8
                "
              >
                <p className="urban-kicker text-[9px] text-red-500 sm:text-xs">
                  Nuestra esencia
                </p>

                <p className="urban-title mt-3 max-w-md text-2xl text-white sm:text-3xl">
                  Del caos nace el carácter
                </p>
              </div>
            </div>

            <div
              className="
                flex
                flex-col
                justify-center
                px-6
                py-12
                sm:px-10
                sm:py-16
                lg:px-14
                lg:py-20
              "
            >
              <p className="urban-kicker mb-5 text-xs text-red-500">
                Nuestra historia
              </p>

              <h2
                className="
                  urban-title
                  max-w-2xl
                  text-4xl
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Más que una marca,

                <span className="urban-red mt-2 block">
                  un estilo de vida.
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
                AlfStore nace de una visión urbana,
                auténtica y diferente. Cada diseño
                representa carácter, rebeldía y la
                seguridad de vestir sin seguir las
                reglas de los demás.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
                No hacemos solamente ropa. Creamos
                identidad para quienes entienden que
                vestir también es una forma de
                expresar quiénes son.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-[#080808] p-4">
                  <Flame
                    size={22}
                    className="text-red-500"
                  />

                  <h3 className="urban-kicker mt-4 text-[10px] text-white">
                    Carácter
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    Diseños con personalidad.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#080808] p-4">
                  <Shield
                    size={22}
                    className="text-red-500"
                  />

                  <h3 className="urban-kicker mt-4 text-[10px] text-white">
                    Identidad
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    Viste lo que representas.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#080808] p-4">
                  <Crown
                    size={22}
                    className="text-red-500"
                  />

                  <h3 className="urban-kicker mt-4 text-[10px] text-white">
                    Exclusividad
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    Not for everyone.
                  </p>
                </div>
              </div>

              <a
                href="#catalogo"
                className="
                  mt-10
                  flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  bg-red-700
                  px-8
                  text-xs
                  font-black
                  uppercase
                  tracking-wider
                  text-white
                  sm:w-fit
                "
              >
                Ver colección
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}