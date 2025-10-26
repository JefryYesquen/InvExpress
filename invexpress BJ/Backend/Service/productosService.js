import * as productosRepository from "../../Capa_de_Datos/Repository/productosRepository.js";

export const listarProductos = async () => {
  return await productosRepository.obtenerTodos();
};

export const obtenerProducto = async (id) => {
  const producto = await productosRepository.obtenerPorId(id);
  if (!producto) {
    throw new Error("Producto no encontrado");
  }
  return producto;
};
export const crearProducto = async (datos) => {
  if (!datos.nombre || !datos.precio) {
    throw new Error("El nombre y el precio son obligatorios");
  }
  return await productosRepository.crearProducto(datos);
};

export const actualizarProducto = async (id, datos) => {
  const productoExistente = await productosRepository.obtenerPorId(id);
  if (!productoExistente) throw new Error("Producto no encontrado");
  return await productosRepository.actualizarProducto(id, datos);
};

export const eliminarProducto = async (id) => {
  const producto = await productosRepository.eliminarProducto(id);
  if (!producto) throw new Error("Producto no encontrado o ya eliminado");
  return producto;
};
