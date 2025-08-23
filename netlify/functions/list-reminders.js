import { blobs } from '@netlify/blobs';

export default async () => {
  try {
    const listing = await blobs.list({ prefix: 'reminders/' });
    const items = await Promise.all(
      listing.blobs.map(b => blobs.get(b.key).then(r => r.text()).then(JSON.parse))
    );
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, items })
    };
  } catch (err) {
    console.error("list-reminders ERROR:", err);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: String(err) })
    };
  }
};
