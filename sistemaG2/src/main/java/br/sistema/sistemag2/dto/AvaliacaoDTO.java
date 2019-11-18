package br.sistema.sistemag2.dto;

import br.sistema.sistemag2.models.Solicitacao;
import lombok.Data;

/**
 * AvaliacaoDTO
 */
@Data
public class AvaliacaoDTO {

    private long cargaHorariaAtribuida;
    private long idSolicitacao;
    private long idAtividade;
    private String parecer;
    private boolean deferido;
    private String nomeCoordenador;

}