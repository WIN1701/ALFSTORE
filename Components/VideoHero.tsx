"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Play,
  VideoOff,
} from "lucide-react";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement | null>(
    null
  );

  const [mostrarBoton, setMostrarBoton] =
    useState(false);

  const [errorVideo, setErrorVideo] =
    useState(false);

  const reproducir = useCallback(async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    try {
      await video.play();
      setMostrarBoton(false);
      setErrorVideo(false);
    } catch {
      setMostrarBoton(true);
    }
  }, []);

  useEffect(() => {
    const temporizador = window.setTimeout(() => {
      void reproducir();
    }, 250);

    const reanudar = () => {
      if (
        document.visibilityState === "visible"
      ) {
        void reproducir();
      }
    };

    document.addEventListener(
      "visibilitychange",
      reanudar
    );

    return () => {
      window.clearTimeout(temporizador);

      document.removeEventListener(
        "visibilitychange",
        reanudar
      );
    };
  }, [reproducir]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {!errorVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          onCanPlay={() => {
            void reproducir();
          }}
          onPlaying={() => {
            setMostrarBoton(false);
          }}
          onError={() => {
            setErrorVideo(true);
            setMostrarBoton(false);
          }}
          className="hero-video absolute inset-0"
        >
          <source
            src="/videos/hero-alfstore.mp4"
            type="video/mp4"
          />
        </video>
      )}

      {errorVideo && (
        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
            gap-3
            bg-black
            text-zinc-600
          "
        >
          <VideoOff size={34} />

          <p className="urban-kicker text-[9px]">
            Video no encontrado
          </p>
        </div>
      )}

      {mostrarBoton && !errorVideo && (
        <button
          type="button"
          onClick={() => {
            void reproducir();
          }}
          className="
            absolute
            left-1/2
            top-1/2
            z-30
            flex
            -translate-x-1/2
            -translate-y-1/2
            items-center
            gap-3
            rounded-full
            border
            border-white/30
            bg-black
            px-5
            py-3
            text-xs
            font-black
            uppercase
            text-white
          "
        >
          <Play
            size={18}
            fill="currentColor"
          />

          Reproducir video
        </button>
      )}
    </div>
  );
}