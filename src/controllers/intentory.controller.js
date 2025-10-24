const db = require('../db');

exports.createMovement = async (req, res, next) => {
  try {
    const { producto_id, cantidad, tipo_movimiento, referencia } = req.body;
    const usuario_id = req.user.id;

    if (!producto_id || !cantidad || !tipo_movimiento) return res.status(400).json({ message: 'Faltan campos' });
    const r = await db.query(
      `INSERT INTO inventario (producto_id, cantidad, tipo_movimiento, referencia, usuario_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [producto_id, cantidad, tipo_movimiento, referencia || null, usuario_id]
    );
    res.status(201).json(r.rows[0]);
  } catch (err) { next(err); }
};
