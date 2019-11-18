package br.sistema.sistemag2.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

/**
 * SolicitacaoPostDTO
 */
@Data
public class SolicitacaoPostDTO {

	private String local;
	private long matricula;
	private String aluno;
	@JsonFormat(pattern="yyyy-MM-dd")
	private String dataInicio;
	@JsonFormat(pattern="yyyy-MM-dd")
	private String dataFim;
	private long cargaHorariaSoli;
	private String profRes;
	private String descricao;
	private long idAtividade;
}