// Capa de persistencia sobre localStorage (usuarios, sesión y tareas por usuario).

const CLAVE_USUARIOS = 'app_usuarios';
const CLAVE_SESION = 'app_sesion';
const claveTareas = (usuario) => `app_tareas_${usuario}`;

const leer = (clave, defecto) => {
  try {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : defecto;
  } catch {
    return defecto;
  }
};

// Hash SHA-256 de la contraseña para no guardarla en texto plano.
export async function hashContrasena(texto) {
  const datos = new TextEncoder().encode(texto);
  const hash = await crypto.subtle.digest('SHA-256', datos);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export const obtenerUsuarios = () => leer(CLAVE_USUARIOS, []);
export const guardarUsuarios = (usuarios) =>
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));

export const obtenerSesion = () => leer(CLAVE_SESION, null);
export const guardarSesion = (usuario) =>
  localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
export const borrarSesion = () => localStorage.removeItem(CLAVE_SESION);

export const obtenerTareas = (usuario) => leer(claveTareas(usuario), []);
export const guardarTareas = (usuario, tareas) =>
  localStorage.setItem(claveTareas(usuario), JSON.stringify(tareas));
