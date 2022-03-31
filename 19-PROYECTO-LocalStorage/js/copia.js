//Variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Events listeners
eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);
    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded',() => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();

    });
}

//Functions


function agregarTweet(e){
    e.preventDefault();
    
    const tweet = document.querySelector('#tweet').value;

    //Validacion

    if(tweet === ''){
        mostrarError('Un mensaje no puede estar vacio.');

        return; //Evita que se ejecuten mas lineas de codigo 
    }

    const tweetObj = {
        id: Date.now,
        tweet
    }

    tweets = [...tweets, tweetObj];

    crearHTML();

    formulario.reset();

}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    //Insertar el Contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}
//Muestra un listado de los tweets
function crearHTML(){
    limpiarHTML();
        if(tweets.length > 0){
            tweets.forEach(tweet => {

                //Agregar el Boton Eliminar
                const btnEliminar = document.createElement('a');
                btnEliminar.classList.add('borrar-tweet');
                btnEliminar.innerText = 'X';

                //Añadir la funcion de borrar

                btnEliminar.onclick = () => {
                    borrarTweet(tweet.id);
                }

                //Crear el HTML 
                const li = document.createElement('li');

                //Añadir el texto 
                li.innerText = tweet.tweet;

                //Asignar el boton
                li.appendChild(btnEliminar);

                listaTweets.appendChild(li);
            });
        }

        sincronizarStorage();
}

  //Agrega los Tweets actuales a LocalStorage

 function sincronizarStorage(){
     localStorage.setItem('tweets', JSON.stringify(tweets));
 }

 //Borrar Tweet

 function borrarTweet(id) {
     tweets = tweets.filter( tweet => tweet.id !== id);

     crearHTML();
 }

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

