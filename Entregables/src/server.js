// const express = require('express')
const express = require('express');
const handlebars = require('express-handlebars');
const userRouter = require('./routes/apis/users.router.js');
const productsRouter = require('./routes/apis/products.router.js');
const viewsRouter = require('./routes/views.router.js');
const { uploader } = require('./helpers/uploader.js');
const cartsRouter = require('./routes/apis/carts.router.js');
const http = require('http');
const mongoose = require('mongoose')



// importando socket .io
const { Server } = require('socket.io')
// importando socket .io

const app = express()
const PORT = 8080 || process.env.PORT

const connectDb =  async ()  => {
    await mongoose.connect('mongodb+srv://manusasson:25081991@cluster0.b1fovzj.mongodb.net/BasePruebaretryWrites=true&w=majority')
    console.log("conectado")
}
connectDb()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')


app.use('/', viewsRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter);
app.use(( err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('error de server')
})

const httpServer = app.listen(PORT, err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})
// insatanciando un server io
const io = new Server(httpServer)


io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('message', (data) => {
        // Lógica para manejar los mensajes del cliente
        console.log('Mensaje recibido:', data);
        // Puedes emitir mensajes a otros clientes o realizar otras acciones
        io.emit('messageLogs', data);
    });
})
module.exports = { io, httpServer };









