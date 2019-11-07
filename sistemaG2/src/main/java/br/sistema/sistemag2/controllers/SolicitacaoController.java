package br.sistema.sistemag2.controllers;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.annotation.JsonIgnore;
import br.sistema.sistemag2.dto.DadosSolicitacaoDTO;
import br.sistema.sistemag2.dto.SolicitacaoPostDTO;
import br.sistema.sistemag2.models.Anexo;
import br.sistema.sistemag2.models.Atividade;
import br.sistema.sistemag2.models.Solicitacao;
import br.sistema.sistemag2.models.Status;
import br.sistema.sistemag2.repository.AnexoRepository;
import br.sistema.sistemag2.repository.AtividadeRepository;
import br.sistema.sistemag2.repository.CurriculoRepository;
import br.sistema.sistemag2.repository.GrupoRepository;
import br.sistema.sistemag2.repository.SolicitacaoRepository;
import br.sistema.sistemag2.anexo.AnexoService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
    public @ResponseBody ResponseEntity getSolitacoes() {
            try {
                return ResponseEntity.ok(solicitacaoRepository.findAll());
            } catch (Exception e) {
                return ResponseEntity.ok("Não há solicitações");
            }
    
    }

    @GetMapping(value = "/dados") // Lista de atividades, grupo e curriculo no formato JSON -  // localhost:8080/solicitacao/infos/
    public DadosSolicitacaoDTO getInfos() {

        DadosSolicitacaoDTO infos = new DadosSolicitacaoDTO();
        infos.setAtividades(atividadeRepository.findAll());
        
        //infos.setCurriculo(curriculoRepository.findAll());
        infos.setGrupos(grupoRepository.findAll());

        return infos;
    }

    @GetMapping(value = "/busca/{id}") // Busca uma solicitação
    public @ResponseBody ResponseEntity<Optional<Solicitacao>> getSolicitacaobyId(@PathVariable long id) {
        // Busca no banco pelo id
        Optional<Solicitacao> retornableSolicitacao = solicitacaoRepository.findById(id);
        return ResponseEntity.ok(retornableSolicitacao);
    }

    @PostMapping("/salvaAnexo") //Salva um anexo
    public String postAnexo(@RequestParam("file") MultipartFile file, String nome) throws Exception {

        return anexoService.store(file, nome);

    }


    @PostMapping("/salvaAnexos") //Salva varios anexos
    public ArrayList postAnexos(@RequestParam("file") MultipartFile files[], String nome) throws Exception {
        ArrayList<String> filesName = new ArrayList<>();
        String nomeCaminho;
        for (MultipartFile string : files) {
            nomeCaminho = anexoService.store(string, nome);
            filesName.add(nomeCaminho);
        }
        return filesName;
    }

    @JsonIgnore
    @PostMapping("/")
    public ResponseEntity postSolicitacao(@ModelAttribute SolicitacaoPostDTO solicitacaoDTO, MultipartFile anexos[]) {
        try {
            Atividade atividadebusca = atividadeRepository.findById(solicitacaoDTO.getIdAtividade()).get();
            Solicitacao solicitacao = new Solicitacao();
            Date dataAtual = new Date();
            SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
            Date dataInicio = formato.parse(solicitacaoDTO.getDataInicio());
            Date dataFim = formato.parse(solicitacaoDTO.getDataFim());

            solicitacao.setAtividade(atividadebusca);
            solicitacao.setMatricula(solicitacaoDTO.getMatricula());
            solicitacao.setNomeAluno(solicitacaoDTO.getAluno());
            solicitacao.setMatricula(solicitacaoDTO.getMatricula());
            solicitacao.setCargaHorariaSoli(solicitacaoDTO.getCargaHorariaSoli());
            solicitacao.setDescricao(solicitacaoDTO.getDescricao());
            solicitacao.setLocal(solicitacaoDTO.getLocal());
            solicitacao.setProfRes(solicitacaoDTO.getProfRes());
            solicitacao.setDataAtual(dataAtual);
            solicitacao.setDataInicio(dataInicio);
            solicitacao.setDataFim(dataFim);
            solicitacao.setStatus("PENDENTE");
//            anexo.incluirAnexo(anexos, solicitacaoDTO.getAluno(), storageService, anexoRepository);
            return ResponseEntity.ok(solicitacaoRepository.save(solicitacao));

        } catch (Exception e) {
            return ResponseEntity.ok("Não foi possível incluir a solicitação pois " + e.getMessage());
        }

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

