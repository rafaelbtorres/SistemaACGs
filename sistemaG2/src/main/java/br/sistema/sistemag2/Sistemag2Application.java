package br.sistema.sistemag2;

import br.sistema.sistemag2.anexo.AnexoProperties;
import br.sistema.sistemag2.anexo.AnexoService;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableConfigurationProperties(AnexoProperties.class)
public class Sistemag2Application {

	public static void main(String[] args) {
		SpringApplication.run(Sistemag2Application.class, args);
	}

	@Bean
    CommandLineRunner init(AnexoService anexoService) {
        return (args) -> {
            anexoService.deleteAll();
            anexoService.init();
        };
    }
}
