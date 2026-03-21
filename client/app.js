/**
 * TASKFLOW - Sistema de Gestión de Misiones
 * Versión de Rango S: Integración Total y Estado Persistente
 */

// --- 1. ESTADO GLOBAL (Fuente Única de Verdad) ---
let listaMisiones = JSON.parse(localStorage.getItem('taskflow_misiones')) || [];
const filtrosRango = new Set(['D', 'C', 'B', 'A', 'S']);
const filtrosCategoria = new Set(['Recolección', 'Exploración', 'Captura', 'Escolta', 'Caza']);
let ordenActivo = false; // Estado del interruptor de prioridad

// --- 2. NÚCLEO DE LA APLICACIÓN (Persistencia y Renderizado) ---

/**
 * Guarda el estado actual en LocalStorage y dispara el renderizado de la UI.
 */
function guardarYRender() {
    localStorage.setItem('taskflow_misiones', JSON.stringify(listaMisiones));
    render();
}

/**
 * Renderiza la lista de misiones con filtros y ordenación dinámica.
 */
function render() {
    const contenedor = document.getElementById('lista-misiones');
    const busquedaInput = document.getElementById('filtro-texto');
    const filtroEstadoInput = document.getElementById('filtro-estado');
    
    if (!contenedor || !busquedaInput || !filtroEstadoInput) return;
    
    const busqueda = busquedaInput.value.toLowerCase();
    const filtroEstado = filtroEstadoInput.value;
    
    contenedor.innerHTML = '';

    // --- REFUERZO DE LÓGICA DE ORDENACIÓN ---
    let misionesParaMostrar = [...listaMisiones]; 
    
    if (ordenActivo) {
        const p = { 'S': 5, 'A': 4, 'B': 3, 'C': 2, 'D': 1 };
        misionesParaMostrar.sort((a, b) => {
            // Obtenemos el valor numérico del rango, o 0 si no existe
            const valA = p[a.rango] || 0;
            const valB = p[b.rango] || 0;
            return valB - valA; // De mayor (S) a menor (D)
        });
        console.log("Ordenación por Rango S-D ejecutada.");
    } else {
        misionesParaMostrar.sort((a, b) => b.id - a.id); 
    }

    // --- Feedback Visual del Botón ---
    const btnOrdenar = document.getElementById('btn-ordenar');
    if (btnOrdenar) {
        if (ordenActivo) {
            btnOrdenar.classList.add('bg-gold', 'text-white');
            btnOrdenar.classList.remove('text-gold');
        } else {
            btnOrdenar.classList.remove('bg-gold', 'text-white');
            btnOrdenar.classList.add('text-gold');
        }
    }

    // Dibujado de misiones
    misionesParaMostrar.forEach(mision => {
        const cumpleFiltros = filtrosRango.has(mision.rango) && 
                              filtrosCategoria.has(mision.categoria) && 
                              mision.texto.toLowerCase().includes(busqueda);
        
        const cumpleEstado = filtroEstado === 'todas' || 
                            (filtroEstado === 'completadas' && mision.completada) || 
                            (filtroEstado === 'pendientes' && !mision.completada);

        if (cumpleFiltros && cumpleEstado) {
            contenedor.appendChild(crearMisionElemento(mision));
        }
    });

    actualizarEstadisticas();
}
/**
 * Crea el nodo HTML para una misión individual.
 */
function crearMisionElemento(mision) {
    const el = document.createElement('div');
    const clasesCompletada = mision.completada 
        ? 'opacity-60 grayscale-[0.5] border-stone-400 dark:border-stone-700 bg-stone-100 dark:bg-zinc-800/50' 
        : 'bg-white dark:bg-zinc-800 border-stone-200 dark:border-stone-700 ring-1 ring-gold/20';

    el.className = `p-5 border relative hover:scale-[1.01] transition-all duration-300 flex justify-between items-center group ${clasesCompletada}`;
    
    el.innerHTML = `
        <div class="relative z-10 flex-1 ${mision.completada ? 'line-through decoration-gold' : ''}">
            <span class="font-pixel text-[8px] text-gold dark:text-gold/80 uppercase tracking-tighter">
                ${mision.categoria} | RANGO ${mision.rango} | ${mision.fecha}
            </span>
            <p class="text-lg font-bold text-stone-800 dark:text-stone-100 mt-1">${mision.texto}</p>
        </div>
        <div class="flex gap-2 relative z-20 ml-4">
            <button onclick="window.toggleMision(${mision.id})" class="px-3 py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-all font-pixel text-[8px]">
                ${mision.completada ? '↩' : '✓'}
            </button>
            
            <button onclick="window.editarMision(${mision.id})" class="px-3 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all font-pixel text-[8px] bg-white dark:bg-zinc-900">
                EDIT
            </button>
            
            <button onclick="window.eliminarMision(${mision.id})" class="bg-red-500/10 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-3 py-2 font-pixel text-[8px] transition-all">
                X
            </button>
        </div>
    `;
    return el;
}

