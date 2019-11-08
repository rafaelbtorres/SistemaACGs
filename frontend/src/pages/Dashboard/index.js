import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./index.css";

import api from "../../services/api";

export default function Dashboard({ history }) {

  const [solicitacoes, setSolicitacoes] = useState([]);

  //Pega as solicitacoes utilizando o verbo get do http
  useEffect(() => {
    api.get("/solicitacao/listar").then(response => setSolicitacoes(response.data));
  }, [solicitacoes]);

  function handleSubmitToDelete(solicitacaoId) {
    async function deletarSolicitacao() {
      var userChoice = window.confirm(
        "Você deseja mesmo deletar esta solicitação?"
      );
      if (userChoice) {
        const response = await api.delete("solicitacao/deleta/" + solicitacaoId);

        if (response.status === 200) {
          const response = await api.get("/solicitacao/listar");
          setSolicitacoes(response.data);
        } else {
          alert("Ocorreu algum erro ao tentar excluir, tente novamente.");
        }
      }
    }

    deletarSolicitacao();
  }

  return (
    <>
      <Link to="/solicitar">
        <button className="btn btn-new-solicitacao">Nova Solicitação</button>
      </Link>

      <Table className="example">
        <Thead>
          <Tr>
            <Th>Matricula</Th>
            <Th>Grupo</Th>
            <Th>Atividade</Th>
            <Th>Data</Th>
          </Tr>
        </Thead>
        <Tbody>
          {solicitacoes.map(solicitacao => (
            <Tr key={solicitacao.idSolicitacao}>
              <Td>{solicitacao.matricula}</Td>
              <Td>{solicitacao.atividade.grupo.nome}</Td>
              <Td>{solicitacao.atividade.descricao}</Td>
              <Td>
                <Link to={"/avaliar"}>
                  <button
                    type="button"
                    onClick={() =>
                      localStorage.setItem("solicitacaoId", solicitacao.idSolicitacao)
                    }
                    className="btn-edit"
                  >
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={() => handleSubmitToDelete(solicitacao.idSolicitacao)}
                  className="btn-delete"
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
