import {
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const anioActual =
    new Date().getFullYear();

  return (
    <footer
      className="
        border-t
        border-white/10
        bg-black
        px-5
        py-12
        text-white
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          items-center
          justify-between
          gap-8
          text-center
          md:flex-row
        "
      >
        <div>
          <a
            href="#inicio"
            className="
              alf-logo
              alf-logo-footer
            "
            aria-label="Ir al inicio de AlfStore"
          >
            <span className="alf-logo-white">
              Alf
            </span>

            <span className="alf-logo-red">
              Store
            </span>
          </a>

          <p
            className="
              mt-5
              text-[8px]
              font-black
              uppercase
              tracking-[0.3em]
              text-zinc-600
            "
          >
            Del caos nace el carácter
          </p>
        </div>

        <a
          href="https://wa.me/50360197818"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            min-h-11
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-green-700/50
            px-6
            text-xs
            font-black
            uppercase
            text-green-500
            transition-colors
            hover:border-green-500
            hover:bg-green-950/20
          "
        >
          <MessageCircle size={18} />

          WhatsApp
        </a>
      </div>

      <p
        className="
          mx-auto
          mt-10
          max-w-7xl
          border-t
          border-white/10
          pt-6
          text-center
          text-xs
          text-zinc-600
        "
      >
        © {anioActual} AlfStore. Todos los
        derechos reservados.
      </p>
    </footer>
  );
}