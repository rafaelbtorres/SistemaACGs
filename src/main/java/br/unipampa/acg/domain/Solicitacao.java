/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

/**
 *
 * @author vagner
 */
@Entity
@Data
public class Solicitacao{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idsolicitacao;

    @NotEmpty
    private String nome;

    private long cargaHoraria;

    @NotEmpty
    private String local;

    @JsonFormat(pattern = "yyy-MM-dd")
    private Date dataAtual;

    @JsonFormat(pattern = "yyy-MM-dd")
    private Date dataInicio;

    @JsonFormat(pattern = "yyy-MM-dd")
    private Date dataFim;

    private String status;

    private String profResponsavel;

    private String descricao;

    @ManyToOne
    private Atividade atividade;

    private String nomeAnexo;

    @NotEmpty
    private long matricula;

    public long getIdsolicitacao() {
        return idsolicitacao;
    }

    public void setIdsolicitacao(long idsolicitacao) {
        this.idsolicitacao = idsolicitacao;
    }

    public Solicitacao(){}

}
