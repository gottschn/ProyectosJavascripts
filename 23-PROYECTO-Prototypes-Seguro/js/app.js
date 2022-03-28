//Contructores
function Seguro (marca,anio,tipo){
    this.marca = marca,
    this.anio = anio,
    this.tipo = tipo
}
//Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function () {
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */
   
    let cantidad;
    const base = 2000;
    
    
    switch(this.marca){
        case '1':
                cantidad = base * 1.15;
                break;
        case '2':
                cantidad = base * 1.05;
                break; 
        case '3':
                cantidad = base * 1.35;
                break;
        default:
            break;
    }

    //Leer el año
    const diferencia = new Date().getFullYear() - this.anio;

    //Cada año que la diferencia es mayor, el costo va a reducirse un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }
    else{
        cantidad *= 1.50;
    }
    
    return cantidad;
}

//Todo lo que se muestra 
function Interfaz () {}

Interfaz.prototype.LlenarOpciones = function (){
    const max = new Date().getFullYear(),
          min = max - 21;

          const selectAnios = document.querySelector('#year');
          for(let i = max; i >= min; i--){
              let option = document.createElement('option');
              option.value = i;
              option.innerHTML = i;
              selectAnios.appendChild(option);
          }
}

//Muestra alertas en la pantalla
Interfaz.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    if(tipo === 'error') {
        div.classList.add('error');
    }
    else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //Insertar el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}
Interfaz.prototype.mostrarResultado = (total , seguro) => {

    const { marca, anio, tipo } = seguro;
    let textoMarca;

    switch(marca) {
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;

            
    }
    //Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');
    
    div.innerHTML = `
        <p class="header">Tu Resumen </p>
        <p class="font-bold"> Marca: <span class="font-normal"> $ ${textoMarca} </span></p>
        <p class="font-bold"> Anio: <span class="font-normal"> $ ${anio} </span></p>
        <p class="font-bold"> Tipo: <span class="font-normal capitalize"> $ ${tipo} </span></p>
        <p class="font-bold"> Total: <span class="font-normal"> $ ${total} </span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
    
    //Mostrar el spinner
    
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    
    setTimeout(() => {
        spinner.style.display = 'none'; //Se borra el spinner
        resultadoDiv.appendChild(div); //se muestra el resultado
    }, 3000);
    
}

//Crear Instancia de Interfaz
const interfaz = new Interfaz();

document.addEventListener('DOMContentLoaded', () => {
    interfaz.LlenarOpciones()  //Llena el select con los años...
});

eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();
    //Leer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    //Leer el año seleccionado
    const anio = document.querySelector('#year').value;
    //Leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || anio === ''|| tipo === ''){
        interfaz.mostrarMensaje('Todos los Campos son obligatorios', 'error');
    }
    
    interfaz.mostrarMensaje('Cotizando...', 'exito');

    //Ocultar las cotizaciones previas

    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }

    //Instanciar el Seguro

    const seguro = new Seguro(marca , anio , tipo);
    const total = seguro.cotizarSeguro();
    

    //Utilizar el prototype que va a cotizar 
    interfaz.mostrarResultado(total, seguro);
    
}