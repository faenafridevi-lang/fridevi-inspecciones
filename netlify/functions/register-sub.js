import { blobs } from '@netlify/blobs';
export default async (req) => {
  const sub = await req.json();
  const id = crypto.randomUUID();
  await blobs.set(`subs/${id}.json`, JSON.stringify(sub));
  return new Response(JSON.stringify({ ok:true, id }), { status:200 });
};
