/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.domain;

import javax.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author vagner
 */
@Entity
@Getter @Setter
public class Acg extends ManageableProcess {

    private int idacg = 0;
    private String nome = "Vagner";
    private String cargaHoraria = "50h";
    private String anexo = "comprovante.pdf";

    public Acg() {
        super();
    }

    @Override
    public String[] getCommand() {
        int rajada = (idacg == 0 ? 80 : 256);

        String command = "/home/revangelista/NetBeansProjects/taesa/./envia_sv.o" + " " + rajada + " " + this.nome + " " + this.cargaHoraria + " " + this.anexo;
        return command.split(" ");
    }

}
