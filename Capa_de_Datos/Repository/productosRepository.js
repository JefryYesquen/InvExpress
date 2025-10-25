import { pool } from "../databaseconnection.js";

export async function obtenerTodos() {
  const query = `
    SELECT p.id, p.nombre, c.nombre AS categoria, u.nombre AS unidad,
           p.stock_actual, p.precio
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN unidades_medida u ON p.unidad_id = u.id
    ORDER BY p.id;
  `;
  const result = await pool.query(query);
  return result.rows;
}

export async function obtenerPorId(id) {
  const query = `SELECT * FROM productos WHERE id = $1;`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

export async function crearProducto({ nombre, categoria_id, unidad_id, stock_minimo, stock_actual, precio }) {
  const query = `
    INSERT INTO productos (nombre, categoria_id, unidad_id, stock_minimo, stock_actual, precio)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [nombre, categoria_id, unidad_id, stock_minimo, stock_actual, precio];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function actualizarProducto(id, { nombre, categoria_id, unidad_id, stock_minimo, stock_actual, precio }) {
  const query = `
    UPDATE productos
    SET nombre = $1, categoria_id = $2, unidad_id = $3,
        stock_minimo = $4, stock_actual = $5, precio = $6
    WHERE id = $7
    RETURNING *;
  `;
  const values = [nombre, categoria_id, unidad_id, stock_minimo, stock_actual, precio, id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function eliminarProducto(id) {
  const query = `DELETE FROM productos WHERE id = $1 RETURNING *;`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}
