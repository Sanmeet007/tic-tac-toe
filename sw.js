self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("sw-cache").then(function (cache) {
      return cache.addAll([
        "index.html",
        "assets/css/style.css",
        "assets/svg/bg.svg",
        "assets/js/script.js",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
