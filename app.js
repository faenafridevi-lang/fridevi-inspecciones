// ====== Catálogos ======
const HIGIENE_ITEMS = [
  "Limpieza de superficies en contacto con alimentos",
  "Limpieza de equipos simples",
  "Limpieza de equipos complejos",
  "Limpieza de estructuras elevadas (ej.: bandejas porta-cables)",
  "Limpieza de lavamanos y esterilizadores",
  "Limpieza de extractores",
  "Limpieza de desagües, rejillas y canalinas",
  "Limpieza de aberturas",
  "Limpieza de sectores de difícil acceso (ej.: debajo de noria de vísceras, tronera, etc.)",
  "Registro de las actividades de limpieza y mantenimiento"
];
const GESTION_ITEMS = [
  "Verificación pre y operacional realizadas en tiempo y forma",
  "Personal entrenado y capacitado",
  "Acciones correctivas implementadas y documentadas",
  "Se identifican tendencias y/o recurrencias"
];
const INSTALACIONES_ITEMS = [
  { texto: "Techos/Cielorrasos — Pintura — Descascarada", n: 11 },
  { texto: "Techos/Cielorrasos — Pintura — Despintado/Óxido", n: 12 },
  { texto: "Panel — Caído/Golpeado", n: 13 },
  { texto: "Panel — Filtraciones/Óxido", n: 14 },
  { texto: "Paredes — Azulejos — Rotos", n: 15 },
  { texto: "Paredes — Azulejos — Faltan azulejos", n: 16 },
  { texto: "Paredes — Pintura — Descascarada/Despintada", n: 17 },
  { texto: "Zócalos — Rotos o golpeados", n: 18 },
  { texto: "Ventilación — Presencia de polvo/condensación", n: 19 },
  { texto: "Aberturas — Mosquiteros rotos/ausentes", n: 20 },
  { texto: "Ventanas — Marcos despintados", n: 21 },
  { texto: "Pisos — Rejillas rotas", n: 22 },
  { texto: "Pisos — Falta rejilla", n: 23 },
  { texto: "Revestimientos — Faltan", n: 24 },
  { texto: "Revestimientos — Rotos", n: 25 },
  { texto: "Luminarias — Plafones/tubos rotos/ausentes", n: 26 },
  { texto: "Luminarias — Plafones/tubos flojos/caídos", n: 27 },
  { texto: "Iluminación inadecuada", n: 28 },
  { texto: "Iluminación insuficiente", n: 29 },
  { texto: "Cañerías — Pintura descascarada", n: 30 },
  { texto: "Cañerías — Filtraciones", n: 31 },
  { texto: "Lavamanos — Cañería con pérdida de agua", n: 32 },
  { texto: "Desagües tapados", n: 33 },
  { texto: "Esterilizadores — Desagües tapados", n: 34 },
  { texto: "Esterilizadores — Rebalses", n: 35 },
  { texto: "Puertas externas — Fallas en cierre hermético", n: 36 },
  { texto: "Puertas a zonas de producto abierto — Falta de mantenimiento", n: 37 },
  { texto: "Cables sueltos/caídos/pelados", n: 38 },
  { texto: "Equipos de frío — Bandejas con pérdidas de agua", n: 39 },
  { texto: "Equipos de frío — Desagües rotos o sueltos", n: 40 },
  { texto: "Cortinas plásticas — Rotas/descolgadas", n: 41 },
  { texto: "Cortinas plásticas — Sucias", n: 42 },
];

// ====== UI helpers ======
function makeToggleGroup() {
  const wrap = document.createElement("div");
  const yes = document.createElement("button");
  const no  = document.createElement("button");
  yes.className = "btn-toggle accept"; yes.textContent = "Aceptable";
  no.className  = "btn-toggle reject"; no.textContent  = "No aceptable";
  yes.onclick = () => { yes.classList.add("active"); no.classList.remove("active"); wrap.dataset.value = "SI"; };
  no.onclick  = () => { no.classList.add("active"); yes.classList.remove("active"); wrap.dataset.value = "NO"; };
  wrap.className = "toggle-wrap";
  wrap.append(yes, no);
  return wrap;
}

