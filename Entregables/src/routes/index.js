const { Router } = require('express')
const userRouter = require('./users.router.js')
const viewsRouter = require('./views.router.js')
const sessionsRouter = require('./sessions.router.js')
const prodcutsRouter = require('./products.router.js')
const cartsRouter = require('./carts.router.js')
const loggerTest = require('./logger.router.js')
const { uploader } = require('../utils/upoloader.js')
const mockingProductsRouter = require('./mockingproducts.router.js'); 
const recoveryRouter = require('./recovery.router.js'); // Importar el nuevo router


const router = Router()

router.use('/recovery', recoveryRouter); 
router.use('/', viewsRouter)
router.use('/api/loggerTest',loggerTest)
router.use('/api/sessions', sessionsRouter)
router.use('/api/users', userRouter)
router.use('/api/products', prodcutsRouter)
router.use('/api/carts', cartsRouter)
router.post('/uploader', uploader.single('myFile'), (req, res)=>{

    res.send('Imagen subida!')
})
router.use('/api/mockingproducts', mockingProductsRouter); // Agregar el nuevo enrutador

module.exports = router
// dao -> data access object