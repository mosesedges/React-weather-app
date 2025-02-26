const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// install SW
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('opened cache');

			return cache.addAll(urlsToCache);
		})
	);
});

// listen for request
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then(() => {
			return fetch(event.request).catch(() => caches.match('offline.html'));
		})
	);
});

// activate the SW

self.addEventListener('activate', (event) => {
	const cacheWhiteList = [];
	cacheWhiteList.push(CACHE_NAME);

	event.waitUntil(
		caches.keys().then((cachenames) =>
			Promise.all(
				cachenames.map((cachename) => {
					if (!cacheWhiteList.includes(cachename)) {
						return caches.delete(cachename);
					}
				})
			)
		)
	);
});
