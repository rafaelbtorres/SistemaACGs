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
import javax.persistence.OneToOne;
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
public class Solicitacao {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long idsolicitacao = 0;
    private String nome = "Vagner";
    private String cargaHoraria = "50h";
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
    
    private String atividade;
    
    private String nomeAnexo;

    public Solicitacao() {
        super();
    }



    public boolean verificaTamanho(int tamanho) {
        return tamanho <= 20;
    }

}
