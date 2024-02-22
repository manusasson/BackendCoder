const express = require('express');
const router = express.Router();
const { authorization } = require('../authorizationMiddleware');
const CartController = require('../controllers/cart.controller');

// Controlador para el carrito
const cartController = new CartController();

// Middleware de autorización para la ruta de compra del carrito
router.post('/:cid/purchase', authorization(['user']), cartController.purchaseCart);

module.exports = router;