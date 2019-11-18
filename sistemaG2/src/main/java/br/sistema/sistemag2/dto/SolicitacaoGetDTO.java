package br.sistema.sistemag2.dto;

import br.sistema.sistemag2.models.Anexo;
import br.sistema.sistemag2.models.Solicitacao;
import java.util.List;
import lombok.Data;

/**
 * AvaliacaoGetDTO
 */
@Data
public class SolicitacaoGetDTO {

    Solicitacao solicitacao;
    List<Anexo> anexosDaSolicitacao;
}