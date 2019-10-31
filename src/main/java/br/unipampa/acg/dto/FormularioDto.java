package br.unipampa.acg.dto;


import br.unipampa.acg.domain.Atividade;
import br.unipampa.acg.domain.Curriculo;
import br.unipampa.acg.domain.Grupo;
import lombok.Data;

@Data
public class FormularioDto {
    Iterable<Curriculo> currilo;
    Iterable<Grupo> grupo;
    Iterable<Atividade> atividade;
}