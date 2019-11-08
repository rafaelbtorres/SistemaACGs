package br.sistema.sistemag2.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

/**
 * Avaliacao
 */
@Entity
@Data
public class AvaliacaoSolicitacao {

    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long idAvaliacao;

    private String justificativa;//obrigatório if indeferido

	@NotEmpty
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date dataAvaliacao;//atual

	@Positive
	private long cargaHorariaAtribuida;//obrigatório if deferido

	@OneToOne
	@JsonBackReference
	@NotNull(message = "Solicitação inválida.")
    private Solicitacao solicitacao;

	public AvaliacaoSolicitacao(){}

    
}