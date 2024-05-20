// logger.router.js
const express = require('express');
const router = express.Router();
const LoggerController = require('../controllers/logger.controller');
const { loggers } = require('winston');

// Controlador para la prueba de logs
const loggerController = new LoggerController();

<<<<<<< HEAD
console.log('llegando')
// Ruta para probar los registros


router.get('/loggerTest', loggerController.logTest);
=======
console.log("Inicializando logger router..."); // Este console.log se ejecutará cada vez que se inicie el servidor
>>>>>>> f860318c03cfc5f784243650f4909cc2b00f0c73

// Ruta para probar los registros
router.get('/', async (req, res) => {
    console.log("Recibida solicitud en /loggerTest"); // Este console.log se ejecutará cada vez que se acceda a la ruta /loggerTest
    await loggerController.logTest(req, res);
});

module.exports = router;
