import { useState } from 'react';
import { LogOut } from 'lucide-react';
import Autenticacion from './components/Autenticacion';
import FormularioTareas from './components/FormularioTareas';
import FiltrosTareas from './components/FiltrosTareas';
import TableroTareas from './components/TableroTareas';
import useTareas from './hooks/useTareas';
import { obtenerSesion, guardarSesion, borrarSesion } from './utils/almacenamiento';

// Panel privado del usuario autenticado. Se monta solo cuando hay sesión,
// por lo que useTareas siempre recibe un usuario válido.
function Panel({ usuario, onCerrarSesion }) {
  const t = useTareas(usuario);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">📋 Gestor de Tareas</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Hola, <strong className="text-gray-800">{usuario}</strong>
            </span>
            <button onClick={onCerrarSesion}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors">
              <LogOut size={14} /> Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-1 lg:sticky lg:top-4">
          <FormularioTareas
            key={t.editando ? t.editando.id : 'nueva'}
            editandoTarea={t.editando}
            onGuardar={t.guardar}
            onCancelar={() => t.setEditando(null)}
          />
        </div>

        <div className="lg:col-span-3 space-y-4">
          <FiltrosTareas
            filtros={t.filtros}
            onCambiar={t.setFiltros}
            onLimpiar={t.limpiarFiltros}
            hayFiltros={t.hayFiltros}
          />

          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-bold text-gray-800">Tus tareas</h2>
            <span className="text-sm text-gray-500">
              Mostrando {t.tareasFiltradas.length} de {t.tareas.length}
            </span>
          </div>

          {t.tareas.length === 0 ? (
            <p className="text-center text-gray-500 py-12 bg-white rounded-xl shadow-md">
              No hay tareas creadas aún. ¡Crea la primera!
            </p>
          ) : t.tareasFiltradas.length === 0 ? (
            <p className="text-center text-gray-500 py-12 bg-white rounded-xl shadow-md">
              Ninguna tarea coincide con la búsqueda o los filtros.
            </p>
          ) : (
            <TableroTareas
              tareas={t.tareasFiltradas}
              onEditar={t.setEditando}
              onEliminar={t.eliminar}
              onCompletar={t.completar}
              onReabrir={t.reabrir}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(() => obtenerSesion());

  const iniciarSesion = (nombre) => {
    guardarSesion(nombre);
    setUsuario(nombre);
  };

  const cerrarSesion = () => {
    borrarSesion();
    setUsuario(null);
  };

  if (!usuario) return <Autenticacion onLogin={iniciarSesion} />;
  return <Panel key={usuario} usuario={usuario} onCerrarSesion={cerrarSesion} />;
}
