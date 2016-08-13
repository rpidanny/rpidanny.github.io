var cacheName = 'test-4';
var filesToCache = [
  '/',
  '/index.html',
  '/thinking.png',
  '/manifest.json',
  '/fancyBox/lib/jquery-1.10.1.min.js',
  '/fancyBox/source/jquery.fancybox.js?v=2.1.5',
  '/scripts/fancyBoxScript.js',
  '/scripts/vendor.js',
  '/scripts/plugins.js',
  '/scripts/main.js',
  '/images/to-top@2x.png',
  '/images/vcard.png',
  '/images/abhishek1.jpg',
  '/fancyBox/source/jquery.fancybox.css?v=2.1.5',
  '/styles/main.css',
  '/styles/vendor.css',
  '/styles/bootstrap.min.css',

];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        console.log('[ServiceWorker] Removing old cache', key);
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
