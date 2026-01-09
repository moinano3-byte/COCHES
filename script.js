// ===== BOTÓN GENERAR CUADRANTE =====
document.getElementById("btn-generar").addEventListener("click", () => {
  document.getElementById("menu-config").style.display = "none";
  document.body.classList.remove("modo-menu");
  generarCuadrante();
});

// ===== PANTALLA DE ZONAS =====
const btnZonas = document.getElementById("btn-zonas");
const pantallaZonas = document.getElementById("pantalla-zonas");
const cfgZonas = document.getElementById("cfg-zonas");
const nombresZonasDiv = document.getElementById("nombres-zonas");
const guardarZonas = document.getElementById("guardar-zonas");
const menuConfig = document.getElementById("menu-config");
const btnVolverZonas = document.getElementById("volver-menu");

// Abrir pantalla de Zonas
btnZonas.addEventListener("click", () => {
  menuConfig.style.display = "none";
  pantallaZonas.style.display = "flex";
  generarInputsZonas();
});

// Volver al menú desde Zonas
btnVolverZonas.addEventListener("click", () => {
  pantallaZonas.style.display = "none";
  menuConfig.style.display = "flex";
});

// Crear inputs según número de zonas
function generarInputsZonas() {
  const cantidad = parseInt(cfgZonas.value);
  nombresZonasDiv.innerHTML = "";
  for (let i = 1; i <= cantidad; i++) {
    const label = document.createElement("label");
    label.textContent = `Zona ${i}: `;

    const input = document.createElement("input");
    input.type = "text";
    input.value = `Zona ${i}`;
    input.style.width = "60%";

    label.appendChild(input);
    nombresZonasDiv.appendChild(label);
  }
}

// Actualizar inputs si cambia el número de zonas
cfgZonas.addEventListener("change", generarInputsZonas);

// Guardar nombres de zonas
guardarZonas.addEventListener("click", () => {
  const inputs = nombresZonasDiv.querySelectorAll("input");
  const nombres = Array.from(inputs).map(input => input.value.trim());
  alert("Zonas guardadas: " + nombres.join(", "));
  console.log("Zonas guardadas:", nombres);
});

// ===== PANTALLA FESTIVOS =====
const btnFestivos = document.getElementById("btn-findes");
const pantallaFestivos = document.getElementById("pantalla-findes-festivos");
const btnVolverFestivos = document.getElementById("volver-findes-festivos");
const guardarFestivos = document.getElementById("guardar-findes-festivos");
const cfgFindes = document.getElementById("cfg-findes-pantalla");
const cfgFestivos = document.getElementById("cfg-festivos-pantalla");
const festivosFechasDiv = document.getElementById("festivos-fechas");
const listaFechas = document.getElementById("lista-fechas");
const btnAgregarFecha = document.getElementById("agregar-fecha");

// ===== BOTÓN AÑO =====
const btnAnio = document.getElementById("btn-anio");
const submenuAnio = document.getElementById("submenu-anio");
const cfgAnio = document.getElementById("cfg-anio");

// Generar opciones del 2026 al 2050
for (let y = 2026; y <= 2050; y++) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = y;
  cfgAnio.appendChild(option);
}

// Toggle desplegable Año
btnAnio.addEventListener("click", () => {
  submenuAnio.style.display = submenuAnio.style.display === "flex" ? "none" : "flex";
});

let contadorFechas = 0;
const MAX_FECHAS = 20;

// Abrir pantalla Festivos
btnFestivos.addEventListener("click", () => {
  menuConfig.style.display = "none";
  pantallaFestivos.style.display = "flex";
  actualizarFestivosFechas();
});

// Volver al menú principal desde Festivos
btnVolverFestivos.addEventListener("click", () => {
  pantallaFestivos.style.display = "none";
  menuConfig.style.display = "flex";
});

// Guardar selección de Festivos
guardarFestivos.addEventListener("click", () => {
  let fechas = [];
  listaFechas.querySelectorAll("input[type='date']").forEach(inp => {
    if (inp.value) fechas.push(inp.value);
  });

  const resumen = `Año: ${cfgAnio.value}
Fines de semana: ${cfgFindes.value === "si" ? "Sí" : "No"}
Festivos: ${cfgFestivos.value === "si" ? "Sí" : "No"}
Fechas festivas: ${fechas.join(", ") || "Ninguna"}`;

  alert(resumen);
  console.log(resumen);
});

// Mostrar selector de fechas solo si NO se trabajan festivos
cfgFestivos.addEventListener("change", actualizarFestivosFechas);

function actualizarFestivosFechas() {
  if (cfgFestivos.value === "si") {
    festivosFechasDiv.style.display = "none";
    listaFechas.innerHTML = "";
    contadorFechas = 0;
  } else {
    festivosFechasDiv.style.display = "flex";
  }
}

// Añadir fechas festivas hasta máximo 20
btnAgregarFecha.addEventListener("click", () => {
  if (contadorFechas >= MAX_FECHAS) {
    alert("Máximo 20 fechas permitidas");
    return;
  }
  const input = document.createElement("input");
  input.type = "date";
  input.style.marginBottom = "5px";
  listaFechas.appendChild(input);
  contadorFechas++;
});



