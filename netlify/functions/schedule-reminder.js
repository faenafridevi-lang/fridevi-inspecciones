import { blobs } from '@netlify/blobs';
export default async (req) => {
  const body = await req.json(); // {title, body, whenISO}
  const id = crypto.randomUUID();
  await blobs.set(`reminders/${id}.json`, JSON.stringify({
    id, title: body.title||'Recordatorio SGI', body: body.body||'Completar inspección', whenISO: body.whenISO
  }));
  return new Response(JSON.stringify({ ok:true, id }), { status:200 });
};
