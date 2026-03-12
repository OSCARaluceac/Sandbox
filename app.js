// --- ESTADO INTERNO DEL GREMIO ---
let misiones = JSON.parse(localStorage.getItem('taskflow_misiones')) || [];
let rangosActivos = new Set(['D', 'C', 'B', 'A', 'S']);
let categoriasActivas = new Set(['Recolección', 'Exploración', 'Captura', 'Escolta', 'Caza']);
let editId = null; // Rastreador para la función de edición

// --- MODO OSCURO (PERSISTENTE) ---
const themeToggle = document.getElementById('theme-toggle');
function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('task_theme', theme);
}
themeToggle.addEventListener('click', () => {
    applyTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
});
applyTheme(localStorage.getItem('task_theme') || 'light');

// --- CÁLCULO DE ESTADÍSTICAS ---
function actualizarEstadisticas() {
    const total = misiones.length;
    const completadas = misiones.filter(m => m.completada).length;
    const pendientes = total - completadas;

    const statsCont = document.getElementById('stats-container');
    if (statsCont) {
        statsCont.innerHTML = `
            <p class="flex justify-between">TOTAL: <span class="text-stone-800 dark:text-gold">${total}</span></p>
            <p class="flex justify-between text-blue-600 dark:text-blue-400">PENDIENTES: <span>${pendientes}</span></p>
            <p class="flex justify-between text-green-600 dark:text-green-400">LOGRADAS: <span>${completadas}</span></p>
        `;
    }
}

// --- RENDERIZADO DEL TABLÓN ---
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
            
            const clasesEstado = m.completada 
                ? 'opacity-60 grayscale-[0.3] border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-zinc-800/50' 
                : 'bg-white dark:bg-zinc-800 border-stone-200 dark:border-stone-700 ring-1 ring-gold/20';

            el.className = `p-5 border relative hover:scale-[1.01] transition-all duration-300 flex justify-between items-center group ${clasesEstado}`;
            
            el.innerHTML = `
                <div class="z-10 ${m.completada ? 'line-through decoration-gold/50' : ''}">
                    <span class="font-pixel text-[7px] text-gold dark:text-gold/80 uppercase tracking-tighter">${m.categoria} | RANGO ${m.rango}</span>
                    <p class="text-lg font-bold text-stone-800 dark:text-stone-100 mt-1">${m.texto}</p>
                    <small class="text-[9px] opacity-50 italic">Publicado: ${m.fecha}</small>
                </div>
                <div class="flex gap-2 z-20">
                    <button onclick="toggleMision(${m.id})" title="Marcar estado"
                        class="px-3 py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-all font-pixel text-[8px]">
                        ${m.completada ? '↩' : '✓'}
                    </button>
                    <button onclick="prepararEdicion(${m.id})" title="Editar"
                        class="px-3 py-2 border border-wood text-wood dark:border-stone-400 dark:text-stone-400 hover:bg-wood hover:text-white transition-all font-pixel text-[8px]">
                        ✎
                    </button>
                    <button onclick="eliminar(${m.id})" title="Eliminar"
                        class="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-2 font-pixel text-[8px] transition-all">
                        X
                    </button>
                </div>
            `;
            list.appendChild(el);
        }
    });
    actualizarEstadisticas();
}

// --- ACCIONES TÉCNICAS ---

// Guardar misiones
document.getElementById('form-mision').onsubmit = (e) => {
    e.preventDefault();
    const texto = document.getElementById('input-mision').value;
    const categoria = document.getElementById('select-categoria').value;
    const rango = document.getElementById('select-rango').value;

    if (editId) {
        // Modo Edición: Actualizar existente
        const index = misiones.findIndex(m => m.id === editId);
        misiones[index] = { ...misiones[index], texto, categoria, rango };
        editId = null;
        e.target.querySelector('button[type="submit"]').textContent = 'PUBLICAR';
    } else {
        // Modo Creación: Nueva misión
        misiones.push({
            id: Date.now(),
            texto,
            categoria,
            rango,
            completada: false,
            fecha: new Date().toLocaleDateString()
        });
    }

    guardarYRender();
    e.target.reset();
};

// Preparar edición
window.prepararEdicion = (id) => {
    const m = misiones.find(m => m.id === id);
    if (m) {
        document.getElementById('input-mision').value = m.texto;
        document.getElementById('select-categoria').value = m.categoria;
        document.getElementById('select-rango').value = m.rango;
        editId = id;
        document.querySelector('#form-mision button[type="submit"]').textContent = 'GUARDAR';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

window.toggleMision = (id) => {
    const m = misiones.find(m => m.id === id);
    if (m) m.completada = !m.completada;
    guardarYRender();
};

window.eliminar = (id) => {
    misiones = misiones.filter(m => m.id !== id);
    guardarYRender();
};

function guardarYRender() {
    localStorage.setItem('taskflow_misiones', JSON.stringify(misiones));
    render();
}

// --- INICIALIZACIÓN DE INTERFAZ ---
function init() {
    // Generar botones de Rango
    const rCont = document.getElementById('filtro-rangos');
    rCont.innerHTML = '';
    ['D', 'C', 'B', 'A', 'S'].forEach(r => {
        const btn = document.createElement('button');
        btn.textContent = r;
        btn.className = `w-10 h-10 font-pixel text-[10px] border transition-all duration-300 ${rangosActivos.has(r) ? 'bg-wood text-white dark:bg-gold border-wood dark:border-gold shadow-md' : 'text-stone-400 border-stone-300 dark:border-stone-700'}`;
        btn.onclick = () => {
            rangosActivos.has(r) ? rangosActivos.delete(r) : rangosActivos.add(r);
            init(); // Re-inicializar para actualizar estilos de botones
        };
        rCont.appendChild(btn);
    });

    // Generar botones de Categoría
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

// Escuchadores de eventos globales
document.getElementById('filtro-texto').oninput = render;
document.getElementById('filtro-estado').onchange = render;
document.addEventListener('DOMContentLoaded', init);
