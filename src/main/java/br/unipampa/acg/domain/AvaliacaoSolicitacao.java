package br.unipampa.acg.domain;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

/**
 * AvaliacaoSolicitacao
 */
@Entity
@Data
public class AvaliacaoSolicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)


    private Date dataAvaliacao;
    private String parecerDoCoordenador;
    private int cargaHorariaAtribuida;

}