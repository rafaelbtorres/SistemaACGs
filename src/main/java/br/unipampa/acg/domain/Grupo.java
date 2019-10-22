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
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import lombok.Data;

@Entity
@Data
public class Grupo {

    @Id
    @GeneratedValue
    private long idGrupo;

    private String nome;

    @ManyToOne
    private Curriculo curriculo;

    @Override
    public String toString() {
        return "{ "
                + "\"idGrupo \" : \"" + getIdGrupo()+ "\","
                + "\"nome \" : \"" + getNome()+ "\","
                + "\"curriculo \" : \"" + getCurriculo()+ "\""
                + "}";
    }

}
