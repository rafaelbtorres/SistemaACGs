import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { Input } from "@rocketseat/unform";
import { Link } from "react-router-dom";
import _ from "lodash";

export default function Avaliar({ history }) {
  const [solicitacao, setSolicitacao] = useState({});

  const { id } = useParams("id");

  //Dados da avaliação
  const [nomeCoordenador, setNomeCoordenador] = useState("");
  const [mudarGrupoAtividade, setMudarGrupoAtividade] = useState("");
  const [deferimentoResultado, setDeferimentoResultado] = useState("");
  const [parecerCoordenador, setParecerCoordenador] = useState("");
  const [cargaHorariaAtribuida, setCargaHorariaAtribuida] = useState("");

  const [atividadeDaSolicitacao, setatividadeDaSolicitacao] = useState([]);
  const [grupoDaSolicitacao, setgrupoDaSolicitacao] = useState([]);

  // listas de grupos e atividades
  const [grupos, setGrupos] = useState([]);
  const [atividades, setAtividades] = useState([]);

  const [grupo, setGrupo] = useState();
  const [selectedGrupoIndex, setSelectedGrupoIndex] = useState();

  const [atividade, setAtividade] = useState();
  const [selectedAtividadeIndex, setSelectedAtividadeIndex] = useState("");

  const _handleAtividadeChange = event => {
    setSelectedAtividadeIndex(event.target.value);
    setAtividade(atividades[event.target.value]);
    //setDocumentos(event.target.value.docsNecessarios)
  };

  function _handleGrupoChange(grupoIndex) {
    console.log("grupo", grupoIndex, grupos[grupoIndex]);
    setGrupo(grupos[grupoIndex]);
    setSelectedGrupoIndex(grupoIndex);
  }

  useEffect(() => {
    async function loadGrupos() {
      api.get("solicitacao/dados").then(response => {
        //console.log(response.data)
        setGrupos(response.data.grupos);
        setAtividades(response.data.atividades);
      });
    }
    loadGrupos();
  }, []);

  useEffect(() => {
    async function getData() {
      const response = await api
        .get("/solicitacao/busca/" + id)
        .then(r => {
          console.log(r);
          setSolicitacao(r.data);
          setatividadeDaSolicitacao(r.data.atividade.descricao);
          setgrupoDaSolicitacao(r.data.atividade.grupo.nome);

          return;
        })
        .catch(e => console.log(e.response));
    }

    getData();
  }, [id]);

  var avaliacao = {
    deferimentoResultado,
    parecerCoordenador,
    cargaHorariaAtribuida
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post(
        "/avaliacoes/" + localStorage.getItem("solicitacaoId"),
        {
          deferimentoResultado,
          parecerCoordenador,
          cargaHorariaAtribuida
        }
      );

      if (response.status === 200) {
        history.push("/");
      }
    } catch (e) {
      alert(
        "Ocorreu um erro na avaliação verifique os dados informados e tente novamente !",
        e
      );
    }
  }

  return (
    <>
      <p>
        Avalie aqui a solicitação de : <strong>{solicitacao.nomeAluno}</strong>,
        matrícula: <strong>{solicitacao.matricula}</strong>.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="data">Data</label>
        <input
          id="data"
          name="data"
          type="text"
          placeholder={solicitacao.dataAtual}
          value={solicitacao.dataAtual}
          disabled
        />
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
            <label htmlFor="nome">Nome *</label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder={solicitacao.nomeAluno}
              value={solicitacao.nomeAluno}
              disabled
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="matricula">Matrícula *</label>
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
            <label htmlFor="grupo">Grupo *</label>
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
            <label htmlFor="atividade">Atividade *</label>
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
            <label htmlFor="periodoAtividadeInicio">
              Período da atividade *
            </label>
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
            <label htmlFor="cargaHorariaAtividade">
              Carga-horária da atividade *
            </label>
            <input
              id="cargaHorariaAtividade"
              name="cargaHorariaAtividade"
              type="number"
              placeholder={solicitacao.cargaHorariaSoli}
              value={solicitacao.cargaHorariaSoli}
              disabled
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="cargaHorariaSolicitada">
              Carga-horária solicitada *
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
        <label htmlFor="descricaoAtividade">Descrição da atividade *</label>
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
        <label htmlFor="documento">Comprovante *</label>
        Essa parte precisa ser implementada para abrir um modal com o documento
        <input
          id="documento"
          name="documento"
          type="file"
          placeholder={solicitacao.anexos}
          value={solicitacao.anexos}
          disabled
        />
        <div className="content2">
          <p>Status do deferimento</p>
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
                width: "100%"
              }}
            >
              <label>Deferido</label>
              <input
                type="radio"
                name="deferimentoResultado"
                value="Deferido"
                required
                onChange={event => setDeferimentoResultado(event.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%"
              }}
            >
              <label>Indeferido</label>
              <input
                type="radio"
                name="deferimentoResultado"
                value="Indeferido"
                required
                onChange={event => setDeferimentoResultado(event.target.value)}
              />
            </div>
          </div>
          <p>Alterar grupo e atividade.</p>
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
                width: "100%"
              }}
            >
              <label>Sim</label>
              <input
                type="radio"
                name="Alterar"
                value="sim"
                required
                onChange={event => setMudarGrupoAtividade(event.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%"
              }}
            >
              <label>Não</label>
              <input
                type="radio"
                name="Alterar"
                value="nao"
                required
                onChange={event => setMudarGrupoAtividade(event.target.value)}
              />
            </div>
            {mudarGrupoAtividade === "sim" && (
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
                    width: "48%"
                  }}
                >
                  <label htmlFor="grupo">Grupo *</label>
                  <select
                    id="grupo"
                    name="grupo"
                    value={selectedGrupoIndex}
                    onChange={e => {
                      _handleGrupoChange(e.target.value);
                    }}
                    required
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
                    width: "48%"
                  }}
                >
                  <label htmlFor="atividade">Atividade *</label>
                  <select
                    id="atividade"
                    name="atividade"
                    value={selectedAtividadeIndex}
                    onChange={_handleAtividadeChange}
                    required
                    disabled={grupo == null}
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
            )}
            {mudarGrupoAtividade === "nao" && <div>bb aa</div>}
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
                width: "100%"
              }}
            >
              <label htmlFor="parecerCoordenador">Justificativa *</label>
              <Input
                multiline
                style={{
                  height: "100px"
                }}
                id="parecerCoordenador"
                name="parecerCoordenador"
                type="text"
                placeholder="Parecer do Coordenador"
                value={parecerCoordenador}
                required
                onChange={event => setParecerCoordenador(event.target.value)}
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
              <label htmlFor="cargaHorariaAtribuida">
                Carga Horária Atribuida *
              </label>
              <input
                id="cargaHorariaAtribuida"
                name="cargaHorariaAtribuida"
                type="number"
                placeholder="Carga Horária Atribuida"
                value={cargaHorariaAtribuida}
                required
                onChange={event => setCargaHorariaAtribuida(event.target.value)}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "48%" }}
            >
              <label htmlFor="parecerCoordenador">Coordenador *</label>
              <input
                id="nomeCoordenador"
                name="nomeCoordenador"
                type="text"
                placeholder="Nome do Coordenador"
                value={nomeCoordenador}
                required
                onChange={event => setNomeCoordenador(event.target.value)}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-add">
          Avaliar
        </button>
      </form>
      <Link to="/">
        <button className="btn btn-add">Voltar</button>
      </Link>
    </>
  );
}
