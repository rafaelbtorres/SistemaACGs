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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Data
public class Anexo {

    @Id
    @GeneratedValue
    private long idAnexo;

    @Value("${contato.disco.raiz}")
    private String caminhoRaiz;

    @Value("${contato.disco.diretorio-arquivos}")
    private String diretorioAnexos;

    private int limite;

    private String nome;

    @OneToOne
    private Solicitacao acg;

    public Anexo(String nome) {
        this.nome = nome;
    }

    public String salvarAnexo(MultipartFile anexo) {
        return this.salvar(this.diretorioAnexos, anexo);
    }

    public String salvar(String diretorio, MultipartFile arquivo) {
        diretorio = "arquivos";
        caminhoRaiz = "C:\\upload";
        System.out.println("caminhoRaiz: " + caminhoRaiz);
        System.out.println("diretorio: " + diretorio);
        Path diretorioPath = Paths.get(this.caminhoRaiz, diretorio);
        Path arquivoPath = diretorioPath.resolve(arquivo.getOriginalFilename());
        System.out.println("Caminho: " + arquivoPath);
        try {
            Files.createDirectories(diretorioPath);
            arquivo.transferTo(arquivoPath.toFile());
        } catch (IOException e) {
            throw new RuntimeException("Problemas ao anexar");
        }
        return arquivoPath.toString();
    }

}
