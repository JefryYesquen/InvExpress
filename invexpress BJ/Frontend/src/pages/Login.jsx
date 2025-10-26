import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/api';  // asegúrate de que esta instancia esté bien configurada (baseURL, interceptores, etc)

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');  // limpiar error previo

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

      // Guardar token en localStorage (u otro almacenamiento según convenga)
      localStorage.setItem('token', token);
      const rol = (user?.rol || user?.role || '').toLowerCase();
      localStorage.setItem('userRole', rol);

      // Actualizar estado de autenticación en el contexto
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
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <form onSubmit={handleLogin} className="bg-white p-4 rounded shadow" style={{ width: 320 }}>
        <h4 className="text-center mb-3">InvExpress</h4>

        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}

        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Correo"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
