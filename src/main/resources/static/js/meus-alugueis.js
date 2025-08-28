const API_URL = "http://localhost:8080/api/biblioteca"; // endereço do backend

// ================== LIVROS ==================

// Buscar livros no backend
async function carregarLivros() {
  try {
    let response = await fetch(`${API_URL}/livros`);
    if (!response.ok) throw new Error("Erro ao buscar livros");

    let livros = await response.json();
    console.log("Livros disponíveis:", livros);
    return livros;
  } catch (error) {
    console.error("Erro:", error);
    return [];
  }
}

// ================== ALUGAR ==================

// Função para alugar um livro no backend
async function alugarLivro(livroId) {
  try {
    let usuarioId = 1; // ID do usuário logado
    let response = await fetch(`${API_URL}/alugar?livroId=${livroId}&usuarioId=${usuarioId}`, {
      method: "POST"
    });

    if (!response.ok) throw new Error("Erro ao alugar livro");

    let aluguel = await response.json();
    alert(`Você alugou "${aluguel.livro.titulo}". Prazo: até ${new Date(aluguel.dataDevolucao).toLocaleDateString()}`);

    carregarAlugueis(); // atualiza lista
  } catch (error) {
    console.error("Erro:", error);
    alert("Não foi possível alugar o livro.");
  }
}

// ================== LISTAR ALUGUÉIS ==================

async function carregarAlugueis() {
  try {
    let usuarioId = 1; // ID do usuário logado
    let response = await fetch(`${API_URL}/alugueis/${usuarioId}`);
    if (!response.ok) throw new Error("Erro ao buscar aluguéis");

    let alugueis = await response.json();
    let lista = document.getElementById("listaAlugueis");

    if (!lista) return;

    lista.innerHTML = "";

    if (alugueis.length === 0) {
      lista.innerHTML = "<p>Você não possui livros alugados.</p>";
      return;
    }

    alugueis.forEach((aluguel) => {
      let prazo = new Date(aluguel.dataDevolucao);
      let hoje = new Date();
      let diasRestantes = Math.ceil((prazo - hoje) / (1000 * 60 * 60 * 24));

      let card = document.createElement("div");
      card.classList.add("card-aluguel");

      card.innerHTML = `
        <img src="${aluguel.livro.imagem}" alt="${aluguel.livro.titulo}">
        <h3>${aluguel.livro.titulo}</h3>
        <p>Autor: ${aluguel.livro.autor}</p>
        <p><strong>Prazo: ${prazo.toLocaleDateString()}</strong></p>
        <p style="color:${diasRestantes <= 2 ? 'red' : 'green'};">
          ${diasRestantes > 0 ? diasRestantes + " dias restantes" : "Prazo expirado!"}
        </p>
        <button class="devolver" onclick="devolverLivro(${aluguel.id})">Devolver</button>
      `;

      lista.appendChild(card);
    });

  } catch (error) {
    console.error("Erro:", error);
  }
}

// ================== DEVOLVER ==================

async function devolverLivro(aluguelId) {
  try {
    let response = await fetch(`${API_URL}/devolver/${aluguelId}`, {
      method: "POST"
    });

    if (!response.ok) throw new Error("Erro ao devolver livro");

    let sucesso = await response.json();
    if (sucesso) {
      alert("Livro devolvido com sucesso!");
      carregarAlugueis();
    } else {
      alert("Não foi possível devolver o livro.");
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}

// ================== EXIBIR LIVROS DISPONÍVEIS ==================

async function mostrarLivros() {
  let livros = await carregarLivros();
  let lista = document.getElementById("listaAlugueis"); //

  if (!lista) return;

  lista.innerHTML = "";

  if (livros.length === 0) {
    lista.innerHTML = "<p>Nenhum livro disponível no momento.</p>";
    return;
  }

  livros.forEach((livro) => {
    let card = document.createElement("div");
    card.classList.add("card-livro");

    card.innerHTML = `
      <img src="${livro.imagem}" alt="${livro.titulo}">
      <h3>${livro.titulo}</h3>
      <p>Autor: ${livro.autor}</p>
      <p>${livro.alugado ? "<strong style='color:red'>Indisponível</strong>" : "<strong style='color:green'>Disponível</strong>"}</p>
      <button ${livro.alugado ? "disabled" : ""} onclick="alugarLivro(${livro.id})">
        Alugar
      </button>
    `;

    lista.appendChild(card);
  });
}

// ================== INÍCIO ==================
window.onload = () => {
  mostrarLivros();   // mostra livros disponíveis
  carregarAlugueis(); // mostra aluguéis do usuário
};
