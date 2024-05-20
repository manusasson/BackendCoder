const {Command} = require('commander')


const commander = new Command()

commander
    .option ('--mode <mode>','Entorno de ejecucion de nuestro server')
    .parse()

module.exports = {commander}