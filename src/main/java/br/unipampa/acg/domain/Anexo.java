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
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Entity
@Data
public class Anexo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idAnexo;

    @NotEmpty
    private String nome;

    @ManyToOne
    private Solicitacao solicitacao;

    public Anexo() {
    }
    
}
