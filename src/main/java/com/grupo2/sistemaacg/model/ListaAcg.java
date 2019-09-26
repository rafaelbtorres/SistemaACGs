/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.grupo2.sistemaacg.model;

import java.util.Arrays;
import java.util.List;

/**
 *
 * @author Vagner <vequincozes@gmail.com>
 */

/* [EM CONSTRUÇÃO] CLASSE PARA TESTES/TREINAMENTO  */
public class ListaAcg {

    private static List<SolicitacaoAcg> listaAcgs = Arrays.asList(
            new SolicitacaoAcg(1, "vagner", "30", "anexo")
    );

    public static List<SolicitacaoAcg> getListaAcg() {
        return listaAcgs;
    }

    public static SolicitacaoAcg getAcg(int id) {
        for (SolicitacaoAcg acg : listaAcgs) {
            if (acg.id == id) {
                return acg;
            }
        }
        return null;
    }
}
