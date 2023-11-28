// Importa la clase ProductManager en lugar de getProductById
import ProductManager from './proyecto.js';
import express from 'express';
const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));
app.use('/static',express.static('public'))


// Crea una instancia de la clase ProductManager
const productManager = new ProductManager('products.json');

app.get('/bienvenida', (req, res) => {
  res.send('<h1 style="color:blue;"> Bienvenida </h1>');
});

//let usuarios = [{ nombre: "manu", id: 1 }, { nombre: "Faustino", id: 2 }, { nombre: "Sasson", id: 3 }, { nombre: "Formoso", id: 4 }];

app.get('/products', (req, res) => {
 const limits =  req.query.limit;
  console.log(limits)
  const respuesta = productManager.getProducts(limits);
  res.json(respuesta);
});

// con el req.params recibimos los parametros como si fueran subsitios
app.get('/usuarioVariable/:nombre/:apellido', (req, res) => {
  apellido = req.params.apellido;
  nombre = req.params.nombre;
  res.json({ nombre: nombre, apellido: apellido, edad: 32, correo: "test@test.uy" });
});

app.get('/usuarioVariableConQuery', (req, res) => {
  apellido = req.query.apellido;
  nombre = req.query.nombre;
  res.json({ nombre: nombre, apellido: apellido, edad: 32, correo: "test@test.uy" });
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id)
  // Usa la instancia de ProductManager para obtener el producto por ID
  const respuesta = productManager.getProductById(id);

  res.json(respuesta);
});


app.post('/products/', (req, res) => {
  // Obtener los datos del cuerpo de la solicitud
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  // Validar que todos los campos obligatorios estén presentes
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes.' });
  }

  // Crear un nuevo producto con los datos proporcionados
  const newProduct = {
    id: productManager.generateNextId(), // Método para generar un nuevo ID único
    title,
    description,
    code,
    price,
    status: true, // Status es true por defecto
    stock,
    category,
    thumbnails: thumbnails || [], // Si no se proporciona thumbnails, establecer como un array vacío
  };

  // Agregar el nuevo producto usando la instancia de ProductManager
  productManager.addProduct(newProduct);

  // Enviar la respuesta con el nuevo producto
  res.status(201).json(newProduct);
});


app.put('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedFields = req.body;

  // Verificar que al menos un campo para actualizar esté presente en el body
  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ error: 'Se debe proporcionar al menos un campo para actualizar.' });
  }

  // Obtener el producto actual por ID
  const existingProduct = productManager.getProductById(productId);

  if (!existingProduct) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }

  // Actualizar el producto con los campos proporcionados
  const updatedProduct = { ...existingProduct, ...updatedFields };

  // Actualizar el producto usando la instancia de ProductManager
  productManager.updateProduct(productId, updatedProduct);

  res.json(updatedProduct);
});


app.delete('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);

  // Eliminar el producto usando la instancia de ProductManager
  const deletedProduct = productManager.deleteProduct(productId);

  if (!deletedProduct) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }

  res.json({ message: 'Producto eliminado correctamente.', deletedProduct });
});