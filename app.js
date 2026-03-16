// --- ESTADO ---
let misiones = JSON.parse(localStorage.getItem('taskflow_misiones')) || [];
let rangosActivos = new Set(['D', 'C', 'B', 'A', 'S']);
let categoriasActivas = new Set(['Recolección', 'Exploración', 'Captura', 'Escolta', 'Caza']);

// --- MODO OSCURO ---
const themeToggle = document.getElementById('theme-toggle');
function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('task_theme', theme);
}
themeToggle.addEventListener('click', () => {
    applyTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
});
applyTheme(localStorage.getItem('task_theme') || 'light');

// --- NUEVO: ESTADÍSTICAS ---
/**
 * Actualiza y muestra las estadísticas de misiones en el panel correspondiente.
 *
 * Calcula el total de misiones, la cantidad de misiones completadas y pendientes
 * utilizando el arreglo global `misiones`. Luego, actualiza el contenido HTML del
 * elemento con id "stats-container" para reflejar estos valores.
 *
 * @function
 * @returns {void} No retorna ningún valor. Efecto colateral: modifica el DOM.
 */
function actualizarEstadisticas() {
    const total = listaMisiones.length;
    const completadas = listaMisiones.filter(m => m.completada).length;
    const pendientes = total - completadas;
    const porcentajeCompletadas = total > 0 ? Math.round((completadas / total) * 100) : 0;
    const porcentajePendientes = total > 0 ? Math.round((pendientes / total) * 100) : 0;
    
    // Plantilla de estadísticas para mayor claridad y escalabilidad
    const estadisticas = [
        {
            label: 'TOTAL',
            value: total,
            classes: 'flex justify-between',
            valueClass: 'text-stone-800 dark:text-gold'
        },
        {
            label: 'PENDIENTES',
            value: `${pendientes} <span class="ml-2 text-xs text-stone-400">(${porcentajePendientes}%)</span>`,
            classes: 'flex justify-between text-blue-600',
            valueClass: ''
        },
        {
            label: 'LOGRADAS',
            value: `${completadas} <span class="ml-2 text-xs text-stone-400">(${porcentajeCompletadas}%)</span>`,
            classes: 'flex justify-between text-green-600',
            valueClass: ''
        }
    ];

    document.getElementById('stats-container').innerHTML = estadisticas.map(stat =>
        `<p class="${stat.classes}">
            ${stat.label}: <span class="${stat.valueClass}">${stat.value}</span>
        </p>`
    ).join('');
}
    const total = misiones.length;
    const completadas = misiones.filter(
        /** 
         * Verifica si la misión está completada.
         * @param {Object} m - Objeto de misión.
         * @param {boolean} m.completada - Indica si la misión está completada.
         * @returns {boolean} True si la misión está completada.
         */
        m => m.completada
    ).length;
    const pendientes = total - completadas;

    document.getElementById('stats-container').innerHTML = `
        <p class="flex justify-between">TOTAL: <span class="text-stone-800 dark:text-gold">${total}</span></p>
        <p class="flex justify-between text-blue-600">PENDIENTES: <span>${pendientes}</span></p>
        <p class="flex justify-between text-green-600">LOGRADAS: <span>${completadas}</span></p>
    `;

// Refactorización: renombrar para mayor semántica
// Cambiaremos los nombres en todo el documento, pero aquí realizamos la reasignación del estado inicial
let listaMisiones = JSON.parse(localStorage.getItem('taskflow_misiones')) || [];
let filtrosRango = new Set(['D', 'C', 'B', 'A', 'S']);
let filtrosCategoria = new Set(['Recolección', 'Exploración', 'Captura', 'Escolta', 'Caza']);

// Actualiza la función de estadísticas para utilizar 'listaMisiones'
function actualizarEstadisticas() {
    const total = listaMisiones.length;
    const completadas = listaMisiones.filter(
        m => m.completada
    ).length;
    const pendientes = total - completadas;

    document.getElementById('stats-container').innerHTML = `
        <p class="flex justify-between">TOTAL: <span class="text-stone-800 dark:text-gold">${total}</span></p>
        <p class="flex justify-between text-blue-600">PENDIENTES: <span>${pendientes}</span></p>
        <p class="flex justify-between text-green-600">LOGRADAS: <span>${completadas}</span></p>
    `;
}

