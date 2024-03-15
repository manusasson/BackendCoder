const { connect } = require('mongoose')
const { commander } = require('../utils/commander')
const dotenv = require('dotenv')

const {mode} = commander.opts()
dotenv.config({
    path:'./.env'
})


exports.connectDb = async () => {
    try {
        await connect('mongodb://127.0.0.1:27017/c55625')
        console.log('Base de datos conectada')
        
    } catch (error) {
        console.log('Error al conectar a la base de datos', error)
    }
}