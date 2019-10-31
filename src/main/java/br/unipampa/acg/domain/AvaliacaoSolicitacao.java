package br.unipampa.acg.domain;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

/**
 * AvaliacaoSolicitacao
 */
@Entity
@Data
public class AvaliacaoSolicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dataAvaliacao;

    @OneToOne
    private Solicitacao solicitacao;

    private String parecerDoCoordenador;
    private int cargaHorariaAtribuida;

    public AvaliacaoSolicitacao(){}

}