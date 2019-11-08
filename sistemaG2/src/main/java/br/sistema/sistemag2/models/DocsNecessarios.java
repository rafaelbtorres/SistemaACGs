package br.sistema.sistemag2.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Data;
/**
 * DocsNecessarios
 */
@Entity
@Data
public class DocsNecessarios {

    @Id
	@NotEmpty
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long idDocNecessario;

    @NotNull
    @Size(min=5);
    String nome;

}
