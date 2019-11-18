package br.sistema.sistemag2.controllers;

import java.util.Date;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnore;
import br.sistema.sistemag2.dto.AvaliacaoDTO;
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
import org.springframework.web.bind.annotation.ModelAttribute;
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


    /**
     * Metodo de salvamento da avaliação. Serve para como inclusão da avaliação de uma solicitação no banco de dados.
     * @param avaliacao
     * @param id
     * @return Retorna um Ok em caso de sucesso. Em caso de erro retorna um error.
     */
    @JsonIgnore
    @PostMapping("/{id}")
    public ResponseEntity postAvaliacao(@RequestBody AvaliacaoDTO avaliacao, @PathVariable long id){

        AvaliacaoSolicitacao newavaliacao = new AvaliacaoSolicitacao();
        Date dataAtual = new Date();
        Solicitacao avaliada = (solicitacaoRepository.findById(id).isPresent()) ? solicitacaoRepository.findById(id).get() : null;
        Optional<Atividade> atividade;
        if(avaliacao.getIdAtividade()!=0){
            atividade = atividadeRepository.findById(avaliacao.getIdAtividade());
        }else{
            atividade = atividadeRepository.findById(avaliada.getAtividade().getIdAtividade());
        }
        String status = avaliada.getStatus();
        if (status.equals("Deferido") || status.equals("Indeferido")) {
            return ResponseEntity.badRequest().body("Essa avaliação da foi avaliada");
        }

     try {
        if (avaliada.getStatus().equals("Deferido") || avaliada.getStatus().equals("Indeferido")) {
            return ResponseEntity.badRequest().body("Essa avaliação ja foi avaliada");
        }

        newavaliacao.setSolicitada(avaliada.getAtividade());
        newavaliacao.setSolicitado(avaliada.getAtividade().getGrupo());

        if(!avaliada.getAtividade().equals(atividade.get())){
            newavaliacao.setPrecisouDeCorrecao(true);
        }

        if(avaliacao.isDeferido()){
            if(newavaliacao.isPrecisouDeCorrecao()){
                avaliada.setStatus(Status.DEFERIDO.toString() + " COM CORREÇÕES - CARGA-HORÁRIA ATRIBUÍDA: " + avaliacao.getCargaHorariaAtribuida());
            }else{
                avaliada.setStatus(Status.DEFERIDO.toString() + " CARGA-HORÁRIA ATRIBUÍDA: " + avaliacao.getCargaHorariaAtribuida());
            }
        }else{
            avaliada.setStatus(Status.INDEFERIDO.toString() + " MOTIVO: " + avaliacao.getParecer());
        }
        avaliada.setIdSolicitacao(id);

        avaliada.setAtividade(atividade.get());
        solicitacaoRepository.save(avaliada);
        
        if(newavaliacao.horaNegativaouZero(avaliacao.getCargaHorariaAtribuida())){
            if(!avaliacao.isDeferido()){
                newavaliacao.setCargaHorariaAtribuida(0);
            }else{
                return  ResponseEntity.badRequest().body("É necessário atribir pelo menos uma hora a solicitações deferidas ");
            }
        }else if(avaliacao.isDeferido()){
            newavaliacao.setCargaHorariaAtribuida(avaliacao.getCargaHorariaAtribuida());
        }else{
            return  ResponseEntity.badRequest().body("Não deve-se atribir carga horária em solicitações indeferidas ");
        }
        newavaliacao.setDataAvaliacao(dataAtual);
        newavaliacao.setSolicitacao(avaliada);
        newavaliacao.setJustificativa(avaliacao.getParecer());
        newavaliacao.setNomeCoordenador(avaliacao.getNomeCoordenador());
        newavaliacao.ValidaDeferimento();
        }catch (Exception e){
            return  ResponseEntity.badRequest().body("Houve um erro ao realizar a avaliação " + e.getMessage());
        }
        AvaliacaoSolicitacao retornableAvaliacao = avaliacaoRepository.save(newavaliacao);

        return ResponseEntity.ok(retornableAvaliacao);
    }

    /**
     * Deleta a avaliação escolhida.
     * @param id
     * @return Retorna um OK caso a seja deletado com sucesso. Em caso de erro retorna um error.
    */
    @DeleteMapping(value = "/{id}") 
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


    /**
     * Busca no banco pelo id
     * @param id
     * @return Retorna as informações da solicitacão em caso de sucesso. Em caso de erro retorna um error.
    */
    @GetMapping(value = "/infos/{id}")
    public ResponseEntity<Optional<Solicitacao>> getInfos(@PathVariable long id) {
        Optional<Solicitacao> retornableSolicitacao = solicitacaoRepository.findById(id);
        return ResponseEntity.ok(retornableSolicitacao);
    }

    /**
     * Pega um anexo a partir do nome do anexo.
     * @param filename
     * @return
    */
    @GetMapping("/anexos/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}