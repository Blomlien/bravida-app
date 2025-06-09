const CACHE_NAME = 'bravida-app-v1'; // Nytt cachenavn

// Oppdatert "handleliste" med fulle filstier for bravida-app
const ASSETS_TO_CACHE = [
  '/bravida-app/index.html',
  '/bravida-app/manifest.json',
  '/bravida-app/icons/icon-512x512.png'
];

// Installasjons-event: Cacher de grunnleggende filene
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cacher filer');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Fetch-event: Svarer med cachede filer hvis de finnes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Hvis filen finnes i cache, returner den. Ellers, hent fra nettverket.
        return response || fetch(event.request);
      })
  );
});

// Sletter gamle cacher for å rydde opp
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});