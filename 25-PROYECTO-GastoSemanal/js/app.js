//Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');



//Eventos

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGastos);
}


//Classes

class Presupuesto {
 constructor(presupuesto){
     this.presupuesto = Number(presupuesto);
     this.restante = Number(presupuesto);
     this.gastos = [];
     }

     nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
     }
}
class Interfaz {
        insertarPresupuesto( cantidad ){

            const {presupuesto, restante} = cantidad;

            document.querySelector('#total').textContent = presupuesto;
            document.querySelector('#restante').textContent = restante;

        }

        imprimirAlerta(mensaje, tipo){
            //Crear el div
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('text-center', 'alert');

            if(tipo === 'error'){
                divMensaje.classList.add('alert-danger');
            }
            else{
                divMensaje.classList.add('alert-success');
            }
            divMensaje.textContent = mensaje;

            document.querySelector('.primario').insertBefore(divMensaje, formulario);

            setTimeout(() => {
                divMensaje.remove();
            }, 3000);
        }
}

// Instanciar
const ui = new Interfaz();
let presupuesto;
//Funciones 

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cual es tu Presupuesto?');

  //  console.log( Number(presupuestoUsuario) );

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);
   // console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}

function agregarGastos (e){
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if(nombre === '' | cantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }
    else if (cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida', 'error');
        return;
    }

    //Generar un objeto con el gasto

    const gasto = { nombre, cantidad, id: Date.now() } //Object literal
    //añade un nuevo gasto

    presupuesto.nuevoGasto(gasto );

    //MENSAJE DE TODO BIEN
    
    ui.imprimirAlerta('Gasto agregado Correctamente')
    //Reiniciar el formulario
    formulario.reset();

}