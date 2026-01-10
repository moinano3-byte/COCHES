
  const colIni  = celdaInicio.cellIndex;
  const colFin  = tdFin.cellIndex;

  const fMin = Math.min(filaIni, filaFin);
  const fMax = Math.max(filaIni, filaFin);
  const cMin = Math.min(colIni, colFin);
  const cMax = Math.max(colIni, colFin);

  limpiarSeleccion();

  for (let f = fMin; f <= fMax; f++) {
    const fila = tabla.rows[f];
    if (!fila) continue;

    for (let c = cMin; c <= cMax; c++) {
      const td = fila.cells[c];
      if (esSeleccionable(td)) {
        td.classList.add("seleccionada");
        seleccion.add(td);
      }
    }
  }
}

/* ===================== VARIABLES ===================== */
let arrastreReciente = false; // <-- NUEVO

/* ===================== MOUSE ===================== */

tbody.addEventListener("mousedown", e => {
  const td = e.target.closest("td");
  if (!esSeleccionable(td)) return;

  document.body.focus();

  limpiarSeleccion();
  celdaInicio = td;
  arrastrando = false;

  td.classList.add("seleccionada");
  seleccion.add(td);
});

tbody.addEventListener("mousemove", e => {
  if (!celdaInicio) return;
  const td = e.target.closest("td");
  if (!esSeleccionable(td)) return;

  arrastrando = true;
  arrastreReciente = true; // <-- Indica que se está haciendo drag
  seleccionarRectangulo(td);
});

tbody.addEventListener("mouseup", e => {
  celdaInicio = null;
  arrastrando = false;

  // Solo por seguridad, el drag reciente durará un instante
  setTimeout(() => { arrastreReciente = false; }, 0);
});

tbody.addEventListener("click", e => {
  const td = e.target.closest("td");
  if (!esSeleccionable(td)) return;

  if (arrastrando || seleccion.size !== 1 || !seleccion.has(td)) return;

  const actual = Number(td.dataset.estado || 0);
  const nuevo = (actual + 1) % estados.length;

  td.dataset.estado = String(nuevo);
  renderEstado(td);
  recalcular();
});

/* ===================== DESELECCIONAR CON CUALQUIER CLICK ===================== */
document.addEventListener("click", e => {
  if (seleccion.size === 0) return;

  // Si acabamos de hacer un arrastre, no borrar selección
  if (arrastreReciente) return;

  limpiarSeleccion();
});


/* =========================================================
   TECLAS PARA CAMBIAR ESTADO
========================================================= */

document.body.tabIndex = -1;
document.body.focus();

window.addEventListener("keydown", e => {

  console.log("KEY DETECTADA:", e.key);

  if (seleccion.size === 0) return;

  let estado = null;
  const k = e.key.toLowerCase();

  if (k === "-") estado = "1";
  else if (k === "v") estado = "2";   // M
  else if (k === "c") estado = "3";   // M-C
  else if (e.code === "Space") {
    estado = "0";
    e.preventDefault();
  } else return;

  seleccion.forEach(td => {
    if (!esSeleccionable(td)) return;
    td.dataset.estado = estado; // 🔑 STRING
    renderEstado(td);
  });

  recalcular();
});

/* =========================================================
   SELECCIÓN TÁCTIL (MÓVIL) – Ignora múltiples dedos y scroll natural
========================================================= */

let startY = 0;
let startScroll = 0;
let touchTimer = null;
let modoSeleccionMovil = false;
let lastTouchY = null;   // ✅ DECLARADA CORRECTAMENTE
let scrollActivo = false;
const SCROLL_THRESHOLD = 12; // px
tbody.addEventListener("touchstart", e => {

  if (e.touches.length !== 1) {
    limpiarSeleccion();
    celdaInicio = null;
    arrastrando = false;
    modoSeleccionMovil = false;
    return;
  }

  // ✅ Inicializar referencia del dedo
  lastTouchY = e.touches[0].clientY;
scrollActivo = false;

  const td = e.target.closest("td");
  if (!td || !esSeleccionable(td)) return;

  celdaInicio = td;
  arrastrando = false;
  modoSeleccionMovil = false;
  startScroll = window.scrollY;

  // ⏱️ Pulsación larga
  touchTimer = setTimeout(() => {
    modoSeleccionMovil = true;
    startY = e.touches[0].clientY;
    limpiarSeleccion();
    td.classList.add("seleccionada");
    seleccion.add(td);
  }, 1200);

}, { passive: true });


