import { Router } from "express";
import * as productosController from "../Controller/productos.controller.js";

export const routerProductos = Router();

routerProductos.post("/", productosController.crearProducto);
routerProductos.get("/", productosController.obtenerProductos);
