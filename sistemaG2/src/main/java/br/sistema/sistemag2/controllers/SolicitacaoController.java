package br.sistema.sistemag2.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.sistema.sistemag2.anexo.AnexoService;
import br.sistema.sistemag2.dto.DadosSolicitacaoDTO;
import br.sistema.sistemag2.dto.SolicitacaoPostDTO;
import br.sistema.sistemag2.models.Anexo;
import br.sistema.sistemag2.models.Atividade;
import br.sistema.sistemag2.models.Solicitacao;
import br.sistema.sistemag2.repository.AnexoRepository;
import br.sistema.sistemag2.repository.AtividadeRepository;
import br.sistema.sistemag2.repository.CurriculoRepository;
import br.sistema.sistemag2.repository.GrupoRepository;
import br.sistema.sistemag2.repository.SolicitacaoRepository;
import javax.validation.Valid;

/**
 * SolicitacaoController
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("solicitacao") // localhost:8080/solicitacao
public class SolicitacaoController {

    @Autowired
    AnexoRepository anexoRepository;
    @Autowired
    SolicitacaoRepository solicitacaoRepository;
    @Autowired
    AtividadeRepository atividadeRepository;
    @Autowired
    GrupoRepository grupoRepository;
    @Autowired
    CurriculoRepository curriculoRepository;
    private final AnexoService anexoService;

    @Autowired
    public SolicitacaoController(AnexoService anexoService) {
        this.anexoService = anexoService;

    }

    @GetMapping(value = "/listar") // Lista de solicitações no formato JSON - localhost:8080/solicitacao/
    public ResponseEntity<Iterable<Solicitacao> > getSolitacoes() {
        // try {
            Iterable<Solicitacao> solicitacoes = solicitacaoRepository.findAll();
            return ResponseEntity.ok(solicitacoes);
        // } catch (Exception e) {
        //     return ResponseEntity.ok("Não há solicitações");
        // }

    }

    @GetMapping(value = "/dados") // Lista de atividades, grupo e curriculo no formato JSON - //
                                  // localhost:8080/solicitacao/infos/
    public DadosSolicitacaoDTO getInfos() {

        DadosSolicitacaoDTO infos = new DadosSolicitacaoDTO();
        infos.setAtividades(atividadeRepository.findAll());

        // infos.setCurriculo(curriculoRepository.findAll());
        infos.setGrupos(grupoRepository.findAll());

        return infos;
    }

    @GetMapping(value = "/busca/{id}") // Busca uma solicitação
    public @ResponseBody ResponseEntity<Optional<Solicitacao>> getSolicitacaobyId(@PathVariable long id) {
        // Busca no banco pelo id
        Optional<Solicitacao> retornableSolicitacao = solicitacaoRepository.findById(id);
        return ResponseEntity.ok(retornableSolicitacao);
    }


    @JsonIgnore
    @PostMapping("/")
    public ResponseEntity postSolicitacao(@Valid @ModelAttribute SolicitacaoPostDTO solicitacao, @RequestParam("anexo") MultipartFile[] anexos)
            throws Exception {
        // try {  
            
        Optional<Atividade> atividade = atividadeRepository.findById(solicitacao.getIdAtividade());

        if (!atividade.isPresent()) {
            return ResponseEntity.badRequest().body("A Atividade com o ID " + solicitacao.getIdAtividade() + " não foi encontrada");
        }

        Solicitacao newSolicitacao = new Solicitacao();

        newSolicitacao.setAtividade(atividade.get());
        newSolicitacao.setNomeAluno(solicitacao.getAluno());
        newSolicitacao.setMatricula(solicitacao.getMatricula());
        newSolicitacao.setCargaHorariaSoli(solicitacao.getCargaHorariaSoli());
        newSolicitacao.setDescricao(solicitacao.getDescricao());
        newSolicitacao.setLocal(solicitacao.getLocal());
        newSolicitacao.setProfRes(solicitacao.getProfRes());

        Date dataAtual = new Date();
        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        Date dataInicio = formato.parse(solicitacao.getDataInicio());
        Date dataFim = formato.parse(solicitacao.getDataFim());
        newSolicitacao.setDataAtual(dataAtual);
        newSolicitacao.setDataInicio(dataInicio);
        newSolicitacao.setDataFim(dataFim);

        newSolicitacao.setStatus("PENDENTE");
        Solicitacao retornableSolicitacao = solicitacaoRepository.save(newSolicitacao);


        for (int j = 0; j < anexos.length; j++) {
            Anexo newAnexo = new Anexo();
            newAnexo.setNome(anexoService.store(anexos[j], solicitacao.getAluno(), solicitacao.getMatricula(), newSolicitacao.getIdSolicitacao()));
            newAnexo.setDoc(atividade.get().getDocs().get(j));
            newAnexo.setSolicitacao(retornableSolicitacao);
            anexoRepository.save(newAnexo);
        }

        return ResponseEntity.ok(retornableSolicitacao);

        // } catch (Exception e) {
        //     return ResponseEntity.ok("Não foi possível incluir a solicitação pois " + e.getMessage());
        // }

    }

    @DeleteMapping(value = "/deleta/{id}") //deleta uma solicitacao
    ResponseEntity deleteSolicitacaobyId(@PathVariable long id) {
        try {
            solicitacaoRepository.deleteById(id);
            return ResponseEntity.ok("Excluído com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.ok("Não foi possível excluir a solicitação!");
        }
    }


}

