package com.exemplo.biblioteca.controller;

import com.exemplo.biblioteca.model.Livro;
import com.exemplo.biblioteca.model.Aluguel;
import com.exemplo.biblioteca.service.BibliotecaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/biblioteca")
@CrossOrigin(origins = "*") // permite acesso do frontend (importante no navegador)
public class BibliotecaController {

    @Autowired
    private BibliotecaService bibliotecaService;

    // ----------------- LIVROS -----------------

    // Listar todos os livros
    @GetMapping("/livros")
    public List<Livro> listarLivros() {
        return bibliotecaService.listarLivros();
    }

    // Buscar livro por ID
    @GetMapping("/livros/{id}")
    public Livro buscarLivro(@PathVariable Long id) {
        return bibliotecaService.buscarLivroPorId(id);
    }

    // Cadastrar um livro novo
    @PostMapping("/livros")
    public Livro salvarLivro(@RequestBody Livro livro) {
        return bibliotecaService.salvarLivro(livro);
    }

    // ----------------- ALUGUÉIS -----------------

    // Alugar um livro
    @PostMapping("/alugar")
    public Aluguel alugarLivro(@RequestParam Long livroId, @RequestParam Long usuarioId) {
        return bibliotecaService.alugarLivro(livroId, usuarioId);
    }

    // Listar aluguéis de um usuário
    @GetMapping("/alugueis/{usuarioId}")
    public List<Aluguel> listarAlugueis(@PathVariable Long usuarioId) {
        return bibliotecaService.listarAlugueisPorUsuario(usuarioId);
    }

    // Devolver livro
    @PostMapping("/devolver/{aluguelId}")
    public boolean devolverLivro(@PathVariable Long aluguelId) {
        return bibliotecaService.devolverLivro(aluguelId);
    }
}
