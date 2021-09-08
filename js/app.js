const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);

})

function buscarClima(e) {
    e.preventDefault();

    ciudad = document.querySelector('#ciudad').value
    pais = document.querySelector('#pais').value

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios')
        return;
    }
    
    consultarAPI(ciudad,pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-300');
    if (!alerta) {
        // Creando una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-300', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-5', 'text-center');
        alerta.innerHTML = `
            <strong class = "font-bold"> Error!</strong>
            <span class="block">${mensaje}</span>
        `;
        formulario.appendChild(alerta);

        // se elimina la alerta despues de 3 segundos
        setTimeout(()=>{
            alerta.remove();
        },3000);
    }
}

function consultarAPI(ciudad,pais){

    Spinner();

    const appId = '9b1d992b2e0de356cf42243e47202c6b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    
    fetch(url)
        .then(respuesta=>respuesta.json())
        .then(datos=>{
            // limpiar HTML previo
            limpiarHTML();
            if(datos.cod === '404'){
                mostrarError('Ciudad no encontrada');
                return;
            }
            // imprime la respuesta en el HTML
            mostrarClima(datos);
        })
}

function mostrarClima(datos){
    console.log(datos);
    const {name, main: {temp, temp_max, temp_min}, sys:{country}} = datos;
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);
    const icono = datos.weather[0].icon;
    console.log(icono);
    const nombreCiudad = document.createElement('p');
    
    nombreCiudad.textContent = `${name}, ${country}`;
    nombreCiudad.classList.add('font-bold','text-2xl');
    
    const divIcono = document.createElement('div');
    const imgIcono = document.createElement('img');
    imgIcono.setAttribute('src',`http://openweathermap.org/img/w/${icono}.png`);
    imgIcono.classList.add('m-auto')
    divIcono.appendChild(imgIcono);

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold','text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl')

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl')
    
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(divIcono);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados= grados => parseInt(grados - 273.15);

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}