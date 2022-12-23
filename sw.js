// self.addEventListener('install', function(event) {
//     event.waitUntil(
//       caches.open('v1').then(function(cache) {
//         return cache.addAll([
//             'changeMasterPass.html',
//             'changeMasterPass.js',
//             'db.js',
//             'encryption.js',
//             'exportPasswords.html',
//             'exportPasswords.js',
//             'home.html',
//             'home.js',
//             'home.jpg',
//             'importPasswords.html',
//             'importPasswords.js',
//             'index.css',
//             'index.html',
//             'index.js',
//             'managePasswords.html',
//             'managePasswords.js',
//             'README.md',
//             'search_engine.js',
//             'sw.js',
//             'syncPasswords.html',
//             'syncPasswords.js',
//             'manifest.json',
//             'favicon48.png',
//             'favicon72.png',
//             'favicon128.png',
//             'favicon256.png',
//             'favicon512.png',
//         ]);
//       })
//     );
//   });
  
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