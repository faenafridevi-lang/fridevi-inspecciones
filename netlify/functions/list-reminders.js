import { blobs } from '@netlify/blobs';
export default async () => {
  const listing = await blobs.list({ prefix: 'reminders/' });
  const items = await Promise.all(listing.blobs.map(b => blobs.get(b.key).then(r=>r.text()).then(JSON.parse)));
  return new Response(JSON.stringify({ ok:true, items }), { status:200 });
};
