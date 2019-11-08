package br.sistema.sistemag2.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

import lombok.Data;

/**
 * Observacao
 */
@Entity
@Data
public class Infos {
    @Id
	@NotEmpty
	@GeneratedValue
    private long idObservacao;

	private String observacao;

	@NotEmpty
    private int ch;

}
