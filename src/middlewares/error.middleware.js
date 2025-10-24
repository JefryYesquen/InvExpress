module.exports = (err, req, res, next) => {
  console.error('❌ Error interno:', err);
  res.status(500).json({
    message: 'Error interno del servidor',
    detalle: err.message,
  });
};
