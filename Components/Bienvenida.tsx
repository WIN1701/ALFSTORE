"use client";

import { useEffect, useState } from "react";

export default function Bienvenida() {
  const [visible, setVisible] = useState(true);
  const [saliendo, setSaliendo] = useState(false);

  useEffect(() => {
    const iniciarSalida = window.setTimeout(() => {
      setSaliendo(true);
    }, 1300);

    const eliminar = window.setTimeout(() => {
      setVisible(false);
    }, 1800);

    return () => {
      window.clearTimeout(iniciarSalida);
      window.clearTimeout(eliminar);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`
        fixed
        inset-0
        z-[20000]
        flex
        items-center
        justify-center
        bg-black
        px-5
        text-white
        transition-opacity
        duration-500

        ${saliendo ? "opacity-0" : "opacity-100"}
      `}
    >
      <div className="text-center">
        <div className="mx-auto mb-6 h-px w-24 bg-red-600" />

        <h1 className="alf-logo text-6xl sm:text-8xl">
          Alf
          <span className="text-red-600">
            Store
          </span>
        </h1>

        <p className="urban-kicker mt-6 text-[9px] text-zinc-500 sm:text-xs">
          Del caos nace el carácter
        </p>

        <div className="mx-auto mt-6 h-px w-24 bg-red-600" />
      </div>
    </div>
  );
}