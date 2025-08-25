// netlify/functions/blobs-smoke.js
export default async () => {
  try {
    const mod = await import('@netlify/blobs').catch(e => ({ __importError: String(e) }));
    if (mod.__importError) {
      return new Response(JSON.stringify({ ok:false, where:'import', error:mod.__importError }), { status:200 });
    }
    const { getStore } = mod;
    const store = getStore('app');
    const key = `smoke/test-${Date.now()}.txt`;
    await store.set(key, 'ok');
    const out = await store.get(key); // <- { value, metadata }
    return new Response(JSON.stringify({ ok:true, wroteKey:key, readValue: out?.value || null }), { status:200 });
  } catch (err) {
    return new Response(JSON.stringify({ ok:false, where:'try/catch', message:String(err) }), { status:200 });
  }
};
