//Variables

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('transmision');
const color = document.querySelector('#color');

//contenedor para los resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;

//Generar un objeto con la busqueda
 const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
 }


//Eventos

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(); // Muestra los autos al cargar
    
    llenarSelect(); //llena los años
})

//Event listener para los formularios

//Funciones

function mostrarAutos(){
    autos.forEach(auto => {
        const {marca,modelo,year,precio,puertas,color,transmision} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        Marca: ${marca} -
        Modelo: ${modelo} -
        Año:  ${year} -
        Precio: ${precio} -
        Puertas: ${puertas} -
        Color: ${color} -
        Transmision: ${transmision} -
        `

        //insertar el HTML

        resultado.appendChild(autoHTML);
    });
}

function llenarSelect() {
    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agrega las opciones de año
    }
}