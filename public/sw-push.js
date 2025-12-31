/**
 * Service Worker Push Notification Handler
 * Handles incoming push notifications from OneSignal or web push
 */

// Listen for push events
self.addEventListener('push', (event) => {
  if (!event.data) {
    console.warn('Push event received but no data');
    return;
  }

  try {
    const data = event.data.json();

    const options = {
      body: data.body || 'You have a new notification',
      icon: data.icon || '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      tag: data.tag || 'blanketwise-notification',
      data: data.data || { url: '/' },
      vibrate: [100, 50, 100],
      requireInteraction: false,
    };

    event.waitUntil(
      self.registration.showNotification(
        data.title || 'BlanketWise',
        options
      )
    );
  } catch (err) {
    console.error('Error handling push event:', err);
  }
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window/tab open
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.navigate(urlToOpen);
            return client.focus();
          }
        }
        // If no window is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
      .catch((err) => {
        console.error('Error handling notification click:', err);
      })
  );
});

// Handle notification close (optional analytics)
self.addEventListener('notificationclose', (event) => {
  // Could send analytics here if needed
  console.log('Notification closed:', event.notification.tag);
});
