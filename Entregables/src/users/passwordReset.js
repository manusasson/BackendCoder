// passwordReset.js

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const JWT_SECRET = 'tu_secreto_para_jwt';

// Función para generar el token de restablecimiento de contraseña
function generatePasswordResetToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expira en 1 hora
}
// Función para verificar el token de restablecimiento de contraseña
function verifyResetToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded.userId; // Retorna el ID del usuario extraído del token
    } catch (error) {
      console.error('Error al verificar el token de restablecimiento:', error);
      return null;
    }
  }
  

module.exports = {
  generatePasswordResetToken,
  verifyResetToken,
};