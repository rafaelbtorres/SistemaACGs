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
    api
      .get("/solicitacao/listar")
      .then(response => setSolicitacoes(response.data));
  }, []);

  function handleSubmitToDelete(solicitacaoId) {
    async function deletarSolicitacao() {
      var userChoice = window.confirm(
        "Você deseja mesmo deletar esta solicitação?"
      );
      if (userChoice) {
        const response = await api.delete(
          "solicitacao/deleta/" + solicitacaoId
        );

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

  function handleSubmitToDeleteAvaliacao(idAvaliacao) {
    console.log(idAvaliacao);
    async function deletarAvaliacao() {
      var userChoice = window.confirm(
        "Você deseja mesmo deletar esta avaliação?"
      );
      if (userChoice) {
        const response = await api.delete("avaliacao/" + idAvaliacao);

        if (response.status === 200) {
          const response = await api.get("/solicitacao/listar");
          setSolicitacoes(response.data);
        } else {
          alert("Ocorreu algum erro ao tentar excluir, tente novamente.");
        }
      }
    }
    deletarAvaliacao();
  }

  function formatarData(data) {
    var splitData = data.split("-");
    var dataFormatada = splitData[2] + "/" + splitData[1] + "/" + splitData[0];
    return dataFormatada;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end"
        }}
      >
        <Link to="/solicitar">
          <button style={{ width: "100%" }} className="btn btn-new-solicitacao">
            Nova Solicitação
          </button>
        </Link>
      </div>
      <hr style={{ width: "100%" }}></hr>
      <div>
        <Table className="example">
          <Thead>
            <Tr>
              <Th style={{ width: "10%" }}>Matricula</Th>
              <Th style={{ width: "10%" }}>Grupo</Th>
              <Th>Atividade</Th>
              <Th>Status</Th>
              <Th style={{ width: "10%" }}>Data</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {solicitacoes.map(solicitacao => (
              <Tr key={solicitacao.idSolicitacao}>
                <Td>{solicitacao.matricula}</Td>
                <Td>{solicitacao.atividade.grupo.nome}</Td>
                <Td>{solicitacao.atividade.descricao}</Td>
                <Td>{solicitacao.status}</Td>
                <Td>{formatarData(solicitacao.dataAtual)}</Td>
                <Td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                  >
                    {solicitacao.status === "PENDENTE" ||
                    solicitacao.status === "Pendente" ||
                    solicitacao.status === "pendente" ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row"
                        }}
                      >
                        <Link
                          style={{ margin: "2%" }}
                          props={solicitacao.idSolicitacao}
                          to={`/avaliar/${solicitacao.idSolicitacao}`}
                        >
                          <button
                            type="button"
                            onClick={() => {}}
                            className="btn-edit"
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </button>
                        </Link>
                        <button
                          style={{ margin: "2%" }}
                          type="button"
                          onClick={() =>
                            handleSubmitToDelete(solicitacao.idSolicitacao)
                          }
                          className="btn-delete"
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <Link
                          style={{ margin: "2%" }}
                          props={solicitacao.idSolicitacao}
                          to={`/visualizar/${solicitacao.idSolicitacao}`}
                        >
                          <button
                            type="button"
                            onClick={() => {}}
                            className="btn-visualizar"
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row"
                        }}
                      >
                        <button
                          style={{ margin: "2%" }}
                          type="button"
                          onClick={() =>
                            handleSubmitToDeleteAvaliacao(
                              solicitacao.avaliacao.idAvaliacao
                            )
                          }
                          className="btn-delete-avaliacao"
                        >
                          <i className="fa fa-minus" aria-hidden="true"></i>
                        </button>
                        <Link
                          style={{ margin: "2%" }}
                          props={solicitacao.idSolicitacao}
                          to={`/visualizar/${solicitacao.idSolicitacao}`}
                        >
                          <button
                            type="button"
                            onClick={() => {}}
                            className="btn-visualizar"
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}
