const { Router } = require('express')
const { usersModel } = require('../../models/users.model')
const bcrypt = require('bcrypt'); 

const router = Router()
//

// const userManager = new UserManagerMongo().
router.get('/', async (req, res) =>{
    // sinc o async ?
    try {
        // const users = await usersModel.find({}).limit(50) // 5000 -> 100
        const users = await usersModel.paginate({gender: 'Female'}, {limit: 5, page: 445}) 
        res.send(users)
        
    } catch (error) {
        console.log(error)
    }
})


// POST localhost:8080  /api/users /
router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Validación y cifrado de la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el nuevo usuario
        const result = await usersModel.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        res.status(201).send({
            status: 'success',
            payload: result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'error',
            message: 'Error en el servidor',
        });
    }
})
// PUT localhost:8080  /api/users /:uid
router.put('/:uid',  async (req, res) =>{

    const { uid } = req.params
    const userToReplace = req.body
    // venga el id
    const result = await usersModel.updateOne({_id: uid}, userToReplace)
    res.status(201).send({ 
        status: 'success',
        payload: result 
    })
})

// DELETE localhost:8080  /api/users /:uid
router.delete('/:uid', async  (req, res)=> {
    const { uid } = req.params

    const result = await usersModel.deleteOne({_id: uid})
    res.status(200).send({ 
        status: "success", 
        payload: result 
    })
})

module.exports = router


