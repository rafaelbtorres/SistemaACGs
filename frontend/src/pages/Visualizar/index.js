import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { Input } from "@rocketseat/unform";
import { Link } from "react-router-dom";
import _ from "lodash";

export default function Visualizar({ history }) {
  const [solicitacao, setSolicitacao] = useState({});

  const [anexos, setAnexos] = useState({});

  const { id } = useParams("id");

  const [temAvaliacao, setTemAvaliacao] = useState(false);
  const [precisouDecorrecao, setPrecisouDecorrecao] = useState(true);
  //Dados da avaliação
  const [nomeCoordenador, setNomeCoordenador] = useState("");
  const [mudarGrupoAtividade, setMudarGrupoAtividade] = useState("");
  const [deferimentoResultado, setDeferimentoResultado] = useState("");
  const [parecerCoordenador, setParecerCoordenador] = useState("");
  const [cargaHorariaAtribuida, setCargaHorariaAtribuida] = useState("");

  const [idAtividade, setIdAtividade] = useState([]);

  const [atividadeDaSolicitacao, setatividadeDaSolicitacao] = useState([]);
  const [grupoDaSolicitacao, setgrupoDaSolicitacao] = useState([]);

  // listas de grupos e atividades
  const [grupos, setGrupos] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [idSolicitacao, setIdSolicitacao] = useState();

  const [grupo, setGrupo] = useState();
  const [selectedGrupoIndex, setSelectedGrupoIndex] = useState();

  const [atividade, setAtividade] = useState();
  const [selectedAtividadeIndex, setSelectedAtividadeIndex] = useState("");

  const [avaliacao, setAvaliacao] = useState({
    idAtividade: "",
    cargaHorariaAtribuida: "",
    parecer: "",
    deferido: "",
    nomeCoordenador: "",
    idSolicitacao: ""
  });

  useEffect(() => {
    async function loadGrupos() {
      api.get("solicitacao/dados").then(response => {
        setGrupos(response.data.grupos);
        setAtividades(response.data.atividades);
      });
    }
    loadGrupos();
  }, []);

  useEffect(() => {
    setIdSolicitacao(id);
    setAvaliacao({ ...avaliacao, idSolicitacao: id });
    async function getData() {
      const response = await api
        .get("/solicitacao/busca/" + id)
        .then(r => {
          console.log(r);
          console.log(avaliacao);
          setSolicitacao(r.data.solicitacao);
          setatividadeDaSolicitacao(r.data.solicitacao.atividade.descricao);
          setgrupoDaSolicitacao(r.data.solicitacao.atividade.grupo.nome);
          setIdAtividade(r.data.solicitacao.atividade.idAtividade);
          setAnexos(r.data.anexosDaSolicitacao);
          return;
        })
        .catch(e => console.log(e.response));
    }

    getData();
  }, [id]);

  return (
    <>
      <p>
        Avalie aqui a solicitação de : <strong>{solicitacao.nomeAluno}</strong>,
        matrícula: <strong>{solicitacao.matricula}</strong>.
      </p>
      <form>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="nome">Nome </label>
            <input
              id="nome"
              name="nomeAluno"
              type="text"
              placeholder={solicitacao.nomeAluno}
              value={solicitacao.nomeAluno}
              disabled
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="matricula">Matrícula </label>
            <input
              id="matricula"
              name="matricula"
              type="number"
              placeholder={solicitacao.matricula}
              value={solicitacao.matricula}
              disabled
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="grupo">Grupo </label>
            <input
              id="grupo"
              name="grupo"
              type="text"
              placeholder={grupoDaSolicitacao}
              value={grupoDaSolicitacao}
              disabled
              required
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="atividade">Atividade </label>
            <input
              id="atividade"
              name="atividade"
              type="text"
              placeholder={atividadeDaSolicitacao}
              value={atividadeDaSolicitacao}
              disabled
              required
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="nomeResponsavel">Professor(a) responsável </label>
            <input
              id="nomeResponsavel"
              name="nomeResponsavel"
              type="text"
              placeholder={solicitacao.profRes}
              value={solicitacao.profRes}
              disabled
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="localAtividade">Local da Atividade </label>
            <input
              id="localAtividade"
              name="localAtividade"
              type="text"
              placeholder={solicitacao.local}
              value={solicitacao.local}
              disabled
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="periodoAtividadeInicio">Período da atividade</label>
            <input
              id="periodoAtividadeInicio"
              name="periodoAtividadeInicio"
              type="date"
              placeholder={solicitacao.dataInicio}
              value={solicitacao.dataInicio}
              disabled
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="periodoAtividadeInicio">Até</label>
            <input
              id="periodoAtividadeFinal"
              name="periodoAtividadeFinal"
              type="date"
              placeholder={solicitacao.dataFim}
              value={solicitacao.dataFim}
              disabled
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="data">Data do Pedido</label>
            <input
              id="data"
              name="data"
              type="text"
              placeholder={solicitacao.dataAtual}
              value={solicitacao.dataAtual}
              disabled
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="cargaHorariaSolicitada">
              Carga-horária solicitada
            </label>
            <input
              id="cargaHorariaSolicitada"
              name="cargaHorariaSolicitada"
              type="number"
              placeholder={solicitacao.cargaHorariaSoli}
              value={solicitacao.cargaHorariaSoli}
              disabled
            />
          </div>
        </div>
        <label htmlFor="descricaoAtividade">Descrição da atividade </label>
        <Input
          multiline
          style={{
            height: "100px"
          }}
          id="descricaoAtividade"
          name="descricaoAtividade"
          type="text"
          placeholder={solicitacao.descricao}
          value={solicitacao.descricao}
          disabled
        />
        <label style={{ marginTop: 10 }} htmlFor="documento">
          Comprovantes:
        </label>
        <div>
          {_.map(anexos, (anexo, index) => (
            <div key={index}>
              <p>{anexo.doc.nome}</p>
              <button
                className="btn btn-add"
                style={{ marginTop: 3, width: "25%" }}
                id={anexo.idAnexo}
                name={anexo.nome}
                placeholder={anexo.nome}
                onClick={event => {
                  window.open(
                    `http://localhost:2222/avaliacao/anexos/${anexo.nome}`,
                    "_blank",
                    "noopener"
                  );
                }}
              >
                Comprovante {index + 1}
              </button>
            </div>
          ))}
        </div>

        <div
          className="content2"
          style={{
            display: temAvaliacao === true ? "flex" : "none"
          }}
        >
          <p
            style={{
              display: "flex",
              color: "white"
            }}
          >
            <strong>Status do deferimento: </strong>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "15%",
                  marginTop: 10,
                  marginLeft: "3%"
                }}
              >
                <label style={{ color: "white" }}>Deferido</label>
                <input
                  style={{ marginBottom: 0, height: "auto" }}
                  type="radio"
                  name="deferimentoResultado"
                  value="Deferido"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 10,
                  marginLeft: "3%",
                  minWidth: "25%"
                }}
              >
                <label style={{ color: "white" }}>Indeferido</label>
                <input
                  style={{ marginBottom: 0, height: "auto" }}
                  type="radio"
                  name="deferimentoResultado"
                  value="Indeferido"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 15,
                  width: "50%"
                }}
              >
                <div
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    marginLeft: 10,
                    display: "flex"
                  }}
                >
                  <label
                    style={{ color: "white" }}
                    htmlFor="cargaHorariaAtribuida"
                  >
                    Carga Horária Atribuida
                  </label>
                  <input
                    id="cargaHorariaAtribuida"
                    name="cargaHorariaAtribuida"
                    type="number"
                    placeholder="Carga Horária Atribuida"
                    value={avaliacao.cargaHorariaAtribuida}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginTop: 15
                }}
              >
                <label style={{ color: "white" }} htmlFor="parecerCoordenador">
                  Justificativa{" "}
                </label>
                <Input
                  multiline
                  style={{
                    height: "100px"
                  }}
                  id="parecerCoordenador"
                  name="parecerCoordenador"
                  type="text"
                  placeholder="Parecer do Coordenador"
                  value={avaliacao.parecer}
                />
              </div>
            </div>
            <div>
              <div
                style={{
                  //display: mostraHoras === true ? "flex" : "none",
                  flexDirection: "column",
                  justifyContent: "flex-start"
                }}
              >
                <p style={{ color: "white" }}>
                  <strong>Alterar grupo e atividade?</strong>
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: 10,
                      marginLeft: "3%",
                      minWidth: "25%"
                    }}
                  >
                    <label style={{ color: "white" }}>Sim</label>
                    <input
                      style={{ marginBottom: 0, height: "auto" }}
                      type="radio"
                      name="Alterar"
                      value="sim"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: 10,
                      marginLeft: "3%"
                    }}
                  >
                    <label style={{ color: "white" }}>Não</label>
                    <input
                      style={{ marginBottom: 0, height: "auto" }}
                      type="radio"
                      name="Alterar"
                      value="nao"
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: precisouDecorrecao === true ? "flex" : "none",
                    marginTop: 10
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "35%"
                      }}
                    >
                      <label style={{ color: "white" }} htmlFor="grupo">
                        Grupo{" "}
                      </label>
                      <select
                        id="grupo"
                        name="grupo"
                        value={selectedGrupoIndex}
                      >
                        <option disabled selected>
                          Selecione um grupo
                        </option>
                        {_.map(grupos, (grupo, index) => {
                          return <option value={index}>{grupo.nome}</option>;
                        })}
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "60%"
                      }}
                    >
                      <label style={{ color: "white" }} htmlFor="atividade">
                        Atividade{" "}
                      </label>
                      <select
                        id="atividade"
                        name="atividade"
                        value={selectedAtividadeIndex}
                        disabled
                      >
                        <option value="" disabled>
                          Selecione uma atividade
                        </option>
                        {_.map(atividades, (atividade, index) => {
                          return (
                            <option value={index}>{atividade.descricao}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "48%" }}
            >
              <label style={{ color: "white" }} htmlFor="parecerCoordenador">
                Coordenador{" "}
              </label>
              <input
                id="nomeCoordenador"
                name="nomeCoordenador"
                type="text"
                placeholder="Nome do Coordenador"
                value={avaliacao.nomeCoordenador}
                required
                onChange={event =>
                  setAvaliacao({
                    ...avaliacao,
                    nomeCoordenador: event.target.value
                  })
                }
              />
            </div>
          </div>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Link to="/" style={{ width: "48%" }}>
          <button className="btn btn-add">Voltar</button>
        </Link>
      </div>
    </>
  );
}
