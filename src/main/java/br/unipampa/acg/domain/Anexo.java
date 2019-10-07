/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.domain;

/**
 *
 * @author Vagner <vequincozes@gmail.com>
 */
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Entity
@Data
public class Anexo {

	@Id
	@NotEmpty
	@GeneratedValue
	private long idAnexo;

	@NotEmpty
	private int limite;

	@NotEmpty
	private String nome;

	@NotEmpty
	@OneToOne(mappedBy = "anexo")
	private Acg acg;


	public Anexo(String nome){
		this.nome = nome;
	}

}