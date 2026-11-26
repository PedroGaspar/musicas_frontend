
const urlBackend = "http://localhost:3001"

const parametros = new URLSearchParams(window.location.search)
const id = parametros.get("id")

const inputTitulo = document.getElementById("titulo")
const inputArtista = document.getElementById("artista")
const inputGenero = document.getElementById("genero")
const inputAno = document.getElementById("ano")
const inputDuracao = document.getElementById("duracao")

const formEditar = document.getElementById("formEditar")

async function buscarMusica() {
    try {
        const resposta = await fetch(`${urlBackend}/musica/${id}`)

        if (!resposta.ok) {
            throw new Error("Erro ao buscar música!")
        }

        const musica = await resposta.json()

        if (!musica) {
            alert("Música não encontrada!")
            return
        }

        inputTitulo.value = musica.titulo
        inputArtista.value = musica.artista
        inputGenero.value = musica.genero
        inputAno.value = musica.ano
        inputDuracao.value = musica.duracao

    } catch (error) {
        console.log(error)
        alert("Erro ao buscar música!")
    }
}

async function editarMusica(event) {
    event.preventDefault()

    const musicaAtualizada = {
        titulo: inputTitulo.value,
        artista: inputArtista.value,
        genero: inputGenero.value,
        ano: Number(inputAno.value),
        duracao: Number(inputDuracao.value)
    }

    try {
        const resposta = await fetch(`${urlBackend}/editar/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(musicaAtualizada)
        })

        if (resposta.ok) {
            alert("Música alterada com sucesso!")
            window.location.href = "index.html"
        } else {
            const erro = await resposta.text()
            console.log(erro)
            alert("Erro ao atualizar música!")
        }

    } catch (error) {
        console.log(error)
        alert("Erro ao conectar com o backend!")
    }
}

formEditar.addEventListener("submit", editarMusica)

buscarMusica()
