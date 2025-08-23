import { blobs } from '@netlify/blobs';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:tu@mail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async () => {
  try {
    // suscripciones
    const subsList = await blobs.list({ prefix: 'subs/' });
    const subs = await Promise.all(
      subsList.blobs.map(b => blobs.get(b.key).then(r => r.text()).then(JSON.parse))
    );

    // recordatorios en ventana ±2h
    const remList = await blobs.list({ prefix: 'reminders/' });
    const reminders = await Promise.all(
      remList.blobs.map(b => blobs.get(b.key).then(r => r.text()).then(JSON.parse))
    );
    const now = Date.now(), windowMs = 2 * 60 * 60 * 1000;
    const due = reminders.filter(r => Math.abs(new Date(r.whenISO).getTime() - now) <= windowMs);

    // enviar
    const results = [];
    for (const r of due) {
      for (const s of subs) {
        try {
          await webpush.sendNotification(s, JSON.stringify({ title: r.title, body: r.body }));
          results.push({ r: r.id, ok: true });
        } catch (e) {
          results.push({ r: r.id, ok: false, err: String(e) });
        }
      }
    }

    // log por día
    const logKey = `logs/${new Date().toISOString().slice(0,10)}.json`;
    const prev = await blobs.get(logKey).then(r => r?.text()).catch(() => null);
    const arr = prev ? JSON.parse(prev) : [];
    arr.push({ ts: new Date().toISOString(), results });
    await blobs.set(logKey, JSON.stringify(arr));

    return new Response(
      JSON.stringify({ ok: true, sent: results.length }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("cron-dispatch ERROR:", err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};
