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

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10); // El segundo parámetro es el costo del hash

            // Crear el nuevo usuario con la contraseña encriptada
            const newUser = {
                first_name,
                last_name,
                email,
                password: hashedPassword,
                role
            };

            // Realizar cualquier validación necesaria antes de crear el usuario

            const result = await userService.createUser(newUser);
            res.status(201).send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
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
    });

module.exports = router;