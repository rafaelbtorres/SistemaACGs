/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.domain;

/**
 *
 * @author Vagner <vequincozes@gmail.com>
 */
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;


import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Data
public class Anexo {

    @Id
    @GeneratedValue
    private long idAnexo;

    private String caminhoRaiz;
    private String diretorioAnexos;

    private int limite;

    private String nome;

    @OneToOne
    private Solicitacao acg;

    public Anexo(String nome) {
        this.nome = nome;
    }
    
    
    
    public void salvarAnexo(MultipartFile anexo) {
        this.salvar(this.diretorioAnexos, anexo);
    }

    public void salvar(String diretorio, MultipartFile arquivo) {
        Path diretorioPath = Paths.get(this.caminhoRaiz, diretorio);
        Path arquivoPath = diretorioPath.resolve(arquivo.getOriginalFilename());
        try {
            Files.createDirectories(diretorioPath);
            arquivo.transferTo(arquivoPath.toFile());
        } catch (IOException e) {
            throw new RuntimeException("Problemas ao anexar");
        }
    }
    

}
