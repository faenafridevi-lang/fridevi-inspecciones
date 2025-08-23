import { blobs } from '@netlify/blobs';
import { randomUUID } from 'node:crypto';

export default async (request) => {
  try {
    const sub = await request.json();
    const id = randomUUID();
    await blobs.set(`subs/${id}.json`, JSON.stringify(sub));
    return new Response(
      JSON.stringify({ ok: true, id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("register-sub ERROR:", err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};
