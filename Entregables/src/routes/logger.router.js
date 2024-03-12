// logger.router.js
const express = require('express');
const router = express.Router();
const LoggerController = require('../controllers/logger.controller');

// Controlador para la prueba de logs
const loggerController = new LoggerController();
console.log(loggerController)

// Ruta para probar los registros
router.get('/api/loggerTest', loggerController.logTest);

module.exports = router;