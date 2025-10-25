import * as usuariosRepository from "../../Capa_de_Datos/Repository/usuariosRepository.js";

export const listarUsuarios = async () => {
  return await usuariosRepository.obtenerTodos();
};

export const obtenerUsuario = async (id) => {
  const usuario = await usuariosRepository.obtenerPorId(id);
  if (!usuario) throw new Error("Usuario no encontrado");
  return usuario;
};

export const crearUsuario = async (datos) => {
  if (!datos.nombre || !datos.email || !datos.password_hash) {
    throw new Error("Nombre, email y contraseña son obligatorios");
  }
  return await usuariosRepository.crearUsuario(datos);
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
