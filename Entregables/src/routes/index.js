const { Router } = require('express')
const userRouter = require('./users.router.js')
const viewsRouter = require('./views.router.js')
const sessionsRouter = require('./sessions.router.js')
const prodcutsRouter = require('./products.router.js')
const cartsRouter = require('./carts.router.js')
const loggerRouter = require('./logger.router.js')
const { uploader } = require('../utils/upoloader.js')
const mockingProductsRouter = require('./mockingproducts.router.js'); 

const router = Router()



router.use('/', viewsRouter)
router.use('/loggerTest',loggerRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/api/users', userRouter)
router.use('/api/products', prodcutsRouter)
router.use('/api/carts', cartsRouter)
router.post('/uploader', uploader.single('myFile'), (req, res)=>{

    res.send('Imagen subida!')
})
router.use('/api/mockingproducts', mockingProductsRouter); 
module.exports = router
// dao -> data access object