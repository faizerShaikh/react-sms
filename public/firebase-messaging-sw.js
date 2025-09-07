importScripts(
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js',
);

// Firebase configuration - should match your main app config
firebase.initializeApp({
  apiKey: 'AIzaSyAKEchTxbjuw7jiN0puaBTQkhOvlnQDg2Q',
  authDomain: 'school-management-system-5312e.firebaseapp.com',
  databaseURL:
    'https://school-management-system-5312e-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'school-management-system-5312e',
  storageBucket: 'school-management-system-5312e.firebasestorage.app',
  messagingSenderId: '371820619512',
  appId: '1:371820619512:web:9f94fe43c61fde704dfd0d',
});

const messaging = firebase.messaging();
console.log(messaging, '<=====messaging');
// 3) Show the notification when a background FCM arrives
messaging.onBackgroundMessage((payload) => {
  console.log('[sw] bg message', payload);

  const { title, message } = payload.data || {};
  // Try fcmOptions.link (webpush.link) first, then fallback to data.link
  const url = payload.fcmOptions?.link || payload.data?.url;

  const options = {
    body: message,
    data: { url },
    // you can add icon, badge, etc. here too
    // icon: '/icons/icon-192x192.png',
  };

  self.registration.showNotification(title, options);
});

// 4) Handle click — focus or open the target URL
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        // If one of the open windows already matches, focus it.
        for (const client of windowClients) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise, open a new one
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      }),
  );
});
