/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.grupo2.sistemaacg.model;

import lombok.Data;

/**
 *
 * @author Vagner <vequincozes@gmail.com>
 */
@Data
public class Acg {

    public static Acg getInformacoesAcg() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
    int id;
    private String nome;
    private String cargaHoraria;
    private String anexo;

    public Acg(int id, String nome, String cargaHoraria, String anexo) {
        this.id = id;
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
        this.anexo = anexo;
    }
    
    public Acg(){}
}
