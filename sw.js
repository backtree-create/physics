// オフラインでも開けるようにするためのキャッシュ。
// 開発中・更新中のサイトであることを踏まえ、オンライン時は必ず最新のファイルを取りに行き
// （ネットワーク優先）、取得できたときだけキャッシュに保存する。オフライン時のみキャッシュを使う。
// 以前のバージョンは「キャッシュ優先」だったため、404などのエラー応答まで
// 正常なページとしてキャッシュしてしまい、一度エラーになったページがその後ずっと
// 直らないという不具合があった。CACHE_VERSIONを上げることで、その古い誤ったキャッシュも破棄する。
const CACHE_VERSION = 'chikara-v2';
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
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      Promise.all(CORE_ASSETS.map((url) => cache.add(url).catch(() => {})))
    )
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

  event.respondWith(
    fetch(req).then((res) => {
      // 成功した応答(200番台)だけをキャッシュする。404やエラーは絶対に保存しない。
      if (res && res.ok) {
        const resClone = res.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, resClone)).catch(() => {});
      }
      return res;
    }).catch(() => {
      // オフライン等でネットワークが使えないときだけキャッシュにフォールバック
      return caches.match(req);
    })
  );
});
