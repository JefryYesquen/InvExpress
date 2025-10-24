const db = require('../db');

exports.list = async (req, res, next) => {
  try {
    const r = await db.query('SELECT id, nombre, email, rol FROM usuarios ORDER BY id ASC');
    res.json(r.rows);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const r = await db.query('SELECT id, nombre, email, rol FROM usuarios WHERE id = $1', [id]);
    if (r.rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(r.rows[0]);
  } catch (err) {
    next(err);
  }
};
