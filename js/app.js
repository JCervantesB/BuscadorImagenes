const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const registrosPorPagina = 40;
let totalPaginas;

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
};

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if (terminoBusqueda === '') {
        mostrarAlerta('Agrega un término de búsqueda');
        return;
    }

    buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje) {
    const existeAlerta = document.querySelector('.bg-red-100');
    if (!existeAlerta) {

        const alerta = document.createElement('P');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;

        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function buscarImagenes(termino) {
    const key = '24712087-6d8be997415da02299e257980';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPorPagina}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits);
            mostrarImagenes(resultado.hits);
        });
}

function calcularPaginas(total) {
    return (Math.ceil(total / registrosPorPagina));
}

function mostrarImagenes(imagenes) {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    // Iterar sobre el arreglo y construir html
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;

        resultado.innerHTML += `
            <div class="w-1/2 md:1/3 lg:w-1/4 p-3 mb-4">
                <div class="card bg-white">
                
                    <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                        <img class="imagen w-full" src="${previewURL}">
                    </a>
                    <div class="p-4">
                        <p class="font-bold"> ${likes} <span class="font-light"> Me Gusta </span> </p>
                        <p class="font-bold"> ${views} <span class="font-light"> Veces Vista </span> </p>
                    </div>                    
                </div>                
            </div>
        `;

    });
}