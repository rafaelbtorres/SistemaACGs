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
import lombok.Data;

@Entity
@Data
public class Atividade {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long idAtividade;

    private String docsNecessarios;

    private String descricao;

    private String observacao;

    private int ch;

    @Override
    public String toString() {
        return "{ "
                + "\"idAtividade \" : \"" + getIdAtividade() + "\","
                + "\"docsNecessarios \" : \"" + getDocsNecessarios() + "\","
                + "\"descricao \" : \"" + getDescricao() + "\","
                + "\"observacao \" : \"" + getObservacao() + "\","
                + "\"ch \" : \"" + getCh() + "\","
                + "}";
    }

}
