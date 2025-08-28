package com.exemplo.biblioteca.service;

import com.exemplo.biblioteca.model.Livro;
import com.exemplo.biblioteca.model.Aluguel;
import com.exemplo.biblioteca.repository.LivroRepository;
import com.exemplo.biblioteca.repository.AluguelRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BibliotecaServiceImpl implements BibliotecaService {

    private final LivroRepository livroRepository;
    private final AluguelRepository aluguelRepository;

    public BibliotecaServiceImpl(LivroRepository livroRepository, AluguelRepository aluguelRepository) {
        this.livroRepository = livroRepository;
        this.aluguelRepository = aluguelRepository;
    }

    @Override
    public List<Livro> listarLivros() {
        return livroRepository.findAll();
    }

    @Override
    public Livro buscarLivroPorId(Long id) {
        return livroRepository.findById(id).orElse(null);
    }

    @Override
    public Livro salvarLivro(Livro livro) {
        return livroRepository.save(livro);
    }

    @Override
    public Aluguel alugarLivro(Long livroId, Long usuarioId) {
        Optional<Livro> optLivro = livroRepository.findById(livroId);
        if (optLivro.isEmpty()) return null;

        Livro livro = optLivro.get();
        if (livro.isAlugado()) return null; // já está alugado

        livro.setAlugado(true);
        livroRepository.save(livro);

        Aluguel aluguel = new Aluguel();
        aluguel.setLivroId(livroId);
        aluguel.setUsuarioId(usuarioId);
        aluguel.setDataAluguel(LocalDate.now());
        aluguel.setDataDevolucao(LocalDate.now().plusDays(7));
        aluguel.setAtivo(true);

        return aluguelRepository.save(aluguel);
    }

    @Override
    public List<Aluguel> listarAlugueisPorUsuario(Long usuarioId) {
        return aluguelRepository.findByUsuarioId(usuarioId);
    }

    @Override
    public boolean devolverLivro(Long aluguelId) {
        Optional<Aluguel> optAluguel = aluguelRepository.findById(aluguelId);
        if (optAluguel.isEmpty()) return false;

        Aluguel aluguel = optAluguel.get();
        if (!aluguel.isAtivo()) return false; // já devolvido

        // marcar como devolvido
        aluguel.setAtivo(false);
        aluguelRepository.save(aluguel);

        // liberar livro
        Optional<Livro> optLivro = livroRepository.findById(aluguel.getLivroId());
        optLivro.ifPresent(l -> {
            l.setAlugado(false);
            livroRepository.save(l);
        });

        return true;
    }
}
