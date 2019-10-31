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
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Entity
@Data
public class Atividade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idAtividade;

    @NotEmpty
    private String docsNecessarios;

    @NotEmpty
    private String detalhadamento;

    @NotEmpty
    private String descricao;

    private String observacao;

    @NotEmpty
    private int ch;

    @ManyToOne
    private Grupo grupo;
}
