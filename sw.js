/* Service Worker – KI-Suite
   - Nur Dateien dieser Seite (/ki-tool/) werden gespeichert. Anfragen an fremde Server
     (Gmail, Google, KI-Proxy …) laufen immer direkt ins Netz und landen NIE im Cache.
   - Seiten (HTML): zuerst frisch aus dem Netz, Cache nur als Offline-Ersatz.
   - CSS/JS/Bilder: sofort aus dem Cache, im Hintergrund aktualisiert.
   Bei Änderungen an dieser Datei CACHE hochzählen, dann werden alte Caches gelöscht. */
const CACHE = 'ki-suite-v3';
const PRECACHE = [
  '/ki-tool/',
  '/ki-tool/assets/suite.css',
  '/ki-tool/assets/suite.js',
  '/ki-tool/assets/favicon.svg',
  '/ki-tool/assets/icon-192.png',
  '/ki-tool/assistent/',
  '/ki-tool/email-filter/',
  '/ki-tool/email-dashboard/',
  '/ki-tool/textanalyse/',
  '/ki-tool/prozess-check/',
  '/ki-tool/methoden/',
  '/ki-tool/gastro/',
  '/ki-tool/logistik/',
  '/ki-tool/angebot/',
  '/ki-tool/sicherheit/',
  '/ki-tool/dev-labor/',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      // einzeln laden: eine fehlende Seite soll die Installation nicht abbrechen
      .then(c => Promise.all(PRECACHE.map(u => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
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
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Fremde Server (Gmail-API, Google-Login, KI-Proxy, Schriften …): nie anfassen
  if (url.origin !== self.location.origin || !url.pathname.startsWith('/ki-tool/')) return;

  const isPage = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isPage) {
    // Network-first: immer die aktuelle Version, offline die gespeicherte
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('/ki-tool/')))
    );
    return;
  }
  // Stale-while-revalidate für statische Dateien
  e.respondWith(
    caches.match(req).then(cached => {
      const net = fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
