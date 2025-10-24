const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const productsController = require('../controllers/products.controller');
const inventoryController = require('../controllers/inventory.controller');
const salesController = require('../controllers/sales.controller');
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Autenticación
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Usuarios
router.get('/users', authMiddleware.verifyToken, usersController.list);
router.get('/users/:id', authMiddleware.verifyToken, usersController.getById);

// Productos
router.get('/products', authMiddleware.verifyToken, productsController.list);
router.get('/products/:id', authMiddleware.verifyToken, productsController.getById);
router.post('/products', authMiddleware.verifyToken, productsController.create);
router.put('/products/:id', authMiddleware.verifyToken, productsController.update);
router.delete('/products/:id', authMiddleware.verifyToken, productsController.remove);

// Inventario
router.post('/inventory/movements', authMiddleware.verifyToken, inventoryController.createMovement);

// Ventas
router.post('/sales', authMiddleware.verifyToken, salesController.createSale);

module.exports = router;
