const Cart = require('../daos/Mongo/models/cart.model');
const Product = require('../models/product.model');

class CartController {
    async addToCart(req, res) {
        try {
            const { productId, quantity } = req.body;
            const userId = req.user._id; // Obtener el ID del usuario desde la solicitud

            // Verificar si el usuario ya tiene un carrito
            let cart = await Cart.findOne({ user: userId });

            if (!cart) {
                // Si el usuario no tiene un carrito, crear uno nuevo
                cart = new Cart({ user: userId, items: [] });
            }

            // Verificar si el producto ya está en el carrito
            const existingItemIndex = cart.items.findIndex(item => item.product.equals(productId));

            if (existingItemIndex !== -1) {
                // Si el producto ya está en el carrito, actualizar la cantidad
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                // Si el producto no está en el carrito, agregarlo
                const product = await Product.findById(productId);
                if (!product) {
                    return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
                }

                // Verificar si hay suficiente stock
                if (product.stock < quantity) {
                    return res.status(400).json({ status: 'error', message: 'No hay suficiente stock' });
                }

                // Agregar el nuevo producto al carrito
                cart.items.push({ product: productId, quantity });
            }

            // Guardar el carrito actualizado en la base de datos
            await cart.save();

            res.status(200).json({ status: 'success', message: 'Producto agregado al carrito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }
}

module.exports = CartController;