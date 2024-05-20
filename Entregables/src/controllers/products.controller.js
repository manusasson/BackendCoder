const { productService } = require("../repositories");


class ProductController {
    constructor(){
        this.service = productService
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.service.getProducts()
            res.send({status: 'success', payload: products})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
    getProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const product = await this.service.getProduct({_id: pid})
            res.send({status: 'success', payload: product})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
    
    createProduct = async (req, res) => {
        try {
            const {title, description, price, stock, thumbnail, category} = req.body
            const { email } = req.user;


             // Verifica si el usuario es premium
             const user = await this.userService.getUser({ email });
             if (!user || user.role !== 'premium') {
                 return res.status(403).json({ message: 'Solo los usuarios premium pueden crear productos' });
             }
 
            const result = await this.service.createProduct({
                title,
                description, 
                price,
                stock, 
                category,
                thumbnail,
                owner: email 
            })
            // validar la respuoesta de la base de datos
            res.send({status: 'success', payload: result})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    
    updateProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            const productToUpdate = req.body;

            // Obtiene el correo electrónico del usuario desde la solicitud
            const { email } = req.user;

            // Verifica si el usuario es admin o premium
            const user = await this.userService.getUser({ email });
            if (!user) {
                return res.status(403).json({ message: 'Usuario no autorizado' });
            }

            // Si el usuario es premium, verifica si el producto le pertenece
            if (user.role === 'premium') {
                const product = await this.productService.getProduct({ _id: pid });
                if (!product || product.owner !== email) {
                    return res.status(403).json({ message: 'No tiene permiso para actualizar este producto' });
                }
            }

            // Actualiza el producto
            const result = await this.productService.updateProduct({ _id: pid }, productToUpdate);
            res.status(200).json({ status: 'success', payload: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Método para eliminar un producto
    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params;

            // Obtiene el correo electrónico del usuario desde la solicitud
            const { email } = req.user;

            // Verifica si el usuario es admin o premium
            const user = await this.userService.getUser({ email });
            if (!user) {
                return res.status(403).json({ message: 'Usuario no autorizado' });
            }

            // Si el usuario es premium, verifica si el producto le pertenece
            if (user.role === 'premium') {
                const product = await this.productService.getProduct({ _id: pid });
                if (!product || product.owner !== email) {
                    return res.status(403).json({ message: 'No tiene permiso para eliminar este producto' });
                }
            }

            // Elimina el producto
            const result = await this.productService.deleteProduct({ _id: pid });
            res.status(200).json({ status: 'success', payload: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = {
    ProductController
}