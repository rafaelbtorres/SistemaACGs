/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Entity
@Data
public class Curriculo {


	@Id
	@NotEmpty
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idCurriculo;
	
	@NotEmpty
	private int ano;

	@NotEmpty
	private boolean status;

	// @OneToMany(mappedBy = "curriculo")
	// private List<Grupo> grupo;

}
