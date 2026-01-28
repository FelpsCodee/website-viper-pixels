async function buscarPixels(categoria = '') {

    const response = await fetch(`/api/pixels?categoria=${categoria}`);
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

function filtrar(tipo){
    buscarPixels(tipo);
}

buscarPixels();

let MapaSelecionado = '';

function selecionarMapa(nome){
    mapaAtual = nome;

    document.getElementById('tela-mapas').style.display = 'none';
    document.getElementById('tela-pixels').style.display = 'block';
    document.getElementById('titulo-mapa').innerHTML = nome;
    buscarPixels();

}

function voltar(){
    document.getElementById('tela-mapas').style.display = 'block';
    document.getElementById('tela-pixels').style.display = 'none';
}