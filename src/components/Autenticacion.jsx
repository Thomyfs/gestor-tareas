import { useState } from 'react';

export default function Auth({ onLogin }) {
  const [registrando, setRegistrando] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombreUsuario.trim() || !contrasena.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('app_usuarios')) || [];

    if (registrando) {
      const userExists = usuarios.find((u) => u.nombreUsuario === nombreUsuario);
      if (userExists) {
        setError('El usuario ya existe.');
        return;
      }
      const usuarioNuevo = { nombreUsuario, contrasena };
      usuarios.push(usuarioNuevo);
      localStorage.setItem('app_usuarios', JSON.stringify(usuarios));
      alert('¡Registro exitoso! Ahora inicia sesión.');
      setRegistrando(false);
      setNombreUsuario('');
      setContrasena('');
      setError('');
    } else {
      const usuarioValido = usuarios.find(
        (u) => u.nombreUsuario === nombreUsuario && u.contrasena === contrasena
      );
      if (usuarioValido) {
        onLogin(nombreUsuario);
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {registrando ? 'Crear una cuenta' : 'Iniciar sesión'}
        </h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Usuario</label>
            <input
              type="text"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              style={styles.input}
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={styles.input}
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button type="submit" style={styles.button}>
            {registrando ? 'Registrarse' : 'Entrar'}
          </button>
        </form>

        <p style={styles.switchText}>
          {registrando ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
          <button
            type="button"
            onClick={() => {
              setRegistrando(!registrando);
              setError('');
              setNombreUsuario('');
              setContrasena('');
            }}
            style={styles.switchButton}
          >
            {registrando ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
}

// Estilos básicos en línea para que luzca ordenado al instante
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f3f4f6',
    fontFamily: 'sans-serif',
  },
  card: {
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    color: '#1f2937',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4b5563',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    marginTop: '0.5rem',
    padding: '0.75rem',
    backgroundColor: '#2563eb',
    color: '#white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  error: {
    marginBottom: '1rem',
    padding: '0.75rem',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    borderRadius: '4px',
    fontSize: '0.875rem',
    textAlign: 'center',
  },
  switchText: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  switchButton: {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontWeight: '600',
    cursor: 'pointer',
    marginLeft: '0.5rem',
    padding: 0,
    fontSize: '0.875rem',
  },
};