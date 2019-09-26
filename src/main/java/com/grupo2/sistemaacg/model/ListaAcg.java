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
public class ListaAcg {

    private static List<Acg> listaAcgs = Arrays.asList(
            new Acg(1, "vagner", "30", "anexo")
    );

    public static List<Acg> getListaAcg() {
        return listaAcgs;
    }

    public static Acg getAcg(int id) {
        for (Acg acg : listaAcgs) {
            if (acg.id == id) {
                return acg;
            }
        }
        return null;
    }
}
