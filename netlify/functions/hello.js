export default async () => {
  return new Response(
    JSON.stringify({ ok: true, msg: "hello works" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
