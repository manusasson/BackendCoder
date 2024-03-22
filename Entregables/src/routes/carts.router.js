const express = require('express');
const router = express.Router();
const { authorization } = require('../passport-jwt/authorization.middleware');
const CartController = require('../controllers/cart.controller');

// Controlador para el carrito
const cartController = new CartController();

// Middleware de autorización para la ruta de compra del carrito
router.get('/', authorization(['user']), cartController.getCart);
router.post('/:cid/purchase', authorization(['user']), cartController.addToCart);
router.put('/cart/items/:itemId', authorization(['user']), cartController.updateCartItem);
router.delete('/cart/items/:itemId', authorization(['user']), cartController.deleteCartItem);
module.exports = router;