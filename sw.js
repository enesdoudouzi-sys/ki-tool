/* Service Worker – KI-Suite v1 */
const CACHE = 'ki-suite-v2';
const PRECACHE = [
  '/ki-tool/',
  '/ki-tool/index.html',
  '/ki-tool/assets/suite.css',
  '/ki-tool/assets/suite.js',
  '/ki-tool/assets/favicon.svg',
  '/ki-tool/assistent/',
  '/ki-tool/email-filter/',
  '/ki-tool/textanalyse/',
  '/ki-tool/prozess-check/',
  '/ki-tool/methoden/',
  '/ki-tool/gastro/',
  '/ki-tool/logistik/',
  '/ki-tool/angebot/',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(e.request);
      if (response.ok) await cache.put(e.request, response.clone());
      return response;
    } catch (_) {
      return (await cache.match(e.request)) || Response.error();
    }
  })());
});
