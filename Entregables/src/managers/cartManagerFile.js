const fs = require('fs');

class CartManagerFile {
    constructor() {
        this.path = '../src/MockDB/Carrito.json'; // Ruta al archivo Carrito.json
    }

    readFile = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error al leer el archivo de carritos: ${error.message}`);
            return [];
        }
    }

    addCart = async (newCart) => {
        try {
            let carts = await this.readFile();
            const newId = this.generateUniqueId(carts);
            newCart.id = newId;

            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');

            return newId;
        } catch (error) {
            console.error(`Error al agregar un nuevo carrito: ${error.message}`);
            throw error;
        }
    }
    generateUniqueId = (carts) => {
        // Verificar si 'carts' es undefined o nulo
        if (!carts || carts.length === 0) {
            return 1; // Si no hay carritos, comenzar desde 1
        }

        // Obtener el último ID existente
        const lastId = carts[carts.length - 1].id;
        // Generar un nuevo ID único (puedes ajustar la lógica según tus necesidades)
        const newId = lastId + 1;
        return newId;
    }

    addProductToCart = async (cartId, productId) => {
        try {
            let carts = await this.readFile();
            const cartIndex = carts.findIndex(cart => cart.id == cartId);

            if (cartIndex !== -1) {
                // Puedes realizar más validaciones o lógica según tus necesidades
                const productToAdd = {
                    id: productId,
                    quantity: 1, // Puedes ajustar esto según tus necesidades
                };

                carts[cartIndex].products.push(productToAdd);

                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');

                return { success: true, cart: carts[cartIndex] };
            } else {
                return { success: false };
            }
        } catch (error) {
            console.error(`Error al agregar producto al carrito: ${error.message}`);
            throw error;
        }
    }


    getCartById = async (cartId) => {
        try {
            const carts = await this.readFile();
            const cart = carts.find(cart => cart.id == cartId);
            return cart || null;
        } catch (error) {
            console.error(`Error al obtener el carrito por ID: ${error.message}`);
            throw error;
        }
    }

    updateCart = async (cartId, updatedCart) => {
        try {
            let carts = await this.readFile();
            const index = carts.findIndex(cart => cart.id == cartId);

            if (index !== -1) {
                carts[index] = updatedCart;
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
            } else {
                throw new Error('Carrito no encontrado');
            }
        } catch (error) {
            console.error(`Error al actualizar el carrito: ${error.message}`);
            throw error;
        }
    }


}

module.exports = CartManagerFile;