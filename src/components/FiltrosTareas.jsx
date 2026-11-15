import { Search, X } from 'lucide-react';
import { ESTADOS, PRIORIDADES } from '../utils/constantes';

export default function FiltrosTareas({ filtros, onCambiar, onLimpiar, hayFiltros }) {
  const cambiar = (campo) => (e) => onCambiar({ ...filtros, [campo]: e.target.value });
  const select =
    'rounded-md border border-gray-300 bg-white p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500';

  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="search"
          aria-label="Buscar tareas"
          value={filtros.busqueda}
          onChange={cambiar('busqueda')}
          placeholder="Buscar por título o descripción..."
          className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <select aria-label="Filtrar por estado" value={filtros.estado} onChange={cambiar('estado')} className={select}>
        <option value="todos">Todos los estados</option>
        {ESTADOS.map((s) => <option key={s.valor} value={s.valor}>{s.etiqueta}</option>)}
      </select>

      <select aria-label="Filtrar por prioridad" value={filtros.prioridad} onChange={cambiar('prioridad')} className={select}>
        <option value="todas">Todas las prioridades</option>
        {PRIORIDADES.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>

      {hayFiltros && (
        <button onClick={onLimpiar}
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
          <X size={14} /> Limpiar
        </button>
      )}
    </div>
  );
}
