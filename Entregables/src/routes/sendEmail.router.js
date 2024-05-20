const {Router} = require('express')
const {sendEmail} = require('../utils/sendEmail')

const router = Router()

router.get('/email', (req,res) =>{
    sendEmail() //cargar datos del mail
    req.send('Enviado')
})