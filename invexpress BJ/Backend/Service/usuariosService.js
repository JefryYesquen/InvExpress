import * as usuariosRepository from "../../Capa_de_Datos/Repository/usuariosRepository.js";
import bcrypt from 'bcryptjs';
import { pool } from "../../Capa_de_Datos/databaseconnection.js";

export const listarUsuarios = async () => {
  return await usuariosRepository.obtenerTodos();
};

export const obtenerUsuario = async (id) => {
  const usuario = await usuariosRepository.obtenerPorId(id);
  if (!usuario) throw new Error("Usuario no encontrado");
  return usuario;
};

// datos: { nombre, email, password OR password_hash, rol (nombre o id) }
export const crearUsuario = async (datos) => {
  if (!datos.nombre || !datos.email || (!datos.password && !datos.password_hash)) {
    throw new Error("Nombre, email y contraseña son obligatorios");
  }

  // Si nos pasan password plano, hashearlo
  let password_hash = datos.password_hash;
  if (datos.password) {
    const salt = await bcrypt.genSalt(10);
    password_hash = await bcrypt.hash(datos.password, salt);
  }

  // Resolver rol_id si recibimos nombre de rol
  let rol_id = datos.rol_id;
  if (!rol_id && datos.rol) {
    if (typeof datos.rol === 'number') {
      rol_id = datos.rol;
    } else {
      const rolResult = await pool.query('SELECT id FROM roles WHERE nombre ILIKE $1 LIMIT 1', [datos.rol]);
      if (rolResult.rows.length > 0) rol_id = rolResult.rows[0].id;
    }
  }

  const payload = { nombre: datos.nombre, email: datos.email, password_hash };
  if (rol_id) payload.rol_id = rol_id;

  return await usuariosRepository.crearUsuario(payload);
};

export const actualizarUsuario = async (id, datos) => {
  const existente = await usuariosRepository.obtenerPorId(id);
  if (!existente) throw new Error("Usuario no encontrado");
  return await usuariosRepository.actualizarUsuario(id, datos);
};

export const eliminarUsuario = async (id) => {
  const eliminado = await usuariosRepository.eliminarUsuario(id);
  if (!eliminado) throw new Error("Usuario no encontrado o ya eliminado");
  return eliminado;
};
