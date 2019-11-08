package br.sistema.sistemag2.anexo;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("anexo")
public class AnexoProperties {

    /**
     * Folder location for storing files
     */
    private String location = "anexos";

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}