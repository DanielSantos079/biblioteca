package com.exemplo.biblioteca.repository;

import com.exemplo.biblioteca.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
    // Se quiser, pode adicionar métodos customizados depois, exemplo:
    // List<Livro> findByTituloContainingIgnoreCase(String titulo);
}
