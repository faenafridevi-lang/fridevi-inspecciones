// netlify/functions/list-reminders.js
import { getStore } from '@netlify/blobs';

export default async () => {
  try {
    // Usamos un store "app" (se crea solo al escribir).
    const store = getStore('app');

    // Diagnóstico rápido para ver el entorno:
    const diag = {
      hasStore: !!store,
      hasList: !!store?.list,
      hasGet: !!store?.get
    };

    // Listamos solo los recordatorios (prefijo opcional si guardamos con "reminders/")
    const listing = await store.list({ prefix: 'reminders/' }).catch(() => ({ blobs: [] }));

    // Cargamos cada item y lo parseamos
    const items = await Promise.all(
      (listing?.blobs || []).map(async b => {
        const txt = await store.get(b.key).then(r => r.text());
        return JSON.parse(txt);
      })
    );

    return new Response(
      JSON.stringify({ ok: true, diag, count: items.length, items }, null, 2),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify(
        { ok: false, name: err?.name, message: err?.message, stack: err?.stack },
        null,
        2
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
