self.addEventListener('push', e => {
  const data = e.data?.json() || { title:'Recordatorio', body:'Abrir app' };
  e.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/fridevi-icon-192.png',
    badge: '/fridevi-icon-96.png'
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
