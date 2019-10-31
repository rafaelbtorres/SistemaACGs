package br.unipampa.acg.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class SolicitacaoDto {

    private String local;
    private String aluno;
    private long matricula;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String dataInicio;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String dataFim;
    private long cargaHoraria;
    private String profResponsavel;
    private String descricao;
    private long idAtividade;
}