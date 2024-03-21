const { Router } = require('express');
const { ProductController } = require('../controllers/products.controller');
const { authorization } = require('../passport-jwt/authorization.middleware');

const router = Router();
const {
    getProduct,
    getProducts,
    createProduct, 
    updateProduct,
    deleteProduct
} = new ProductController();

// Aplicar middleware de autorización en las rutas correspondientes
router.get('/', getProducts);
router.get('/:pid', getProduct);
router.post('/', authorization(['admin','premium']), createProduct); // Requiere rol de administrador para crear un producto
router.put('/:pid', authorization(['admin']), updateProduct); // Requiere rol de administrador para actualizar un producto
router.delete('/:pid', authorization(['admin']), deleteProduct); // Requiere rol de administrador para eliminar un producto

module.exports = router;