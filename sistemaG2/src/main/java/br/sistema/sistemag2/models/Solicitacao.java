package br.sistema.sistemag2.models;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;
import org.hibernate.validator.constraints.Range;

@Entity
@Data
public class Solicitacao{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long idSolicitacao;

	@NotEmpty
	@Size(min = 3)
	private String nomeAluno;

	@Range(min = 5, message = "A matrícula é inválida.")
	@NotNull(message = "A matrícula é obrigatória")
	//@Pattern(regexp = "[0-9]?[0-9]?0?[1||2][0-9]*$")
	private long matricula;

	@NotEmpty
	private long CargaHorariaRealizada;

	@JsonFormat(pattern="yyyy-MM-dd")
	//@FutureOrPresent
	private Date dataAtual;

	@JsonFormat(pattern="yyyy-MM-dd")
	@PastOrPresent
	@NotNull(message = "A data de inicio é obrigatória")
	private Date dataInicio;

	@JsonFormat(pattern="yyyy-MM-dd")
	@NotNull(message = "A data de fim é obrigatória")
	private Date dataFim;

	@NotNull(message = "A matrícula é obrigatória")
	@Positive
	private long cargaHorariaSoli;

	@ManyToOne
	@NotNull(message = "É obrigatório selecionar uma atividade")
	private Atividade atividade;

	@OneToMany(mappedBy = "solicitacao", cascade=CascadeType.ALL)
	@JsonManagedReference
	//@NotNull(message = "É obrigatório anexar os arquivos comprobatórios")
	private List<Anexo> anexos;
        

	@OneToOne(mappedBy = "solicitacao")
	@JsonManagedReference
	private AvaliacaoSolicitacao avaliacao;

	private String status;//Status
	private String descricao;
	private String profRes;
	private String local;
}
