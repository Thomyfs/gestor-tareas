import { useState } from 'react';
import {
  hashContrasena,
  obtenerUsuarios,
  guardarUsuarios,
} from '../utils/almacenamiento';

export default function Autenticacion({ onLogin }) {
  const [registrando, setRegistrando] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cambiarModo = () => {
    setRegistrando(!registrando);
    setError('');
    setNombreUsuario('');
    setContrasena('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = nombreUsuario.trim();
    if (!usuario || !contrasena.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    const usuarios = obtenerUsuarios();
    const hash = await hashContrasena(contrasena);

    if (registrando) {
      if (contrasena.length < 4) {
        setError('La contraseña debe tener al menos 4 caracteres.');
        return;
      }
      if (usuarios.some((u) => u.nombreUsuario.toLowerCase() === usuario.toLowerCase())) {
        setError('El usuario ya existe.');
        return;
      }
      guardarUsuarios([...usuarios, { nombreUsuario: usuario, contrasena: hash }]);
      setRegistrando(false);
      setNombreUsuario('');
      setContrasena('');
      setError('');
      setExito('¡Registro exitoso! Ahora inicia sesión.');
    } else {
      const valido = usuarios.find(
        (u) => u.nombreUsuario === usuario && u.contrasena === hash
      );
      if (valido) {
        onLogin(valido.nombreUsuario);
      } else {
        setExito('');
        setError('Usuario o contraseña incorrectos.');
      }
    }
  };

  const input =
    'w-full rounded-md border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center">📋 Gestor de Tareas</h1>
        <h2 className="mt-1 mb-6 text-center text-gray-500">
          {registrando ? 'Crear una cuenta' : 'Iniciar sesión'}
        </h2>

        {error && (
          <div role="alert" className="mb-4 p-3 rounded-md bg-red-100 text-red-800 text-sm text-center">
            {error}
          </div>
        )}
        {exito && (
          <div role="status" className="mb-4 p-3 rounded-md bg-green-100 text-green-800 text-sm text-center">
            {exito}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-600 mb-1">
              Usuario
            </label>
            <input
              id="usuario"
              type="text"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              className={input}
              placeholder="Ingresa tu usuario"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              id="contrasena"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className={input}
              placeholder="Ingresa tu contraseña"
              autoComplete={registrando ? 'new-password' : 'current-password'}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            {registrando ? 'Registrarse' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          {registrando ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
          <button
            type="button"
            onClick={cambiarModo}
            className="ml-2 font-semibold text-indigo-600 hover:underline"
          >
            {registrando ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
}
