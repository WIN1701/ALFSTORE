const CACHE_NAME = 'alfstore-cache-v1';

// Archivos estáticos esenciales que se pueden cachear de forma segura
const ASSETS_TO_CACHE = [
  '/',
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activación y limpieza de cachés antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptación de peticiones de red
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. IGNORAR peticiones que NO sean GET (como POST/PUT de Supabase o API routes)
  if (event.request.method !== 'GET') {
    return;
  }

  // 2. IGNORAR peticiones a Supabase, Vercel o dominios externos para evitar bloqueos de datos
  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  // 3. IGNORAR peticiones de navegación (HTML de las páginas) para que carguen siempre frescas desde la red
  if (event.request.mode === 'navigate') {
    return;
  }

  // 4. ESTRATEGIA PARA IMÁGENES Y RECURSOS ESTÁTICOS (/productos/ u otros assets)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si está en caché, lo devuelve, pero actualiza el caché en segundo plano (stale-while-revalidate)
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Solo cacheamos si la respuesta es válida
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => {
        // Si falla la red y hay caché previa, se mantiene vivo
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});