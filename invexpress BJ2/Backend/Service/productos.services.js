import { pool } from "../../Capa_de_Datos/databaseconnection.js";

// Crear producto
export const crearProducto = async (producto) => {
  const { sku, nombre, precio, stock_actual, categoria_id, unidad_id } = producto;

  // Verificar que el SKU no exista
  const skuExist = await pool.query("SELECT id FROM productos WHERE sku = $1", [sku]);
  if (skuExist.rows.length > 0) {
    throw new Error("El SKU ya existe");
  }

  const result = await pool.query(
    `INSERT INTO productos (sku, nombre, precio, stock_actual, categoria_id, unidad_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [sku, nombre, precio, stock_actual, categoria_id, unidad_id]
  );

  return result.rows[0];
};

// Obtener todos los productos
export const obtenerProductos = async () => {
  const result = await pool.query(
    `SELECT p.*, c.nombre as categoria_nombre, u.nombre as unidad_nombre
     FROM productos p
     LEFT JOIN categorias c ON p.categoria_id = c.id
     LEFT JOIN unidades_medida u ON p.unidad_id = u.id
     ORDER BY p.id DESC`
  );
  return result.rows;
};
