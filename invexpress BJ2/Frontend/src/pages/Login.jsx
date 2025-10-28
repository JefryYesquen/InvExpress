import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/api';
import './Login.css'; // 👈 Asegúrate de crear este archivo CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Por favor ingrese correo y contraseña');
      return;
    }

    try {
      const response = await API.post('/usuarios/login', {
        email: email.trim(),
        password: password
      });

      const { token, user } = response.data;

      // Guardar token y rol
      localStorage.setItem('token', token);
      const rol = (user?.rol || user?.role || '').toLowerCase();
      localStorage.setItem('userRole', rol);

      authLogin({ token, user });

      // Redirección según rol
      if (rol === 'administrador') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Credenciales incorrectas';
      setErrorMsg(msg);
    }
  };

  return (
    <div className="recover-container">
      <form onSubmit={handleLogin} className="recover-card">
        <h2>InvExpress</h2>
        <p>Inicia sesión para acceder al sistema</p>

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>

        <div className="text-center mt-3">
          <Link to="/RecuperarContrasena" className="text-decoration-none">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
