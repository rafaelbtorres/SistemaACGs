package br.sistema.sistemag2.dto;

import br.sistema.sistemag2.models.Solicitacao;
import lombok.Data;

/**
 * AvaliacaoDTO
 */
@Data
public class AvaliacaoDTO {

	private long cargaHorariaAtribuida;
    private Solicitacao solicitacao;
    private String parecer;
    private boolean deferido;

}