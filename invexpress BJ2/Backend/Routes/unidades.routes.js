import express from 'express';
import { pool } from '../../Capa_de_Datos/databaseconnection.js';

export const routerUnidades = express.Router();

// ✅ GET /api/unidades
routerUnidades.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, abreviatura FROM unidades_medida ORDER BY nombre'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener unidades de medida:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});
