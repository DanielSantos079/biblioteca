package com.exemplo.biblioteca.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Aluguel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long usuarioId;
    private Long livroId;
    private LocalDate dataAluguel;
    private LocalDate dataDevolucao;

    @Column(nullable = false)
    private boolean ativo = true; // por padrão, aluguel começa ativo
}
