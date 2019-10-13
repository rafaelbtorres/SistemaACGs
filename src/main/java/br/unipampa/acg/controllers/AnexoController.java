/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.controllers;

import br.unipampa.acg.domain.Anexo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Vagner <vequincozes@gmail.com>
 */

@RestController
@RequestMapping("/anexo")
public class AnexoController {
    
    
    public  Anexo anexo;
    
    public void upload(@RequestParam MultipartFile arquivoAnexo) {
        anexo.salvarAnexo(arquivoAnexo);
    }
}
