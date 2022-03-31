//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
eventListeners();
function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
    });
}

//Funciones

function agregarTweet(e){
    e.preventDefault();

    //Textarea donde el usuario escribe..

    const tweet = document.querySelector('#tweet').value;

    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');

        return; // evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }
    //añadir  los tweets 
    tweets = [...tweets, tweetObj];

    //Una vez agregado creamos el HTML
    crearHTML();
    //Reiniciar el formulario

    formulario.reset();
}

//Mostrar mensaje de error

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);


    setTimeout(() => {
        mensajeError.remove();
    },3000);
}
//Muestra un listado de los tweets
function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            //Agregar boton

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';
            //añadir la funcion eliminar

            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }
            //Crear el HTML 
            const li = document.createElement('li');

            //añadir el texto
            li.innerText = tweet.tweet;

            //añadir el boton X

            li.appendChild(btnEliminar);

            //insertarlo en el html

            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

//Agerga los tweets actuales a localstorage

function sincronizarStorage (){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);

    }
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

