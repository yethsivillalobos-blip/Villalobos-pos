const CACHE_VILLALOBOS = 'villalobos-saas-v10';

// Se incluyen todos los documentos HTML y librerías externas
const recursosSaaS = [
  './',
  './login.html',
  './index.html',
  './app.html',
  './calculadora.html',
  './manifest.json',
  './wolf-192.png',
  './wolf-512.png',
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VILLALOBOS).then(cache => cache.addAll(recursosSaaS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_VILLALOBOS) return caches.delete(key);
      })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
