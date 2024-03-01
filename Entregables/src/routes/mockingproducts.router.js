const { Router } = require('express');
const mockingProductsRouter = Router();
const { generateProducts } = require('../utils/mockingProducts');

mockingProductsRouter.get('/', async (req, res) => {
    try {
        const products = await generateProducts();
        res.json(products);
    } catch (error) {
        console.error('Error al generar productos falsos:', error);
        res.status(500).json({ error: 'Error al generar productos falsos' });
    }
});

module.exports = mockingProductsRouter;
