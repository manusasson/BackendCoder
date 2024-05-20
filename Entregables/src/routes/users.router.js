const { Router } = require('express');
const bcrypt = require('bcrypt'); // Importar bcrypt
const UserDaoMongo = require('../daos/Mongo/usersDaoMongo');

const router = Router();
const userService = new UserDaoMongo();

router
    .get('/', async (req, res) => {
        try {
            const users = await userService.getUsers();

            res.send({
                status: 'success',
                payload: users
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 'error',
                message: 'Error en el servidor'
            });
        }
    })
    .get('/:uid', async (req, res) => {
        res.send('users');
    })
    .post('/', async (req, res) => {
        try {
            const { first_name, last_name, email, password, role } = req.body;
    
            // Verificar si ya existe un usuario con el mismo correo electrónico
            const existingUser = await userService.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Ya existe un usuario con este correo electrónico'
                });
            }
    
            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Crear el nuevo usuario con la contraseña encriptada
            const newUser = {
                first_name,
                last_name,
                email,
                password: hashedPassword,
                role
            };
        
            const result = await userService.createUser(newUser);
            res.status(201).json({
                status: 'success',
                message: 'Usuario creado exitosamente',
                payload: result
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Error en el servidor'
            });
        }
    })
    .put('/:uid', async (req, res) => {
        res.send('users');
    })
    .delete('/:uid', async (req, res) => {
        res.send('users');
    })
    .put('/premium/:uid', async (req, res) => {
        console.log("llegando al premium")
        try {
            const { uid } = req.params;
            const user = await userService.getUserById(uid);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Cambiar el rol del usuario
            user.role = user.role === 'user' ? 'premium' : 'user';

            // Guardar los cambios en la base de datos
            await userService.updateUser(uid, { role: user.role });

            res.status(200).json({ message: 'Rol de usuario actualizado correctamente' });
        } catch (error) {
            console.error('Error al cambiar el rol de usuario:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    });;

module.exports = router;