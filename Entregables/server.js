// Importa la clase ProductManager en lugar de getProductById
import ProductManager from './proyecto.js';
import express from 'express';
const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});