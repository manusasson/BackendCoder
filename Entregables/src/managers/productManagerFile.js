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

    writeFile = async (data) => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            console.error(`Error al escribir en el archivo: ${error.message}`);
            throw error;
        }
    }

    generateUniqueId = (products) => {
         // Utilizando el operador ternario para verificar si 'products' es undefined o nulo
         const lastId = products && products.length ? products[products.length - 1].id : 0;
         // Generar un nuevo ID único
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

            await this.writeFile(products);
            return 'Producto agregado';
        } catch (error) {
            return new Error(error);
        }
    }

    updateProduct = async (productId, updatedData) => {
        try {
            let products = await this.readFile();
            const index = products.findIndex(product => product.id == productId);

            if (index === -1) {
                throw new Error('Producto no encontrado');
            }

            // Actualizar el producto
            products[index] = { ...products[index], ...updatedData };

            await this.writeFile(products);
        } catch (error) {
            console.error(`Error al actualizar el producto: ${error.message}`);
            throw error;
        }
    }
}

module.exports = ProductManagerFile;