function attachAnexoButton(cell, key, label) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn-anexo";
  btn.textContent = "Anexo 📎";
  btn.dataset.anexo = key;
  btn.onclick = () => openAnexoModal(key, label);
  cell.appendChild(btn);
}

// ====== construir tablas ======
function addHigieneRows() {
  const tbody = document.getElementById("tbody-higiene");
  HIGIENE_ITEMS.forEach((txt, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${idx+1}</td><td>${txt}</td>`;
    const tdSi = document.createElement("td"); tdSi.appendChild(makeToggleGroup());
    const tdNo = document.createElement("td"); // (vacío: el toggle vive en la celda previa)
    const tdAn = document.createElement("td"); attachAnexoButton(tdAn, `hig_${idx+1}`, `${idx+1}. ${txt}`);
    tr.appendChild(tdSi); tr.appendChild(tdNo); tr.appendChild(tdAn);
    tbody.appendChild(tr);
  });
}
function addGestionRows() {
  const tbody = document.getElementById("tbody-gestion");
  GESTION_ITEMS.forEach((txt, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${idx+1}</td><td>${txt}</td>`;
    const tdSi = document.createElement("td"); tdSi.appendChild(makeToggleGroup());
    const tdNo = document.createElement("td");
    const tdAn = document.createElement("td"); attachAnexoButton(tdAn, `gest_${idx+1}`, `${idx+1}. ${txt}`);
    tr.appendChild(tdSi); tr.appendChild(tdNo); tr.appendChild(tdAn);
    tbody.appendChild(tr);
  });
}
function addInstalacionesRows() {
  const tbody = document.getElementById("tbody-instalaciones");
  INSTALACIONES_ITEMS.forEach((it) => {
    const tr = document.createElement("tr");
    const [area, ...rest] = it.texto.split(" — ");
    const defecto = rest.join(" — ");
    tr.innerHTML = `<td>${it.n}</td><td>${area}</td><td>${defecto}</td>`;
    const tdSi = document.createElement("td"); tdSi.appendChild(makeToggleGroup());
    const tdNo = document.createElement("td");
    const tdAn = document.createElement("td"); attachAnexoButton(tdAn, `inst_${it.n}`, `${it.n}. ${it.texto}`);
    tr.appendChild(tdSi); tr.appendChild(tdNo); tr.appendChild(tdAn);
    tbody.appendChild(tr);
  });
}

// ====== anexos (estado en memoria) ======
const anexos = new Map(); // key -> {tipo, texto, fotoB64, fileName, label}

async function compressToBase64(file, maxBytes=1_000_000, maxSide=1200) {
  const img = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  let q = 0.9, dataUrl;
  do {
    dataUrl = canvas.toDataURL('image/jpeg', q);
    const b64 = dataUrl.split(',')[1]; const size = Math.ceil(b64.length * 3/4);
    if (size <= maxBytes) break;
    q -= 0.1;
  } while (q >= 0.2);
  return dataUrl;
}

function openAnexoModal(key, label) {
  const modal = document.getElementById('anexo-modal');
  modal.hidden = false;
  document.getElementById('anexo-item-label').textContent = label;

  const existing = anexos.get(key) || {};
  document.getElementById('anexo-tipo').value = existing.tipo || "Hallazgo";
  document.getElementById('anexo-texto').value = existing.texto || "";
  document.getElementById('anexo-foto').value = "";
  document.getElementById('anexo-foto-info').textContent = existing.fileName ? `Cargada: ${existing.fileName}` : "";

  const close = () => modal.hidden = true;
  document.getElementById('anexo-cancelar').onclick = close;
  document.getElementById('anexo-borrar').onclick = () => {
    anexos.delete(key);
    document.querySelector(`[data-anexo="${key}"]`)?.classList.remove('has');
    close();
  };
  document.getElementById('anexo-guardar').onclick = async () => {
    const tipo = document.getElementById('anexo-tipo').value;
    const texto = document.getElementById('anexo-texto').value.trim();
    const file  = document.getElementById('anexo-foto').files[0];
    let fotoB64 = existing.fotoB64 || null, fileName = existing.fileName || null;
    if (file) {
      fotoB64 = await compressToBase64(file);
      fileName = (label.replace(/\s+/g,'_')) + ".jpg";
      document.getElementById('anexo-foto-info').textContent = `Cargada: ${file.name}`;
    }
    anexos.set(key, { tipo, texto, fotoB64, fileName, label });
    document.querySelector(`[data-anexo="${key}"]`)?.classList.add('has');
    close();
  };
}

