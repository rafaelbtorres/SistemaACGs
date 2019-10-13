/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.domain;

/**
 *
 * @author Vagner <vequincozes@gmail.com>
 */
public enum Status {

    PENDENTE("Pendente"), DEFERIDO("Deferido"), INDEFERIDO("Indeferido");

    private String value;

    Status(String value) {
        this.value = value;

    }

    public String toString() {
        return this.value;
    }

}

