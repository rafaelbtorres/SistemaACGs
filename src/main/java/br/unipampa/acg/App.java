package br.unipampa.acg;

import br.unipampa.acg.upload.AnexoService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan ({"br.unipampa.acg.controllers", "br.unipampa.acg.domain"})
@SpringBootApplication
public class App
{
    public static void main (String args [])
    {
        
        SpringApplication. run (App.class, args);
    }

    @Bean
    CommandLineRunner init(AnexoService anexoService){
        return (args) -> {
            anexoService.deleteAll();
            anexoService.init();
        };
    }
}
