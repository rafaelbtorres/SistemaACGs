/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.unipampa.acg.domain.Anexo;
import br.unipampa.acg.domain.Atividade;
import br.unipampa.acg.domain.Solicitacao;
import br.unipampa.acg.dto.FormularioDto;
import br.unipampa.acg.dto.SolicitacaoDto;
import br.unipampa.acg.repository.AnexoRepository;
import br.unipampa.acg.repository.AtividadeRepository;
import br.unipampa.acg.repository.CurriculoRepository;
import br.unipampa.acg.repository.GrupoRepository;
import br.unipampa.acg.repository.SolicitacaoRepository;
import br.unipampa.acg.upload.AnexoService;

//import br.unipampa.acg.upload.AnexoService;
/**
 *
 * @author
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
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

    private final AnexoService storageService;

    @Autowired
    public SolicitacaoController(AnexoService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/acg/todassolicitacoes")
    public @ResponseBody
    ResponseEntity<Iterable<Solicitacao>> getSolitacoes() {
        Iterable<Solicitacao> retornableSolicitacoes = solicitacaoRepository.findAll();
        return ResponseEntity.ok(retornableSolicitacoes);
    }

    @GetMapping(value = "/formulario") // Lista de atividades, grupo e curriculo no formato JSON -  // localhost:8080/solicitacao/infos/
    public FormularioDto getFormulario() {

        FormularioDto formulario = new FormularioDto();
        formulario.setAtividade(atividadeRepository.findAll());
        //infos.setCurriculo(curriculoRepository.findAll());
        formulario.setGrupo(grupoRepository.findAll());

        return formulario;
    }

    @ResponseBody
    @PostMapping("/solicitacao")
    public ResponseEntity adicionarSolicitacao(@ModelAttribute SolicitacaoDto solicitacao, MultipartFile files[]) throws Exception {

        java.util.Optional<Atividade> atividade = atividadeRepository.findById(solicitacao.getIdAtividade());

        if (!atividade.isPresent()) {
            return ResponseEntity.badRequest().body("A atividade com o ID" + solicitacao.getIdAtividade() + "não foi encontrada");
        }

        Solicitacao novasolicitacao = new Solicitacao();
        Date dataAtual = new Date();
        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        Date dataInicio = formato.parse(solicitacao.getDataInicio());
        Date dataFim = formato.parse(solicitacao.getDataFim());
        
        novasolicitacao.setAtividade(atividade.get());
        novasolicitacao.setCargaHoraria(solicitacao.getCargaHoraria());
        novasolicitacao.setDataAtual(dataAtual);
        novasolicitacao.setDataInicio(dataInicio);
        novasolicitacao.setDataFim(dataFim);
        novasolicitacao.setDescricao(solicitacao.getDescricao());
        novasolicitacao.setLocal(solicitacao.getLocal());
        novasolicitacao.setNome(solicitacao.getAluno());
        novasolicitacao.setProfResponsavel(solicitacao.getProfResponsavel());
        novasolicitacao.setStatus("Pendente");
        novasolicitacao.setMatricula(solicitacao.getMatricula());
        
        solicitacaoRepository.save(novasolicitacao);
        
        String nomeAnexo;
        Anexo anexo = new Anexo();
        
        for (MultipartFile file : files) {
            nomeAnexo = storageService.store(file, solicitacao.getAluno());
            anexo.setNome(nomeAnexo);
            anexo.setSolicitacao(novasolicitacao);
            anexoRepository.save(anexo);
        }
                    
        return ResponseEntity.ok(novasolicitacao);
        
        }
}
