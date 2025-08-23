import { blobs } from '@netlify/blobs';

export default async (request) => {
  try {
    const { id } = await request.json();
    await blobs.delete(`reminders/${id}.json`);
    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("delete-reminder ERROR:", err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};
