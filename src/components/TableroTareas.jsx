import { ESTADOS } from '../utils/constantes';
import TarjetaTarea from './TarjetaTarea';

// Muestra las tareas agrupadas en columnas según su estado.
export default function TableroTareas({ tareas, ...acciones }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {ESTADOS.map((estado) => {
        const delEstado = tareas.filter((t) => t.estado === estado.valor);
        return (
          <section key={estado.valor} aria-label={estado.etiqueta} className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <h3 className="flex items-center justify-between mb-3 px-1 text-sm font-bold uppercase tracking-wide text-gray-600">
              <span className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${estado.color}`} />
                {estado.etiqueta}
              </span>
              <span data-testid={`contador-${estado.valor}`} className="rounded-full bg-white border px-2 text-xs">
                {delEstado.length}
              </span>
            </h3>
            <div className="space-y-3">
              {delEstado.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-6">Sin tareas</p>
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
