"use client";

import { useState } from "react";

import {
  Crown,
  Flame,
  ImageOff,
  Shield,
} from "lucide-react";

const RUTAS_HISTORIA = [
  "/fondos/historia.jpg?v=7",
  "/fondos/historia.jpeg?v=7",
  "/fondos/historia.png?v=7",
  "/fondos/historia.webp?v=7",
];

export default function Historia() {
  const [indiceRuta, setIndiceRuta] =
    useState(0);

  const imagenNoDisponible =
    indiceRuta >= RUTAS_HISTORIA.length;

  const probarSiguienteImagen = () => {
    setIndiceRuta((indiceActual) =>
      indiceActual + 1
    );
  };

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
            shadow-[0_30px_80px_rgba(0,0,0,0.65)]
          "
        >
          <div className="grid lg:grid-cols-2">
            {/* IMAGEN */}
            <div
              className="
                historia-imagen-contenedor
                border-b
                border-white/10
                lg:border-b-0
                lg:border-r
              "
            >
              {!imagenNoDisponible ? (
                <img
                  key={RUTAS_HISTORIA[indiceRuta]}
                  src={RUTAS_HISTORIA[indiceRuta]}
                  alt="Historia urbana de AlfStore"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  onError={probarSiguienteImagen}
                  className="historia-imagen"
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

                  <p
                    className="
                      text-xs
                      font-black
                      uppercase
                      tracking-wider
                    "
                  >
                    No se pudo abrir historia.jpg
                  </p>

                  <p className="max-w-xs text-xs leading-5 text-zinc-600">
                    La imagen puede estar dañada o
                    tener una extensión diferente.
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
                  via-black/10
                  to-black/20
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
                <p
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-red-500
                    sm:text-xs
                  "
                >
                  Nuestra esencia
                </p>

                <p
                  className="
                    mt-3
                    max-w-md
                    text-2xl
                    font-black
                    uppercase
                    leading-tight
                    text-white
                    sm:text-3xl
                  "
                >
                  Del caos nace el carácter
                </p>
              </div>
            </div>

            {/* INFORMACIÓN */}
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
              <p
                className="
                  mb-5
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.32em]
                  text-red-500
                "
              >
                Nuestra historia
              </p>

              <h2
                className="
                  max-w-2xl
                  text-4xl
                  font-black
                  uppercase
                  leading-[0.95]
                  tracking-[-0.04em]
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Más que una marca,

                <span className="mt-2 block text-red-600">
                  un estilo de vida.
                </span>
              </h2>

              <p
                className="
                  mt-8
                  max-w-xl
                  text-sm
                  leading-7
                  text-zinc-400
                  sm:text-base
                "
              >
                AlfStore nace de una visión urbana,
                auténtica y diferente. Cada diseño
                representa carácter, rebeldía y la
                seguridad de vestir sin seguir las
                reglas de los demás.
              </p>

              <p
                className="
                  mt-4
                  max-w-xl
                  text-sm
                  leading-7
                  text-zinc-400
                  sm:text-base
                "
              >
                No hacemos solamente ropa. Creamos
                identidad para quienes entienden que
                vestir también es una forma de
                expresar quiénes son.
              </p>

              <div
                className="
                  mt-10
                  grid
                  gap-3
                  sm:grid-cols-3
                "
              >
                <div className="rounded-2xl border border-white/10 bg-[#080808] p-4">
                  <Flame
                    size={22}
                    className="text-red-500"
                  />

                  <h3 className="mt-4 text-sm font-black uppercase">
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

                  <h3 className="mt-4 text-sm font-black uppercase">
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

                  <h3 className="mt-4 text-sm font-black uppercase">
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
                  tracking-[0.16em]
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