// Service Worker for School Management System PWA
// Minimal service worker without caching

// Install event - no caching
self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
});

// Fetch event - no caching, always fetch from network
self.addEventListener("fetch", (event) => {
  // Always fetch from network, no caching
  return;
});

// Activate event - no cache cleanup needed
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Handle background sync tasks
      console.log("Background sync triggered")
    );
  }
});

// Push notification handling
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New notification from SMS",
    icon: "/pwa-192x192.png",
    badge: "/pwa-64x64.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "View",
        icon: "/pwa-64x64.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/pwa-64x64.png",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("School Management System", options)
  );
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});
