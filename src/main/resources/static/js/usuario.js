document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    const menuLogin = document.getElementById("menuLogin");
    const menuCadastro = document.getElementById("menuCadastro");
    const menuUsuario = document.getElementById("menuUsuario");
    const menuSair = document.getElementById("menuSair");

    if (usuarioLogado) {
        // Esconde login/cadastro
        menuLogin.style.display = "none";
        menuCadastro.style.display = "none";

        // Mostra nome do usuário
        menuUsuario.style.display = "block";
        menuUsuario.innerHTML = `<span>👋 Bem-vindo, <strong>${usuarioLogado.nome}</strong></span>`;

        // Mostra botão sair
        menuSair.style.display = "block";

        // Logout
        menuSair.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioLogado");
            window.location.reload(); // recarrega a página
        });

    } else {
        // Usuário não logado → mostra login/cadastro
        menuLogin.style.display = "block";
        menuCadastro.style.display = "block";
        menuUsuario.style.display = "none";
        menuSair.style.display = "none";
    }
});
