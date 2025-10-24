const db = require('../db');

exports.createSale = async (req, res, next) => {
  const client = await db.pool.connect();
  try {
    const { codigo, cliente_nombre, detalles } = req.body;
    // detalles = [{ producto_id, cantidad, precio_unitario }, ...]
    if (!detalles || !Array.isArray(detalles) || detalles.length === 0) return res.status(400).json({ message: 'Detalles inválidos' });

    await client.query('BEGIN');

    const total = detalles.reduce((s, d) => s + (d.cantidad * d.precio_unitario), 0);
    const rSale = await client.query(
      `INSERT INTO ventas (codigo, cliente_nombre, total, usuario_id) VALUES ($1,$2,$3,$4) RETURNING id`,
      [codigo, cliente_nombre || null, total, req.user.id]
    );
    const venta_id = rSale.rows[0].id;

    for (const d of detalles) {
      await client.query(
        `INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario) VALUES ($1,$2,$3,$4)`,
        [venta_id, d.producto_id, d.cantidad, d.precio_unitario]
      );
      // trigger en init.sql reducirá stock_actual
    }

    await client.query('COMMIT');
    res.status(201).json({ venta_id, total });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
};
