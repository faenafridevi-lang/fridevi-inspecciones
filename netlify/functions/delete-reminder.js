import { blobs } from '@netlify/blobs';
export default async (req) => {
  const { id } = await req.json();
  await blobs.delete(`reminders/${id}.json`);
  return new Response(JSON.stringify({ ok:true }), { status:200 });
};
