import { ESTADOS } from '../utils/constantes';
import TarjetaTarea from './TarjetaTarea';

// Muestra las tareas agrupadas en columnas según su estado con un diseño moderno y limpio.
export default function TableroTareas({ tareas, ...acciones }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {ESTADOS.map((estado) => {
        const delEstado = tareas.filter((t) => t.estado === estado.valor);
        return (
          <section 
            key={estado.valor} 
            aria-label={estado.etiqueta} 
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col transition-all hover:shadow-md"
          >
            {/* Cabecera de la columna */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 px-1">
              <div className="flex items-center gap-2.5">
                <span className={`h-3 w-3 rounded-full shadow-sm ${estado.color}`} />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {estado.etiqueta}
                </h3>
              </div>
              <span 
                data-testid={`contador-${estado.valor}`} 
                className="rounded-full bg-slate-100 text-slate-600 font-semibold px-2.5 py-0.5 text-xs border border-slate-200/60"
              >
                {delEstado.length}
              </span>
            </div>

            {/* Contenedor de tarjetas */}
            <div className="space-y-3.5 flex-1">
              {delEstado.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 px-4 border-2 border-dashed border-slate-100 rounded-xl">
                  <p className="text-xs font-medium text-slate-400">Sin tareas en esta sección</p>
                </div>
              ) : (
                delEstado.map((t) => <TarjetaTarea key={t.id} tarea={t} {...acciones} />)
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}