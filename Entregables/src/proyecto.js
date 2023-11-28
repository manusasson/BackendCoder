import fs from 'fs';

  class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // Si hay un error al leer el archivo (por ejemplo, si no existe), se devuelve un array vacío.
      return [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  addProduct(productData) {
    const newProduct = {
      id: this.generateNextId(),
      ...productData,
    };

    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  generateNextId() {
    const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }

  getProducts(limit) {
    if(!limit){
    return this.products;}
    else{
      return this.products.slice(0,limit)
    }
  }

  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  }

  updateProduct(productId, updatedData) {
    const productIndex = this.products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedData, id: productId };
      this.saveProducts();
      return this.products[productIndex];
    }

    return null; // Indica que no se encontró el producto con el ID dado
  }

  deleteProduct(productId) {
    this.products = this.products.filter(product => product.id !== productId);
    this.saveProducts();
  }
}

 //Ejemplo de uso:
 const productManager = new ProductManager('products.json');

// // Agregar un producto
// const newProduct = productManager.addProduct({
//   title: 'Producto A',
//   description: 'Descripción del Producto A',
//   price: 10.99,
//   thumbnail: 'ruta/imagen/a.jpg',
//   code: 'ABC123',
//   stock: 50,
// });
// console.log('Producto agregado:', newProduct);

// // Consultar todos los productos
// const allProducts = productManager.getProducts();
// console.log('Todos los productos:', allProducts);

// // Consultar un producto por ID
// const foundProduct = productManager.getProductById(newProduct.id);
// console.log('Producto encontrado:', foundProduct);

// // Actualizar un producto por ID
// const updatedProduct = productManager.updateProduct(newProduct.id, { price: 15.99 });
// console.log('Producto actualizado:', updatedProduct);

// // Consultar todos los productos después de la actualización
// console.log('Todos los productos después de la actualización:', productManager.getProducts());

// // Eliminar un producto por ID
// productManager.deleteProduct(newProduct.id);

// // Consultar todos los productos después de la eliminación
// console.log('Todos los productos después de la eliminación:', productManager.getProducts());

export default ProductManager;