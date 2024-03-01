// mockingproducts.router.js
const { Router } = require('express');
const mockingProductsRouter = Router();
const generateProducts = require('../utils/mockingProducts');

mockingProductsRouter.get('/', async (req, res) => {
    const products = await generateProducts(); 
    
    res.json(products);
});

module.exports = mockingProductsRouter;
