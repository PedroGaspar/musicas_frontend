
const urlBackend = "http://localhost:3001";

const listaMusicas = document.getElementById("listaMusicas");

async function buscarMusicas() {
    if (!listaMusicas) {
        console.error("Elemento listaMusicas não encontrado no HTML!");
        return;
    }

    try {
        const resposta = await fetch(urlBackend);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar músicas no servidor.");
        }

        const musicas = await resposta.json();

        listaMusicas.innerHTML = "";

        if (!Array.isArray(musicas) || musicas.length === 0) {
            listaMusicas.innerHTML = "<p>Nenhuma música cadastrada.</p>";
            return;
        }

        musicas.forEach((musica) => {
            listaMusicas.innerHTML += `
                <div class="card">
                    <h2>${musica.titulo}</h2>
                    <p>Artista: ${musica.artista}</p>
                    <p>Gênero: ${musica.genero}</p>
                    <p>Ano: ${musica.ano}</p>
                    <p>Duração: ${musica.duracao}</p>
                    <a href="editar.html?id=${musica.id}">Editar</a>
                    <button class="apagar" onclick="apagarMusica(${musica.id})">
                        Apagar
                    </button>
                </div>
            `;
        });

    } catch (error) {
        console.error("Erro:", error);
        listaMusicas.innerHTML = "<p>Não foi possível carregar as músicas.</p>";
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
        console.error("Erro:", error);
        alert("Erro ao conectar com o backend!");
    }
}

buscarMusicas();
