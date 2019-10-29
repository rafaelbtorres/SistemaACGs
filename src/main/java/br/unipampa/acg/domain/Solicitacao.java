/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;

import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author vagner
 */
@Entity
@Getter
@Setter
public class Solicitacao implements Serializable{

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long idsolicitacao;
    private String nome;
    private String cargaHoraria;
    private String local;
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date dataAtual;
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date dataInicio;
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date dataFim;
    private String status;
    private String profResponsavel;
    private String descricao;
    private String avaliacao;
    private String nota;
    private String horasAceitas;

    @ManyToOne
    private Atividade atividade;

    private String nomeAnexo;

    public Solicitacao() {
    }

    public boolean verificaTamanho(int tamanho) {
        return tamanho <= 20;
    }

}
