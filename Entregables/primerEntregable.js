class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(id, title, description, price, thumbnail, code, stock) {
      const product = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      if (this.products.includes(id))
            {this.products.push(product)} 
        else  {
        throw new Error("El código de producto ya está en uso.");
      }
  
    }
    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
          return product;
        } else {
          throw new Error("Producto no encontrado.");
        }
      }
  }
  const productManager = new ProductManager();

productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
