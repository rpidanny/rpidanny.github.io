var cacheName = 'cache-v10';
var dataCacheName = 'quoteData-v4';
var filesToCache = [
  '/',
  '/index.html',
  '/favicon.png',
  '/manifest.json',
  '/scripts/bootstrap.min.js',
  '/scripts/EasePack.min.js',
  '/scripts/jquery.min.js',
  '/scripts/vendor.js',
  '/scripts/plugins.js',
  '/scripts/main.js',
  '/scripts/rAF.js',
  '/scripts/TweenLite.min.js',
  '/styles/main.css',
  '/styles/vendor.css',
  '/styles/bootstrap.min.css',
  '/styles/fonts/glyphicons-halflings-regular.woff',
  '/styles/fonts/socicon-webfont.woff',
  '/styles/animate.css',
  '/images/abhishek1.jpg',
  '/images/vcard.png',
  '/images/to-top@2x.png',
  '/images/jGIGWOA.jpg'
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
  var dataURL = "https://random-quotes-api.herokuapp.com/";
  if(e.request.url.indexOf(dataURL)==0){
    e.respondWith(
      fetch(e.request)
        .then(function(response){
          return caches.open(dataCacheName).then(function(cache){
            cache.put(e.request.url, response.clone());
            console.log('[ServiceWorker] Fetched Quote');
            return response;
          });
        })
    );
  }else{
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }

});
