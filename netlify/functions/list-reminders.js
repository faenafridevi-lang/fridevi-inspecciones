import { blobs } from '@netlify/blobs';

export default async () => {
  try {
    const diag = { hasBlobs: !!blobs, hasList: !!blobs?.list };
    const listing = await blobs.list({ prefix: 'reminders/' });
    const items = await Promise.all(
      (listing?.blobs || []).map(b =>
        blobs.get(b.key).then(r => r.text()).then(JSON.parse)
      )
    );
    return new Response(
      JSON.stringify({ ok: true, diag, count: items.length, items }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        name: err?.name,
        message: err?.message,
        stack: err?.stack
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};
