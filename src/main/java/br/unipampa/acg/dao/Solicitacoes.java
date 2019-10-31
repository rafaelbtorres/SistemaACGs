/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.dao;

import br.unipampa.acg.domain.Solicitacao;

import org.springframework.data.jpa.repository.JpaRepository;
/**
 *
 * @author Vagner <vequincozes@gmail.com>
 */
public interface Solicitacoes extends JpaRepository<Solicitacao, Long>{
    
}
