const db = require('../db');

exports.list = async (req, res, next) => {
  try {
    const r = await db.query(`SELECT p.*, c.nombre AS categoria FROM productos p LEFT JOIN categorias c ON p.categoria_id = c.id`);
    res.json({ products: r.rows });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const r = await db.query(`SELECT * FROM productos WHERE id = $1`, [id]);
    if (!r.rows.length) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(r.rows[0]);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { nombre, sku, categoria_id, unidad_id, precio, stock_actual, stock_minimo } = req.body;
    const r = await db.query(
      `INSERT INTO productos (nombre, sku, categoria_id, unidad_id, precio, stock_actual, stock_minimo) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [nombre, sku, categoria_id || null, unidad_id || null, precio || 0, stock_actual || 0, stock_minimo || 0]
    );
    res.status(201).json(r.rows[0]);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const fields = req.body;
    // Simplified: update specific columns if present
    const updates = [];
    const params = [];
    let idx = 1;
    for (const key of ['nombre','sku','categoria_id','unidad_id','precio','stock_actual','stock_minimo']) {
      if (key in fields) {
        updates.push(`${key} = $${idx}`);
        params.push(fields[key]);
        idx++;
      }
    }
    if (!updates.length) return res.status(400).json({ message: 'No hay campos para actualizar' });
    params.push(id);
    const sql = `UPDATE productos SET ${updates.join(', ')} WHERE id = $${idx} RETURNING *`;
    const r = await db.query(sql, params);
    res.json(r.rows[0]);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await db.query(`DELETE FROM productos WHERE id = $1`, [id]);
    res.json({ message: 'Producto eliminado' });
  } catch (err) { next(err); }
};
