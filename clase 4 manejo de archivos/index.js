const fs = require("fs")
//crear un archivo
// fs.writeFileSync('test.txt',"algun texto")
// //anexar a un archivo existente
// fs.appendFileSync('test.txt', "otro texto")
// //leer un archivo
// const contenido = fs.readFileSync('test.txt','utf8')
// console.log(contenido)


// para hacerlo de forma asincrona es 
async function cosasAsincronas() {
     fs.promises.writeFile("test.txt","ahora con promesas");
    const contenido1 = await fs.promises.readFileSync('test.txt','utf8')
    console.log(contenido1)
    
}

cosasAsincronas()