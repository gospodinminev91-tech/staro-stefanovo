var CACHE = "razhodka1-v14";
var FILES = ["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png","./img/carkva.jpg","./img/cheshma.jpg","./img/hram.jpg","./img/johan.jpg","./img/levski.jpg","./img/patq.jpg","./img/plocha.jpg","./img/rajna.jpg","./img/shiroko.jpg","./img/sini.jpg","./img/sredishte.jpg","./img/ulichka.jpg","./img/vazov.jpg","./audio/kos.m4a","./audio/ku-ku.m4a","./audio/razdumka.m4a","./map/dem/14/9320/6018.png","./map/dem/14/9320/6019.png","./map/dem/14/9321/6018.png","./map/dem/14/9321/6019.png","./map/maplibre-gl.css","./map/maplibre-gl.js","./map/selo.json"];

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); }).catch(function(){}));
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(function(hit){
    var net = fetch(e.request).then(function(res){
      if(res && res.status === 200 && res.type === "basic"){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
      }
      return res;
    }).catch(function(){ return hit; });
    return hit || net;
  }));
});