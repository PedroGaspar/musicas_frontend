
const urlBackend = "http://localhost:3001/cadastrar";

const inputTitulo = document.getElementById("titulo");
const inputArtista = document.getElementById("artista");
const inputGenero = document.getElementById("genero");
const inputAno = document.getElementById("ano");
const inputDuracao = document.getElementById("duracao");

const botaoCadastrar = document.getElementById("botaoCadastrar");

async function cadastrarMusica() {

    const titulo = inputTitulo.value;
    const artista = inputArtista.value;
    const genero = inputGenero.value;
    const ano = inputAno.value;
    const duracao = inputDuracao.value;

    try {

        const resposta = await fetch(urlBackend, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo,
                artista,
                genero,
                ano,
                duracao
            })
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar música!");
        }

        alert("Música cadastrada com sucesso!");

        window.location.href = "index.html";

    } catch (error) {

        console.log(error);
        alert("Erro ao cadastrar música!");

    }
}

botaoCadastrar.addEventListener("click", cadastrarMusica);
