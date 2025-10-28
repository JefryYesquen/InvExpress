import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RestablecerContrasena.css";

function RestablecerContrasena() {
  const { token } = useParams();
  const navigate = useNavigate(); // 👈 Hook para redirigir
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMensaje("⚠️ Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/auth/reset/${token}`, { password });
      setMensaje(res.data.message || "✅ Contraseña restablecida correctamente");

      // 👇 Espera 1 segundos y redirige al login
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setMensaje(err.response?.data?.message || "❌ Error al restablecer la contraseña");
    }
  };

  return (
    <div className="recover-container">
      <div className="recover-card">
        <h2>Restablecer contraseña</h2>
        <p>Ingresa tu nueva contraseña y confírmala para continuar.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button type="submit">Cambiar contraseña</button>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
}

export default RestablecerContrasena;