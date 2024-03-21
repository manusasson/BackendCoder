// passwordReset.controller.js

const User = require('../daos/Mongo/models/users.model');

class PasswordResetController {
  async resetPassword(req, res) {
    const { token, newPassword } = req.body;

    try {
      // Buscar el usuario por el token
      const user = await User.findOne({ passwordResetToken: token });

      if (!user || user.passwordResetTokenExpires < Date.now()) {
        return res.status(400).json({ message: 'Token inválido o expirado' });
      }

      // Verificar que la nueva contraseña no sea igual a la actual
      if (newPassword === user.password) {
        return res.status(400).json({ message: 'No puedes usar la misma contraseña actual' });
      }

      // Actualizar la contraseña del usuario
      user.password = newPassword;
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpires = undefined;
      await user.save();

      return res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

module.exports = PasswordResetController;
