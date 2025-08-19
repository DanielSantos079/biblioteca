// Simulação de um "banco" de livros
const livros = [
    { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", capa: "/img/capa-o-senhor-dos-aneis.jpg" },
    { titulo: "Dom Casmurro", autor: "Machado de Assis", capa: "/img/Dom-Casmurro.jpg" },
    { titulo: "1984", autor: "George Orwell", capa: "/img/1984.jpg" },
    { titulo: "Clean Code", autor: "Robert C. Martin", capa: "/img/Clean_Code.jpg" }
];

// Seleciona a div onde os livros serão exibidos
const containerLivros = document.querySelector(".livros");
const campoBusca = document.getElementById("campoBusca");

// Função para exibir os livros na tela
function exibirLivros(lista) {
    containerLivros.innerHTML = ""; // limpa antes de renderizar
    if (lista.length === 0) {
        containerLivros.innerHTML = "<p>Nenhum livro encontrado.</p>";
        return;
    }

    lista.forEach(livro => {
        const divLivro = document.createElement("div");
        divLivro.classList.add("livro");

        divLivro.innerHTML = `
            <img src="${livro.capa}" alt="Capa de ${livro.titulo}">
            <p><strong>${livro.titulo}</strong></p>
            <p>${livro.autor}</p>
        `;

        containerLivros.appendChild(divLivro);
    });
}

// Função de busca
function buscarLivro(termo) {
    const filtrados = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo)
    );
    exibirLivros(filtrados);
}

// Renderiza todos os livros ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    exibirLivros(livros);
});

// Escuta a digitação em tempo real
campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.toLowerCase();
    buscarLivro(termo);
});







