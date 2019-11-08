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

public class Infos {

    private long idObservacao;

	private String observacao;


    private int ch;

}
