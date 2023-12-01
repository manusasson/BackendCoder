const { Router } = require('express');
const router = Router();
const CartManager = require('../../managers/cartManagerFile');
const ProductManager = require('../../managers/productManagerFile');

const cartManager = new CartManager();
const productManager = new ProductManager();

// Ruta para listar los productos de un carrito por ID
router.get('/:id', async (req, res) => {
    try {
        const cartId = req.params.id;

        const cart = await cartManager.getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        // Obtener los productos del carrito
        const products = await productManager.getProducts();
        const cartProducts = cart.products.map(cartProduct => {
            const product = products.find(product => product.id == cartProduct.id);
            return { ...cartProduct, product };
        });

        res.json({ cartId, products: cartProducts });
    } catch (error) {
        console.error(`Error al obtener los productos del carrito: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para agregar un producto al carrito por ID de carrito y ID de producto
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const cart = await cartManager.getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const product = await productManager.getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const existingCartItem = cart.products.find(cartProduct => cartProduct.id == productId);
        if (existingCartItem) {
            // Si el producto ya existe en el carrito, incrementar la cantidad
            existingCartItem.quantity += 1;
        } else {
            // Si el producto no existe, agregarlo al carrito
            cart.products.push({ id: productId, quantity: 1 });
        }

        // Guardar el carrito actualizado
        await cartManager.updateCart(cartId, cart);

        res.json({ message: 'Producto agregado al carrito correctamente', cart });
    } catch (error) {
        console.error(`Error al agregar el producto al carrito: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;