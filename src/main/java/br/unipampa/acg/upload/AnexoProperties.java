package br.unipampa.acg.upload;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class AnexoProperties {

    /**
     * Folder location for storing files
     */
    private String location = "arquivos";

    public String getLocation() {
        return location;
    }

    public void setLocation(String nome) {
        this.location = this.location + "/" + nome;
    }

}