function generarCuadrante() {
/* =========================================================
   ===== CONFIGURACIÓN GENERAL
   ========================================================= */

const tabla = document.getElementById("cuadrante");
// Permitir pinch-zoom del navegador
tabla.style.touchAction = "pan-x pan-y pinch-zoom";


const tbody = tabla.querySelector("tbody");
const botonesMovil = document.getElementById("botones-movil");
// Ocultar botones antes de generar cualquier cosa
botonesMovil.style.display = "none";


const estados = ["", "-", "M", "M-C"];
// índices:        0   1    2     3
function renderEstado(td) {
  const estado = td.dataset.estado;

  td.innerHTML = "";               // limpiar siempre
  td.style.position = "relative";  // ancla para iconos

  if (estado === "1") {
    td.textContent = "-";
  }

  else if (estado === "2") {
    const img = document.createElement("img");
    img.src = "persona.png";   // 👤 SIEMPRE imagen
    img.alt = "Persona";
    img.className = "icono-persona";
    td.appendChild(img);
  }

  else if (estado === "3") {
    const img = document.createElement("img");
    img.src = "volante.png";   // 🚗 imagen
    img.alt = "Coche";
    img.className = "icono-volante";
    td.appendChild(img);
  }
}






// 🔹 CONFIGURACIÓN INICIAL DE COLUMNAS POR ZONA
const columnasPorZona = {
  zona1: 3,
  zona2: 2,
  zona3: 4,
  zona4: 9,
  zona5: 1
};

// Crear array completo de zonas para cada columna
const coloresColumnas = [];
for (const [zona, cantidad] of Object.entries(columnasPorZona)) {
  for (let i = 0; i < cantidad; i++) {
    coloresColumnas.push(zona);
  }
}

// Total de columnas iniciales
let columnasPersonas = coloresColumnas.length;

// Estado de columnas ocultas (ninguna al inicio)
let columnasOcultas = Array(columnasPersonas).fill(false);

// Contador único para futuras columnas añadidas
let contadorColumnas = columnasPersonas;


  /* =========================================================
     ===== FESTIVOS SAS SEVILLA 2026
     ========================================================= */

  const festivos = [
    "2026-01-01","2026-01-06","2026-02-28","2026-04-02","2026-04-03",
    "2026-05-01","2026-08-15","2026-10-12","2026-11-02","2026-12-07",
    "2026-12-08","2026-12-25","2026-12-24","2026-12-31"
  ];

  function esFestivo(fecha) {
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, "0");
    const dd = String(fecha.getDate()).padStart(2, "0");
    return festivos.includes(`${yyyy}-${mm}-${dd}`);
  }

/* ===== FILA ÚNICA PARA MOSTRAR COLUMNAS OCULTAS ===== */
const filaOcultos = document.createElement("tr");
filaOcultos.classList.add("fila-ocultos");

const celdaOcultos = document.createElement("td");
filaOcultos.appendChild(celdaOcultos);

  /* =========================================================
   ===== BOTONES + / -
   ========================================================= */

const trBotones = document.createElement("tr");

function crearBotonesColumna(pos) {
  const th = document.createElement("th");
  th.dataset.index = pos;

  const btnMenos = document.createElement("button");
  btnMenos.textContent = "-";
  btnMenos.className = "boton-columna";
  btnMenos.onclick = () => quitarColumna(Number(th.dataset.index));

  const btnOcultar = document.createElement("button");
  btnOcultar.textContent = columnasOcultas[pos] ? "👁" : "🚫";
  btnOcultar.className = "boton-columna";
  btnOcultar.onclick = () => toggleColumna(Number(th.dataset.index));

  const btnMas = document.createElement("button");
  btnMas.textContent = "+";
  btnMas.className = "boton-columna";
  btnMas.onclick = () => agregarColumna(Number(th.dataset.index));

  th.append(btnMenos, btnOcultar, btnMas);
  return th;
}

function actualizarBotones() {
  trBotones.innerHTML = "";

  // 👉 Columna FECHA izquierda
  const thFecha = document.createElement("th");
  thFecha.classList.add("fecha");

    trBotones.appendChild(thFecha);

  // 👉 Botones por persona
  for (let i = 0; i < columnasPersonas; i++) {
    trBotones.appendChild(crearBotonesColumna(i));
  }

  // 👉 Columnas finales
  trBotones.appendChild(document.createElement("th"));
  trBotones.appendChild(document.createElement("th"));
  trBotones.appendChild(document.createElement("th"));
}

/* ===== INICIALIZACIÓN ===== */

actualizarBotones();

