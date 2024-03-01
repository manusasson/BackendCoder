
const errorHandler = (error, req, res, errorDictionary) => {
    // Busca el mensaje de error en el diccionario
    const errorMessage = errorDictionary[error.message] || 'Error interno del servidor';

    // Devuelve una respuesta de error
    res.status(500).json({ status: 'error', message: errorMessage });
};

module.exports = errorHandler;