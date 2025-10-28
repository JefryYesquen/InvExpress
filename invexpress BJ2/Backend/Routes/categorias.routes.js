import express from 'express';
import { pool } from '../../Capa_de_Datos/databaseconnection.js';

export const routerCategorias = express.Router();

// ✅ GET /api/categorias
routerCategorias.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre FROM categorias ORDER BY nombre'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});
