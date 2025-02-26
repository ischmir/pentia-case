const CACHE_NAME = "pwa-cache-v1";
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/css/styles.css",
    "/js/app.js"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    console.log("Service Worker Installed");
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Old cache deleted");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    console.log("Service Worker Activated");
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