tbody.addEventListener("touchmove", e => {

  if (e.touches.length !== 1) {
    limpiarSeleccion();
    celdaInicio = null;
    arrastrando = false;
    modoSeleccionMovil = false;
    return;
  }

  if (!celdaInicio) return;

  const touch = e.touches[0];
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);
  const td = elem?.closest("td");

  // 🔹 Selección de celdas
  if (td && esSeleccionable(td)) {
    arrastrando = true;
    seleccionarRectangulo(td, true);
  }

// 🔹 Scroll táctil con umbral (1:1) SOLO en modo selección
if (modoSeleccionMovil) {
  const currentY = touch.clientY;
  const deltaTotal = Math.abs(currentY - startY);

  // Activar scroll solo tras superar umbral
  if (!scrollActivo && deltaTotal > SCROLL_THRESHOLD) {
    scrollActivo = true;
    lastTouchY = currentY; // reset limpio
  }

  if (scrollActivo && lastTouchY !== null) {
    const deltaY = lastTouchY - currentY;
    window.scrollBy(0, deltaY * 2.5);
    window.scrollBy({
    top: deltaY * 2.5,
    behavior: "auto"
});

    lastTouchY = currentY;
    e.preventDefault();
  }
}



}, { passive: false });


tbody.addEventListener("touchend", e => {

  clearTimeout(touchTimer);

  if (!modoSeleccionMovil) {
    celdaInicio = null;
    arrastrando = false;
    lastTouchY = null;
    scrollActivo = false;
    return;
  }

  if (seleccion.size > 0) {
    actualizarBotonesMovil();
    posicionarAccionesMovil();
    botonesMovil.style.display = "flex";
  }

  celdaInicio = null;
  arrastrando = false;
  modoSeleccionMovil = false;
  lastTouchY = null;   // ✅ reset correcto

});


botonesMovil.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const estado = btn.dataset.estado;

  seleccion.forEach(td => {
    td.dataset.estado = estado;
    renderEstado(td);
  });

  recalcular();
  limpiarSeleccion();
  botonesMovil.style.display = "none";
});


function posicionarAccionesMovil() {
  if (seleccion.size === 0 || !tabla) {
    botonesMovil.style.display = "none";
    return;
  }

  const rects = Array.from(seleccion).map(td => td.getBoundingClientRect());
  const minX = Math.min(...rects.map(r => r.left));
  const maxX = Math.max(...rects.map(r => r.right));
  const minY = Math.min(...rects.map(r => r.top));
  const maxY = Math.max(...rects.map(r => r.bottom));

  const tablaRect = tabla.getBoundingClientRect();

  let left = minX - tablaRect.left;
  let top  = minY - tablaRect.top - botonesMovil.offsetHeight - 5;

  if (top < 0) top = maxY - tablaRect.top + 5;
  if (left + botonesMovil.offsetWidth > tablaRect.width) {
    left = tablaRect.width - botonesMovil.offsetWidth - 5;
  }

  botonesMovil.style.left = `${left}px`;
  botonesMovil.style.top  = `${top}px`;
  botonesMovil.style.display = "flex";
}


function actualizarBotonesMovil() {
  const botonesMovil = document.getElementById("botones-movil");
  botonesMovil.innerHTML = "";
  botonesMovil.style.display = "flex";

  // 👤 Persona
  const btnPersona = document.createElement("button");
  btnPersona.dataset.estado = "2";
  const imgPersona = document.createElement("img");
  imgPersona.src = "persona.png";
  imgPersona.alt = "Persona";
  imgPersona.style.width = "40px";
  imgPersona.style.height = "40px";
  btnPersona.appendChild(imgPersona);
  botonesMovil.appendChild(btnPersona);

  // 🚗 Volante
  const btnVolante = document.createElement("button");
  btnVolante.dataset.estado = "3";
  const imgVolante = document.createElement("img");
  imgVolante.src = "volante.png";
  imgVolante.alt = "Coche";
  imgVolante.style.width = "40px";
  imgVolante.style.height = "40px";
  btnVolante.appendChild(imgVolante);
  botonesMovil.appendChild(btnVolante);

  // ❌ X roja
  const btnX = document.createElement("button");
  btnX.dataset.estado = "0";
  btnX.textContent = "X";
  btnX.style.color = "red";
  btnX.style.fontSize = "32px";
  btnX.style.fontWeight = "bold";
  botonesMovil.appendChild(btnX);
}



}

