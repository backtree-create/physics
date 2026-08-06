// シンプルなオフラインキャッシュ。同一オリジンのファイルのみキャッシュし、
// 更新時はキャッシュ名(CACHE_VERSION)を上げれば古いキャッシュは自動的に破棄される。
const CACHE_VERSION = 'chikara-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './cart.html',
  './pressure.html',
  './projectile.html',
  './freefall.html',
  './pendulum.html',
  './pulley.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/favicon-16.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  if (sameOrigin) {
    // 同一オリジン：キャッシュ優先、なければネットワークから取得してキャッシュに追加
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, resClone));
          return res;
        }).catch(() => cached);
      })
    );
  } else {
    // 外部(フォント・Three.jsなど)：ネットワーク優先、失敗時はキャッシュがあれば使う
    event.respondWith(
      fetch(req).then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, resClone)).catch(() => {});
        return res;
      }).catch(() => caches.match(req))
    );
  }
});
