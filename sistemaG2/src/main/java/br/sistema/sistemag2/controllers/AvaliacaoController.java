package br.sistema.sistemag2.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnore;
import br.sistema.sistemag2.dto.AvaliacaoDTO;
import br.sistema.sistemag2.models.Anexo;
import br.sistema.sistemag2.models.AvaliacaoSolicitacao;
import br.sistema.sistemag2.models.Solicitacao;
import br.sistema.sistemag2.models.Status;
import br.sistema.sistemag2.repository.AnexoRepository;
import br.sistema.sistemag2.repository.AtividadeRepository;
import br.sistema.sistemag2.repository.AvaliacaoRepository;
import br.sistema.sistemag2.repository.CurriculoRepository;
import br.sistema.sistemag2.repository.GrupoRepository;
import br.sistema.sistemag2.repository.SolicitacaoRepository;
import br.sistema.sistemag2.anexo.AnexoService;
import br.sistema.sistemag2.models.Atividade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * AvaliacaoController
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("avaliacao")
public class AvaliacaoController {

    @Autowired
    SolicitacaoRepository solicitacaoRepository;
    @Autowired
    AtividadeRepository atividadeRepository;
    @Autowired
    GrupoRepository grupoRepository;
    @Autowired
    CurriculoRepository curriculoRepository;
    @Autowired
    AvaliacaoRepository avaliacaoRepository;
    @Autowired
    AnexoRepository anexoRepository;

    private final AnexoService storageService;

    @Autowired
    public AvaliacaoController(AnexoService storageService) {
        this.storageService = storageService;
    }

    @JsonIgnore
    @PostMapping("/{id}") //Envia nova avaliação
    public ResponseEntity postAvaliacao(@RequestBody AvaliacaoDTO avaliacao, @PathVariable long id){

        AvaliacaoSolicitacao newavaliacao = new AvaliacaoSolicitacao();
        Date dataAtual = new Date();
        Solicitacao avaliada = (solicitacaoRepository.findById(id).isPresent()) ? solicitacaoRepository.findById(id).get() : null;
        Optional<Atividade> atividade = atividadeRepository.findById(avaliacao.getIdAtividade());
     try {
        if (avaliada.getStatus().equals("Deferido") || avaliada.getStatus().equals("Indeferido")) {
            return ResponseEntity.badRequest().body("Essa avaliação ja foi avaliada");
        }       
        //Armazena os solicitados na avaliação para manter o histórico
        newavaliacao.setSolicitada(avaliada.getAtividade());
        newavaliacao.setSolicitado(avaliada.getAtividade().getGrupo());
        
        if(!avaliada.getAtividade().equals(atividade.get())){
            newavaliacao.setPrecisouDeCorrecao(true);
        }
        
        if(avaliacao.isDeferido()){
            assert avaliada != null;
            if(newavaliacao.isPrecisouDeCorrecao()){
                avaliada.setStatus(Status.DEFERIDO.toString() + " COM CORREÇÕES - CARGA-HORÁRIA ATRIBUÍDA: " + avaliacao.getCargaHorariaAtribuida());
            }
        }else{
            assert avaliada != null;
            avaliada.setStatus(Status.INDEFERIDO.toString());
        }
        avaliada.setIdSolicitacao(id);
        
        //Atualiza atividade Correta na solicitação
        avaliada.setAtividade(atividade.get());
        solicitacaoRepository.save(avaliada);
        
        newavaliacao.setCargaHorariaAtribuida(avaliacao.getCargaHorariaAtribuida());
        newavaliacao.setDataAvaliacao(dataAtual);
        newavaliacao.setSolicitacao(avaliada);
        newavaliacao.setJustificativa(avaliacao.getParecer());
;
        newavaliacao.ValidaDeferimento();
        }catch (Exception e){
            return  ResponseEntity.ok(("Houve um erro ao realizar a avaliação " + e.getMessage()));
        }

        AvaliacaoSolicitacao retornableAvaliacao = avaliacaoRepository.save(newavaliacao);

        return ResponseEntity.ok(retornableAvaliacao);
    }

    @DeleteMapping(value = "/{id}") // Busca no banco pelo ID
    public @ResponseBody ResponseEntity deleteAvaliacaobyId(@PathVariable long id) {
        Optional<AvaliacaoSolicitacao> retornableAvaliacao = avaliacaoRepository.findById(id);
        if(retornableAvaliacao.isPresent()) {
            avaliacaoRepository.deleteById(id);
            retornableAvaliacao.get().getSolicitacao().setStatus(Status.PENDENTE.toString());
        } else {
            return ResponseEntity.ok("Não existe esta avaliação");
        }
        solicitacaoRepository.save(retornableAvaliacao.get().getSolicitacao());
        return ResponseEntity.ok(retornableAvaliacao);
    }

    @GetMapping(value = "/infos/{id}")
    public ResponseEntity<Optional<Solicitacao>> getInfos(@PathVariable long id) {
        Optional<Solicitacao> retornableSolicitacao = solicitacaoRepository.findById(id);
        return ResponseEntity.ok(retornableSolicitacao);
    }


    @GetMapping("/anexos/{filename:.+}") // Busca um anexo a partir do nome, só chamar isso para cada anexo na view, ele mostra o pdf no navegador
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}