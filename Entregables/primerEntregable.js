class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(id, title, description, price, thumbnail, code, stock) {

        const product = {
          id: id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        if(!this.getProductById(id)){
        this.products.push(product);
        console.log(`producto con el id:${id} agregado correctamente`)
      } }
    
  
    isCodeUnique(code) {
      return !this.products.some((product) => product.code === code);
    }
  
    getProductById(id) {
      const product = this.products.find((product) => product.id === id);
      if (product) {
        console.log("Producto ya existe")
        return true;
      } else {
        return false;
      }
    }
  }
  
  // Ejemplo de uso:
  const productManager = new ProductManager();
  const productsBefore = productManager.getProducts();
  console.log(productsBefore); 
  
  productManager.addProduct(1, "producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  
  const productsAfterAdd = productManager.getProducts();
  console.log(productsAfterAdd); 
  productManager.addProduct(2, "producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  console.log(productsAfterAdd); 