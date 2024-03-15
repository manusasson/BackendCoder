// logger.router.js
const express = require('express');
const router = express.Router();
const LoggerController = require('../controllers/logger.controller');

// Controlador para la prueba de logs
const loggerController = new LoggerController();

console.log("Inicializando logger router..."); // Este console.log se ejecutará cada vez que se inicie el servidor

// Ruta para probar los registros
router.get('/', async (req, res) => {
    console.log("Recibida solicitud en /loggerTest"); // Este console.log se ejecutará cada vez que se acceda a la ruta /loggerTest
    await loggerController.logTest(req, res);
});

module.exports = router;
