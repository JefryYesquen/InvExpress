import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { pool } from "../../Capa_de_Datos/databaseconnection.js";

// 🔑 Configuración fija o mediante variables de entorno
const EMAIL_USER = process.env.EMAIL_USER || "tucorreo@gmail.com";         
const EMAIL_PASS = process.env.EMAIL_PASS || "contraseña_de_aplicación";   

// ✅ Recuperar contraseña
export const handleRecoverPassword = async (email) => {
  // 1️⃣ Verificar si el correo existe en usuarios
  const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
  if (result.rows.length === 0) throw new Error("Correo no registrado");

  const user = result.rows[0];

  // 2️⃣ Crear token válido por 15 minutos
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

  // 3️⃣ Configurar transporte SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  // 4️⃣ Enlace al frontend (puerto 5173)
  const link = `http://localhost:5173/restablecercontrasena/${token}`;

  // 5️⃣ Enviar correo
  await transporter.sendMail({
    from: `"Soporte InvExpress" <${EMAIL_USER}>`,
    to: email,
    subject: "Recuperación de contraseña",
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Hola ${user.nombre || ""}, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${link}" target="_blank">${link}</a>
      <p><small>El enlace es válido por 15 minutos.</small></p>
    `,
  });

  return "📨 Correo de recuperación enviado correctamente.";
};

// ✅ Restablecer contraseña
export const handleResetPassword = async (token, newPassword) => {
  try {
    // 1️⃣ Validar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2️⃣ Encriptar nueva contraseña
    const hashed = await bcrypt.hash(newPassword, 10);

    // 3️⃣ Guardar en base de datos
    await pool.query("UPDATE usuarios SET password_hash = $1 WHERE id = $2", [hashed, decoded.id]);

    return "✅ Contraseña restablecida con éxito.";
  } catch (error) {
    console.error("Error en resetPassword:", error.message);
    throw new Error("Token inválido o expirado");
  }
};
