const { Router } = require('express');
const router = Router();
const ProductManager = require('../../managers/productManagerFile');

// Obtener un producto por su ID

const productManager = new ProductManager

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    const product = productManager.getProductById(productId);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    console.log("devolvio un producto")
    res.json(product);
});

// Otras rutas para diferentes operaciones
router.post('/', (req, res) => {
    res.send('post productos');
});

router.put('/', (req, res) => {
    res.send('put productos');
});

router.delete('/', (req, res) => {
    res.send('delete productos');
});

module.exports = router;