// --- RENDERIZADO ACTUALIZADO ---
function render() {
    const list = document.getElementById('lista-misiones');
    const busqueda = document.getElementById('filtro-texto').value.toLowerCase();
    const filtroEstado = document.getElementById('filtro-estado').value;
    list.innerHTML = '';


    misiones.forEach(m => {
        const cumpleFiltros = rangosActivos.has(m.rango) && 
                            categoriasActivas.has(m.categoria) && 
                            m.texto.toLowerCase().includes(busqueda);
        
        const cumpleEstado = filtroEstado === 'todas' || 
                            (filtroEstado === 'completadas' && m.completada) || 
                            (filtroEstado === 'pendientes' && !m.completada);

        if (cumpleFiltros && cumpleEstado) {
            const el = document.createElement('div');
            
            // Estilo dinámico si está completada
            const clasesCompletada = m.completada 
                ? 'opacity-60 grayscale-[0.5] border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-zinc-800/50' 
                : 'bg-white dark:bg-zinc-800 border-stone-200 dark:border-stone-700 ring-1 ring-gold/20';

            el.className = `p-5 border relative hover:scale-[1.01] transition-all duration-300 flex justify-between items-center group overflow-hidden ${clasesCompletada}`;
            
            // Extrae lógica a función y renombra 'm' por 'mision'
            function crearElementoMision(mision) {
                const el = document.createElement('div');
                // Estilo dinámico si está completada
                const clasesCompletada = mision.completada 
                    ? 'opacity-60 grayscale-[0.5] border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-zinc-800/50' 
                    : 'bg-white dark:bg-zinc-800 border-stone-200 dark:border-stone-700 ring-1 ring-gold/20';

                el.className = `p-5 border relative hover:scale-[1.01] transition-all duration-300 flex justify-between items-center group overflow-hidden ${clasesCompletada}`;
                el.innerHTML = `
                    <div class="relative z-10 ${mision.completada ? 'line-through decoration-gold' : ''}">
                        <span class="font-pixel text-[8px] text-gold dark:text-gold/80 uppercase tracking-tighter">${mision.categoria} | RANGO ${mision.rango}</span>
                        <p class="text-lg font-bold text-stone-800 dark:text-stone-100 mt-1">${mision.texto}</p>
                    </div>
                    <div class="flex gap-2 relative z-20">
                        <button onclick="toggleMision(${mision.id})" 
                            class="px-3 py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-all font-pixel text-[8px]">
                            ${mision.completada ? '↩' : '✓'}
                        </button>
                        <button onclick="eliminar(${mision.id})" 
                            class="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-2 font-pixel text-[8px] transition-all">
                            X
                        </button>
                    </div>
                `;
                return el;
            }

            list.appendChild(crearElementoMision(mision));
        }
    });
    actualizarEstadisticas();
}

// --- ACCIONES ---
document.getElementById('form-mision').onsubmit = (e) => {
    e.preventDefault();
    misiones.push({
        id: Date.now(),
        texto: document.getElementById('input-mision').value,
        categoria: document.getElementById('select-categoria').value,
        rango: document.getElementById('select-rango').value,
        completada: false, // Requisito del ejercicio
        fecha: new Date().toLocaleDateString() // Requisito extra
    });
    guardarYRender();
    e.target.reset();
};
const form = document.getElementById('form-mision');
const inputMision = document.getElementById('input-mision');

// Crear/ubicar contenedor de errores si no existe
let errorDiv = document.getElementById('error-mision');
if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.id = 'error-mision';
    errorDiv.className = 'text-red-600 text-xs mt-2 font-pixel';
    inputMision.parentNode.appendChild(errorDiv);
}

form.onsubmit = (e) => {
    e.preventDefault();
    // Limpiar mensaje anterior
    errorDiv.textContent = '';
    const texto = inputMision.value.trim();

    // Validaciones
    if (!texto) {
        errorDiv.textContent = 'El título no puede estar vacío.';
        inputMision.focus();
        return;
    }
    if (texto.length < 3) {
        errorDiv.textContent = 'La misión debe tener al menos 3 caracteres.';
        inputMision.focus();
        return;
    }
    // Chequear duplicados (ignorando mayúsculas y tildes)
    const normalizar = txt => txt.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (misiones.some(m => normalizar(m.texto) === normalizar(texto))) {
        errorDiv.textContent = 'Ya existe una misión con ese título.';
        inputMision.focus();
        return;
    }

    misiones.push({
        id: Date.now(),
        texto,
        categoria: document.getElementById('select-categoria').value,
        rango: document.getElementById('select-rango').value,
        completada: false, // Requisito del ejercicio
        fecha: new Date().toLocaleDateString() // Requisito extra
    });
    guardarYRender();
    e.target.reset();
};

