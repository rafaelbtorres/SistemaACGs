/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.controllers;

import br.unipampa.acg.dao.AtividadeDao;
import br.unipampa.acg.dao.CurriculoDao;
import br.unipampa.acg.dao.GrupoDao;
import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import br.unipampa.acg.dao.SolicitacaoDao;
import br.unipampa.acg.dao.Solicitacoes;
import br.unipampa.acg.domain.Anexo;
import br.unipampa.acg.domain.Atividade;
import br.unipampa.acg.domain.Curriculo;
import br.unipampa.acg.domain.Grupo;
import br.unipampa.acg.domain.Solicitacao;
import br.unipampa.acg.utils.View;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestParam;

//import br.unipampa.acg.upload.AnexoService;
/**
 *
 * @author
 */
@RestController

public class SolicitacaoController {

    private Anexo anexo;
    //private final AnexoService anexoService;

    // @Autowired
    // public SolicitacaoController(AnexoService anexoService) {
    //     this.anexoService = anexoService;
    // }
    @ResponseBody
    @GetMapping("/acg/todassolicitacoes")
    public ResponseEntity buscaTodasSolicitacoes() {

        SolicitacaoDao dao = new SolicitacaoDao();

        List<Solicitacao> s = dao.loadAllData(Solicitacao.class);

//        String json = "[";
//
//        for (int i = 0; i < s.size(); i++) {
//            Solicitacao sol = s.get(i);
//            json = json + s.get(i).toString();
//            if (i != s.size() - 1) {
//                json = json + ",";
//            } 
//        }
//        json = json + "]";
//        String.valueOf(s.size());
        dao.close();

        return ResponseEntity.ok(s);
    }

    @ResponseBody
    @PostMapping("/solicitacao")
    @JsonView(View.Standard.class)
    public ResponseEntity adicionarSolicitacao(@Valid @RequestBody Solicitacao acg) {
        SolicitacaoDao dao = new SolicitacaoDao();
        dao.persist(acg);
        dao.close();
        return ResponseEntity.ok(acg);
    }

    @ResponseBody
    @GetMapping("/acg/{id}/solicitacaoporid")
    public ResponseEntity buscaSolicitacaoPorId(@PathVariable("id") long id) {

        SolicitacaoDao dao = new SolicitacaoDao();
        Solicitacao s = dao.load(Solicitacao.class, id);
        String a = s.toString();
        dao.close();

        return ResponseEntity.ok(a);
    }

    @ResponseBody
    @GetMapping("/acg/{id}/buscaatividade")
    public ResponseEntity buscaAtividade(@PathVariable("id") long id) {

        AtividadeDao dao = new AtividadeDao();
        Atividade s = dao.load(Atividade.class, id);
        String a = s.toString();
        dao.close();

        return ResponseEntity.ok(a);
    }

//    @ResponseBody
//    @GetMapping("/acg/{id}/grupo")
//    public ResponseEntity buscaGrupo(@PathVariable("id") long id) {
//
//        GrupoDao dao = new GrupoDao();
//        Grupo s = dao.load(Grupo.class, id);
//        String a = s.toString();
//        dao.close();
//
//        return ResponseEntity.ok(a);
//    }
//        @ResponseBody
//    @GetMapping("/acg/{id}/curriculo")
//    public ResponseEntity buscaCurriculo(@PathVariable("id") long id) {
//
//        CurriculoDao dao = new CurriculoDao();
//        Curriculo s = dao.load(Curriculo.class, id);
//        String a = s.toString();
//        dao.close();
//
//        return ResponseEntity.ok(a);
//    }


    @ResponseBody
    @DeleteMapping("/solicitacao/{id}")
    public ResponseEntity excluirSolicitacao(@PathVariable("id") int id) {
        SolicitacaoDao dao = new SolicitacaoDao();               //... Abre sessão com o banco.
        Solicitacao sv = dao.load(Solicitacao.class, id);      //... Carrega configuração.
        dao.delete(sv);                         //... Salva a config. com PID.
        dao.close();                          //... Fecha sessão com o banco.
        return ResponseEntity.ok("");
    }

    // @ResponseBody
    // @PostMapping("/acg_anexo/")
    // @JsonView(View.Standard.class)
    // public ResponseEntity salvarComAnexo(@Valid @RequestBody Solicitacao acg, @RequestParam MultipartFile arquivoAnexo) {
    //     anexo = new Anexo("anexo");
    //     String caminho = anexo.salvarAnexo(arquivoAnexo);
    //     acg.setNomeAnexo(caminho);
    //     SolicitacaoDao dao = new SolicitacaoDao();
    //     dao.persist(acg);
    //     dao.close();
    //     return ResponseEntity.ok(acg);
    // }
    //Editar
    @ResponseBody
    @GetMapping("/acg/{id}/edit")
    public Solicitacao editarSolicitacao(@PathVariable("idsolicitacao") long id) {
        Solicitacao dados = new Solicitacao();
        SolicitacaoDao dao = new SolicitacaoDao();
        dados = dao.load(Solicitacao.class, id);
        dao.close();
        return dados;
    }

    //Despois de modificar, salva os dados no banco
    @RequestMapping(value = "/acg/{id}/aval", method = RequestMethod.POST)
    public ModelAndView editar(Solicitacao s) {
        SolicitacaoDao dao = new SolicitacaoDao();
        dao.update(s);
        return null;
    }

//    //Avaliar
//    //Primeiro carrega todos os dados da avaliacao
//     @ResponseBody
//    @GetMapping("/acg/{id}/aval")
//    public Solicitacao avaliarSolicitacao(@PathVariable("idsolicitacao") long id) {
//        Solicitacao dados = new Solicitacao();
//        SolicitacaoDao dao = new SolicitacaoDao();
//        dados = dao.load(Solicitacao.class, id);
//        dao.close();
//        return dados;
//    }
//    //Despois de avaliar, salva os dados no banco
//    @RequestMapping(value = "/acg/{id}/aval", method = RequestMethod.POST)
//    public ModelAndView avaliar(Solicitacao s){
//        SolicitacaoDao dao = new SolicitacaoDao();      
//        dao.update(s);
//        return null;
//    } 
    // //Armazena o anexo no banco de dados
    // @PostMapping("/upload")
    // public String postAnexo(@RequestParam("file") MultipartFile file, String nome) throws Exception {
    //     return anexoService.store(file, nome);
    // }
    // //Mostra todos os anexos do banco
    // @GetMapping("/anexos")
    // public String listUploadedFiles(Model model) throws IOException {
    //     model.addAttribute("files", anexoService.loadAll().map(
    //             path -> MvcUriComponentsBuilder.fromMethodName(SolicitacaoController.class,
    //                     "serveFile", path.getFileName().toString()).build().toString())
    //             .collect(Collectors.toList()));
    //     return "uploadForm";
    // }
    // @GetMapping("/files/{filename:.+}")
    // @ResponseBody
    // public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
    //     Resource file = anexoService.loadAsResource(filename);
    //     return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
    //             "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    // }
    //Metodo de salvar o anexo
    //public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
    //  Resource file = anexoService.loadAsResource(filename);
    //return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
    //      "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    //}
}