tabla.insertBefore(trBotones, tbody);



  /* =========================================================
     ===== FECHAS
     ========================================================= */

  let fechaInicio = new Date(2026, 0, 1);
  const fechaFin = new Date(2026, 11, 31);
  let mesActual = fechaInicio.getMonth();

  let fecha = new Date(fechaInicio);
  fecha.setDate(fecha.getDate() - ((fecha.getDay() + 6) % 7));

    while (fecha <= fechaFin) {

      
      /* ===== CABECERA DE MES ===== */

const textoMes = fecha
  .toLocaleDateString("es-ES", { month: "long" })
  .toUpperCase();

const trMes = document.createElement("tr");
trMes.classList.add("fila-mes");
trMes.dataset.tipo = "mes";

const thMes = document.createElement("th");
thMes.classList.add("fecha");


// 📝 texto del mes
const spanMes = document.createElement("span");
spanMes.textContent = " " + textoMes;

// 👉 botón + texto pegados
thMes.appendChild(spanMes);


// 👉 añadir al encabezado del mes
trMes.appendChild(thMes);


for (let i = 0; i < columnasPersonas; i++) {
  const th = crearTH("Nombre", true, coloresColumnas[i]);
  th.dataset.id = i;
  sincronizarNombre(th);
  trMes.appendChild(th);
}

trMes.appendChild(crearTH("PERSONAS"));
trMes.appendChild(crearTH("COCHES"));
trMes.appendChild(crearTH(textoMes, false, "fecha"));

tbody.appendChild(trMes);


      /* ===== SEMANA ===== */
      for (let d = 0; d < 7; d++) {
        const tr = document.createElement("tr");
        tr.dataset.tipo = "dia";

        const diaSemana = fecha.getDay();
        const festivo = esFestivo(fecha);
        const esNoLaborable = festivo || diaSemana === 0 || diaSemana === 6;

        const mostrarFecha =
          (fecha >= fechaInicio && fecha <= fechaFin) ? formatFecha(fecha) : "";

        tr.appendChild(crearTD(mostrarFecha, "fecha"));

        const celdasBloqueables = [];

        /* Viajeros */
        for (let i = 0; i < columnasPersonas; i++) {
          const td = crearCeldaPersona(coloresColumnas[i]);
          tr.appendChild(td);
          celdasBloqueables.push(td);
        }

        /* Totales */
        const tdPersonas = crearTD("", "PERSONAS");
        const tdCoches = crearTD("", "Coches");

        tr.appendChild(tdPersonas);
        tr.appendChild(tdCoches);

        tr.appendChild(crearTD(mostrarFecha, "fecha"));

        celdasBloqueables.push(tdPersonas, tdCoches);

        /* Bloqueo sábado / domingo / festivo */
        if (esNoLaborable) {
          celdasBloqueables.forEach(td => td.classList.add("celda-no-interactiva"));
        }

        tbody.appendChild(tr);

        /* === SEPARADOR TRAS DOMINGO === */
        if (diaSemana === 0) {
          const trSep = document.createElement("tr");
          trSep.classList.add("separador-semanal");

          for (let i = 0; i < columnasPersonas + 4; i++) {
            trSep.appendChild(crearTD(""));
          }
          tbody.appendChild(trSep);
        }

        fecha.setDate(fecha.getDate() + 1);
      }

/* ===== BLOQUE MENSUAL ===== */
if (fecha.getMonth() !== mesActual) {

  // 1️⃣ Fila COCHES
  const trCoches = crearFilaResumen("COCHES");
  tbody.appendChild(trCoches);

  const tdPrimeraCoche = trCoches.children[0];
  tdPrimeraCoche.textContent = "COCHE ";

  // Botón 🚗 Coche mes
  const btnCoche = document.createElement("button");
  btnCoche.className = "boton-mes-coche";
  btnCoche.title = "Mes anterior";
  btnCoche.onclick = () => {
    const infoMes = obtenerBloqueMesDesdeBoton(btnCoche);
    console.log("Botón coche activado para mes:", infoMes);
  };

  const imgVolante = document.createElement("img");
  imgVolante.src = "volante.png"; // ruta de tu imagen
  imgVolante.alt = "Coche";
  imgVolante.className = "overlay-volante";
  btnCoche.appendChild(imgVolante);

  tdPrimeraCoche.style.pointerEvents = "auto";
  btnCoche.style.pointerEvents = "auto";
  tdPrimeraCoche.appendChild(btnCoche);

  // 2️⃣ Fila PERSONAS
  const trPersonas = crearFilaResumen("PERSONAS");
  tbody.appendChild(trPersonas);

  const tdPrimeraPersonas = trPersonas.children[0];
  tdPrimeraPersonas.textContent = "PERSONAS ";

  // Botón de mes – transforma M-C en M
  const btnPersona = document.createElement("button");
  btnPersona.className = "boton-mes-persona";
  btnPersona.title = "Transformar M-C en M del mes";

  const imgPersona = document.createElement("img");
  imgPersona.src = "persona.png";
  imgPersona.alt = "Persona";
  imgPersona.className = "overlay-persona";

  btnPersona.appendChild(imgPersona);

  // 🔹 FUNCIONALIDAD DEL BOTÓN
  btnPersona.onclick = () => {
    // Función que detecta automáticamente fila COCHES o PERSONAS según el botón
    function obtenerBloqueMesDesdeBotonGenerico(btn) {
      const trBoton = btn.closest("tr");
      if (!trBoton) return null;

      const tipoFila = trBoton.dataset.tipo;
      if (tipoFila !== "COCHES" && tipoFila !== "PERSONAS") return null;

      const filas = [...tbody.querySelectorAll("tr")];
      const indexFila = filas.indexOf(trBoton);

      // Buscar hacia arriba la fila PORCENTAJE
      let filaPorcentaje = null;
      for (let i = indexFila; i >= 0; i--) {
        const tr = filas[i];
        if (tr.dataset.tipo === "PORCENTAJE" || tr.children[tr.children.length - 1].textContent.trim() === "PORCENTAJE") {
          filaPorcentaje = tr;
          break;
        }
      }

      // Recoger filas de días del mes (desde filaPorcentaje + 1 hasta fila del botón)
      const filasDia = [];
      for (let i = filas.indexOf(filaPorcentaje) + 1; i < indexFila; i++) {
        if (filas[i].dataset.tipo === "dia") {
          filasDia.push(filas[i]);
        }
      }

      return {
        filaPorcentaje,
        filaBoton: trBoton,
        filasDia
      };
    }

    const infoMes = obtenerBloqueMesDesdeBotonGenerico(btnPersona);
    if (!infoMes) return;

    // Transformar M-C (estado 3) en M (estado 2)
    infoMes.filasDia.forEach(tr => {
      for (let i = 1; i <= columnasPersonas; i++) {
        const td = tr.children[i];
        if (td.dataset.estado === "3") {
          td.dataset.estado = "2";
          renderEstado(td);
        }
      }
    });

    recalcular();
    console.log("✔ Todos los M-C del mes transformados en M");
  };

  
tdPrimeraPersonas.appendChild(btnPersona);

// 3️⃣ Fila PORCENTAJE y separador fino
tbody.appendChild(crearFilaResumen("PORCENTAJE"));
tbody.appendChild(crearSeparadorFino());

// 4️⃣ Actualizar mes actual
mesActual = fecha.getMonth();
}

  // ✅ CIERRE DEL WHILE
}
  /* =========================================================
     ===== BLOQUEO ADICIONAL: filas sin fecha a los lados
     ========================================================= */
  [...tbody.querySelectorAll("tr[data-tipo='dia']")].forEach(tr => {
    const fechaIzq = tr.children[0].textContent.trim();
    const fechaDer = tr.children[tr.children.length - 1].textContent.trim();
    if(!fechaIzq && !fechaDer) {
      [...tr.children].slice(1, 1 + columnasPersonas + 2) // viajeros + totales
        .forEach(td => td.classList.add("celda-no-interactiva"));
    }
  });
