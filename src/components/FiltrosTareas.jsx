import { Search, X } from 'lucide-react';
import { ESTADOS, PRIORIDADES } from '../utils/constantes';

export default function FiltrosTareas({ filtros, onCambiar, onLimpiar, hayFiltros }) {
  const cambiar = (campo) => (e) => onCambiar({ ...filtros, [campo]: e.target.value });
  
  const selectStyle = `
    w-full sm:w-auto appearance-none bg-slate-50/80 border border-slate-200/80 rounded-xl 
    px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200
    hover:bg-slate-100/80 hover:border-slate-300 focus:outline-none focus:ring-2 
    focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer
  `;

  return (
    <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 flex flex-col gap-4 lg:flex-row lg:items-center justify-between transition-all duration-300">
      
      {/* Barra de Búsqueda */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search size={18} />
        </div>
        <input
          type="search"
          aria-label="Buscar tareas"
          value={filtros.busqueda}
          onChange={cambiar('busqueda')}
          placeholder="Buscar por título o descripción..."
          className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition-all duration-200 hover:bg-slate-100/80 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white"
        />
      </div>

      {/* Contenedor de Selects y Botón de Limpiar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        
        {/* Select de Estado */}
        <div className="relative">
          <select 
            aria-label="Filtrar por estado" 
            value={filtros.estado} 
            onChange={cambiar('estado')} 
            className={selectStyle}
          >
            <option value="todos">Todos los estados</option>
            {ESTADOS.map((s) => <option key={s.valor} value={s.valor}>{s.etiqueta}</option>)}
          </select>
        </div>

        {/* Select de Prioridad */}
        <div className="relative">
          <select 
            aria-label="Filtrar por prioridad" 
            value={filtros.prioridad} 
            onChange={cambiar('prioridad')} 
            className={selectStyle}
          >
            <option value="todas">Todas las prioridades</option>
            {PRIORIDADES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Botón Limpiar Filtros */}
        {hayFiltros && (
          <button 
            onClick={onLimpiar}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-600 bg-rose-50/80 border border-rose-100 hover:bg-rose-100 hover:text-rose-700 active:scale-95 transition-all duration-200 shadow-sm"
            title="Limpiar filtros"
          >
            <X size={16} />
            <span>Limpiar</span>
          </button>
        )}
      </div>

    </div>
  );
}