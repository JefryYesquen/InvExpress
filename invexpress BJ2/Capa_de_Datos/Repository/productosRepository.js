import { pool } from "../databaseconnection.js";

export const buscarPorSKU = async (sku) => {
  const result = await db.query("SELECT * FROM productos WHERE sku = $1", [sku]);
  return result.rows[0];
};

export const existeCategoria = async (categoria_id) => {
  const result = await db.query("SELECT id FROM categorias WHERE id = $1", [categoria_id]);
  return result.rows.length > 0;
};

export const insertarProducto = async ({
  sku,
  nombre,
  descripcion,
  precio,
  stock_actual,
  categoria_id,
}) => {
  const result = await db.query(
    `INSERT INTO productos (sku, nombre, descripcion, precio, stock_actual, categoria_id, creado_en)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     RETURNING *`,
    [sku, nombre, descripcion, precio, stock_actual, categoria_id]
  );
  return result.rows[0];
};