const esMovil = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* =========================================================
     ===== FUNCIONES
     ========================================================= */

/* =========================================================
   ===== BOTÓN COCHES – CONVERGENCIA REAL % (AJUSTE GLOBAL)
   ========================================================= */
tbody.addEventListener("click", function (e) {
  const btn = e.target.closest(".boton-mes-coche");
  if (!btn) return;

  e.preventDefault();
  e.stopPropagation();

  const infoMes = obtenerBloqueMesDesdeBoton(btn);
  if (!infoMes) return;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const MAX_ITER = 200; // más iteraciones para ajuste fino global

  /* ===== 1️⃣ PERSONAS ===== */
  const personas = Array.from({ length: columnasPersonas }, (_, i) => ({
    id: i,
    zona: coloresColumnas[i],
    totalDias: 0,
    cochesAsignados: 0
  }));

  /* ===== 2️⃣ CONTAR DÍAS ===== */
  infoMes.filasDia.forEach(tr => {
    personas.forEach(p => {
      const td = tr.children[p.id + 1];
     if (td.dataset.estado === "2" || td.dataset.estado === "3") {
  p.totalDias++;
}


      // si hay coches acumulados de meses anteriores
      if (td.dataset.cochesAcumulados) {
        p.cochesAsignados += parseInt(td.dataset.cochesAcumulados, 10);
      }
    });
  });

 /* ===== 3️⃣ LIMPIAR COCHES ===== */
infoMes.filasDia.forEach(tr => {
  personas.forEach(p => {
    const td = tr.children[p.id + 1];

    // Solo existe M-C → vuelve a M
if (td.dataset.estado === "3") {
  td.dataset.estado = "2";
  renderEstado(td);
}


  });
});


  /* ===== 4️⃣ ITERACIONES DE AJUSTE GLOBAL ===== */
  for (let iter = 0; iter < MAX_ITER; iter++) {

    /* ===== A) REASIGNACIÓN DIARIA NORMAL ===== */
    infoMes.filasDia.forEach((tr, idx) => {
      const filaAnterior = idx > 0 ? infoMes.filasDia[idx - 1] : null;

      const presentes = personas
        .map(p => ({ p, td: tr.children[p.id + 1] }))
       .filter(o =>
  o.td.dataset.estado === "2" || o.td.dataset.estado === "3"
);


      const n = presentes.length;
      if (!n) return;

      let cochesHoy = n <= 5 ? 1 : n <= 10 ? 2 : n <= 15 ? 3 : Math.ceil(n / 5);

      presentes.forEach(o => {
  if (o.td.dataset.estado === "3") {
  o.td.dataset.estado = "2";
  renderEstado(o.td);
  o.p.cochesAsignados--;
}


       
      });

      const puntosUsados = new Set();

      const orden = presentes.sort((a, b) => {
        const pa = a.p.totalDias ? a.p.cochesAsignados / a.p.totalDias : 0;
        const pb = b.p.totalDias ? b.p.cochesAsignados / b.p.totalDias : 0;
        return pa - pb || a.p.totalDias - b.p.totalDias;
      });

      let asignados = 0;

      for (const o of orden) {
        if (asignados >= cochesHoy) break;

        if (filaAnterior) {
          const tdAyer = filaAnterior.children[o.p.id + 1];
          if (tdAyer && tdAyer.dataset.estado === "3") continue;

        }

        let punto = o.p.zona;
        if (punto === "zona1" || punto === "zona2") punto = "zona1-2";
        if (punto !== "zona4" && puntosUsados.has(punto)) continue;

       o.td.dataset.estado = "3";
renderEstado(o.td);
        o.p.cochesAsignados++;
        puntosUsados.add(punto);
        asignados++;
      }
    });

    /* ===== B) AJUSTE FINO GLOBAL (SIMULACIÓN DE INTERCAMBIOS) ===== */
    const mediaGlobal = personas.reduce((s, p) =>
      p.totalDias ? s + (p.cochesAsignados / p.totalDias) : s
    , 0) / personas.filter(p => p.totalDias).length;

    function dispersionTotal() {
      return personas.reduce((s, p) => {
        if (!p.totalDias) return s;
        return s + Math.abs((p.cochesAsignados / p.totalDias) - mediaGlobal);
      }, 0);
    }

    let huboCambio = false;
    let mejorDisp = dispersionTotal();
    let mejorMovimiento = null;

    for (let i = 0; i < infoMes.filasDia.length; i++) {
      const tr = infoMes.filasDia[i];
      const filaAnterior = i > 0 ? infoMes.filasDia[i - 1] : null;

      const fecha = new Date(tr.dataset.fecha);
      fecha.setHours(0, 0, 0, 0);
      if (fecha <= hoy) continue;

      for (const pAlta of personas) {
        const tdAlta = tr.children[pAlta.id + 1];
       if (tdAlta.dataset.estado !== "3") continue;


        for (const pBaja of personas) {
          const tdBaja = tr.children[pBaja.id + 1];
          if (tdBaja.dataset.estado !== "2") continue;

          // regla: no dos días seguidos
          if (filaAnterior) {
            const tdAyer = filaAnterior.children[pBaja.id + 1];
            if (tdAyer && tdAyer.dataset.estado === "3") continue;

          }

          // regla de zonas
          let zA = pAlta.zona;
          let zB = pBaja.zona;
          if (zA === "zona1" || zA === "zona2") zA = "zona1-2";
          if (zB === "zona1" || zB === "zona2") zB = "zona1-2";
          if (zA === zB && zA !== "zona4") continue;

          // --- SIMULACIÓN ---
          pAlta.cochesAsignados--;
          pBaja.cochesAsignados++;

          const dispSimulada = dispersionTotal();

          if (dispSimulada < mejorDisp) {
            mejorDisp = dispSimulada;
            mejorMovimiento = { tdAlta, tdBaja, pAlta, pBaja };
          }

          // rollback simulación
          pAlta.cochesAsignados++;
          pBaja.cochesAsignados--;
        }
      }
    }

    // aplicar SOLO el mejor movimiento encontrado
    if (mejorMovimiento) {
      const { tdAlta, tdBaja, pAlta, pBaja } = mejorMovimiento;

      // alta pierde coche
      tdAlta.dataset.estado = "2";
tdAlta.dataset.estado = "2";
renderEstado(tdAlta);


      // baja gana coche
tdBaja.dataset.estado = "3";
renderEstado(tdBaja);



      pAlta.cochesAsignados--;
      pBaja.cochesAsignados++;

      huboCambio = true;
    }

    if (!huboCambio) break;
  } // cierre for MAX_ITER

  /* ===== 5️⃣ TOTALES DIARIOS ===== */
  infoMes.filasDia.forEach(tr => {
    let total = 0;
    personas.forEach(p => {
     if (tr.children[p.id + 1].dataset.estado === "3") total++;

    });
    const tdCoches = tr.querySelector(".Coches");
    if (tdCoches) tdCoches.textContent = total || "";
  });

  recalcular();
  console.log("✔ Convergencia global mensual real, acumulando porcentajes, sin romper reglas");
});



