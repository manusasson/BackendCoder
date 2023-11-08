class ProductManager {
    constructor() {
      this.products = [];
      this.nextProductId = 1;
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(id, title, description, price, thumbnail, code, stock) {

        const product = {
          id: this.nextProductId,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        if(this.isCodeUnique(code)){
        this.products.push(product);
        this.nextProductId++;
        console.log(`producto con el codigo:${code} agregado correctamente`)
        } 
        else {
          console.log(`producto con el codigo:${code} ya existe`)
        }
      
      }
    
      isCodeUnique(code) {
        return !this.products.some((product) => product.code === code);
      }
    
      getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
          return product;
        }
        else {console.log(`el producto con el codigo: ${id} no existe`)}
      }
    }
  
  // Ejemplo de uso:
  const productManager = new ProductManager();
  const productsBefore = productManager.getProducts();
  console.log(productsBefore); 
  
  productManager.addProduct(1,"producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  
  const productsAfterAdd = productManager.getProducts();
  console.log(productsAfterAdd); 
  productManager.addProduct(2, "producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  console.log(productsAfterAdd); 