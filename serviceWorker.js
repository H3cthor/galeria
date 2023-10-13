const staticFunkos = "dev-funko-site-v1";

const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/images/funko_1.png",
    "/images/funko_2.png",
    "/images/funko_3.png",
    "/images/funko_4.png",
    "/images/funko_5.png",
    "/images/funko_6.png",
];

async function preCache() {
    const cache = await caches.open(staticFunkos);
    return cache.addAll(assets);
}


self.addEventListener("install", (installEvent) => {
    installEvent.waitUntil(precache());
})

async function cacheFirst(request){
    const cacheResponse = await caches.match(request);

    if (cacheResponse){
        return cacheResponse; 
    }

    try{
        const networkResponse = await fetch(request);

        if(networkResponse.ok){
            const cache = await caches.open(staticFunkos);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }
    catch( error ){
        return Response.error();
    }
}

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(cacheFirst(fetchEvent.request))
})






