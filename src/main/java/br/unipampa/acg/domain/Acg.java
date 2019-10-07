/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.domain;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author vagner
 */
@Entity
@Getter
@Setter
public class Acg extends ManageableProcess {

    @Id
    @NotEmpty
    private int idacg = 0;

    @NotEmpty
    private String local;

    @NotEmpty
    private String aluno = "Vagner";

    @NotEmpty
    private Date dataAtual;

    @NotEmpty
    private Date dataInicio;

    @NotEmpty
    private Date dataFim;

    @NotEmpty
    private String status;

    private String profResponsavel;

    private String descricao;

    @NotEmpty
    private String cargaHoraria = "50h";

    @ManyToOne
    private Atividade atividade;

    @OneToOne
    private Anexo anexo;

    public Acg() {
        super();
    }

    @Override
    public String[] getCommand() {
        int rajada = (idacg == 0 ? 80 : 256);

        String command = "/home/revangelista/NetBeansProjects/taesa/./envia_sv.o" + " " + rajada + " " + this.aluno + " " + this.cargaHoraria + " " + this.anexo;
        return command.split(" ");
    }

}
