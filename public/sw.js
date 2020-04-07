
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('static-cache').then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './bundle.js',
                './global.css',
                './images/broken_clouds.png',
                './images/clear_day.png',
                './images/cloudy_weather.png',
                './images/few_clouds.png',
                './images/mostly_cloudy.png',
                './images/rainy_weather.png',
                './images/shower_rain.png',
                './images/snow_weather.png',
                './images/storm_weather.png',
                './images/unknown.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open('static-cache')
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
