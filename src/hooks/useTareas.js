import { useState, useMemo } from 'react';
import { obtenerTareas, guardarTareas } from '../utils/almacenamiento';

const FILTROS_INICIALES = { busqueda: '', estado: 'todos', prioridad: 'todas' };

// Hook personalizado: encapsula el CRUD de tareas, la búsqueda y los filtros.
export default function useTareas(usuario) {
  const [tareas, setTareas] = useState(() => obtenerTareas(usuario));
  const [editando, setEditando] = useState(null);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  const actualizar = (nuevas) => {
    setTareas(nuevas);
    guardarTareas(usuario, nuevas);
  };

  const guardar = (datos) => {
    if (editando) {
      actualizar(tareas.map((t) => (t.id === datos.id ? datos : t)));
      setEditando(null);
    } else {
      actualizar([datos, ...tareas]);
    }
  };

  const eliminar = (id) => {
    actualizar(tareas.filter((t) => t.id !== id));
    if (editando?.id === id) setEditando(null);
  };

  const completar = (id) =>
    actualizar(tareas.map((t) => (t.id === id ? { ...t, estado: 'completada' } : t)));

  const reabrir = (id) =>
    actualizar(tareas.map((t) => (t.id === id ? { ...t, estado: 'pendiente' } : t)));

  const tareasFiltradas = useMemo(() => {
    const texto = filtros.busqueda.trim().toLowerCase();
    return tareas.filter((t) => {
      const coincideTexto =
        !texto ||
        t.titulo.toLowerCase().includes(texto) ||
        (t.descripcion || '').toLowerCase().includes(texto);
      const coincideEstado = filtros.estado === 'todos' || t.estado === filtros.estado;
      const coincidePrioridad = filtros.prioridad === 'todas' || t.prioridad === filtros.prioridad;
      return coincideTexto && coincideEstado && coincidePrioridad;
    });
  }, [tareas, filtros]);

  const hayFiltros = JSON.stringify(filtros) !== JSON.stringify(FILTROS_INICIALES);

  return {
    tareas,
    tareasFiltradas,
    editando,
    setEditando,
    filtros,
    setFiltros,
    limpiarFiltros: () => setFiltros(FILTROS_INICIALES),
    hayFiltros,
    guardar,
    eliminar,
    completar,
    reabrir,
  };
}
