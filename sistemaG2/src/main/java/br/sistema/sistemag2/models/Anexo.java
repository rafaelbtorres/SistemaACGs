package br.sistema.sistemag2.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

/**
 * Anexo
 */
@Entity
@Data
public class Anexo {
 
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idAnexo;

    @ManyToOne
    @JsonBackReference
    @NotNull(message = "É obrigatório ")
    private Solicitacao solicitacao;

    @NotEmpty
    private String nome;

    
    @Column(name = "caminho")
    private String caminho;

    @ManyToOne
    private DocsNecessarios doc;


}