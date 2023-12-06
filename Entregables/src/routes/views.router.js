const { Router } = require('express')

const router = Router()

const productMock = [
    {id:'1', title: 'Product 1', price: 1500, stock: 100, description: 'Esto es un prod. '},
    {id:'2', title: 'Product 2', price: 1500, stock: 100, description: 'Esto es un prod. '},
    {id:'3', title: 'Product 3', price: 1500, stock: 100, description: 'Esto es un prod. '},
]

router.get('/', (req,res)=> {
    res.render('index.hbs', {
        title: 'E-Commerce Manu', 
        name: 'E-Commerce Manu',
        style: 'index.css'
    })
})

router.get('/prod', (req, res) => {
    
    const userMock = {
        title: 'E-Commerce Manu', 
        name: 'E-Commerce Manu',
        role:  'admin'
    }

    res.render('products', {
        title: userMock.title, 
        name: userMock.name,
        isAdmin: userMock.role === 'admin',
        products: productMock,
        style: 'products.css'
    })
})
router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

module.exports = router



// const Saludos = () => {}