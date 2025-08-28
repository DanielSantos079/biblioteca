// ===== Carregar Livros =====
async function carregarLivros() {
  try {
    const response = await fetch("/data/livros.json");
    const livros = await response.json();
    window._livros = livros; // guardar global

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
  if (!grid) return;

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
    favoritos = favoritos.filter(favId => favId !== id); // remover
  } else {
    favoritos.push(id); // adicionar
  }

  salvarFavoritos(favoritos);
  abrirModal(id); // re-renderiza botão
}

// ===== Modal de Detalhes =====
let livroSelecionado = null;

function abrirModal(id) {
  const livro = window._livros.find(l => l.id === id);
  if (!livro) return;

  livroSelecionado = livro; // guarda referência

  // Preencher os campos do modal (já existentes no HTML)
  document.getElementById("tituloDetalhes").textContent = livro.titulo;
  document.getElementById("capaDetalhes").src = livro.imagem;
  document.getElementById("capaDetalhes").alt = livro.titulo;
  document.getElementById("autorDetalhes").textContent = livro.autor;
  document.getElementById("descricaoDetalhes").textContent = livro.descricao;
  document.getElementById("categoriaDetalhes").textContent = livro.categoria;

  // Botão de favorito
  const btnFav = document.getElementById("btnFavorito");
  btnFav.textContent = isFavorito(livro.id) ? "✅ Remover dos Favoritos" : "⭐ Adicionar aos Favoritos";
  btnFav.onclick = () => favoritar(livro.id);

  // Botão de aluguel
  document.getElementById("btnAlugar").onclick = () => alugarLivro();

  // Abrir modal
  document.getElementById("modalLivro").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modalLivro").style.display = "none";
}

// ===== Aluguel de Livros =====
function alugarLivro() {
  let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado) {
    alert("⚠ Você precisa estar logado para alugar um livro.");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let usuarioIndex = usuarios.findIndex(u => u.email === usuarioLogado.email);

  if (usuarioIndex === -1) {
    alert("Usuário não encontrado.");
    return;
  }

  if (!usuarios[usuarioIndex].alugueis) {
    usuarios[usuarioIndex].alugueis = [];
  }

  if (usuarios[usuarioIndex].alugueis.includes(livroSelecionado.id)) {
    alert("⚠ Você já alugou este livro.");
    return;
  }

  usuarios[usuarioIndex].alugueis.push(livroSelecionado.id);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarios[usuarioIndex]));

  alert(`✅ Livro "${livroSelecionado.titulo}" alugado com sucesso!`);
  fecharModal();
}

// ===== Iniciar Página =====
carregarLivros();
