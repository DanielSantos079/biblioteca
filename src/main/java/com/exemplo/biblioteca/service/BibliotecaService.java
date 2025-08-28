package com.exemplo.biblioteca.service;

import com.exemplo.biblioteca.model.Livro;
import com.exemplo.biblioteca.model.Aluguel;

import java.util.List;

public interface BibliotecaService {

    // Livros
    List<Livro> listarLivros();
    Livro buscarLivroPorId(Long id);
    Livro salvarLivro(Livro livro);

    // Aluguéis
    Aluguel alugarLivro(Long livroId, Long usuarioId);
    List<Aluguel> listarAlugueisPorUsuario(Long usuarioId);
    boolean devolverLivro(Long aluguelId);
}
