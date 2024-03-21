// recovery.router.js
const { Router } = require('express');
const { generatePasswordResetToken } = require('../utils/passwordReset');
const { sendEmail } = require('../utils/sendEmail');
const UserDaoMongo = require('../daos/Mongo/usersDaoMongo');

const router = Router();
const usersService = new UserDaoMongo();

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Verificar si el usuario existe
    const user = await usersService.getUser({ email });
    if (!user) {
        return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }

    // Generar token de restablecimiento de contraseña
    const resetToken = generatePasswordResetToken(user._id);

    // Enviar correo electrónico con el token de restablecimiento
    try {
        await sendEmail(email, "Password Recovery",resetToken);
        res.status(200).json({ status: 'success', message: 'Correo electrónico de restablecimiento enviado' });
    } catch (error) {
        console.error('Error al enviar correo electrónico de restablecimiento:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    // Verificar si el token de restablecimiento es válido
    const userId = verifyResetToken(token);
    if (!userId) {
        return res.status(400).json({ status: 'error', message: 'Token de restablecimiento inválido' });
    }

    // Actualizar la contraseña del usuario
    try {
        const user = await usersService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }

        user.password = createHash(newPassword);
        await usersService.updateUser(user);

        res.status(200).json({ status: 'success', message: 'Contraseña restablecida con éxito' });
    } catch (error) {
        console.error('Error al restablecer contraseña:', error);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

module.exports = router;