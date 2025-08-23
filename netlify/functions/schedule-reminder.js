import { blobs } from '@netlify/blobs';
import { randomUUID } from 'node:crypto';

export default async (request) => {
  try {
    const body = await request.json(); // {title, body, whenISO}
    const id = body.id || randomUUID();
    await blobs.set(`reminders/${id}.json`, JSON.stringify({
      id,
      title: body.title || 'Recordatorio SGI',
      body:  body.body  || 'Completar inspección',
      whenISO: body.whenISO
    }));
    return new Response(
      JSON.stringify({ ok: true, id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("schedule-reminder ERROR:", err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};
