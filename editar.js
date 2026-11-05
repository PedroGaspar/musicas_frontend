const urlBackend = "http://localhost:3001";

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const formEditar = document.getElementById("formEditar");

async function buscarMusica() {

    const resposta = await fetch(urlBackend);

    const musicas = await resposta.json();

    const musica = musicas.find((item) => item.id == id);

    if (!musica) {
        alert("Música não encontrada!");
        return;
    }

    document.getElementById("titulo").value = musica.titulo;
    document.getElementById("artista").value = musica.artista;
    document.getElementById("genero").value = musica.genero;
    document.getElementById("ano").value = musica.ano;
    document.getElementById("duracao").value = musica.duracao;
}

async function editarMusica(event) {

    event.preventDefault();

    const musicaAtualizada = {
        titulo: document.getElementById("titulo").value,
        artista: document.getElementById("artista").value,
        genero: document.getElementById("genero").value,
        ano: Number(document.getElementById("ano").value),
        duracao: Number(document.getElementById("duracao").value)
    };

    const resposta = await fetch(`${urlBackend}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(musicaAtualizada)
    });

    if (resposta.ok) {
        alert("Música atualizada com sucesso!");
        window.location.href = "index.html";
    } else {
        alert("Erro ao atualizar música!");
    }
}

formEditar.addEventListener("submit", editarMusica);

buscarMusica();