package br.sistema.sistemag2.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import br.sistema.sistemag2.models.Atividade;
import br.sistema.sistemag2.models.Grupo;

import lombok.Data;

/**
 * Avaliacao
 */
@Entity
@Data
public class AvaliacaoSolicitacao {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idAvaliacao;

    private String justificativa;//obrigatório if indeferido

    @NotEmpty
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dataAvaliacao;//atual

    //@Positive
    private long cargaHorariaAtribuida;//obrigatório if deferido

    @OneToOne
    @JsonBackReference
    @NotNull(message = "Solicitação inválida.")
    private Solicitacao solicitacao;
        
    @OneToOne
    private Grupo solicitado;
        
    @OneToOne
    private Atividade solicitada;
        
    private boolean precisouDeCorrecao;

    @NotEmpty
    private String nomeCoordenador;
        
    public AvaliacaoSolicitacao(){}

    public void ValidaDeferimento () throws Exception {
		if (this.solicitacao.getStatus().equalsIgnoreCase(("DEFERIDO"))) {
			if(this.cargaHorariaAtribuida <=0){
				throw new Exception("Carga horaria não pode nula");
			} else if (this.solicitacao.getStatus().equalsIgnoreCase(("INDEFERIDO"))) {
				if(this.justificativa == null || this.justificativa.isEmpty()){
					throw new Exception("É obrigatório a justificativa para o indeferimento");
				}
			}
		}
	}
    public boolean horaNegativaouZero(long ch){
        return ch <=0;
    }
}