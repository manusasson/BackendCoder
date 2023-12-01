const frutas = ['anana','pera','manzana']

console.log(frutas.includes("anana"))


//ver si existe una propiedad en un objeto

const jugador1 = {
    nombre:"Manuel",
    apellido: "Sasson"
}

const jugador2 = {
    nombre:"Manuel"
}

console.log(Object.keys(jugador1))

//ver si existe una propiedad en un objeto

///reducir todo un array a una variable

const array = ["hola","como","Estan"] //pueden ser con numeros y los suma

const res = array.reduce((acc,item) => acc+item)
console.log(res)

///reducir todo un array a una variable


//spread operator

const array2 = [1,2,3]
const array3 = [...array2,4,5] ///todo lo que hay en el array y puede agergar el al final
//spread operator