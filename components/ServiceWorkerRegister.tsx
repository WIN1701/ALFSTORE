"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker registrado exitosamente:", registration.scope);
          })
          .catch((error) => {
            console.error("Error al registrar el Service Worker:", error);
          });
      });
    }
  }, []);

  return null;
}