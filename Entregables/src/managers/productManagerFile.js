const fs = require('fs');

const path = '../src/MockDB/Productos.json';

class ProductManagerFile {
    constructor() {
        this.path = path;
    }

    readFile = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error al leer el archivo: ${error.message}`);
            return [];
        }
    }

    generateUniqueId = (products) => {
        // Verificar si 'products' es undefined o nulo
        if (!products || products.length === 0) {
            return 1; // Si no hay productos, comenzar desde 1
        }

        // Obtener el último ID existente
        const lastId = products[products.length - 1].id;
        // Generar un nuevo ID único (puedes ajustar la lógica según tus necesidades)
        const newId = lastId + 1;
        return newId;
    }

    getProducts = async () => {
        try {
            return await this.readFile();
        } catch (error) {
            return 'No se hay productos';
        }
    }

    getProductById = async (id) => {
        try {
            const products = await this.readFile();
            const product = products.find(product => product.id == id);
            return product;
        } catch (error) {
            console.error(`Error al obtener el producto por ID: ${error.message}`);
            throw error;
        }
    }

    addProduct = async (newItem) => {
        try {
            let products = await this.readFile();
            const productDb = products.find(product => product.code === newItem.code);
            if (productDb) {
                return 'Se encuentra el producto';
            }

            const newId = this.generateUniqueId(products);
            newItem.id = newId;

            if (products.length === 0) {
                products.push(newItem);
            } else {
                products = [...products, newItem];
            }

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
            return 'Producto agregado';
        } catch (error) {
            return new Error(error);
        }
    }
}

module.exports = ProductManagerFile;