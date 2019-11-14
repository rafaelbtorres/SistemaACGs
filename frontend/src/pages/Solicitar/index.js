import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import _ from "lodash";
import { Input } from "@rocketseat/unform";

export default function Solicitar({ history }) {
  // listas de grupos e atividades
  const [grupos, setGrupos] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [documentos, setDocumentos] = useState([]);

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

  const [grupo, setGrupo] = useState();
  const [selectedGrupoIndex, setSelectedGrupoIndex] = useState();

  const [atividade, setAtividade] = useState();
  const [selectedAtividadeIndex, setSelectedAtividadeIndex] = useState("");

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

  // useEffect(() => {
  //   api.get("solicitacao/dados").then(response => {
  //   });
  // }, [grupos, grupo]);

  const _handleAtividadeChange = event => {
    setSelectedAtividadeIndex(event.target.value);
    setAtividade(atividades[event.target.value]);
    //setDocumentos(event.target.value.docsNecessarios)
  };

  function addDoc(event, nomeArquivo) {
    console.log(event.target.id)
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
      return
    }

    const name = event.target.files[0].name
    const lastDot = name.lastIndexOf('.')
    const ext = name.substring(lastDot + 1).toLowerCase()

    if (ext !== 'pdf' && ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png' && ext !== 'zip') {
      const arquivoTemp = Object.keys(documentosEnv).reduce((object, key) => {
        if (key !== nomeArquivo) {
          console.log('not deleting', key, nomeArquivo)
          object[key] = documentosEnv[key]
        }
        return object
      }, {})
      console.log(arquivoTemp)
      setDocumentosEnv(arquivoTemp)

      alert('Tipo de arquivo não permitido')
      return
    }
    if (documentosEnv.length === 0) {
      const fileData = {}
      fileData[nomeArquivo] = ({
        idDoc: event.target.id,
        file: event.target.files[0]
      })
      setDocumentosEnv({ ...documentosEnv, ...fileData })
      return
    } else {
      let index
      for (index = 0; index < documentosEnv.length; index++) {
        if (documentosEnv[index].idDoc === event.target.id) {
          documentosEnv[index].file = event.target.files[0]
          return
        }
      }
      const fileData = {}
      fileData[nomeArquivo] = ({
        idDoc: event.target.id,
        file: event.target.files[0]
      })
      setDocumentosEnv({ ...documentosEnv, ...fileData })
    }
    console.log(documentosEnv)
  }

  const validarNome = (nome) => {
    var regName = /^[a-zA-Z\s]*$/;

    if (!regName.test(nome)) {
      return false;
    } else {
      return true;
    }
  }

  const validarMatricula = (numero) => {
    var size = numero.toString().length
    if (size === 10) {
      return true
    } else {
      return false
    }
  }

  const validarDateInicioFim = (dataInicio, dataFim) => {
    var varDateIncio = new Date(dataInicio);
    var varDateFim = new Date(dataFim);
    varDateIncio.setHours(0, 0, 0, 0)
    varDateFim.setHours(0, 0, 0, 0)

    if (varDateIncio < varDateFim) {
      return false
    } else {
      return true
    }
  }

  const validarData = (dataInicio) => {
    var varData = new Date(dataInicio);
    var hoje = new Date()
    varData.setHours(0, 0, 0, 0)
    hoje.setHours(0, 0, 0, 0)

    if (varData > hoje) {
      return false
    } else {
      return true
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(documentosEnv)

    if (!validarNome(nome)) {
      alert(
        "Nome Inválido!"
      )
      return
    }
    if (!validarNome(nomeResponsavel)) {
      alert(
        "Nome do Professor Inválido!"
      )
      return
    }
    if (!validarMatricula(matricula)) {
      alert(
        "Número de Matrícula Inválido!"
      )
      return
    }
    if (documentosEnv.length === 0 || documentosEnv.length < atividade.docs.length) {
      alert(
        "Você precisa anexar o(s) arquivo(s) necessário(s)!"
      )
      return
    }
    if (!validarData(periodoAtividadeInicio) || !validarData(periodoAtividadeFinal)) {
      alert(
        "As datas não podem ser maior que a data de hoje!"
      )
      return
    }
    if (validarDateInicioFim(periodoAtividadeInicio, periodoAtividadeFinal)) {
      alert(
        "A data de início não pode ser maior que a data de fim!"
      )
      return
    }

    var solicitacao = {
      aluno: nome,
      matricula: matricula,
      dataInicio: periodoAtividadeInicio,
      dataFim: periodoAtividadeFinal,
      cargaHorariaSoli: cargaHorariaSolicitada,
      idAtividade: atividade.idAtividade,
      cargaHoraria: cargaHorariaAtividade,
      profRes: nomeResponsavel,
      descricao: descricaoAtividade,
      local: localAtividade
    };

    var form = new FormData();
    _.forEach(solicitacao, (value, index) => {
      form.append(index, value);
    });
    _.forEach(documentosEnv, (value) => {
      form.append("anexo", value)
    })

    console.log(documentosEnv)
    console.log(form)

    // try {
    //   const resp = await api.post("/solicitacao/", form);
    //   if (resp.status === 200) {
    //     alert(
    //       "Solicitação realizada com sucesso!"
    //     )
    //   } else {
    //     alert(
    //       "A solicitação não pode ser realizada!"
    //     )
    //   }
    //   history.push("/");
    // } catch (e) {
    //   alert(
    //     "Um erro na solicitação, verifique os dados informados e tente novamente!"
    //   );
    // }
  }

  // useEffect(() => {
  //   setListaDeDocumentos(getDocumentosSelect(atividades, atividadeName));
  //   if (atividadeName !== "") {
  //     setTemAtividade(true);
  //   }
  // }, [atividadeName, atividades]);

  // useEffect(() => {
  //   setAtividadeSelect(getAtividadesSelect(atividades, groupName));
  //   if (groupName !== "") {
  //     setTemGrupo(false);
  //   }
  // }, [groupName, atividades]);

  useEffect(() => {
    console.log("agr chegamos");
    async function loadGrupos() {
      if (grupo != null)
        api
          .get(`/atividades/porGrupo/${grupo.idGrupo}`)
          .then(response => {
            console.log("ATIVIDADES", response.data);
            setAtividades(response.data);
          })
          .catch(e => {
            console.log("RESPOSE ERROR", e.response);
            // alert("erro ao buscar as atividades");
          });
    }
    loadGrupos();
  }, [grupo]);

  const getAtividadesSelect = (array, groupName) => {
    let lista = [];
    for (let index = 0; index < array.length; index++) {
      if (array[index].grupo.nome === groupName) {
        lista.push(array[index].grupo);
      }
    }
    return lista;
  };

  // const getDocumentosSelect = (array, atividadeName) => {
  //   let lista = []
  //   for (let index = 0; index < array.length; index++) {
  //     if (array[index].descricao === atividadeName) {
  //       setAtividadeId(array[index].idAtividade.toString())
  //       for (let j = 0; j < array[index].docs.length; j++) {
  //         lista.push(array[index].docs[j])
  //       }
  //       return lista
  //     }
  //   }
  // }

  function _handleGrupoChange(grupoIndex) {
    // setGroupName(grupoIndex)
    // //console.log(periodoAtividadeInicio)
    // console.log(grupoIndex)
    // console.log("grupoobj", grupos[grupoIndex])
    console.log("grupo", grupoIndex, grupos[grupoIndex]);
    setGrupo(grupos[grupoIndex]);
    setSelectedGrupoIndex(grupoIndex);
  }

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
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="grupo">Grupo *</label>
            <select
              id="grupo"
              name="grupo"
              value={selectedGrupoIndex}
              // required
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
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <label htmlFor="atividade">Atividade *</label>
            <select
              id="atividade"
              name="atividade"
              // required
              value={selectedAtividadeIndex}
              onChange={_handleAtividadeChange}
              required
              disabled={grupo == null}
            >
              <option value="" disabled>
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
              placeholder="Carga-horária da atividade"
              value={cargaHorariaAtividade}
              required
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
              name="cargaHorariaSolicitada"
              type="number"
              placeholder="Carga-horária solicitada"
              value={cargaHorariaSolicitada}
              required
              onChange={event => setCargaHorariaSolicitada(event.target.value)}
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
                    //value={documento}
                    required
                    onChange={(event) => {
                      addDoc(event, documento.nome);
                    }}
                  />
                </div>
              ))}
            </div>
          )}

        <button type="submit" className="btn btn-add">
          Solicitar
        </button>
      </form>
      <Link to="/">
        <button className="btn btn-add">Voltar</button>
      </Link>
    </>
  );
}
