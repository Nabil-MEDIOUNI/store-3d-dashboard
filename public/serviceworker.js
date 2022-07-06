const localhosturlsToCache = [
  "index.html",
  "/dashboard",
  "/settings",
  "/devices",
  "/device-positions",
  "/users",
  "/notifications",
  "/sign-in",
  "/sign-up",
  "/forgot",
  "landing-page",
  "/",
];

const netlifyurlsToCache = [
  "index.html",
  "/static/media/fa-solid-900.781e85bb.ttf",
  "/static/media/fa-brands-400.085b1dd8.ttf",
  "/static/media/fa-solid-900.ee09ad75.woff",
  "/static/media/fa-brands-400.dc0bd022.woff",
  "/static/media/fa-solid-900.c500da19.woff2",
  "/static/media/fa-brands-400.cac68c83.woff2",
  "/static/icons/logo-sofiatech.webP",
  "/static/media/wood.39979b64.png",
  "/static/media/glass.c51ca838.png",
  "/static/media/grass.a3785d79.jpg",
  "/static/media/dirt.692e992e.jpg",
  "/static/icons/ionicons/css/ionicons.min.css",
  "/static/css/loader.css",
  "/static/css/tailwind.css",
  "/static/js/2.7270b158.chunk.js",
  "/static/js/main.7975bdb8.chunk.js",
  "/static/css/main.4d6a3bfe.chunk.css",
  "/static/css/2.94b634ec.chunk.css",
  "/static/css/global.css",
  "/static/js/pageNotFound.js",
  "/static/img/3d-store.webP",
  "/static/img/3dStore.webP",
  "/static/img/abstergo.webP",
  "/static/img/download.webP",
  "/static/img/list.webP",
  "/static/img/loader.svg",
  "/static/img/logo_1024x1024.png",
  "/static/img/logo-white.png",
  "/static/img/pwlock.webP",
  "/static/img/register_bg_2.webP",
  "/static/icons/facebook.webp",
  "/static/icons/favicon-white.png",
  "/static/icons/favicon.png",
  "/static/icons/google.png",
  "/static/icons/home.png",
  "/dashboard",
  "/3d-dashboard",
  "/settings",
  "/devices",
  "/device-positions",
  "/users",
  "/notifications",
  "/sign-in",
  "/sign-up",
  "/forgot",
  "landing-page",
  "/",
];

const CACHE_NAME = "3d-store";

const self = this;

// Install SW
self.addEventListener("install", (event) => {
  const { origin } = event.target.location;
  if (origin.includes("localhost")) {
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) => cache.addAll(localhosturlsToCache))
    );
  } else {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(netlifyurlsToCache))
    );
  }
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
      })
    );
  }
});

self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
      event.waitUntil(
        this.registration.showNotification("Internet", {
          body: "internet not working",
        })
      );
    }
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        const requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});

self.addEventListener("push", (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "./static/img/logo.png",
  });
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
