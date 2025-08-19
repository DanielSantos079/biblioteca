//CADASTRO DE CLIENTES!!

// Escuta o envio do formulário
document.getElementById("formCadastro").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Pega cadastros existentes ou cria array vazio
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se já existe o email cadastrado
    const jaExiste = usuarios.some(user => user.email === email);
    if (jaExiste) {
        document.getElementById("mensagem").innerText = "❌ Este email já está cadastrado!";
        return;
    }

    // Cria novo usuário
    const novoUsuario = { nome, email, senha };

    // Adiciona ao array e salva no localStorage
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Feedback para o usuário
    document.getElementById("mensagem").innerText = "✅ Usuário cadastrado com sucesso!";
    document.getElementById("formCadastro").reset();
});