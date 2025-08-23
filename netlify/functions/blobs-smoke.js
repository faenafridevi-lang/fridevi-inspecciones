export default async () => {
  try {
    const mod = await import('@netlify/blobs').catch(e => ({ __importError: String(e) }));
    if (mod.__importError) {
      return new Response(JSON.stringify({ ok:false, where:'import', error: mod.__importError }),
        { status:200, headers:{'Content-Type':'application/json'} });
    }
    const { getStore } = mod;
    const store = getStore('app');
    const key = `smoke/test-${Date.now()}.txt`;
    await store.set(key, 'ok');
    const txt = await store.get(key).then(r => r.text());
    return new Response(JSON.stringify({ ok:true, wroteKey:key, readValue:txt }),
      { status:200, headers:{'Content-Type':'application/json'} });
  } catch (err) {
    return new Response(JSON.stringify({ ok:false, where:'try/catch', message:String(err) }),
      { status:200, headers:{'Content-Type':'application/json'} });
  }
};
