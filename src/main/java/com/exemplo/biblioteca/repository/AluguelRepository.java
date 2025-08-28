package com.exemplo.biblioteca.repository;

import com.exemplo.biblioteca.model.Aluguel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AluguelRepository extends JpaRepository<Aluguel, Long> {

    // Busca todos os aluguéis de um usuário específico
    List<Aluguel> findByUsuarioId(Long usuarioId);

    // Busca todos os aluguéis ativos
    List<Aluguel> findByAtivoTrue();

    // Busca todos os aluguéis de um livro específico
    List<Aluguel> findByLivroId(Long livroId);
}
