const { Router } = require('express');
const router = Router();
const ProductManager = require('../../managers/productManagerFile');
const  {io}  = require('../../server');


// Obtener un producto por su ID

const productManager = new ProductManager

router.get('/:id?', async (req, res) => {
    try {
        // Verifica si se proporciona un ID en la solicitud
        const productId = req.params.id;

        if (productId) {
            // Si hay un ID, obtén el producto por ese ID
            const product = await productManager.getProductById(productId);

            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            console.log("devolvió un producto");
            return res.json(product);
        } else {
            // Si no se proporciona un ID, obtén todos los productos
            const products = await productManager.getProducts();
            return res.json(products);
        }
    } catch (error) {
        console.error(`Error al obtener el producto(s): ${error.message}`);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//RUTA PARA POST
router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            code,
            price,
            category,
            thumbnails,
            stock,
            status = true // Status es true por defecto
        } = req.body;

        // Verificar campos obligatorios
        if (!title || !description || !code || !price || !category || !thumbnails) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios, excepto thumbnails' });
        }

        // Autogenerar ID (puedes implementar tu lógica aquí)
        const newProductId = productManager.generateUniqueId();

        const newProduct = {
            id: newProductId,
            title,
            description,
            code,
            price,
            category,
            thumbnails,
            stock: stock || 0, // Si stock no se proporciona, establecer a 0
            status
        };

        // Agregar el nuevo producto
        await productManager.addProduct(newProduct);
        const updatedProducts = await productManager.getProducts();

    //Emitir un mensaje de que se agrego un producto en socket
       io.emit('updateRealTimeList', updatedProducts);
    ///Emitir un mensaje de que se agrego un producto en sockets


        res.json({ message: 'Producto agregado correctamente', product: newProduct });
    } catch (error) {
        console.error(`Error al agregar un nuevo producto: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para actualizar un producto por ID
router.put('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProductData = req.body;

        const existingProduct = await productManager.getProductById(productId);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Actualizar los campos del producto
        const updatedProduct = { ...existingProduct, ...updatedProductData };

        // Guardar el producto actualizado
        await productManager.updateProduct(productId, updatedProduct);

        res.json({ message: 'Producto actualizado correctamente', product: updatedProduct });
    } catch (error) {
        console.error(`Error al actualizar el producto: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        const existingProduct = await productManager.getProductById(productId);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Eliminar el producto
        await productManager.deleteProduct(productId);

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar el producto: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;