// ====== recolección y envío ======
function collectData() {
  const q = sel => document.querySelector(sel);
  const data = {
    area: q("#area").value.trim(),
    fecha: q("#fecha").value,
    resumen: q("#resumen").value.trim(),
    inspeccionPor: q("#insp-por").value.trim(),
    comunicaA: q("#comunica-a").value.trim(),
    higiene: [], gestion: [], instalaciones: []
  };
  document.querySelectorAll("#tbody-higiene .toggle-wrap").forEach((node, i) => data.higiene.push({ n:i+1, estado: node.dataset.value || null }));
  document.querySelectorAll("#tbody-gestion .toggle-wrap").forEach((node, i) => data.gestion.push({ n:i+1, estado: node.dataset.value || null }));
  document.querySelectorAll("#tbody-instalaciones .toggle-wrap").forEach((node, i) => data.instalaciones.push({ n: INSTALACIONES_ITEMS[i].n, estado: node.dataset.value || null }));
  return data;
}

function collectDataExtended() {
  const data = collectData();
  data.anexos = [];
  anexos.forEach((v,k) => data.anexos.push({ key:k, tipo:v.tipo, texto:v.texto, fotoB64:v.fotoB64, fileName:v.fileName, label:v.label }));
  return data;
}

async function postToScript(payload) {
  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return true;
}

function showMsg(t){ const m=document.getElementById("msg"); m.textContent=t; setTimeout(()=>m.textContent="",6000); }

// ====== notificaciones (Netlify Functions) ======
async function schedulePush(title, body, whenISO) {
  const res = await fetch("/.netlify/functions/schedule-reminder", {
    method:"POST", headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ title, body, whenISO })
  });
  return res.json();
}
async function listReminders() {
  const res = await fetch("/.netlify/functions/list-reminders");
  return res.json();
}
async function deleteReminder(id) {
  const res = await fetch("/.netlify/functions/delete-reminder", {
    method:"POST", headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ id })
  });
  return res.json();
}

function renderReminders(list){
  const box = document.getElementById('mis-recordatorios');
  if (!list?.items?.length){ box.innerHTML = "<em>Sin recordatorios</em>"; return; }
  box.innerHTML = `<table class="tabla"><thead><tr><th>Título</th><th>Horario</th><th></th></tr></thead><tbody>${
    list.items.map(r=>`<tr><td>${r.title||''}</td><td>${r.whenISO||''}</td><td><button data-del="${r.id}">Eliminar</button></td></tr>`).join("")
  }</tbody></table>`;
  box.querySelectorAll("[data-del]").forEach(btn=>{
    btn.onclick = async ()=>{ await deleteReminder(btn.dataset.del); renderReminders(await listReminders()); };
  });
}

// ====== init ======
document.addEventListener("DOMContentLoaded", async () => {
  // fecha hoy
  const today = new Date(); const pad = n => String(n).padStart(2,"0");
  document.getElementById("fecha").value = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;

  addHigieneRows(); addGestionRows(); addInstalacionesRows();

  document.getElementById("btn-guardar").onclick = async () => {
    const data = collectDataExtended();
    if (!data.fecha) { showMsg("Completá la fecha."); return; }
    showMsg("Guardando en Drive...");
    try { await postToScript({ type: "saveInspection", payload: data }); showMsg("Guardado OK ✔️"); }
    catch(e){ console.error(e); showMsg("Error al guardar."); }
  };

  document.getElementById("btn-programar-push").onclick = async ()=>{
    const title = document.getElementById("notif-title").value || "Recordatorio SGI-PG05F08";
    const body  = document.getElementById("notif-body").value || "Completar inspección";
    const dt    = document.getElementById("notif-datetime").value;
    if (!dt){ showMsg("Elegí fecha y hora."); return; }
    const whenISO = new Date(dt).toISOString();
    await schedulePush(title, body, whenISO);
    renderReminders(await listReminders());
  };
  document.getElementById("btn-listar-push").onclick = async ()=> renderReminders(await listReminders());
});
