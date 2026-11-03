import { useState } from 'react';
import Autenticacion from './components/Autenticacion';
import FormularioTareas from './components/FormularioTareas';

export default function App() {
  const [usuarioActual, setUsuarioActual] = useState(null);
  
  // Cargar tareas del usuario
  const [tareas, setTareas] = useState([]);
  const [editandoTarea, setEditandoTarea] = useState(null);

  const manejarLogin = (nombre) => {
    setUsuarioActual(nombre);
    const tareasGuardadas = localStorage.getItem(`app_tareas_${nombre}`);
    setTareas(tareasGuardadas ? JSON.parse(tareasGuardadas) : []);
  };

  // Guardar tareas
  const guardarTareasNuevas = (nuevasTareas) => {
    setTareas(nuevasTareas);
    if (usuarioActual) {
      localStorage.setItem(`app_tareas_${usuarioActual}`, JSON.stringify(nuevasTareas));
    }
  };

  const handleCrearOEditarTarea = (tareaData) => {
    if (editandoTarea) {
      const actualizadas = tareas.map((t) => (t.id === tareaData.id ? tareaData : t));
      guardarTareasNuevas(actualizadas);
      setEditandoTarea(null);
    } else {
      guardarTareasNuevas([tareaData, ...tareas]);
    }
  };

  const eliminarTarea = (id) => {
    const filtradas = tareas.filter((t) => t.id !== id);
    guardarTareasNuevas(filtradas);
    if (editandoTarea && editandoTarea.id === id) {
      setEditandoTarea(null);
    }
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
    setTareas([]);
    setEditandoTarea(null);
  };

  // Mostrar autenticación
  if (!usuarioActual) {
    return <Autenticacion onLogin={manejarLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Barra de navegación superior */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">📋 Gestor de Tareas</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Hola, <strong className="text-gray-800">{usuarioActual}</strong>
            </span>
            <button
              onClick={cerrarSesion}
              className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna Izquierda: Formulario para Crear / Editar */}
        <div className="md:col-span-1">
          <FormularioTareas
            creandoTarea={handleCrearOEditarTarea}
            editandoTarea={editandoTarea}
            cancelEdit={() => setEditandoTarea(null)}
          />
        </div>

        {/* Columna Derecha: Listado general */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Tus Tareas</h2>
              <span className="text-sm text-gray-500 font-medium">
                Total: {tareas.length}
              </span>
            </div>

            {/* Lista de Tareas */}
            {tareas.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No hay tareas creadas aún.</p>
            ) : (
              <div className="space-y-4">
                {tareas.map((tarea) => (
                  <div
                    key={tarea.id}
                    className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:shadow-sm transition-shadow bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span
                          className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-2 ${
                            tarea.prioridad === 'Alta'
                              ? 'bg-red-100 text-red-700'
                              : tarea.prioridad === 'Media'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {tarea.prioridad}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-800">{tarea.titulo}</h3>
                      </div>
                      <span className="text-xs uppercase font-bold tracking-wider text-gray-500 bg-white px-2 py-1 rounded border">
                        {tarea.estado}
                      </span>
                    </div>

                    {tarea.descripcion && (
                      <p className="text-sm text-gray-600 mt-2">{tarea.descripcion}</p>
                    )}

                    {tarea.fechaVencimiento && (
                      <p className="text-xs text-gray-500 mt-3">
                        📅 Vence: {tarea.fechaVencimiento}
                      </p>
                    )}

                    <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => setEditandoTarea(tarea)}
                        className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded hover:bg-indigo-100 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarTarea(tarea.id)}
                        className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}