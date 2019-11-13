import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Input } from '@rocketseat/unform';


export default function Avaliar({ history })  {
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
  const [nomeCoordenador, setNomeCoordenador] = useState("");
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
      idsol = { localStorage.getItem("solicitacaoId")}

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
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
            <label htmlFor="nome">Nome *</label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder={nome}
              value={nome}
              disabled
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
            <label htmlFor="matricula">Matrícula *</label>
            <input
              id="matricula"
              name="matricula"
              type="number"
              placeholder={matricula}
              value={matricula}
              disabled
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
            <label htmlFor="grupo">Grupo *</label>
            <input
              id="grupo"
              name="grupo"
              type="text"
              placeholder={grupo}
              value={grupo}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
            <label htmlFor="atividade">Atividade *</label>
            <input
              id="atividade"
              name="atividade"
              type="text"
              placeholder={atividade}
              value={atividade}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
            <label htmlFor="nomeResponsavel">Professor(a) responsável </label>
            <input
              id="nomeResponsavel"
              name="nomeResponsavel"
              type="text"
              placeholder={nomeResponsavel}
              value={nomeResponsavel}
              disabled
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
            <label htmlFor="localAtividade">Local da Atividade </label>
            <input
              id="localAtividade"
              name="localAtividade"
              type="text"
              placeholder={localAtividade}
              value={localAtividade}
              disabled
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
            <label htmlFor="periodoAtividadeInicio">Período da atividade *</label>
            <input
              id="periodoAtividadeInicio"
              name="periodoAtividadeInicio"
              type="date"
              placeholder={periodoAtividadeInicio}
              value={periodoAtividadeInicio}
              disabled
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
            <label htmlFor="periodoAtividadeInicio">Até</label>
            <input
              id="periodoAtividadeFinal"
              name="periodoAtividadeFinal"
              type="date"
              placeholder={periodoAtividadeFinal}
              value={periodoAtividadeFinal}
              disabled
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
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
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
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
          </div>
        </div>

        <label htmlFor="descricaoAtividade">Descrição da atividade *</label>
        <Input multiline
          style={{
            height: "100px",
          }}
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
          <p>
            Status do deferimento
          </p>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <label>Deferido</label>
              <input
                type="radio"
                name="deferimentoResultado"
                value="Deferido"
                required
                onChange={event => setDeferimentoResultado(event.target.value)}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <label htmlFor="parecerCoordenador">Justificativa *</label>
              <Input multiline
                style={{
                  height: "100px",
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
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
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
