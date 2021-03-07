self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
            'changeMasterPass.html',
            'changeMasterPass.js',
            'db.js',
            'encryption.js',
            'exportPasswords.html',
            'exportPasswords.js',
            'favicon.png',
            'home.html',
            'home.js',
            'home.jpg',
            'importPasswords.html',
            'importPasswords.js',
            'index.css',
            'index.html',
            'index.js',
            'managePasswords.html',
            'managePasswords.js',
            'README.md',
            'search_engine.js',
            'sw.js',
            'syncPasswords.html',
            'syncPasswords.js'
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", function (event) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    );
  });