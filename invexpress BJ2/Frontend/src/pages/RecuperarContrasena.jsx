import { useState } from "react";
import axios from "axios";
import "./RecuperarContrasena.css";

function RecuperarContrasena() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      const res = await axios.post("http://localhost:3000/auth/recover", { email });
      setMensaje(res.data.message);
    } catch (err) {
      setMensaje(err.response?.data?.message || "Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recover-container">
      <div className="recover-card">
        <h2>Recuperar contraseña</h2>
        <p>Ingresa tu correo para recibir un enlace de restablecimiento.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
}

export default RecuperarContrasena;
