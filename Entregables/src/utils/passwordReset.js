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

// Función para enviar el correo electrónico de restablecimiento de contraseña
async function sendPasswordResetEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth:{  user:'manusasson@gmail.com',
            pass:'ucgqfypbpoawqjrw' }
  });

  const mailOptions = {
    from: 'tu_correo@ejemplo.com',
    to: email,
    subject: 'Restablecimiento de Contraseña',
    html: `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
           <a href="http://localhost:8080/reset-password?token=${token}">Restablecer Contraseña</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de restablecimiento de contraseña enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento de contraseña:', error);
  }
}

module.exports = {
  generatePasswordResetToken,
  sendPasswordResetEmail,
};