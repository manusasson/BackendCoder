// recovery.router.js
const { Router } = require('express');
const { generatePasswordResetToken } = require('../users/passwordReset');
const { sendEmail } = require('../utils/sendEmail');
const UserDaoMongo = require('../daos/Mongo/usersDaoMongo');
const { verifyResetToken } = require('../users/passwordReset');
const { isResetTokenExpired } = require('../users/validateToken');
const bcrypt = require('bcrypt');

const router = Router();
const usersService = new UserDaoMongo();

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await usersService.getUser({ email });
        if (!user) {
            console.log("usuario no encontrado")
            return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' });
        }

        // Generar token de restablecimiento de contraseña
        const resetToken = generatePasswordResetToken(user);

        // Enviar correo electrónico con el token de restablecimiento
        const resetLink = `http://localhost:8080/recovery/reset-password?token=${resetToken}`;
        await sendEmail(email, "Password Recovery", resetLink);
        res.status(200).json({ status: 'success', message: 'Correo electrónico de restablecimiento enviado' });
    } catch (error) {
        console.error('Error al enviar correo electrónico de restablecimiento:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.get('/reset-password', (req, res) => {
    res.render('reset-password');
});

router.post('/reset-password', async (req, res) => {
    const { newPassword } = req.body;
    const token = req.query.token;

    try {
        // Verificar si el token de restablecimiento es válido
        console.log(`token recibido: ${req.query.token}`);
        const userId = verifyResetToken(token);
        if (!userId) {
            return res.status(400).json({ status: 'error', message: 'Token de restablecimiento inválido' });
        }

        const tokenExpired = isResetTokenExpired(token);
        if (tokenExpired) {
            // Redirigir al usuario a la página de restablecimiento de contraseña
            return res.redirect('/recovery/reset-password');
        }

        // Actualizar la contraseña del usuario
        const user = await usersService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await usersService.updateUser(user._id, hashedPassword);

        res.status(200).json({ status: 'success', message: 'Contraseña restablecida con éxito' });
    } catch (error) {
        console.error('Error al restablecer contraseña:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

module.exports = router;
