package br.sistema.sistemag2.dto;

import br.sistema.sistemag2.models.Atividade;
import br.sistema.sistemag2.models.Curriculo;
import br.sistema.sistemag2.models.Grupo;

import lombok.Data;

/**
 * DadosSolicitacaoDTO
 */
@Data
public class DadosSolicitacaoDTO {
    Iterable<Atividade> atividades;
    Iterable<Grupo> grupos;
    Iterable<Curriculo> curriculo;

    public DadosSolicitacaoDTO() {
    }
}