window.toggleMision = (id) => {
    const mision = misiones.find(m => m.id === id);
    if (mision) {
        mision.completada = !mision.completada;
        guardarYRender();
    }
};

window.eliminar = (id) => {
    misiones = misiones.filter(m => m.id !== id);
    guardarYRender();
};

function guardarYRender() {
    localStorage.setItem('taskflow_misiones', JSON.stringify(misiones));
    render();
}

// --- INICIALIZACIÓN ---
function init() {
    // Filtros de Rango
    const rCont = document.getElementById('filtro-rangos');
    rCont.innerHTML = '';
    ['D', 'C', 'B', 'A', 'S'].forEach(r => {
        const btn = document.createElement('button');
        btn.textContent = r;
        btn.className = `w-10 h-10 font-pixel text-[10px] border transition-all duration-300 ${rangosActivos.has(r) ? 'bg-wood text-white dark:bg-gold border-wood dark:border-gold' : 'text-stone-400 border-stone-300 dark:border-stone-700'}`;
        btn.onclick = () => {
            rangosActivos.has(r) ? rangosActivos.delete(r) : rangosActivos.add(r);
            init();
        };
        rCont.appendChild(btn);
    });

    // Filtros de Categoría
    const cCont = document.getElementById('filtro-categorias');
    cCont.innerHTML = '';
    ['Recolección', 'Exploración', 'Captura', 'Escolta', 'Caza'].forEach(c => {
        const btn = document.createElement('button');
        btn.textContent = c;
        btn.className = `text-left p-2 font-pixel text-[9px] transition-all duration-300 border-l-4 ${categoriasActivas.has(c) ? 'border-gold text-stone-800 dark:text-stone-100 bg-gold/5' : 'border-transparent text-stone-400 opacity-50'}`;
        btn.onclick = () => {
            categoriasActivas.has(c) ? categoriasActivas.delete(c) : categoriasActivas.add(c);
            init();
        };
        cCont.appendChild(btn);
    });
    render();
}

document.getElementById('filtro-texto').oninput = render;
document.getElementById('filtro-estado').onchange = render;
document.addEventListener('DOMContentLoaded', init);

// Función para formatear la fecha de la misión en un formato legible para el usuario
function formatearFecha(fecha) {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaObj.getFullYear();
    return `${dia}/${mes}/${anio}`;
}
// Barra de progreso de misiones logradas

function actualizarBarraProgreso() {
    // Calcula el porcentaje de misiones completadas
    const total = misiones.length;
    const completadas = misiones.filter(m => m.estado === 'completada').length;
    const porcentaje = total === 0 ? 0 : Math.round((completadas / total) * 100);

    // Crea o actualiza la barra de progreso
    let cont = document.getElementById('progreso-logro-container');
    if (!cont) {
        // Creamos el contenedor al final de stats-container
        const stats = document.getElementById('stats-container');
        cont = document.createElement('div');
        cont.id = 'progreso-logro-container';
        cont.className = 'mt-5';
        cont.innerHTML = `
            <div class="font-pixel text-[8px] mb-2 uppercase text-stone-500 dark:text-stone-400 flex justify-between items-center">
                <span>Progreso General</span>
                <span id="progreso-logro-text"></span>
            </div>
            <div class="w-full h-4 bg-parchment dark:bg-zinc-800 rounded overflow-hidden border border-gold/40">
                <div id="progreso-logro-barra"
                    class="h-full transition-all duration-500 bg-gold"
                    style="width: 0%">
                </div>
            </div>
        `;
        stats.appendChild(cont);
    }

    // Actualiza porcentaje visual y texto
    const texto = document.getElementById('progreso-logro-text');
    if (texto) {
        texto.textContent = `${porcentaje}% (${completadas}/${total})`;
    }
    const barra = document.getElementById('progreso-logro-barra');
    if (barra) {
        barra.style.width = porcentaje + '%';
    }
}

// Llama a la barra de progreso después del render y en la carga inicial
const _renderBase = render;
render = function() {
    _renderBase();
    actualizarBarraProgreso();
};
