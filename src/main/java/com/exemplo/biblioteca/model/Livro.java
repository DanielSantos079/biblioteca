package com.exemplo.biblioteca.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String autor;
    private String imagem;

    @Column(nullable = false)
    private boolean alugado = false; // por padrão, o livro está disponível
}
