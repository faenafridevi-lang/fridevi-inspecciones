import { blobs } from '@netlify/blobs';
import { randomUUID } from 'node:crypto';

export default async (event) => {
  try {
    const sub = JSON.parse(event.body || "{}");
    const id = randomUUID();
    await blobs.set(`subs/${id}.json`, JSON.stringify(sub));
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, id })
    };
  } catch (err) {
    console.error("register-sub ERROR:", err);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: String(err) })
    };
  }
};
