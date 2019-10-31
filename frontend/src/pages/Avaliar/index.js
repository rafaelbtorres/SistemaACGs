import React, { useState, useEffect } from "react";
import api from "../../services/api";

export default function Avaliar({ history }) {
  //Dados da solicitacao exibidos
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [grupo, setGrupo] = useState("");
  const [atividade, setAtividade] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [localAtividade, setLocalAtividade] = useState("");
  const [periodoAtividadeInicio, setPeriodoAtividadeInicio] = useState("");
  const [periodoAtividadeFinal, setPeriodoAtividadeFinal] = useState("");
  const [cargaHorariaAtividade, setCargaHorariaAtividade] = useState("");
  const [cargaHorariaSolicitada, setCargaHorariaSolicitada] = useState("");
  const [descricaoAtividade, setDescricaoAtividade] = useState("");
  const [data, setData] = useState("");
  const [documento, setDocumento] = useState("");

  //Dados da avaliação
  const [deferimentoResultado, setDeferimentoResultado] = useState("");
  const [parecerCoordenador, setParecerCoordenador] = useState("");
  const [cargaHorariaAtribuida, setCargaHorariaAtribuida] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await api.get(
        "/solicitacoes/" + localStorage.getItem("solicitacaoId")
      );
      setNome(response.data.nome);
      setMatricula(response.data.matricula);
      setGrupo(response.data.grupo);
      setAtividade(response.data.atividade);
      setNomeResponsavel(response.data.nomeResponsavel);
      setLocalAtividade(response.data.localAtividade);
      setPeriodoAtividadeInicio(response.data.periodoAtividadeInicio);
      setPeriodoAtividadeFinal(response.data.periodoAtividadeFinal);
      setCargaHorariaAtividade(response.data.cargaHorariaAtividade);
      setCargaHorariaSolicitada(response.data.cargaHorariaSolicitada);
      setDescricaoAtividade(response.data.descricaoAtividade);
      setData(response.data.data);
      setDocumento(response.data.documento);
    }

    getData();
  });

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
        "Ocorreu um erro no cadastro verifique os dados informados e tente novamente !",
        e
      );
    }
  }

  return (
    <>
      <p>
        Avalie aqui a solicitação de : <strong>{nome}</strong>, matrícula:{" "}
        <strong>{matricula}</strong>.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="data">Data</label>
        <input
          id="data"
          name="data"
          type="text"
          placeholder={data}
          value={data}
          disabled
        />
        <label htmlFor="nome">Nome *</label>
        <input
          id="nome"
          name="nome"
          type="text"
          placeholder={nome}
          value={nome}
          disabled
        />
        <label htmlFor="matricula">Matrícula *</label>
        <input
          id="matricula"
          name="matricula"
          type="number"
          placeholder={matricula}
          value={matricula}
          disabled
        />
        <label htmlFor="grupo">Grupo *</label>
        <input
          id="grupo"
          name="grupo"
          type="text"
          placeholder={grupo}
          value={grupo}
          disabled
        />
        <label htmlFor="atividade">Atividade *</label>
        <input
          id="atividade"
          name="atividade"
          type="text"
          placeholder={atividade}
          value={atividade}
          disabled
        />
        <label htmlFor="nomeResponsavel">Professor(a) responsável *</label>
        <input
          id="nomeResponsavel"
          name="nomeResponsavel"
          type="text"
          placeholder={nomeResponsavel}
          value={nomeResponsavel}
          disabled
        />
        <label htmlFor="localAtividade">Local da Atividade *</label>
        <input
          id="localAtividade"
          name="localAtividade"
          type="text"
          placeholder={localAtividade}
          value={localAtividade}
          disabled
        />
        <label htmlFor="periodoAtividadeInicio">Período da atividade *</label>
        <input
          id="periodoAtividadeInicio"
          name="periodoAtividadeInicio"
          type="date"
          placeholder={periodoAtividadeInicio}
          value={periodoAtividadeInicio}
          disabled
        />
        <label htmlFor="periodoAtividadeInicio">Até</label>
        <input
          id="periodoAtividadeFinal"
          name="periodoAtividadeFinal"
          type="date"
          placeholder={periodoAtividadeFinal}
          value={periodoAtividadeFinal}
          disabled
        />
        <label htmlFor="cargaHorariaAtividade">
          Carga-horária da atividade *
        </label>
        <input
          id="cargaHorariaAtividade"
          name="cargaHorariaAtividade"
          type="number"
          placeholder={cargaHorariaAtividade}
          value={cargaHorariaAtividade}
          disabled
        />
        <label htmlFor="cargaHorariaSolicitada">
          Carga-horária solicitada *
        </label>
        <input
          id="cargaHorariaSolicitada"
          name="cargaHorariaSolicitada"
          type="number"
          placeholder={cargaHorariaSolicitada}
          value={cargaHorariaSolicitada}
          disabled
        />
        <label htmlFor="descricaoAtividade">Descrição da atividade *</label>
        <input
          id="descricaoAtividade"
          name="descricaoAtividade"
          type="text"
          placeholder={descricaoAtividade}
          value={descricaoAtividade}
          disabled
        />
        <label htmlFor="documento">Comprovante *</label>
        Essa parte precisa ser implementada para abrir um modal com o documento
        <input
          id="documento"
          name="documento"
          type="file"
          placeholder={documento}
          value={documento}
          disabled
        />
        <div className="content2">
          <center>
            <label htmlFor="deferimentoResultado">
              Status do deferimento *
            </label>
            <br />
            <label>Deferido</label>
            <input
              type="radio"
              name="deferimentoResultado"
              value="Deferido"
              required
              onChange={event => setDeferimentoResultado(event.target.value)}
            />
            <label>Indeferido</label>
            <input
              type="radio"
              name="deferimentoResultado"
              value="Indeferido"
              required
              onChange={event => setDeferimentoResultado(event.target.value)}
            />
            <br />
            <label htmlFor="parecerCoordenador">Parecer do Coordenador *</label>
            <br />
            <input
              id="parecerCoordenador"
              name="parecerCoordenador"
              type="text"
              placeholder="Parecer do Coordenador"
              value={parecerCoordenador}
              required
              onChange={event => setParecerCoordenador(event.target.value)}
            />
            <br />
            <label htmlFor="cargaHorariaAtribuida">
              Carga Horária Atribuida *
            </label>
            <br />
            <input
              id="cargaHorariaAtribuida"
              name="cargaHorariaAtribuida"
              type="number"
              placeholder="Carga Horária Atribuida"
              value={cargaHorariaAtribuida}
              required
              onChange={event => setCargaHorariaAtribuida(event.target.value)}
            />
          </center>
        </div>
        <button type="submit" className="btn btn-add">
          Avaliar
        </button>
        <button className="btn btn-add">
          {" "}
          <a
            style={{
              textDecoration: "none",
              color: "white"
            }}
            href="/"
          >
            Voltar
          </a>
        </button>
      </form>
    </>
  );
}
