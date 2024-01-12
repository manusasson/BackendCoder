const { Router } = require('express');
const { usersModel } = require('../../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por su correo electrónico
        const user = await usersModel.findOne({ email });

        // Verificar la existencia del usuario y la contraseña
        if (user && (await bcrypt.compare(password, user.password))) {
            // Crear un token de autenticación
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).send({
                status: 'success',
                message: 'Inicio de sesión exitoso',
                token,
            });
        } else {
            res.status(401).send({
                status: 'error',
                message: 'Credenciales incorrectas',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: 'error',
            message: 'Error en el servidor',
        });
    }
})

module.exports = router;