/* =========================================================
   ===== FASE 2 – BOTÓN MENSUAL (LECTURA)
   ========================================================= */

/**
 * Dado un botón 🚗, localiza el bloque completo del mes
 * NO modifica la tabla
 */
function obtenerBloqueMesDesdeBoton(btn) {

  // 1️⃣ Localizar la fila COCHES
  const trCoches = btn.closest("tr");
  if (!trCoches || trCoches.dataset.tipo !== "COCHES") {
    console.warn("El botón no está en una fila COCHES");
    return null;
  }

  const filas = [...tbody.querySelectorAll("tr")];
  const indexCoches = filas.indexOf(trCoches);

// 2️⃣ Buscar hacia arriba la fila PORCENTAJE
let filaPorcentaje = null;
for (let i = indexCoches; i >= 0; i--) {
  const tr = filas[i];
  if (tr.dataset.tipo === "PORCENTAJE" || tr.children[tr.children.length-1].textContent.trim() === "PORCENTAJE") {
    filaPorcentaje = tr;
    break;
  }
}

// 3️⃣ Recoger las filas de días del mes (desde filaPorcentaje + 1 hasta indexCoches)
const filasDia = [];
for (let i = filas.indexOf(filaPorcentaje) + 1; i < indexCoches; i++) {
  if (filas[i].dataset.tipo === "dia") {
    filasDia.push(filas[i]);
  }
}


return {
    filaPorcentaje: filaPorcentaje,  // ✅ usamos la variable que sí existe
    filaCoches: trCoches,
    filasDia: filasDia
};

}
/* =========================================================
   ===== AGRUPACIÓN DE SEMANAS (LECTURA)
   ========================================================= */

// 🔹 PASO 3 – Agrupación por semanas
function agruparSemanas(infoMes) {
  const semanas = [];
  let semanaActual = [];

  infoMes.filasDia.forEach(tr => {
    semanaActual.push(tr);

    // Si la siguiente fila es separador semanal o estamos al final del mes
    const siguiente = tr.nextElementSibling;
    if (!siguiente || siguiente.classList.contains("separador-semanal")) {
      semanas.push([...semanaActual]); // Guardar semana completa
      semanaActual = [];
    }
  });

  // Por si la última semana no tiene separador
  if (semanaActual.length > 0) semanas.push(semanaActual);

  return semanas;
}




