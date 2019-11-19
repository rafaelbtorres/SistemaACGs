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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.sistema.sistemag2.anexo.AnexoService;
import br.sistema.sistemag2.dto.DadosSolicitacaoDTO;
import br.sistema.sistemag2.dto.SolicitacaoGetDTO;
import br.sistema.sistemag2.dto.SolicitacaoPostDTO;
import br.sistema.sistemag2.models.Anexo;
import br.sistema.sistemag2.models.Atividade;
import br.sistema.sistemag2.models.Solicitacao;
import br.sistema.sistemag2.repository.AnexoRepository;
import br.sistema.sistemag2.repository.AtividadeRepository;
import br.sistema.sistemag2.repository.CurriculoRepository;
import br.sistema.sistemag2.repository.DocsRepository;
import br.sistema.sistemag2.repository.GrupoRepository;
import br.sistema.sistemag2.repository.SolicitacaoRepository;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.List;
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
    @Autowired
    DocsRepository docsRepository;
    private final AnexoService anexoService;

    @Autowired
    public SolicitacaoController(AnexoService anexoService) {
        this.anexoService = anexoService;

    }

    /**
     * Pega todas as solicitações no banco.
     * @return Retorna todas as solicitações em formato JSON.
     */
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


    /**
     * Retorna as informações dos Grupos, Atividades e Documentos Necessários.
     * @return Todas as informações em um formato JSON.
     */
    public DadosSolicitacaoDTO getInfos() {

        DadosSolicitacaoDTO infos = new DadosSolicitacaoDTO();
        infos.setAtividades(atividadeRepository.findAll());
        infos.setDocsNecessarios(docsRepository.findAll());
        infos.setCurriculo(curriculoRepository.findAll());
        infos.setGrupos(grupoRepository.findAll());


        return infos;
    }

    /**
     * Método de retorno de uma solicitação especifica, buscada pelo seu ID.
     * @param id
     * @return Retorna a solicitação selecionada.
     */
    @GetMapping(value = "/busca/{id}") // Busca uma solicitação
    public @ResponseBody ResponseEntity getSolicitacaobyId(@PathVariable long id) {
        Optional<Solicitacao> retornableSolicitacao = solicitacaoRepository.findById(id);
        List<Anexo> anexos = retornableSolicitacao.get().getAnexos();
        SolicitacaoGetDTO dto = new SolicitacaoGetDTO();
        dto.setAnexosDaSolicitacao(anexos);
        dto.setSolicitacao(retornableSolicitacao.get());
        return ResponseEntity.ok(dto);
    }

    /**
     * Método de salvamento de solicitação de ACG. Serve para inclusão no banco das informações da solicitação ACG,
     * bem como seus anexos e a atividade/grupo escolhida.
     * @param solicitacao
     * @param anexos
     * @return Retorna um OK caso a operação seja efetuada com sucesso. Em caso de erro retorna um error.
     * @throws Exception
     */
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

        String nome;
        MessageDigest m=MessageDigest.getInstance("MD5");
       
        for (int j = 0; j < anexos.length; j++) {
            BigInteger hash = new BigInteger(1, m.digest(solicitacao.getAluno().getBytes()));
            nome = hash.toString(16);
            Anexo newAnexo = new Anexo();
            newAnexo.setNome(anexoService.store(anexos[j], nome+j, solicitacao.getMatricula(), retornableSolicitacao.getIdSolicitacao()));
            newAnexo.setDoc(atividade.get().getDocs().get(j));
            newAnexo.setSolicitacao(retornableSolicitacao);
            anexoRepository.save(newAnexo);
        }

        return ResponseEntity.ok(retornableSolicitacao);

        // } catch (Exception e) {
        //     return ResponseEntity.ok("Não foi possível incluir a solicitação pois " + e.getMessage());
        // }

    }

    /**
     * Deleta a solicitação escolhida
     * @param id
     * @return Retorna um OK caso a seja deletado com sucesso. Em caso de erro retorna um error.
     */
    @DeleteMapping(value = "/deleta/{id}") //deleta uma solicitacao
    ResponseEntity deleteSolicitacaobyId(@PathVariable long id) {
        Optional<Solicitacao> retornableSolicitacao = solicitacaoRepository.findById(id);
        try {
            if(retornableSolicitacao.get().getStatus().equalsIgnoreCase("PENDENTE")){
                solicitacaoRepository.deleteById(id);
                return ResponseEntity.ok("Solicitação apagada com sucesso!");
            }
            return ResponseEntity.badRequest().body("Não é possível deletar a solicitação pois seu status é " + retornableSolicitacao.get().getStatus());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Não foi possível excluir a solicitação!");
        }
    }


}

