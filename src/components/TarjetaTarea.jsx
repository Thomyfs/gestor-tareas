import { CalendarDays, Check, RotateCcw, Pencil, Trash2 } from 'lucide-react';
import { ESTILO_PRIORIDAD } from '../utils/constantes';

const hoyISO = () => new Date().toISOString().slice(0, 10);

const formatearFecha = (iso) => {
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
};

export default function TarjetaTarea({ tarea, onEditar, onEliminar, onCompletar, onReabrir }) {
  const completada = tarea.estado === 'completada';
  const vencida = !completada && tarea.fechaVencimiento && tarea.fechaVencimiento < hoyISO();

  const boton = 'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded transition-colors';

  return (
    <article className={`border rounded-lg p-4 bg-white hover:shadow-sm transition-shadow ${
      completada ? 'border-green-200 opacity-80' : 'border-gray-200'}`}>
      <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-2 ${ESTILO_PRIORIDAD[tarea.prioridad]}`}>
        {tarea.prioridad}
      </span>
      <h3 className={`font-semibold text-gray-800 break-words ${completada ? 'line-through text-gray-500' : ''}`}>
        {tarea.titulo}
      </h3>
      {tarea.descripcion && (
        <p className="text-sm text-gray-600 mt-1 break-words">{tarea.descripcion}</p>
      )}
      {tarea.fechaVencimiento && (
        <p className={`flex items-center gap-1 text-xs mt-3 ${vencida ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
          <CalendarDays size={13} />
          Vence: {formatearFecha(tarea.fechaVencimiento)}{vencida && ' (vencida)'}
        </p>
      )}

      <div className="flex flex-wrap justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
        {completada ? (
          <button onClick={() => onReabrir(tarea.id)} className={`${boton} text-gray-700 bg-gray-100 hover:bg-gray-200`}>
            <RotateCcw size={13} /> Reabrir
          </button>
        ) : (
          <button onClick={() => onCompletar(tarea.id)} className={`${boton} text-green-700 bg-green-50 hover:bg-green-100`}>
            <Check size={13} /> Completar
          </button>
        )}
        <button onClick={() => onEditar(tarea)} className={`${boton} text-indigo-600 bg-indigo-50 hover:bg-indigo-100`}>
          <Pencil size={13} /> Editar
        </button>
        <button onClick={() => onEliminar(tarea.id)} className={`${boton} text-red-600 bg-red-50 hover:bg-red-100`}>
          <Trash2 size={13} /> Eliminar
        </button>
      </div>
    </article>
  );
}
