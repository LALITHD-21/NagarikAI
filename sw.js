const CACHE_NAME = 'civicpulse-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.css',
  '/app.js',
  '/manifest.json',
  '/services/i18n.js',
  '/services/eligibility.js',
  '/services/timeline.js',
  '/services/chatbot.js',
  '/services/quiz.js',
  '/services/explainer.js',
  '/services/booth.js',
  '/utils/particles.js',
  '/utils/helpers.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('Service Worker: Some assets failed to cache during install.', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).catch(() => {
        // Fallback for offline if fetch fails and not in cache
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
