const User = require('../daos/Mongo/models/users.model');
const { generatePasswordResetToken, sendPasswordResetEmail } = require('../utils/passwordReset');

class UsersController {
  async requestPasswordReset(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const resetToken = generatePasswordResetToken(user);

      // Enviar correo electrónico con el enlace de restablecimiento
      await sendPasswordResetEmail(user.email, resetToken);

      return res.status(200).json({ message: 'Correo de restablecimiento enviado correctamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

module.exports = UsersController;