const jwt_decode = require('jwt-decode');

// Función para verificar si el token de restablecimiento ha expirado
const isResetTokenExpired = (token) => {
    try {
        // Decodifica el token para obtener la fecha de expiración
        const decodedToken = jwt_decode(token);
        const expirationDate = new Date(decodedToken.exp * 3600); // La fecha de expiración es de 1 hora
        
        return expirationDate < new Date();
    } catch (error) {
        console.error('Error al verificar el token de restablecimiento:', error);
        return true; 
    }
}

module.exports = {
    isResetTokenExpired
};