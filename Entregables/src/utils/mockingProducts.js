// mockingProducts.js
const {faker} = require('@faker-js/faker');
const { productsModel } = require('../daos/Mongo/models/products.model');


const generateProduct = async () => {
    const productData = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        thumbnail: faker.image.url(),
        stock: faker.number.int({ min: 1, max: 100 }),
        category: faker.commerce.department()
    };

    // Crear una instancia del modelo de productos con los datos generados
    const productInstance = new productsModel(productData);

    // Guardar el producto en la base de datos
    try {
        const savedProduct = await productInstance.save();
        return savedProduct;
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        throw error;
    }
};

// Función para generar una lista de productos falsos
const generateProducts = async () => {
    let products = [];
    for (let i = 0; i < 100; i++) {
        const product = await generateProduct();
        products.push(product);
    }
    return products;
};

module.exports = generateProducts; // Exportar como una función