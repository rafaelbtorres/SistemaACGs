/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.grupo2.sistemaacg.model;

import lombok.Value;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Vagner <vequincozes@gmail.com>
 */

@Component
public class Disco {

    @Value("${contato.disco.raiz}")
    private String raiz;

    @Value("${contato.disco.diretorio.anexos}")
    private String diretorioAnexos;

    public void salvarAnexo(MultipartFile anexo) {
        this.salvar(this.diretorioAnexos, anexo);
    }

    public void salvar(String diretorio, MultipartFile arquivo) {
        Path diretorioPath = Paths.get(this.raiz, diretorio);
        Path arquivoPath = diretorioPath.resolve(arquivo.getOriginalFilename());
        try {
            Files.createDirectories(diretorioPath);
            arquivo.transferTo(arquivoPath.toFile());
        } catch (IOException e) {
            throw new RuntimeException("Problemas");
        }
    }
}
