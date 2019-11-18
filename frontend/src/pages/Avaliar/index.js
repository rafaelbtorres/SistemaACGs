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
  const [mudarGrupoAtividade, setMudarGrupoAtividade] = useState("");
  const [deferimentoResultado, setDeferimentoResultado] = useState("");
  const [parecerCoordenador, setParecerCoordenador] = useState("");
  const [cargaHorariaAtribuida, setCargaHorariaAtribuida] = useState("");

  const [radio, setRadio] = useState('');
  const [radioInfo, setRadioInfo] = useState('');
  const [mostraObs, setMostraObs] = useState(false);
  const [mostraHoras, setMostaHoras] = useState(false);
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

  const handleDeferido = event => {
    setDeferido(true)
    setMostaHoras(true);
    setMostraObs(true);
    setMostraButton(true)
    if(respInfo === 'yes') {
      setMudaInfo(true)
    }
    setAvaliacao({ ...avaliacao, deferido: "true" })
  };

  function  handleMudaInfo(resp) {
    if(resp === 'sim') {
        setRespInfo('sim')
        setMudaInfo(true)
    }
    if(resp === 'não') {
      setRespInfo('não')
      setMudaInfo(false)
    }
  }

  const handleIndefirido = event => {
    setDeferido(false)
    setMostraObs(true);
    setMostaHoras(false);
    setMudaInfo(false)
    setMostraButton(true)
    setAvaliacao({ ...avaliacao, deferido: "false" })
  };

  const handleMudaRadio = event => {
    setRadio(event.target.value);
  };

  const handleRadioInfo = event => {
    setRadioInfo(event.target.value);
  };

  const _handleAtividadeChange = event => {
    setSelectedAtividadeIndex(event.target.value);
    setAtividade(atividades[event.target.value].getIdAtividade());
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



  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post(
        "/avaliacao/" + localStorage.getItem("solicitacaoId"),
        avaliacao
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
        <label style={{ marginTop: 10}} htmlFor="documento">Comprovantes:</label>
        <div>
          {_.map(anexos, (anexo, index) => (
            <div>
              <p>{anexo.doc.nome}</p>
              <button className="btn btn-add" style={{ marginTop: 3, width: "25%" }}
                id={anexo.idAnexo}
                name={anexo.nome}
                placeholder={anexo.nome}
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

        {/* <input
          id="anexo"
          name="anexo"
          type="file"
          placeholder={anexo.nome}
          value={anexo.nome}
          disabled
        /> */}

        <div className="content2">
          <p style={{color: 'white'}}><strong>Status do deferimento: </strong></p>
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
                minWidth: "25%",
                marginTop: 10,
                marginLeft: "3%"
              }}
            >
              <label style={{color: 'white'}}>Deferido</label>
              <input
                style={{marginBottom: 0, height: "auto"}}
                type="radio"
                name="deferimentoResultado"
                value="Deferido"
                required
                onChange={event => setDeferimentoResultado(true)}
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
              <label style={{color: 'white'}}>Indeferido</label>
              <input
                style={{marginBottom: 0, height: "auto"}}
                type="radio"
                name="deferimentoResultado"
                value="Indeferido"
                required
                onChange={event => setDeferimentoResultado(false)}
              />
            </div>
          </div>
          <hr style={{color: 'white', margin: 10}} />
          <p style={{color: 'white'}}><strong>Alterar grupo e atividade</strong></p>
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
              <label style={{color: 'white'}}>Sim</label>
              <input
                style={{marginBottom: 0, height: "auto"}}
                type="radio"
                name="Alterar"
                value="sim"
                required
                onChange={event => setMudarGrupoAtividade(true)}
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
              <label style={{color: 'white'}}>Não</label>
              <input
                style={{marginBottom: 0, height: "auto"}}
                type="radio"
                name="Alterar"
                value="nao"
                required
                onChange={event => setMudarGrupoAtividade(false)}
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
                  <label style={{color: 'white'}} htmlFor="grupo">Grupo </label>
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
                  <label style={{color: 'white'}} htmlFor="atividade">Atividade </label>
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
            {mudarGrupoAtividade === "nao" && <div></div>}
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
              <label style={{color: 'white'}} htmlFor="parecerCoordenador">Justificativa </label>
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
              justifyContent: "space-between",
              marginTop: 15
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", width: "48%" }}
            >
              <label style={{color: 'white'}} htmlFor="cargaHorariaAtribuida">
                Carga Horária Atribuida 
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
              <label style={{color: 'white'}} htmlFor="parecerCoordenador">Coordenador </label>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}>
            <button type="submit" style={{ width: "48%"}} className="btn btn-add">
              Avaliar
            </button>
            <Link to="/" style={{ width: "48%"}} >
              <button className="btn btn-add">Voltar</button>
            </Link>
        </div>
        
      </form>
    </>
  );
}
