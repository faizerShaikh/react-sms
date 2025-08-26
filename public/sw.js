// Service Worker for School Management System PWA
// Minimal service worker without caching

// Install event - no caching
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  // Don't skip waiting automatically - let user choose
  // self.skipWaiting();
});

// Fetch event - no caching, always fetch from network
self.addEventListener('fetch', (event) => {
  // Always fetch from network, no caching
  return;
});

// Activate event - no cache cleanup needed
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Background sync triggered'),
    );
  }
});
