package br.sistema.sistemag2.controllers;

import br.sistema.sistemag2.models.Grupo;
import br.sistema.sistemag2.repository.AtividadeRepository;
import br.sistema.sistemag2.repository.GrupoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuxController {

    @Autowired
    private AtividadeRepository atividadeRepository;

    @Autowired
    private GrupoRepository grupoRepository;

    @GetMapping("/atividades/porGrupo/{idGrupo}")
    public ResponseEntity getAtividadesPorGrupo(@PathVariable long idGrupo) {
        Optional<Grupo> grupo = grupoRepository.findById(idGrupo);
        if (!grupo.isPresent()) {
            return ResponseEntity.badRequest().body("O grupo com esse ID nao foi encontrado: " + idGrupo);
        }
        return ResponseEntity.ok(atividadeRepository.findAllByGrupo(grupo.get()));
    }

}