function actualizarFilaOcultos() {
  
  // Limpiar contenido
  celdaOcultos.innerHTML = "";

  // Ajustar ancho total (fecha + personas + totales + fecha)
  celdaOcultos.colSpan = columnasPersonas + 4;

  // Si no hay columnas ocultas → no mostrar fila
  if (!columnasOcultas.includes(true)) {
    filaOcultos.style.display = "none";
    return;
  }

  filaOcultos.style.display = "";

  columnasOcultas.forEach((oculta, index) => {
    if (!oculta) return;

    // Obtener el nombre de la columna desde la cabecera del mes
    const thNombre = tbody.querySelector(`tr[data-tipo='mes'] th[data-id='${index}']`);
    const nombre = thNombre ? thNombre.textContent.trim() : `Columna ${index + 1}`;

    // Crear el botón de mostrar con el nombre real
    const btn = document.createElement("button");
    btn.className = "boton-columna";
    btn.textContent = nombre; // Solo el nombre, sin "Mostrar"
    btn.onclick = () => toggleColumna(index);

    celdaOcultos.appendChild(btn);
  });
}



  function crearCeldaPersona(zona) {
  const td = document.createElement("td");
  td.classList.add("viajero", zona);
  td.dataset.estado = 0;
  return td;
}

function actualizarBotonMostrarColumnasOcultas() {

  // 🔥 Eliminar cualquier fila previa de botones del ojo
  const filaAnterior = tabla.querySelector(".fila-ocultos");
  if (filaAnterior) filaAnterior.remove();

  // 👉 Si no hay columnas ocultas, no mostramos nada
  if (!columnasOcultas.includes(true)) return;

  // 🆕 Crear fila independiente SOLO para mostrar columnas ocultas
  const tr = document.createElement("tr");
  tr.classList.add("fila-ocultos");

  // Celda vacía para la columna de fecha
  tr.appendChild(document.createElement("td"));

  columnasOcultas.forEach((oculta, index) => {
    const td = document.createElement("td");

    if (oculta) {
      // Nombre de la columna desde la cabecera de mes
      const thNombre = tbody.querySelector(
        `tr[data-tipo='mes'] th[data-id='${index}']`
      );

      const nombre = thNombre
        ? thNombre.textContent.trim()
        : `Columna ${index + 1}`;

      const btn = document.createElement("button");
      btn.textContent = nombre;
      btn.className = "boton-columna";
      btn.onclick = () => toggleColumna(index);

      td.appendChild(btn);
    }

    tr.appendChild(td);
  });

  // Celdas finales (totales + fecha derecha)
  for (let i = 0; i < 3; i++) {
    tr.appendChild(document.createElement("td"));
  }

  // 📌 Insertar la fila JUSTO antes del tbody (zona fija y limpia)
  tabla.insertBefore(tr, tbody);
}



  function crearFilaResumen(texto, textoMes = "") {
  const tr = document.createElement("tr");
  tr.classList.add("resumen");
  tr.dataset.tipo = texto;

  const tdFecha = crearTD(texto);


  tr.appendChild(tdFecha);

  for (let i = 0; i < columnasPersonas; i++) {
    tr.appendChild(crearTD(""));
  }

  tr.appendChild(crearTD(""));
  tr.appendChild(crearTD(""));
  tr.appendChild(crearTD(texto));

  return tr;
}


  function crearSeparadorFino() {
    const tr = document.createElement("tr");
    tr.classList.add("separador-fino");

    for (let i = 0; i < columnasPersonas + 4; i++) {
      tr.appendChild(crearTD(""));
    }
    return tr;
  }

  function recalcular() {
    const filas = [...tbody.querySelectorAll("tr")];

    let acumPersonas = Array(columnasPersonas).fill(0);
    let acumCoches = Array(columnasPersonas).fill(0);
    let mesPersonas = Array(columnasPersonas).fill(0);
    let mesCoches = Array(columnasPersonas).fill(0);

    filas.forEach(tr => {

      if (tr.dataset.tipo === "dia") {
        let totalP = 0;
        let totalC = 0;

        for (let i = 0; i < columnasPersonas; i++) {
          const estado = tr.children[i + 1].dataset.estado;

          if (estado === "2" || estado === "3") {
            totalP++;
             mesPersonas[i]++;
           }

          if (estado === "3") {
            totalC++;
            mesCoches[i]++;
          }

        }

        tr.querySelector(".PERSONAS").textContent = totalP > 0 ? totalP : "";
        tr.querySelector(".Coches").textContent   = totalC > 0 ? totalC : "";

      }

      if (tr.dataset.tipo === "COCHES") {
        for (let i = 0; i < columnasPersonas; i++) {
          acumCoches[i] += mesCoches[i];
          tr.children[i + 1].textContent =
            acumCoches[i] > 0 ? acumCoches[i] : "";
        }
      }

      if (tr.dataset.tipo === "PERSONAS") {
        for (let i = 0; i < columnasPersonas; i++) {
          acumPersonas[i] += mesPersonas[i];
          tr.children[i + 1].textContent =
            acumPersonas[i] > 0 ? acumPersonas[i] : "";
        }
      }

      if (tr.dataset.tipo === "PORCENTAJE") {
        for (let i = 0; i < columnasPersonas; i++) {
          tr.children[i + 1].textContent =
  acumPersonas[i] === 0 ? "0%" :
    ((acumCoches[i] / acumPersonas[i]) * 100).toFixed(3) + "%";

        }
        mesPersonas.fill(0);
        mesCoches.fill(0);
      }
    });
  }
