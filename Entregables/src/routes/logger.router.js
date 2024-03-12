// logger.router.js
const express = require('express');
const router = express.Router();
const LoggerController = require('../controllers/logger.controller');
const { loggers } = require('winston');

// Controlador para la prueba de logs
const loggerController = new LoggerController();

console.log('llegando')
// Ruta para probar los registros


router.get('/loggerTest', loggerController.logTest);

module.exports = router;