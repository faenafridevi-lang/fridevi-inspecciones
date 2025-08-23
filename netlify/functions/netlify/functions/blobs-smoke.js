export default async () => {
  try {
    // Import dinámico para atrapar errores de import
    const mod = await import('@netlify/blobs').catch((e) => ({ __importError: String(e) }));
    if (mod.__importError) {
      return new Response(JSON.stringify({
        ok: false,
        where: 'import',
        error: mod.__importError
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const { getStore } = mod;
    const store = getStore('app');

    // Escribimos y leemos un blob de prueba
    const key = `smoke/test-${Date.now()}.txt`;
    await store.set(key, 'ok');
    const txt = await store.get(key).then(r => r.text());

    return new Response(JSON.stringify({
      ok: true,
      step: 'write/read',
      wroteKey: key,
      readValue: txt ?? null
    }, null, 2), { status: 200, headers: { "Content-Type": "application/json" } });

  } catch (err) {
    return new Response(JSON.stringify({
      ok: false,
      where: 'try/catch',
      name: err?.name,
      message: err?.message,
      stack: err?.stack
    }, null, 2), { status: 200, headers: { "Content-Type": "application/json" } });
  }
};
