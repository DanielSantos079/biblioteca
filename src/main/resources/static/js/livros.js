// ===== Carregar Livros =====
async function carregarLivros() {
  try {
    const response = await fetch("/data/livros.json");
    const livros = await response.json();
    renderLivros(livros);

    // Filtro em tempo real
    document.getElementById("buscaLivros").addEventListener("input", (e) => {
      const termo = e.target.value.toLowerCase();
      const filtrados = livros.filter(l => l.titulo.toLowerCase().includes(termo));
      renderLivros(filtrados);
    });

  } catch (error) {
    console.error("Erro ao carregar os livros:", error);
  }
}

// ===== Renderizar Livros =====
function renderLivros(lista) {
  const grid = document.querySelector(".grid-livros");
  grid.innerHTML = "";
  lista.forEach(livro => {
    grid.innerHTML += `
      <div class="card-livro" onclick="abrirModal(${livro.id})">
        <img src="${livro.imagem}" alt="${livro.titulo}">
        <h3>${livro.titulo}</h3>
        <p class="autor">${livro.autor}</p>
        <span class="categoria">${livro.categoria}</span>
      </div>
    `;
  });

  // Guardar livros em memória global
  window._livros = lista;
}

// ===== Modal de Detalhes =====
function abrirModal(id) {
  const livro = window._livros.find(l => l.id === id);
  if (!livro) return;

  const modal = document.getElementById("modalLivro");
  const conteudo = document.getElementById("modalConteudo");

  conteudo.innerHTML = `
    <h2>${livro.titulo}</h2>
    <img src="${livro.capa}" alt="${livro.titulo}">
    <p><strong>Autor:</strong> ${livro.autor}</p>
    <p>${livro.descricao}</p>
    <p><strong>Categoria:</strong> ${livro.categoria}</p>
    <button onclick="favoritar(${livro.id})">
      ${isFavorito(livro.id) ? "✅ Remover dos Favoritos" : "⭐ Adicionar aos Favoritos"}
    </button>
  `;

  modal.style.display = "flex";
}

// Fechar Modal
function fecharModal() {
  document.getElementById("modalLivro").style.display = "none";
}

// ===== Persistência (Favoritos no localStorage) =====
function getFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
}

function salvarFavoritos(lista) {
  localStorage.setItem("favoritos", JSON.stringify(lista));
}

function isFavorito(id) {
  const favoritos = getFavoritos();
  return favoritos.includes(id);
}

function favoritar(id) {
  let favoritos = getFavoritos();

  if (favoritos.includes(id)) {
    // remover
    favoritos = favoritos.filter(favId => favId !== id);
  } else {
    // adicionar
    favoritos.push(id);
  }

  salvarFavoritos(favoritos);
  abrirModal(id); // re-renderiza botão no modal
}

// ===== Iniciar Página =====
carregarLivros();
