package br.sistema.sistemag2.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Entity
@Data
public class Grupo {

	@Id
	@NotEmpty
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idGrupo;

	@NotEmpty
	private String nome;

	@ManyToOne
	@NotNull
	private Curriculo curriculo;

}