function sincronizarNombre(th) {
  const id = th.dataset.id;

  th.addEventListener("focus", () => {
    const range = document.createRange();
    range.selectNodeContents(th);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  });

  // ⚠ Eliminar o comentar el listener de input
  // th.addEventListener("input", () => { ... });

  th.addEventListener("blur", () => {
    if (th.textContent.trim() === "") th.textContent = "Nombre";
    [...tbody.querySelectorAll(`th[data-id='${id}']`)].forEach(celda => {
      celda.textContent = th.textContent;
    });
  });
}


  function crearTD(texto, clase = "") {
    const td = document.createElement("td");
    td.textContent = texto;
    if (clase) td.classList.add(clase);
    return td;
  }

  function crearTH(texto, editable = false, clase = "") {
    const th = document.createElement("th");
    th.textContent = texto;
    if (editable) th.contentEditable = true;
    if (clase) th.classList.add(clase);
    th.dir = "ltr";
    return th;
  }

  function formatFecha(d) {
    return d.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }

  /* =========================================================
     ===== AÑADIR / QUITAR COLUMNAS
     ========================================================= */
function toggleColumna(pos) {
  // Cambiar estado lógico
  columnasOcultas[pos] = !columnasOcultas[pos];

  // Ocultar / mostrar en TODAS las filas del tbody
  [...tbody.querySelectorAll("tr")].forEach(tr => {
    const celda = tr.children[pos + 1];
    if (celda) {
      celda.style.display = columnasOcultas[pos] ? "none" : "";
    }
  });


  // Actualizar botones + fila de mostrar
  actualizarBotones();
  actualizarBotonMostrarColumnasOcultas();
}

  function agregarColumna(pos) {
    columnasPersonas++;
    columnasOcultas.splice(pos, 0, false);

    contadorColumnas++; // Nuevo id único

    [...tbody.querySelectorAll("tr")].forEach(tr => {
      if(tr.dataset.tipo === "dia") {
        const tdOriginal = tr.children[pos + 1];
        const tdNueva = crearCeldaPersona(
          Array.from(tdOriginal.classList).find(c => c.startsWith("zona")) || "zona1"
        );

        // Copiar clases adicionales
        tdOriginal.classList.forEach(cl => {
          if(cl !== "viajero" && !cl.startsWith("zona")) tdNueva.classList.add(cl);
        });

        tdNueva.dataset.estado = tdOriginal.dataset.estado;
        tdNueva.textContent = tdOriginal.textContent;

        // Copiar condición de fecha vacía a los lados
        const fechaIzq = tr.children[0].textContent.trim();
        const fechaDer = tr.children[tr.children.length - 1].textContent.trim();
        if(!fechaIzq && !fechaDer) tdNueva.classList.add("celda-no-interactiva");

        tr.insertBefore(tdNueva, tr.children[pos + 1]);

      } else if(tr.dataset.tipo === "COCHES" || tr.dataset.tipo === "PERSONAS" || tr.dataset.tipo === "PORCENTAJE") {
        tr.insertBefore(crearTD("0"), tr.children[pos + 1]);

      } else if(tr.dataset.tipo === "mes") {
        const thOriginal = tr.children[pos + 1];
        const th = crearTH(thOriginal.textContent || "Nombre", true,
          Array.from(thOriginal.classList).find(c => c.startsWith("zona")) || "zona1"
        );
        th.dataset.id = contadorColumnas;
        sincronizarNombre(th);
        tr.insertBefore(th, tr.children[pos + 1]);

      } else {
        tr.insertBefore(crearTD(""), tr.children[pos + 1]);
      }
    });

   actualizarFilaOcultos();
actualizarBotones();
recalcular();

  }

 function quitarColumna(pos) {
  if (columnasPersonas <= 1) return;

  columnasPersonas--;

  // Quitar columna en todas las filas del tbody
  [...tbody.querySelectorAll("tr")].forEach(tr => {
    if (tr.children[pos + 1]) {
      tr.removeChild(tr.children[pos + 1]);
    }
  });

  // Quitar celda en fila de ocultos
  if (filaOcultos.children[pos + 1]) {
    filaOcultos.removeChild(filaOcultos.children[pos + 1]);
  }

  // Ajustar estado de columnas ocultas
  columnasOcultas.splice(pos, 1);

  actualizarBotones();
  actualizarBotonMostrarColumnasOcultas(); // 🔥 ESTA FALTABA
  recalcular();
}

/* =========================================================
   SELECCIÓN RECTANGULAR Y APLICAR ESTADO
========================================================= */

let celdaInicio = null;
let seleccion = new Set();
let arrastrando = false;
let touchStartX = 0;
let touchStartY = 0;
let modoSeleccionTactil = false;

/* Solo celdas que pueden cambiar de estado */
function esSeleccionable(td) {
  return td &&
    td.tagName === "TD" &&
    td.classList.contains("viajero") &&
    !td.classList.contains("celda-no-interactiva");
}

/* Limpiar selección visual */
function limpiarSeleccion() {
  seleccion.forEach(td => td.classList.remove("seleccionada"));
  seleccion.clear();
}

