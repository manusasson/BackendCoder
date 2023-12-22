const { Router } = require('express')
const { userModel } = require('../../models/users.models')

const router = Router()


// configuración 
// GET localhost:8080 /api/users /
router.get('/', async(req, res) =>{
   const users =  await userModel.find()
   res.send('get users')
})





// POST localhost:8080  /api/users /
router.post('/', (req, response) =>{
    const body = req.body
    console.log(body)

    })






// PUT localhost:8080  /api/users /:uid
router.put('/:uid',  (request, response) =>{

    const { userId } = request.params
    // venga el id
    const index = arrayUsuarios.findIndex(user => user.id === userId)
    // exista el usuario 
    if (index === -1) {
        return response.status(400).send({ message: 'No se encuentra el usuario'})
    }

    //mada el  cliente request 
    let user = request.body
    if (!user.nombre || !user.apellido) {
        return response.status(400).send({ message: 'Che pasar todos los datos'})
    }

    // console.log('user post',user)
    arrayUsuarios[index] = user
    console.log(arrayUsuarios)

    response.status(201).send({ 
        users: arrayUsuarios,
        message: 'usuario Modificado' 
    })
})

// DELETE localhost:8080  /api/users /:uid
router.delete('/:uid', (req, res)=> {
    const { userId } = req.params

    let arrayTamanno = arrayUsuarios.length
    console.log(arrayTamanno)
    let users = arrayUsuarios.filter(user => user.id !== userId )
    console.log(users.length)
    if (users.length === arrayTamanno) {
        res.status(404).send({ message:"Usuario no encontrado" })
    }
    res.status(200).send({ message:"Usuario borrado", users })
})

module.exports = router


