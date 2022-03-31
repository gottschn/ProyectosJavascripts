//Variables

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
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
    mostrarAutos(autos); // Muestra los autos al cargar
    
    llenarSelect(); //llena los años
})

//Event listener para el  formulario

marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change',  e =>{
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
})

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = parseInt(e.target.value);

    filtrarAuto();
})

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = parseInt(e.target.value);
    filtrarAuto();
})

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
})

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto();
})

//Funciones

function mostrarAutos(autos){

    limpiarHTML();
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

//Limpiar HTML

function limpiarHTML (){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {
    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agrega las opciones de año
    }
}

//Funcion que filtra en base a la busqueda
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarPrecioMin).filter(filtrarPrecioMax).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)


   if(resultado.length){
    mostrarAutos(resultado);
   }
   else{
       noResultado();
   }
}

function noResultado(){
    limpiarHTML();

     const noResultado = document.createElement('div');
     noResultado.classList.add('alerta','error');
     noResultado.textContent = ('No hubo resultados, intenta con otros terminos de busqueda.');
     resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if (marca){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear (auto){
    const {year} = datosBusqueda;
    if (year){
        return auto.year === year;
    }
    return auto;
}

 function filtrarPrecioMin(auto){

    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
} 

function filtrarPrecioMax(auto){
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;

    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;

    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;

    if(color){
        return auto.color === color;
    }
    return auto;
}