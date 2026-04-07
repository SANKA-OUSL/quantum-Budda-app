const CACHE_NAME = 'q-dhamma-master-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './css/main-styles.css',
    './css/mystical-theme.css',
    './js/buddhist-philosophy.js',
    './js/quantum-simulators.js',
    './js/guru-robot.js',
    './js/login-animation.js',
    './js/app-core.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching all core assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});