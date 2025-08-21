async function initPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
  const reg = await navigator.serviceWorker.register('/sw.js');
  const existing = await reg.pushManager.getSubscription();
  const sub = existing || await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(window.VAPID_PUBLIC)
  });
  await fetch('/.netlify/functions/register-sub', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify(sub)
  });
}
function urlBase64ToUint8Array(base64String){
  const padding='='.repeat((4-base64String.length%4)%4);
  const base64=(base64String+padding).replace(/-/g,'+').replace(/_/g,'/');
  const raw=atob(base64); return Uint8Array.from([...raw].map(c=>c.charCodeAt(0)));
}
initPush();
