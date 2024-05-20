const express       = require('express')
const appRouter     = require('./routes')
const { connectDb } = require('./config')
const handlebars    = require('express-handlebars')
const cors          = require('cors')
const swaggerJsdoc  = require('swagger-jsdoc')
const swaggerUiExpress = require ('swagger-ui-express')


const cookie        = require('cookie-parser')
const { initializePassport } = require('./passport-jwt/passport.config')
const passport = require('passport')
const { commander } = require('./utils/commander')

const app = express()
const PORT = 8080
const swaggerOption = {
    definition:{
        openapi:'3.0.1',
        info:{
            title:"Documentacion de la aplicaciòn Ecommerce - Manu",
            description:'Descripcion de las APIs'
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJsdoc(swaggerOption)
app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs))



connectDb()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
// app.use(express.static(__dirname+'/public'))
app.use(cookie())
// config handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

initializePassport()
app.use(passport.initialize())

app.use(appRouter)

app.listen(PORT, err =>{
    if (err) {
        console.log(err)
    }
    console.log(`Server escuchando en puerto: ${PORT}`) 
})