// --- 3. GESTIÓN DE ESTADÍSTICAS Y PROGRESO ---

function actualizarEstadisticas() {
    const total = listaMisiones.length;
    const completadas = listaMisiones.filter(m => m.completada).length;
    const porcentaje = total > 0 ? Math.round((completadas / total) * 100) : 0;

    const statsContainer = document.getElementById('stats-container');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <p class="flex justify-between">TOTAL: <span class="text-stone-800 dark:text-gold">${total}</span></p>
            <p class="flex justify-between text-blue-600">PENDIENTES: <span>${total - completadas}</span></p>
            <p class="flex justify-between text-green-600">LOGRADAS: <span>${completadas}</span></p>
            
            <div class="mt-4">
                <div class="flex justify-between font-pixel text-[8px] mb-1 text-stone-500">
                    <span>PROGRESO DEL GREMIO</span>
                    <span>${porcentaje}%</span>
                </div>
                <div class="w-full h-2 bg-stone-200 dark:bg-zinc-700 rounded overflow-hidden">
                    <div class="h-full bg-gold transition-all duration-700" style="width: ${porcentaje}%"></div>
                </div>
            </div>
        `;
    }
}

// --- 4. ACCIONES Y VALIDACIONES ---

const formMision = document.getElementById('form-mision');
if (formMision) {
    formMision.onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById('input-mision');
        const texto = input.value.trim();

        if (texto.length < 3) return alert("Misión demasiado corta.");
        
        listaMisiones.push({
            id: Date.now(),
            texto: texto,
            categoria: document.getElementById('select-categoria').value,
            rango: document.getElementById('select-rango').value,
            completada: false,
            fecha: new Date().toLocaleDateString()
        });

        guardarYRender();
        e.target.reset();
    };
}

window.toggleMision = (id) => {
    const mision = listaMisiones.find(m => m.id === id);
    if (mision) {
        mision.completada = !mision.completada;
        guardarYRender();
    }
};

window.eliminarMision = (id) => {
    if (confirm("¿Confirmas el descarte de esta misión?")) {
        listaMisiones = listaMisiones.filter(m => m.id !== id);
        guardarYRender();
    }
};

window.editarMision = (id) => {
    const mision = listaMisiones.find(m => m.id === id);
    if (mision) {
        const nuevoTexto = prompt("Actualiza los detalles de la misión:", mision.texto);
        if (nuevoTexto !== null && nuevoTexto.trim().length >= 3) {
            mision.texto = nuevoTexto.trim();
            guardarYRender();
        }
    }
};

window.ordenarPorPrioridad = () => {
    ordenActivo = !ordenActivo;
    render();
};

// --- 5. CONFIGURACIÓN DE FILTROS E INICIALIZACIÓN ---

function setupFiltros() {
    const rCont = document.getElementById('filtro-rangos');
    const cCont = document.getElementById('filtro-categorias');

    const crearBtn = (texto, set, tipo) => {
        const btn = document.createElement('button');
        btn.textContent = texto;
        btn.onclick = () => {
            set.has(texto) ? set.delete(texto) : set.add(texto);
            actualizarEstiloFiltro(btn, set.has(texto), tipo);
            render();
        };
        actualizarEstiloFiltro(btn, set.has(texto), tipo);
        return btn;
    };

    if (rCont) {
        rCont.innerHTML = '';
        ['D', 'C', 'B', 'A', 'S'].forEach(r => rCont.appendChild(crearBtn(r, filtrosRango, 'rango')));
    }
    if (cCont) {
        cCont.innerHTML = '';
        ['Recolección', 'Exploración', 'Captura', 'Escolta', 'Caza'].forEach(c => cCont.appendChild(crearBtn(c, filtrosCategoria, 'cat')));
    }
}

function actualizarEstiloFiltro(btn, activo, tipo) {
    if (tipo === 'rango') {
        btn.className = `w-10 h-10 font-pixel text-[10px] border transition-all duration-300 ${activo ? 'bg-wood text-white dark:bg-gold border-wood dark:border-gold' : 'text-stone-400 border-stone-400 dark:border-stone-700'}`;
    } else {
        btn.className = `text-left p-2 font-pixel text-[9px] transition-all duration-300 border-l-4 ${activo ? 'border-gold text-stone-800 dark:text-stone-100 bg-gold/5' : 'border-transparent text-stone-400 opacity-50'}`;
    }
}

function setupTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const apply = (t) => {
        document.documentElement.classList.toggle('dark', t === 'dark');
        localStorage.setItem('task_theme', t);
    };
    themeToggle?.addEventListener('click', () => apply(document.documentElement.classList.contains('dark') ? 'light' : 'dark'));
    apply(localStorage.getItem('task_theme') || 'light');
}

function init() {
    setupTheme();
    setupFiltros();
    render();
}

document.getElementById('filtro-texto')?.addEventListener('input', render);
document.getElementById('filtro-estado')?.addEventListener('change', render);
document.addEventListener('DOMContentLoaded', init);