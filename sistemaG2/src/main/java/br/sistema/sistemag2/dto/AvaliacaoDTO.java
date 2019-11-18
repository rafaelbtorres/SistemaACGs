package br.sistema.sistemag2.dto;

import lombok.Data;

/**
 * AvaliacaoDTO
 */
@Data
public class AvaliacaoDTO {

    private long cargaHorariaAtribuida;
    private long idAtividade;
    private String parecer;
    private boolean deferido;
    private String nomeCoordenador;

}