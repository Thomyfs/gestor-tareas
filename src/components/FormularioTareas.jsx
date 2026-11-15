import { useState } from 'react';
import { ESTADOS, PRIORIDADES } from '../utils/constantes';

const VACIO = {
  titulo: '',
  descripcion: '',
  fechaVencimiento: '',
  prioridad: 'Media',
  estado: 'pendiente',
};

// Nota: el padre usa `key` para remontar este componente al cambiar la tarea en edición,
// así el estado inicial siempre corresponde a la tarea seleccionada.
export default function FormularioTareas({ onGuardar, editandoTarea, onCancelar }) {
  const [datos, setDatos] = useState(editandoTarea ?? VACIO);

  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!datos.titulo.trim()) return;
    onGuardar({
      ...datos,
      titulo: datos.titulo.trim(),
      descripcion: datos.descripcion.trim(),
      id: editandoTarea ? editandoTarea.id : Date.now(),
    });
    if (!editandoTarea) setDatos(VACIO);
  };

  const campo =
    'mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
        {editandoTarea ? 'Editar tarea' : 'Nueva tarea'}
      </h2>

      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
        <input id="titulo" type="text" value={datos.titulo} onChange={cambiar('titulo')}
          placeholder="¿Qué necesitas hacer?" required className={campo} />
      </div>

      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea id="descripcion" value={datos.descripcion} onChange={cambiar('descripcion')}
          placeholder="Detalles adicionales (opcional)" rows="3" className={campo} />
      </div>

      <div>
        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha de vencimiento</label>
        <input id="fecha" type="date" value={datos.fechaVencimiento}
          onChange={cambiar('fechaVencimiento')} className={campo} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700">Prioridad</label>
          <select id="prioridad" value={datos.prioridad} onChange={cambiar('prioridad')} className={campo}>
            {PRIORIDADES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
          <select id="estado" value={datos.estado} onChange={cambiar('estado')} className={campo}>
            {ESTADOS.map((s) => <option key={s.valor} value={s.valor}>{s.etiqueta}</option>)}
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        {editandoTarea && (
          <button type="button" onClick={onCancelar}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
            Cancelar
          </button>
        )}
        <button type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
          {editandoTarea ? 'Guardar cambios' : 'Crear tarea'}
        </button>
      </div>
    </form>
  );
}