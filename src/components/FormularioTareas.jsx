import { useState } from 'react';

export default function FormularioTareas({ creandoTarea, editandoTarea, cancelEdit }) {
  const [titulo, setTitulo] = useState(editandoTarea ? editandoTarea.titulo : '');
  const [descripcion, setDescripcion] = useState(editandoTarea ? editandoTarea.descripcion : '');
  const [fechaVencimiento, setFechaVencimiento] = useState(editandoTarea ? editandoTarea.fechaVencimiento : '');
  const [prioridad, setPrioridad] = useState(editandoTarea ? editandoTarea.prioridad : 'Media');
  const [estado, setEstado] = useState(editandoTarea ? editandoTarea.estado : 'pendiente');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    creandoTarea({
      id: editandoTarea ? editandoTarea.id : Date.now(),
      titulo,
      descripcion,
      fechaVencimiento,
      prioridad,
      estado,
    });

    // Limpiar formulario
    setTitulo('');
    setDescripcion('');
    setFechaVencimiento('');
    setPrioridad('Media');
    setEstado('pendiente');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-xl shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
        {editandoTarea ? 'Editar Tarea' : 'Nueva Tarea'}
      </h2>

      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="¿Qué necesitas hacer?"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Detalles adicionales (opcional)"
          rows="3"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Fecha de vencimiento */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha de Vencimiento</label>
        <input
          type="date"
          value={fechaVencimiento}
          onChange={(e) => setFechaVencimiento(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Prioridad y Estado */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Prioridad</label>
          <select
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="pendiente">Pendiente</option>
            <option value="en-proceso">En Proceso</option>
            <option value="completada">Completada</option>
          </select>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-3 pt-4">
        {editandoTarea && cancelEdit && (
          <button
            type="button"
            onClick={cancelEdit}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
        >
          {editandoTarea ? 'Guardar Cambios' : 'Crear Tarea'}
        </button>
      </div>
    </form>
  );
}