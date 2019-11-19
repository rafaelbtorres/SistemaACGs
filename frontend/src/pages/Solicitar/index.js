import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import _ from "lodash";
import { Input } from "@rocketseat/unform";

export default function Solicitar({ history }) {
  // listas de grupos e atividades
  const [grupos, setGrupos] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [curriculos, setCurriculos] = useState([]);
  const [gruposCurriculo, setGruposCurriculo] = useState([]);

  // dados para criar a solicitação
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [localAtividade, setLocalAtividade] = useState("");
  const [periodoAtividadeInicio, setPeriodoAtividadeInicio] = useState("");
  const [periodoAtividadeFinal, setPeriodoAtividadeFinal] = useState("");
  const [cargaHorariaAtividade, setCargaHorariaAtividade] = useState("");
  const [cargaHorariaSolicitada, setCargaHorariaSolicitada] = useState("");
  const [descricaoAtividade, setDescricaoAtividade] = useState("");
  const [data, setData] = useState("");
  const [documentosEnv, setDocumentosEnv] = useState({});
  const [precisaCalcular, setPrecisaCalcular] = useState(false);

  const [curriculoId, setCurriculoId] = useState();
  const [grupo, setGrupo] = useState();
  const [atividade, setAtividade] = useState({});
  const [selectedGrupoIndex, setSelectedGrupoIndex] = useState();
  const [selectedCurriculo, setSelectedCurriculo] = useState();

  const [selectedAtividadeIndex, setSelectedAtividadeIndex] = useState("");

  useEffect(() => {
    async function loadGrupos() {
      api.get("solicitacao/dados").then(response => {
        //console.log(response.data)
        setGrupos(response.data.grupos);
        setAtividades(response.data.atividades);
        setCurriculos(response.data.curriculo);
      });
    }
    loadGrupos();
  }, []);

  function addDoc(event, nomeArquivo) {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }

    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf(".");
    const ext = name.substring(lastDot + 1).toLowerCase();

    if (
      ext !== "pdf" &&
      ext !== "jpg" &&
      ext !== "jpeg" &&
      ext !== "png" &&
      ext !== "zip"
    ) {
      const arquivoTemp = Object.keys(documentosEnv).reduce((object, key) => {
        if (key !== nomeArquivo) {
          object[key] = documentosEnv[key];
        }
        return object;
      }, {});
      setDocumentosEnv(arquivoTemp);

      alert("Tipo de arquivo não permitido");
      return;
    }
    if (documentosEnv.length === 0) {
      const fileData = {};
      fileData[nomeArquivo] = ({
        idDoc: event.target.id,
        file: event.target.files[0]
      });
      setDocumentosEnv({ ...documentosEnv, ...fileData });
      return;
    } else {
      let index;
      for (index = 0; index < documentosEnv.length; index++) {
        if (documentosEnv[index].idDoc === event.target.id) {
          documentosEnv[index].file = event.target.files[0];
          return;
        }
      }
      const fileData = {};
      fileData[nomeArquivo] = ({
        idDoc: event.target.id,
        file: event.target.files[0]
      });
      setDocumentosEnv({ ...documentosEnv, ...fileData });
    }
  }

  const validarNome = (nome) => {
    var regName = /^[a-zA-Z\s]*$/;

    if (!regName.test(nome)) {
      return false;
    } else {
      return true;
    }
  };

  const validarMatricula = (numero) => {
    var size = numero.toString().length;
    if (size === 10 || size === 9) {
      return true;
    } else {
      return false;
    }
  };

  const validarDateInicioFim = (dataInicio, dataFim) => {
    var varDateIncio = new Date(dataInicio);
    var varDateFim = new Date(dataFim);
    varDateIncio.setHours(0, 0, 0, 0);
    varDateFim.setHours(0, 0, 0, 0);
    console.log("incio ", varDateIncio.setHours(0, 0, 0, 0), "fim ", varDateFim.setHours(0, 0, 0, 0))

    if (varDateIncio.setHours(0, 0, 0, 0) <= varDateFim.setHours(0, 0, 0, 0)) {
      return true;
    } else {
      return false;
    }
  };

  const validarData = (dataInicio) => {
    var varData = new Date(dataInicio);
    var hoje = new Date();
    varData.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);

    if (varData > hoje) {
      return false;
    } else {
      return true;
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validarNome(nome)) {
      alert("Nome Inválido!");
      return;
    }
    if (!validarNome(nomeResponsavel)) {
      alert("Nome do Professor Inválido!");
      return;
    }
    if (!validarMatricula(matricula)) {
      alert("Número de Matrícula Inválido!");
      return;
    }
    if (
      _.size(documentosEnv) === 0 ||
      _.size(documentosEnv) < atividade.docs.length
    ) {
      alert("Você precisa anexar o(s) arquivo(s) necessário(s)!");
      return;
    }
    if (
      !validarData(periodoAtividadeInicio) ||
      !validarData(periodoAtividadeFinal)
    ) {
      alert("As datas não podem ser maior que a data de hoje!");
      return;
    }
    if (!validarDateInicioFim(periodoAtividadeInicio, periodoAtividadeFinal)) {
      alert("A data de início não pode ser maior que a data de fim!");
      return;
    }
    console.log("cargaHoraria", cargaHorariaAtividade)
    let horas;
    if (cargaHorariaAtividade) {
      console.log('entrou1')
      horas = parseInt(cargaHorariaAtividade) * atividade.cargaHoraria;
    } else {
      horas = atividade.cargaHoraria;

      console.log('entrou2')
    }
    
    console.log(atividade.cargaHoraria)
    console.log(horas)

    var solicitacao = {
      aluno: nome,
      matricula: matricula,
      dataInicio: periodoAtividadeInicio,
      dataFim: periodoAtividadeFinal,
      idAtividade: atividade.idAtividade,
      cargaHorariaSoli: horas,
      profRes: nomeResponsavel,
      descricao: descricaoAtividade,
      local: localAtividade
    };

    var form = new FormData();
    _.forEach(solicitacao, (value, index) => {
      form.append(index, value);
    });
    _.forEach(documentosEnv, (value) => {
      form.append("anexo", value.file);
    });
    // for (var pair of form.entries()) {
    //   console.log("form", pair[0], pair[1]);
    // }
    // console.log(documentosEnv);
    // console.log(form);

    try {
      const resp = await api.post("/solicitacao/", form);
      if (resp.status === 200) {
        alert("Solicitação realizada com sucesso!");
        history.push("/");
      } else {
        alert("A solicitação não pode ser realizada!");
      }
    } catch (e) {
      alert(
        "Um erro na solicitação, verifique os dados informados e tente novamente!" +
          e
      );
    }
  }

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

  useEffect(() => {
    // console.log("grupos", grupos);
    setGruposCurriculo(getGroupos(grupos, curriculoId));
  }, [grupos, curriculoId]);

  const getGroupos = (array, idCurr) => {
    let gruposLista = [];
    let index;
    for (index = 0; index < array.length; index++) {
      if (array[index].curriculo.idCurriculo === parseInt(idCurr)) {
        gruposLista.push(array[index]);
      }
    }
    // console.log("gruposLista metodo", gruposLista);
    return gruposLista;
  };

  const handleCurriculoChange = event => {
    // console.log("idCurriculo", event.target.value);
    setCurriculoId(event.target.value);
    setSelectedCurriculo(event.target.value);
  };

  function _handleGrupoChange(grupoIndex) {
    setSelectedAtividadeIndex("");
    setCargaHorariaAtividade("");
    setGrupo(grupos[grupoIndex]);
    setSelectedGrupoIndex(grupoIndex);
  }

  const _handleAtividadeChange = event => {
    setPrecisaCalcular(false);
    setSelectedAtividadeIndex(event.target.value);
    setAtividade(atividades[event.target.value]);
    setPrecisaCalcular(atividades[event.target.value].precisaCalcular);
    //setDocumentos(event.target.value.docsNecessarios)
  };

  return (
    <>
      <p>
        Efetue aqui sua solicitação para aproveitamento de{" "}
        <strong>ACG's</strong>.
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
            <label htmlFor="nome">Nome *</label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Nome"
              value={nome}
              required
              onChange={event => setNome(event.target.value)}
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
              placeholder="Matricula"
              value={matricula}
              required
              onChange={event => setMatricula(event.target.value)}
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
            style={{ display: "flex", flexDirection: "column", width: "23%" }}
          >
            <label htmlFor="curriculoSelect">Currículo *</label>
            <select
              id="curriculoSelect"
              name="curriculo"
              value={selectedCurriculo}
              onChange={handleCurriculoChange}
              required
              inputProps={{
                name: "curriculo",
                id: "curriculoSelect"
              }}
            >
              >
              <option disabled selected>
                Selecione...
              </option>
              {_.map(curriculos, (curriculo, index) => {
                return <option value={curriculo.idCurriculo}>{curriculo.ano}</option>
              })}
            </select>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "23%" }}
          >
            <label htmlFor="grupo">Grupo *</label>
            <select
              id="grupo"
              name="grupo"
              value={selectedGrupoIndex}
              disabled={selectedCurriculo == null}
              width={10}
              onChange={e => {
                _handleGrupoChange(e.target.value);
              }}
              required
            >
              <option disabled selected>
                Selecione...
              </option>
              {_.map(gruposCurriculo, (grupo, index) => {
                return <option value={index}>{grupo.nome}</option>;
              })}
            </select>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          ></div>
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
            <label htmlFor="atividade">Atividade *</label>
            
            <select
              id="atividade"
              name="atividade"
              value={selectedAtividadeIndex}
              onChange={_handleAtividadeChange}
              required
              disabled={grupo == null}
            >
              <option  value="" disabled>
                Selecione uma atividade
              </option>
              {_.map(atividades, (atividade, index) => {
                return <option value={index}>{atividade.descricao}</option>;
              })}
            </select>
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
              placeholder="Professor(a) responsável"
              value={nomeResponsavel}
              onChange={event => setNomeResponsavel(event.target.value)}
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
              placeholder="Local da Atividade"
              value={localAtividade}
              onChange={event => setLocalAtividade(event.target.value)}
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
              Data inicial da atividade *
            </label>
            <input
              id="periodoAtividadeInicio"
              name="periodoAtividadeInicio"
              type="date"
              placeholder="Período da atividade inicio"
              value={periodoAtividadeInicio}
              required
              onChange={event => setPeriodoAtividadeInicio(event.target.value)}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="periodoAtividadeFinal">
              Data final da atividade *
            </label>
            <input
              id="periodoAtividadeFinal"
              name="periodoAtividadeFinal"
              type="date"
              placeholder="Período da atividade final"
              value={periodoAtividadeFinal}
              required
              onChange={event => setPeriodoAtividadeFinal(event.target.value)}
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
              Carga-horária realizada *
            </label>
            <input
              id="cargaHorariaAtividade"
              name="cargaHorariaAtividade"
              type="number"
              disabled={!precisaCalcular}
              placeholder="Carga-horária da atividade"
              value={cargaHorariaAtividade}
              required={!precisaCalcular}
              onChange={event => setCargaHorariaAtividade(event.target.value)}
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
              disabled
              name="cargaHorariaSolicitada"
              type="number"
              value={
                atividade.precisaCalcular
                  ? atividade
                    ? cargaHorariaAtividade
                      ? parseInt(cargaHorariaAtividade) *
                        parseInt(atividade.cargaHoraria)
                      : 0
                    : ""
                  : atividade.cargaHoraria
              }
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
          placeholder="Descrição da atividade"
          value={descricaoAtividade}
          required
          onChange={event => setDescricaoAtividade(event.target.value)}
        />
        <label htmlFor="documento">Comprovante *</label>
        {atividade == null ? (
          <p> Selecione uma atividade...</p>
        ) : (
          <div>
            {_.map(atividade.docs, (documento, index) => (
              <div>
                <p>{documento.nome}</p>
                <input
                  id={documento.idDocNecessario}
                  name={documento.nome}
                  type="file"
                  placeholder="Comprovante"
                  required
                  onChange={(event) => {
                    addDoc(event, documento.nome);
                  }}
                />
              </div>
            ))}
          </div>
        )}
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
             <button type="submit" className="btn btn-add">
          Solicitar
        </button>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
           <Link to="/">
        <button className="btn btn-add">Voltar</button>
      </Link>
          </div>
          </div>
      </form>
    </>
  );
}
