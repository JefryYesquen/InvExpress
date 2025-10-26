import express from "express";
import * as usuariosService from "../Service/usuariosService.js";
import { login } from "./auth.controller.js";


export const routerUsuarios = express.Router();

// Ruta de autenticación
routerUsuarios.post('/login', login);

// Obtener todos
routerUsuarios.get("/", async (req, res) => {
  try {
    const usuarios = await usuariosService.listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios", error: error.message });
  }
});

// Obtener uno por ID
routerUsuarios.get("/:id", async (req, res) => {
  try {
    const usuario = await usuariosService.obtenerUsuario(req.params.id);
    res.json(usuario);
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
});

// Crear usuario
routerUsuarios.post("/", async (req, res) => {
  try {
    const nuevo = await usuariosService.crearUsuario(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Actualizar usuario
routerUsuarios.put("/:id", async (req, res) => {
  try {
    const actualizado = await usuariosService.actualizarUsuario(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Eliminar usuario
routerUsuarios.delete("/:id", async (req, res) => {
  try {
    const eliminado = await usuariosService.eliminarUsuario(req.params.id);
    res.json({ mensaje: "Usuario eliminado correctamente", eliminado });
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
});

