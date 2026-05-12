const CACHE = 'gea-vendor-v1';

// Assets to pre-cache on install
const PRECACHE = ['/'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only intercept same-origin vendor routes and static assets
  if (url.origin !== self.location.origin) return;
  if (request.method !== 'GET') return;

  const isVendorPage = url.pathname.startsWith('/vendor/');
  const isStatic = url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/');

  if (!isVendorPage && !isStatic) return;

  if (isStatic) {
    // Cache-first for static assets
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(request, clone));
        return res;
      }))
    );
    return;
  }

  // Network-first for vendor pages; fall back to cache when offline
  event.respondWith(
    fetch(request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(request, clone));
        return res;
      })
      .catch(() => caches.match(request))
  );
});
