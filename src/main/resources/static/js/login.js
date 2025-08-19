// PARTE DO LOGIN!!
document.getElementById("formLogin").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Pega usuários cadastrados
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se existe um usuário com email e senha corretos
    const usuarioValido = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuarioValido) {
        document.getElementById("mensagem").innerText = "✅ Login realizado com sucesso!";
        document.getElementById("mensagem").style.color = "green";

        // Exemplo: salvar usuário logado
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));

        // Opcional: redirecionar para página inicial da biblioteca
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    } else {
        document.getElementById("mensagem").innerText = "❌ Email ou senha incorretos!";
        document.getElementById("mensagem").style.color = "red";
    }
});