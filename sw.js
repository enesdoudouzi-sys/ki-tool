/* Service Worker – KI-Suite v1 */
const CACHE = 'ki-suite-v1';
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
  // Groq/Worker API calls: immer live
  if (url.hostname.includes('workers.dev') || url.hostname.includes('groq')) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const net = fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
      return cached || net;
    })
  );
});
