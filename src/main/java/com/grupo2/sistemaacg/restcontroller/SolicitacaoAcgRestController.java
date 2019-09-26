/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.grupo2.sistemaacg.restcontroller;

import com.grupo2.sistemaacg.model.SolicitacaoAcg;
import com.grupo2.sistemaacg.model.Disco;
import static com.grupo2.sistemaacg.model.ListaAcg.getAcg;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Vagner <vequincozes@gmail.com>
 */
@RestController
@RequestMapping("solicitacaoacg")

public class SolicitacaoAcgRestController {
    
    private Disco disco;
    
    @PostMapping
    public void upload(@RequestParam MultipartFile anexo) {
        disco.salvarAnexo(anexo);
    }
    
    @PostMapping("/post/")
    public @ResponseBody ResponseEntity<SolicitacaoAcg> post(@RequestBody SolicitacaoAcg acg) {
        SolicitacaoAcg novaAcg = new SolicitacaoAcg(acg.getId(), acg.getNome(),
        acg.getCargaHoraria(), acg.getAnexo());
        
        return new ResponseEntity<SolicitacaoAcg>(novaAcg, HttpStatus.OK);
    }
    
    @GetMapping(value="")
    public SolicitacaoAcg httpGetInformacoesAcg(){
        return SolicitacaoAcg.getInformacoesAcg();
    }
    
    @GetMapping(value="/{id}")
    public SolicitacaoAcg httpGetInformacoesAcgPorId(@PathVariable int id) {
        return getAcg(id);
    }
  
}
