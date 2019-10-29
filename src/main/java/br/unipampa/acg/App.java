package br.unipampa.acg;

import br.unipampa.acg.utils.DatabaseConnection;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan ({"br.unipampa.acg.controllers", "br.unipampa.acg.domain"})
@SpringBootApplication
public class App
{
    public static void main (String args [])
    {
        DatabaseConnection. instance (). connect ("db/acg.hib.cfg.xml");
        SpringApplication. run (App.class, args);
    }
}
