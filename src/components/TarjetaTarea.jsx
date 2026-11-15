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

  // Estilo base unificado para los botones de acción con micro-interacciones
  const boton = 'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow';

  return (
    <article className={`group relative rounded-xl p-4 bg-white border transition-all duration-200 hover:shadow-md ${
      completada 
        ? 'border-emerald-200/80 bg-emerald-50/20 opacity-90' 
        : vencida
        ? 'border-rose-200 bg-rose-50/10'
        : 'border-slate-200/80 hover:border-slate-300'
    }`}>
      
      {/* Cabecera de la tarjeta: Prioridad y detalles */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wider ${ESTILO_PRIORIDAD[tarea.prioridad]}`}>
          {tarea.prioridad}
        </span>
        
        {/* Indicador visual rápido de estado vencido */}
        {vencida && (
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold text-rose-700 bg-rose-100 rounded-full animate-pulse">
            Vencida
          </span>
        )}
      </div>

      {/* Título de la tarea */}
      <h3 className={`font-semibold text-slate-800 text-sm leading-snug break-words ${completada ? 'line-through text-slate-400' : ''}`}>
        {tarea.titulo}
      </h3>

      {/* Descripción opcional */}
      {tarea.descripcion && (
        <p className={`text-xs mt-1.5 break-words line-clamp-2 ${completada ? 'text-slate-400' : 'text-slate-600'}`}>
          {tarea.descripcion}
        </p>
      )}

      {/* Fecha de vencimiento */}
      {tarea.fechaVencimiento && (
        <div className={`inline-flex items-center gap-1.5 text-xs mt-3 px-2 py-1 rounded-md ${
          vencida ? 'text-rose-700 bg-rose-50 font-semibold' : 'text-slate-500 bg-slate-50'
        }`}>
          <CalendarDays size={13} className={vencida ? 'text-rose-500' : 'text-slate-400'} />
          <span>Vence: {formatearFecha(tarea.fechaVencimiento)}</span>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex flex-wrap items-center justify-end gap-1.5 mt-4 pt-3 border-t border-slate-100">
        {completada ? (
          <button 
            onClick={() => onReabrir(tarea.id)} 
            className={`${boton} text-slate-700 bg-slate-100 hover:bg-slate-200`}
          >
            <RotateCcw size={13} /> Reabrir
          </button>
        ) : (
          <button 
            onClick={() => onCompletar(tarea.id)} 
            className={`${boton} text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50`}
          >
            <Check size={13} /> Completar
          </button>
        )}
        
        <button 
          onClick={() => onEditar(tarea)} 
          className={`${boton} text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/50`}
        >
          <Pencil size={13} /> Editar
        </button>
        
        <button 
          onClick={() => onEliminar(tarea.id)} 
          className={`${boton} text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/50`}
        >
          <Trash2 size={13} /> Eliminar
        </button>
      </div>
    </article>
  );
}