const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const TicketService = require('../services/ticket.service');
const ticketService = new TicketService();

class CartController {
    async purchaseCart(req, res) {
        try {
            // Obtener el ID del carrito desde los parámetros de la ruta
            const { cid } = req.params;

            // Obtener el carrito de la base de datos
            const cart = await Cart.findById(cid).populate('items.product');

            // Verificar si el carrito existe
            if (!cart) {
                return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
            }

            // Verificar si el carrito está vacío
            if (cart.items.length === 0) {
                return res.status(400).json({ status: 'error', message: 'El carrito está vacío' });
            }

            // Crear un array para almacenar los IDs de los productos no comprados
            const productsNotPurchased = [];

            // Verificar el stock de cada producto en el carrito
            for (const item of cart.items) {
                const product = item.product;
                if (product.stock < item.quantity) {
                    productsNotPurchased.push(product._id);
                }
            }

            // Si hay suficiente stock para todos los productos en el carrito, proceder con la compra
            if (productsNotPurchased.length === 0) {
                const newTicket = await ticketService.createTicket(ticketCode, totalAmount, req.user.email);
                // Actualizar el carrito para contener solo los productos que no se pudieron comprar
                if (productsNotPurchased.length > 0) {
                    await Cart.findByIdAndUpdate(cid, { $pull: { items: { product: { $in: productsNotPurchased } } } });
                }
                return res.status(200).json({ status: 'success', message: 'Compra realizada con éxito' });
            } else {
                // Enviar una respuesta indicando los productos que no pudieron ser agregados al carrito
                return res.status(400).json({ status: 'error', message: 'Algunos productos no estaban disponibles', productsNotPurchased });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }
}

module.exports = CartController;