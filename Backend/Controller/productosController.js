import express from "express";
import * as productosService from "../Service/productosService.js";
export const routerProductos = express.Router();

// Obtener todos los productos
routerProductos.get("/", async (req, res) => {
  try {
    const productos = await productosService.listarProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos", error: error.message });
  }
});

// Obtener un producto por ID
routerProductos.get("/:id", async (req, res) => {
  try {
    const producto = await productosService.obtenerProducto(req.params.id);
    res.json(producto);
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
});

// Crear producto
routerProductos.post("/", async (req, res) => {
  try {
    const nuevo = await productosService.crearProducto(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Actualizar producto
routerProductos.put("/:id", async (req, res) => {
  try {
    const actualizado = await productosService.actualizarProducto(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Eliminar producto
routerProductos.delete("/:id", async (req, res) => {
  try {
    const eliminado = await productosService.eliminarProducto(req.params.id);
    res.json({ mensaje: "Producto eliminado correctamente", eliminado });
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
});
