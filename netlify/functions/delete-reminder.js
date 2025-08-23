import { blobs } from '@netlify/blobs';

export default async (event) => {
  try {
    const { id } = JSON.parse(event.body || "{}");
    await blobs.delete(`reminders/${id}.json`);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true })
    };
  } catch (err) {
    console.error("delete-reminder ERROR:", err);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: String(err) })
    };
  }
};
