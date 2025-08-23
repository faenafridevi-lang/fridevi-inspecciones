import { blobs } from '@netlify/blobs';
import { randomUUID } from 'node:crypto';

export default async (event) => {
  try {
    const body = JSON.parse(event.body || "{}"); // {title, body, whenISO}
    const id = body.id || randomUUID();
    await blobs.set(`reminders/${id}.json`, JSON.stringify({
      id,
      title: body.title || 'Recordatorio SGI',
      body:  body.body  || 'Completar inspección',
      whenISO: body.whenISO
    }));
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, id })
    };
  } catch (err) {
    console.error("schedule-reminder ERROR:", err);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: String(err) })
    };
  }
};
