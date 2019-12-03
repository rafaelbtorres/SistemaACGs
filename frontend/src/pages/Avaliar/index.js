import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { Input } from "@rocketseat/unform";
import { Link } from "react-router-dom";
import _ from "lodash";

export default function Avaliar({ history }) {
  const [solicitacao, setSolicitacao] = useState({});

  const [anexos, setAnexos] = useState({});

  const { id } = useParams("id");

  //Dados da avaliação
  const [nomeCoordenador, setNomeCoordenador] = useState("");
  const [mudarGrupo, setMudarGrupo] = useState("");
  const [mudarAtividade, setMudarAtividade] = useState("");
  const [deferimentoResultado, setDeferimentoResultado] = useState("");
  const [parecerCoordenador, setParecerCoordenador] = useState("");
  const [cargaHorariaAtribuida, setCargaHorariaAtribuida] = useState("");

  const [radio, setRadio] = useState('');
  const [radioInfo, setRadioInfo] = useState('');
  const [mostraHoras, setMostaHoras] = useState(false);
  const [mostraObs, setMostraObs] = useState(false);
  const [requiredObs, setRequiredObs] = useState(false);
  const [mudaInfo, setMudaInfo] = useState(false);
  const [deferido, setDeferido] = useState(false);
  const [mostraButton, setMostraButton] = useState(false);
  const [respInfo, setRespInfo] = useState('');

  const [idAtividade, setIdAtividade] = useState([]);

  const [atividadeDaSolicitacao, setatividadeDaSolicitacao] = useState([]);
  const [grupoDaSolicitacao, setgrupoDaSolicitacao] = useState([]);

  // listas de grupos e atividades
  const [grupos, setGrupos] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [idSolicitacao, setIdSolicitacao] = useState()

  const [grupo, setGrupo] = useState();
  const [selectedGrupoIndex, setSelectedGrupoIndex] = useState();

  const [atividade, setAtividade] = useState();
  const [selectedAtividadeIndex, setSelectedAtividadeIndex] = useState("");

  const [avaliacao, setAvaliacao] = useState({
    idAtividade: "",
    cargaHorariaAtribuida: "",
    parecer: "",
    deferido: "",
    nomeCoordenador: "Maicon Bernardino",
    idSolicitacao: ""
  })

  // var avaliacao = {
  //   cargaHorariaAtribuida: parseInt(cargaHorariaAtribuida),
  //   idSolicitacao: parseInt(localStorage.getItem("solicitacaoId")),
  //   idAtividade: parseInt(idAtividade),//tem q ser atividade só pra vir a modificada
  //   parecer: parecerCoordenador,
  //   deferido: deferimentoResultado,
  //   nomeCoordenador: ""
  // };

  const handleAvaliacao = () => event => {
    setAvaliacao({ ...avaliacao, [event.target.id]: event.target.value });
  }


  function handleMudaInfo(resp) {
    if (resp === 'sim') {
      setRespInfo('sim')
      setMudaInfo(true)
    }
    if (resp === 'não') {
      setRespInfo('não')
      setMudaInfo(false)
    }
  }

  const handleDeferido = event => {
    setDeferido(true)
    setMostaHoras(true);
    setMostraObs(true);
    setMostraButton(true)
    setRequiredObs(false)
    if (respInfo === 'sim') {
      setMudaInfo(true)
    }
    setCargaHorariaAtribuida(solicitacao.cargaHorariaSoli)
    setAvaliacao({ ...avaliacao, deferido: "true", cargaHorariaAtribuida: solicitacao.cargaHorariaSoli })
  };

  const handleIndefirido = event => {
    setDeferido(false)
    setMostraObs(true);
    setMostaHoras(false);
    setMudaInfo(false)
    setMostraButton(true)
    setRequiredObs(true)
    setCargaHorariaAtribuida("0")
    setAvaliacao({ ...avaliacao, cargaHorariaAtribuida: "0" })
    setAvaliacao({ ...avaliacao, deferido: "false" })
  };

  const _handleAtividadeChange = event => {
    if(solicitacao.atividade.precisaCalcular && atividades[parseInt(event.target.value)].precisaCalcular) {
      setCargaHorariaAtribuida((solicitacao.cargaHorariaSoli / solicitacao.atividade.cargaHoraria) * atividades[parseInt(event.target.value)].cargaHoraria)
    }
    if(!atividades[parseInt(event.target.value)].precisaCalcular){
      setCargaHorariaAtribuida(atividades[parseInt(event.target.value)].cargaHoraria)
    }
    setSelectedAtividadeIndex(event.target.value);
    setAtividade(atividades[parseInt(event.target.value)]);

    setAvaliacao({ ...avaliacao, idAtividade: atividades[parseInt(event.target.value)].idAtividade.toString() })
    console.log("event: ", event.target.value)
    console.log("atividade: ", atividades[parseInt(event.target.value)])
  };

  function _handleGrupoChange(grupoIndex) {
    setSelectedAtividadeIndex("");
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
    setIdSolicitacao(id)
    setAvaliacao({ ...avaliacao, idSolicitacao: id })
    async function getData() {
      const response = await api
        .get("/solicitacao/busca/" + id)
        .then(r => {
          console.log(r);
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

  useEffect(() => {
    async function loadGrupos() {
      if (grupo != null)
        api
          .get(`/atividades/porGrupo/${grupo.idGrupo}`)
          .then(response => {
            // console.log("ATIVIDADES", response.data);
            setAtividades(response.data);
          })
          .catch(e => {
            console.log("RESPOSE ERROR", e.response);
            // alert("erro ao buscar as atividades");
          });
    }
    loadGrupos();
  }, [grupo]);


  async function handleSubmit(event) {
    event.preventDefault();
    console.log(avaliacao)

    var data = {
      cargaHorariaAtribuida: avaliacao.cargaHorariaAtribuida,
      idAtividade: avaliacao.idAtividade,
      parecer: avaliacao.parecer,
      deferido: avaliacao.deferido,
      nomeCoordenador: "Maicon Bernardino"
    }

    try {
      const response = await api.post(`/avaliacao/${idSolicitacao}`, data
      );
      console.log(response)

      if (response.status === 200) {
        alert("Avaliação Realizada com Sucesso!")
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
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
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
            <label htmlFor="periodoAtividadeInicio">
              Período da atividade
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
            <label htmlFor="data">
              Data do Pedido
            </label>
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
      </form>

      <label style={{ marginTop: 10 }} htmlFor="documento">Comprovantes:</label>
      <div>
        {_.map(anexos, (anexo, index) => (
          <div key={index}>
            <p>{anexo.doc.nome}</p>
            <button className="btn btn-add" style={{ marginTop: 3, width: "25%" }}
              id={anexo.idAnexo}
              name={anexo.nome}
              onClick={event => {
                window.open(
                  `http://localhost:2222/avaliacao/anexos/${anexo.nome}`,
                  '_blank',
                  'noopener'
                );
              }}
            >
              Comprovante {index + 1}
            </button>
          </div>
        ))}
      </div>



      <form onSubmit={handleSubmit}>
        <div className="content2">
          <p style={{ color: 'white' }}><strong>Status do deferimento: </strong></p>
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
                <label style={{ color: 'white' }}>Deferido</label>
                <input
                  style={{ marginBottom: 0, height: "auto" }}
                  type="radio"
                  name="deferimentoResultado"
                  value={radio}
                  onChange={handleDeferido}
                  required
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 10,
                  marginLeft: "3%",
                  minWidth: "25%",
                }}
              >
                <label style={{ color: 'white' }}>Indeferido</label>
                <input
                  style={{ marginBottom: 0, height: "auto" }}
                  type="radio"
                  name="deferimentoResultado"
                  value="Indeferido"
                  required
                  onChange={handleIndefirido}
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
                  style={{ flexDirection: "column", width: "100%", marginLeft: 10, display: "flex" }}
                >
                  <label style={{ color: 'white' }} htmlFor="cargaHorariaAtribuida">
                    Carga Horária Atribuida
              </label>
                  <input
                    id="cargaHorariaAtribuida"
                    name="cargaHorariaAtribuida"
                    type="number"
                    placeholder={deferido ? "Carga Horária Atribuida" : "0"}
                    disabled={!deferido}
                    value={cargaHorariaAtribuida}
                    required={mostraHoras}
                    onChange={event => setAvaliacao({ ...avaliacao, cargaHorariaAtribuida: event.target.value })}
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
                  display: mostraObs === true ? "flex" : "none",
                  flexDirection: "column",
                  width: "100%",
                  marginTop: 15
                }}
              >
                <label style={{ color: 'white' }} htmlFor="parecerCoordenador">Justificativa </label>
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
                  required={requiredObs}
                  onChange={event => setAvaliacao({ ...avaliacao, parecer: event.target.value })}
                />
              </div>
            </div>
            <div >
              <div style={{
                display: mostraHoras === true ? "flex" : "none",
                flexDirection: "column",
                justifyContent: "flex-start"
              }}>
                <p style={{ color: 'white', marginTop: 10 }}><strong>Alterar grupo e atividade?</strong></p>
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
                      minWidth: "25%",
                    }}
                  >
                    <label style={{ color: 'white' }}>Sim</label>
                    <input
                      style={{ marginBottom: 0, height: "auto" }}
                      type="radio"
                      name="Alterar"
                      value="sim"
                      onChange={(e) => { handleMudaInfo('sim') }}
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
                    <label style={{ color: 'white' }}>Não</label>
                    <input
                      style={{ marginBottom: 0, height: "auto" }}
                      type="radio"
                      name="Alterar"
                      value="nao"
                      onChange={(e) => { handleMudaInfo('não') }}
                    />
                  </div>
                </div>
                <div style={{ display: mudaInfo === true ? "flex" : "none", marginTop: 10 }}>
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
                      <label style={{ color: 'white' }} htmlFor="grupo">Grupo </label>
                      <select
                        id="grupo"
                        name="grupo"
                        value={selectedGrupoIndex}
                        onChange={e => {
                          _handleGrupoChange(e.target.value);
                        }}
                        required={mudaInfo}
                      >
                        <option disabled selected>
                        {grupoDaSolicitacao}
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
                      <label style={{ color: 'white' }} htmlFor="atividade">Atividade </label>
                      <select
                        id="atividade"
                        name="atividade"
                        value={selectedAtividadeIndex}
                        onChange={_handleAtividadeChange}
                        required={mudaInfo}
                        disabled={grupo == null}
                      >
                        <option value="" disabled>
                          {atividadeDaSolicitacao}
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
              style={{ display: "flex", flexDirection: "column", width: "35%" }}
            >
              <label style={{ color: 'white', marginTop: 10 }} htmlFor="parecerCoordenador">Coordenador </label>
              <input
                id="nomeCoordenador"
                name="nomeCoordenador"
                type="text"
                placeholder="Maicon Bernardino"
                value="Maicon Bernardino"
                disabled
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <Link to="/" style={{ width: "48%" }} >
            <button className="btn btn-add">Voltar</button>
          </Link>
          <button type="submit" style={{ width: "48%", display: mostraButton === true ? "block" : "none" }} className="btn btn-add">
            Avaliar
          </button>
        </div>

      </form>
    </>
  );
}
