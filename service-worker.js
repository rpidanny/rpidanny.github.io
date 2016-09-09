var cacheName = 'cache-v10.5';
var dataCacheName = 'quoteData-v6';
var filesToCache = [
  '/',
  '/index.html',
  '/favicon.png',
  '/manifest.json',
  '/scripts/bootstrap.min.js',
  '/scripts/EasePack.min.js',
  '/scripts/jquery.gridrotator.js',
  '/scripts/modernizr.custom.26633.js',
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
  '/images/jGIGWOA.jpg',
  '/images/collection/1.jpg',
  '/images/collection/2.jpg',
  '/images/collection/3.jpg',
  '/images/collection/4.jpg',
  '/images/collection/5.jpg',
  '/images/collection/6.jpg',
  '/images/collection/7.jpg',
  '/images/collection/8.jpg',
  '/images/collection/9.jpg',
  '/images/collection/10.jpg',
  '/images/collection/11.jpg',
  '/images/collection/12.jpg',
  '/images/collection/13.jpg',
  '/images/collection/14.jpg',
  '/images/collection/15.jpg',
  '/images/collection/16.jpg',
  '/images/collection/17.jpg',
  '/images/collection/18.jpg',
  '/images/collection/19.jpg',
  '/images/collection/20.jpg',
  '/images/collection/21.jpg',
  '/images/collection/22.jpg',
  '/images/collection/23.jpg',
  '/images/collection/24.jpg',
  '/images/collection/25.jpg',
  '/images/collection/26.jpg',
  '/images/collection/27.jpg',
  '/images/collection/28.jpg',
  '/images/collection/29.jpg',
  '/images/collection/30.jpg',
  '/images/collection/31.jpg',
  '/images/collection/32.jpg',
  '/images/collection/33.jpg',
  '/images/collection/34.jpg',
  '/images/collection/35.jpg',
  '/images/collection/36.jpg',
  '/images/collection/37.jpg',
  '/images/collection/38.jpg',
  '/images/collection/39.jpg',
  '/images/collection/40.jpg',
  '/images/collection/41.jpg',
  '/images/collection/42.jpg',
  '/images/collection/43.jpg',
  '/images/collection/44.jpg',
  '/images/collection/45.jpg',
  '/images/collection/46.jpg',
  '/images/collection/47.jpg',
  '/images/collection/48.jpg',
  '/images/collection/49.jpg',
  '/images/collection/50.jpg',
  '/images/collection/51.jpg',
  '/images/collection/52.jpg',
  '/images/collection/53.jpg',
  '/images/collection/54.jpg',
  '/images/collection/55.jpg',
  '/images/collection/56.jpg',
  '/images/collection/57.jpg',
  '/images/collection/58.jpg',
  '/images/collection/59.jpg',
  '/images/collection/60.jpg',
  '/images/collection/61.jpg',
  '/images/collection/62.jpg',
  '/images/collection/63.jpg',
  '/images/collection/64.jpg',
  '/images/collection/65.jpg',
  '/images/collection/66.jpg',
  '/images/collection/67.jpg',
  '/images/collection/68.jpg',
  '/images/collection/69.jpg',
  '/images/collection/70.jpg',
  '/images/collection/71.jpg',
  '/images/collection/72.jpg',
  '/images/collection/73.jpg',
  '/images/collection/74.jpg',
  '/images/collection/75.jpg',
  '/images/collection/76.jpg',
  '/images/collection/77.jpg',
  '/images/collection/78.jpg',
  '/images/collection/79.jpg',
  '/images/collection/80.jpg',
  '/images/collection/81.jpg',
  '/images/collection/82.jpg',
  '/images/collection/83.jpg',
  '/images/collection/84.jpg',
  '/images/collection/85.jpg',
  '/images/collection/86.jpg',
  '/images/collection/87.jpg',
  '/images/collection/88.jpg',
  '/images/collection/89.jpg',
  '/images/collection/90.jpg',
  '/images/collection/91.jpg',
  '/images/collection/92.jpg',
  '/images/collection/93.jpg',
  '/images/collection/94.jpg',
  '/images/collection/95.jpg',
  '/images/collection/96.jpg',
  '/images/collection/97.jpg',
  '/images/collection/98.jpg',
  '/images/collection/99.jpg',
  '/images/collection/100.jpg',
  '/images/collection/101.jpg',
  '/images/collection/102.jpg',
  '/images/collection/102.jpg',
  '/images/collection/104.jpg'
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
  if(e.request.url.indexOf(dataURL) === 0){
    e.respondWith(
      fetch(e.request)
        .then(function(response){
          return caches.open(dataCacheName).then(function(cache){
            cache.put(e.request.url, response.clone());
            console.log('[ServiceWorker] Fetched Quote & Cache!');
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
