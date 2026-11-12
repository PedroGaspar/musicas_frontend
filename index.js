const urlBackend = "http://localhost:3001";
const listaMusicas = document.getElementById("listaMusicas");

async function buscarMusicas() {
    try {
        const resposta = await fetch(urlBackend);
        const musicas = await resposta.json();

        listaMusicas.innerHTML = "";

        musicas.forEach((musica) => {
            listaMusicas.innerHTML += `
                <div class="card">
                    <h2>${musica.titulo}</h2>
                    <p>Artista: ${musica.artista}</p>
                    <p>Gênero: ${musica.genero}</p>
                    <p>Ano: ${musica.ano}</p>
                    <p>Duração: ${musica.duracao}</p>
                    <a href="editar.html?id=${musica.id}">Editar</a>
                    <button class="apagar" onclick="apagarMusica(${musica.id})">Apagar</button>
                </div>
            `;
        });
    } catch (error) {
        console.log(error);
        alert("Erro ao buscar músicas!");
    }
}

async function apagarMusica(id) {
    const confirmou = confirm("Tem certeza que quer apagar essa música?");

    if (!confirmou) {
        return;
    }

    try {
        const resposta = await fetch(`${urlBackend}/apagar/${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            alert("Música apagada com sucesso!");
            buscarMusicas();
        } else {
            alert("Erro ao apagar música!");
        }
    } catch (error) {
        console.log(error);
        alert("Erro ao conectar com o backend!");
    }
}

buscarMusicas();