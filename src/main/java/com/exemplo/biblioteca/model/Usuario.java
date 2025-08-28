package com.exemplo.biblioteca.model;


public class Usuario {
    private Long id;
    private String nome;
    private String email;

    public Usuario(Long id, String nome, String email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    // getters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
}
