let mapaSelecionado = '';
let ladoSelecionado = '';
function filtrar(tipo){
    buscarPixels(tipo);
}

function selecionarMapa(nome){
    mapaSelecionado = nome;
    
    document.getElementById('tela-mapas').style.display = 'none';
    document.getElementById('tela-lado').style.display = 'block';
    

}

function selecionarLado(lado){
    ladoSelecionado = lado;
    
    document.getElementById('tela-lado').style.display = 'none';
    document.getElementById('filtro-pixels').style.display = 'block';
    document.getElementById('titulo-mapa').innerHTML = `${mapaSelecionado} - ${ladoSelecionado}`;

    buscarPixels(); 
}

function voltar(){
    document.getElementById('filtro-pixels').style.display = 'none';
    document.getElementById('tela-lado').style.display = 'block';

}
;async function buscarPixels(categoria = '') {

    const url =`/api/pixels?mapa=${mapaSelecionado}&lado=${ladoSelecionado}&categoria=${categoria}`;
    const response = await fetch(url);
    const pixels = await response.json();

    const container = document.getElementById('lista-pixels');
    container.innerHTML = '';

    pixels.forEach(pixel => {
        const div = document.createElement('div');
        div.className = 'card-pixel';
        div.innerHTML = `
            <h3>${pixel.local} - ${pixel.mapa}</h3>
            <p>Tipo: ${pixel.categoria}</p>
            <video width="320" controls>
                <source src="http://localhost:3000${pixel.video}" type="video/mp4">
            </video>
        `;
        container.appendChild(div);
    });
}


function executarBusca(){
    const userinput = document.getElementById('inputbusca').value.toLowerCase();

    const allcards = document.querySelectorAll('.card-pixel');

    allcards.forEach(card => {

        const tituloCard = card.querySelector('h3').innerText.toLowerCase();
        if (tituloCard.includes(userinput)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}
function voltarParaMapas() {
    document.getElementById('tela-lado').style.display = 'none';
    document.getElementById('tela-mapas').style.display = 'block';
}

