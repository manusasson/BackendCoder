const faker = require('@faker-js/faker');
const Product = require('../daos/Mongo/models/products.model');

// Función para generar un producto falso
const generateProduct = () => {
    return new Product({
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        stock: faker.datatype.number({ min: 1, max: 100 }),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl()
    });
};

// Función para generar una lista de productos falsos
const generateProducts = async () => {
    let products = [];
    for (let i = 0; i < 100; i++) {
        products.push(generateProduct());
    }
    return products;
};

module.exports = {
    generateProducts: generateProducts
};
