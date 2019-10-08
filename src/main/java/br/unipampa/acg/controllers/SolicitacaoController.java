/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.controllers;

import br.unipampa.acg.dao.SolicitacaoDao;
import br.unipampa.acg.domain.Anexo;
import br.unipampa.acg.domain.Solicitacao;
import br.unipampa.acg.utils.View;
import com.fasterxml.jackson.annotation.JsonView;
import java.util.HashMap;
import java.util.Map;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author vagner
 */
@RestController

public class SolicitacaoController {

    private Anexo disco;

    @ResponseBody
    @PostMapping("/acg")
    @JsonView(View.Standard.class)
    public ResponseEntity generate(@Valid @RequestBody Solicitacao acg) {
        SolicitacaoDao dao = new SolicitacaoDao();
        dao.persist(acg);
        dao.close();
        return ResponseEntity.ok(acg);
    }

    @ResponseBody
    @GetMapping("/acg/{id}/report")
    public ResponseEntity report(@PathVariable("id") long id) {
        Map<String, String> output = new HashMap<>();
        output.put("vagner", "3421");
        output.put("rate", "1024.3");
        return ResponseEntity.ok(output);
    }

    @ResponseBody
    @PostMapping("/acg/{id}")
    public ResponseEntity start(@PathVariable("id") long id, @RequestBody Map<String, String> input) {
        SolicitacaoDao dao = new SolicitacaoDao();               //... Abre sessão com o banco.
        Solicitacao acg = dao.load(Solicitacao.class, id);      //... Carrega configuração.
        dao.save(acg);                         //... Salva a config. com PID.
        dao.close();                          //... Fecha sessão com o banco.
        return ResponseEntity.ok(input);
    }

    @ResponseBody
    @DeleteMapping("/acg/{id}")
    public ResponseEntity kill(@PathVariable("id") long id) {
        SolicitacaoDao dao = new SolicitacaoDao();               //... Abre sessão com o banco.
        Solicitacao sv = dao.load(Solicitacao.class, id);      //... Carrega configuração.
        dao.delete(sv);                         //... Salva a config. com PID.
        dao.close();                          //... Fecha sessão com o banco.
        return ResponseEntity.ok("");
    }

    @PostMapping("/acg/{id}/{anexo}")
    public void upload(@RequestParam MultipartFile anexo) {
        disco.salvarAnexo(anexo);
    }

}
