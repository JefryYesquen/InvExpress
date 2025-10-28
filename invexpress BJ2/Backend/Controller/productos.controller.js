import * as productosService from "../Service/productos.services.js";

export const crearProducto = async (req, res) => {
  try {
    const { sku, nombre, precio, stock_actual, categoria_id, unidad_id } = req.body;

    if (!sku || !nombre || !precio || !stock_actual || !categoria_id || !unidad_id) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const nuevoProducto = await productosService.crearProducto(req.body);
    res.status(201).json(nuevoProducto);
  } catch (err) {
    console.error("Error al crear producto:", err.message);
    res.status(400).json({ message: err.message });
  }
};

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await productosService.obtenerProductos();
    res.status(200).json(productos);
  } catch (err) {
    console.error("Error al obtener productos:", err.message);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};
