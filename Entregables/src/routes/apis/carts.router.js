const { Router } = require('express');
const router = Router();
const CartManagerFile = require('../../managers/cartManagerFile');

const cartManager = new CartManagerFile();

// Obtener productos de un carrito por ID
router.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCartById(cartId);

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        res.json(cart.products);
    } catch (error) {
        console.error(`Error al obtener los productos del carrito: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        // Obtener el carrito
        const cart = await cartManager.getCartById(cartId);

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.products.find(product => product.id == productId);

        if (existingProduct) {
            // Si el producto ya existe, incrementar la cantidad
            existingProduct.quantity += 1;
        } else {
            // Si el producto no existe, agregarlo al carrito con cantidad 1
            cart.products.push({ id: productId, quantity: 1 });
        }

        // Actualizar el carrito
        await cartManager.updateCart(cartId, cart);

        res.json({ message: 'Producto agregado al carrito' });
    } catch (error) {
        console.error(`Error al agregar el producto al carrito: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
       
        const newCart = {
            id: null, // Deja que el sistema genere un ID único
            products: [],
        };

        // Guardar el nuevo carrito
        const cartId = await cartManager.addCart(newCart);

        res.json({ cartId });
    } catch (error) {
        console.error(`Error al crear un nuevo carrito: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        // obtener más detalles del producto desde el cuerpo de la solicitud si es necesario
        // const productDetails = req.body;

        
        const result = await cartManager.addProductToCart(cartId, productId);

        if (result.success) {
            res.json({ message: 'Producto agregado al carrito con éxito', cart: result.cart });
        } else {
            res.status(404).json({ error: 'No se pudo agregar el producto al carrito' });
        }
    } catch (error) {
        console.error(`Error al agregar producto al carrito: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
module.exports = router;