/* Seleccionar rectángulo de celdas */
function seleccionarRectangulo(tdFin) {
  if (!celdaInicio) return;

  const filaIni = celdaInicio.parentElement.rowIndex;
  const filaFin = tdFin.parentElement.rowIndex;
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
tbody.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  const td = e.target.closest("td");

  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  modoSeleccionTactil = false;

  if (esSeleccionable(td)) {
    celdaInicio = td;
    limpiarSeleccion();
    td.classList.add("seleccionada");
    seleccion.add(td);
  }
}, { passive: true });

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

tbody.addEventListener("touchstart", e => {
  if (e.touches.length !== 1) {
    modoSeleccionMovil = false;
    return; // ignorar multitouch
  }

  const td = e.target.closest("td");
  if (!td || !esSeleccionable(td)) return;

  celdaInicio = td;
  arrastrando = false;
  startY = e.touches[0].clientY;
  startScroll = window.scrollY;

  touchTimer = setTimeout(() => {
    modoSeleccionMovil = true;
    limpiarSeleccion();
    td.classList.add("seleccionada");
    seleccion.add(td);
  }, 400);
}, { passive: true });

tbody.addEventListener("touchmove", e => {
  // 🔹 Si hay más de un dedo, no hacemos nada → pinch zoom sigue activo
  if (e.touches.length !== 1 || !celdaInicio) return;

  const touch = e.touches[0];

  // 🔥 Si todavía no estamos en modo selección, dejamos que el navegador haga scroll
  if (!modoSeleccionMovil) return;

  const elem = document.elementFromPoint(touch.clientX, touch.clientY);
  const td = elem?.closest("td");
  if (!td || !esSeleccionable(td)) return;

  // 🔥 A partir de aquí sí estamos seleccionando
  e.preventDefault();   // bloquear scroll SOLO mientras se selecciona

  arrastrando = true;
  seleccionarRectangulo(td, true);

  const MARGIN = 50; // px para activar scroll
  const speed = 5;

  const top = touch.clientY;
  const bottom = window.innerHeight - top;


  // Scroll personalizado solo al borde
  if (top <= MARGIN) window.scrollBy({ top: -speed, behavior: "smooth" });
  else if (bottom <= MARGIN) window.scrollBy({ top: speed, behavior: "smooth" });
}, { passive: false });



tbody.addEventListener("touchend", e => {
  if (e.touches.length > 0) return;

  clearTimeout(touchTimer);

  // Click rápido → cambiar estado
  if (celdaInicio && !modoSeleccionMovil && !arrastrando) {
    celdaInicio.dataset.estado = (Number(celdaInicio.dataset.estado) + 1) % estados.length;
    renderEstado(celdaInicio);
    recalcular();
  }

  // 🔹 Mostrar botones solo si hay selección
  if (seleccion.size > 0) {
    actualizarBotonesMovil();   // crea los botones con imágenes
    posicionarAccionesMovil();  // los coloca sobre la selección
    botonesMovil.style.display = "flex";
  }

  celdaInicio = null;
  arrastrando = false;
  modoSeleccionMovil = false;
});

botonesMovil.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const estado = btn.dataset.estado;
  
  // Aplicar estado a todas las celdas seleccionadas
  seleccion.forEach(td => {
    td.dataset.estado = estado;
    renderEstado(td);
  });

  recalcular();
  limpiarSeleccion();

  // 🔹 OCULTAR EL LAYOUT DE BOTONES DESPUÉS DE USARLO
  botonesMovil.style.display = "none";
});


function posicionarAccionesMovil() {
  if (seleccion.size === 0 || !tabla) {
    botonesMovil.style.display = "none";
    return;
  }

  // Rectángulo de toda la selección
  const rects = Array.from(seleccion).map(td => td.getBoundingClientRect());
  const minX = Math.min(...rects.map(r => r.left));
  const maxX = Math.max(...rects.map(r => r.right));
  const minY = Math.min(...rects.map(r => r.top));
  const maxY = Math.max(...rects.map(r => r.bottom));

  const tablaRect = tabla.getBoundingClientRect();

  let left = minX - tablaRect.left;
  let top  = minY - tablaRect.top - botonesMovil.offsetHeight - 5;

  // Ajustar si se sale arriba o a la derecha
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
  botonesMovil.innerHTML = ""; // limpiar primero
  botonesMovil.style.display = "flex";


  // 👤 Persona
  const btnPersona = document.createElement("button");
  btnPersona.dataset.estado = "2";
  btnPersona.style.padding = "0";
  const imgPersona = document.createElement("img");
  imgPersona.src = "persona.png";
  imgPersona.alt = "Persona";
  imgPersona.style.width = "40px";
  imgPersona.style.height = "40px";
  imgPersona.style.display = "block";
  btnPersona.appendChild(imgPersona);
  botonesMovil.appendChild(btnPersona);

  // 🚗 Volante
  const btnVolante = document.createElement("button");
  btnVolante.dataset.estado = "3";
  btnVolante.style.padding = "0";
  const imgVolante = document.createElement("img");
  imgVolante.src = "volante.png";
  imgVolante.alt = "Coche";
  imgVolante.style.width = "40px";
  imgVolante.style.height = "40px";
  imgVolante.style.display = "block";
  btnVolante.appendChild(imgVolante);
  botonesMovil.appendChild(btnVolante);

    // ❌ X roja
  const btnX = document.createElement("button");
  btnX.dataset.estado = "0";
  btnX.style.color = "red";
  btnX.style.fontSize = "32px";
  btnX.style.fontWeight = "bold";
  btnX.textContent = "X";
  botonesMovil.appendChild(btnX);
}


}
