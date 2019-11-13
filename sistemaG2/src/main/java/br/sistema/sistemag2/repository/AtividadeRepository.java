package br.sistema.sistemag2.repository;

import br.sistema.sistemag2.models.Atividade;
import br.sistema.sistemag2.models.Grupo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

/**
 * AtividadeRepository
 */
public interface AtividadeRepository extends CrudRepository<Atividade, Long> {

    List<Atividade> findAllByGrupo(Grupo grupo);

}