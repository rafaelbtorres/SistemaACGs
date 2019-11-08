package br.sistema.sistemag2.controllers;

import java.text.ParseException;
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

    @PostMapping("/salvaAnexo") // Salva um anexo
    public String postAnexo(@RequestParam("file") MultipartFile file, String nome) throws Exception {

        return anexoService.store(file, nome);

    }

    @PostMapping("/salvaAnexos") // Salva varios anexos
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
    public ResponseEntity postSolicitacao(@RequestBody SolicitacaoPostDTO solicitacao, MultipartFile anexos[])
            throws Exception {
        // try {
            
        Optional<Atividade> atividade = atividadeRepository.findById(solicitacao.getIdAtividade());

        if (!atividade.isPresent()) {
            return ResponseEntity.badRequest().body("A Atividade com o ID " + solicitacao.getIdAtividade() + " não foi encontrada");
        }

        Solicitacao newsolicitacao = new Solicitacao();
        Anexo newAnexo = new Anexo();
        newsolicitacao.setAtividade(atividade.get());
        newsolicitacao.setNomeAluno(solicitacao.getAluno());
        newsolicitacao.setMatricula(solicitacao.getMatricula());
        newsolicitacao.setCargaHorariaSoli(solicitacao.getCargaHorariaSoli());
        newsolicitacao.setDescricao(solicitacao.getDescricao());
        newsolicitacao.setLocal(solicitacao.getLocal());
        newsolicitacao.setProfRes(solicitacao.getProfRes());

        Date dataAtual = new Date();
        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        Date dataTeste = formato.parse(solicitacao.getDataInicio());
        newsolicitacao.setDataAtual(dataAtual);
        newsolicitacao.setDataInicio(dataTeste);
        newsolicitacao.setDataFim(dataTeste);

        newsolicitacao.setStatus("PENDENTE");

        Solicitacao retornableSolicitacao = solicitacaoRepository.save(newsolicitacao);


//        for (int j = 0; j < anexos.length; j++) {
//            newAnexo.setNome(anexoService.store(anexos[j], solicitacao.getAluno()));
//            newAnexo.setDoc(atividade.get().getDocs().get(j));
//            anexoRepository.save(newAnexo);
//        }

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

