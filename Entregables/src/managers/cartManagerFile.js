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

    // Otras funciones según sea necesario
}

module.exports = CartManagerFile;