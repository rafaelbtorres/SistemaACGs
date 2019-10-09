import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

import Footer from "components/Footer/Footer.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/components.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
const useStyles = makeStyles(styles);

const SampleFab = () => {
  const classes = useStyles();
  return classes;
};

export default class PersonList extends React.Component {

  componentWillMount() {
    // const requestCurriculos = axios.get('/curriculo');
    // const requestGrupo = axios.get('/grupo');

    // const [curriculos, grupos] = await Promise.all([requestCurriculos, requestGrupo]);

    // const curriculos = [{ id: 1, ano: 2010 }, { id: 2, ano: 2018 }];
    const grupos = [{ id: 1, nome: 'Grupo I - Atividades' }, { id: 2, nome: 'Grupo II - Pesquisa' }];

    this.setState(state => ({ ...state, grupos }));
  }

  state = {
    nome: "",
    matricula: "",
    nomeResponsavel: "",
    localAtividade: "",
    periodoAtividadeInicio: "",
    periodoAtividadeFinal: "",
    cargaHorariaAtividade: "",
    cargaHorariaSolicitada: "",
    descricaoAtividade: "",
    parecerProfessor: "",
    data: "",
    documento: ""
  };

  handleChange = event => {
    this.setState({ name: event.target.value },
      { matricula: event.target.value },
      { nomeResponsavel: event.target.value },
      { localAtividade: event.target.value },
      { periodoAtividadeInicio: event.target.value },
      { periodoAtividadeFinal: event.target.value },
      { cargaHorariaAtividade: event.target.value },
      { cargaHorariaSolicitada: event.target.value },
      { descricaoAtividade: event.target.value },
      { parecerProfessor: event.target.value },
      { data: event.target.value },
      { documento: event.target.value }
    );
  };

  handleSubmit = event => {
    event.preventDefault();

    const solicitacao = {
      grupos: this.state.grupos,
      nome: this.state.nome,
      matricula: this.state.matricula,
      nomeResponsavel: this.state.nomeResponsavel,
      localAtividade: this.state.localAtividade,
      periodoAtividadeInicio: this.state.periodoAtividadeInicio,
      periodoAtividadeFinal: this.state.periodoAtividadeFinal,
      cargaHorariaAtividade: this.state.cargaHorariaAtividade,
      cargaHorariaSolicitada: this.state.cargaHorariaSolicitada,
      descricaoAtividade: this.state.descricaoAtividade,
      parecerProfessor: this.state.parecerProfessor,
      data: this.state.data,
      documento: this.state.documento
    };

    axios
      .post(`https://jsonplaceholder.typicode.com/users`, { solicitacao })
      .then(response => response.json())
      .then(success => {
        console.log(success);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <center>
        <div>
          <Parallax image={require("assets/img/cor.PNG")}>
            <div className={SampleFab.container}>
              <GridContainer>
                <GridItem>
                  <div className={SampleFab.brand}>
                    <center>
                      <form className={SampleFab.container} noValidate autoComplete="off" id="formSolicitacao" onSubmit={this.handleSubmit}>
                        <TextField
                          id="outlined-email-input"
                          label="Nome"
                          className={SampleFab.textField}
                          type="text"
                          name="nome"
                          autoComplete="Nome"
                          margin="normal"
                          variant="outlined"
                        />
                        <label>
                          Nome do aluno:
                  <input type="text" name="nome" onChange={this.handleChange} />
                        </label>
                        <label>
                          Matrícula:
                  <input
                            type="text"
                            name="matricula"
                            onChange={this.handleChange}
                          />
                        </label>
                        <br />
                        <label>
                          Classificação da atividade
                  <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                          >
                            {this.state.grupos.map(grupo => <option value={grupo.id}>{grupo.nome}</option>)}
                            {/* <option>Grupo I - Ensino</option>
                    <option>Grupo II - Pesquisa</option>
                    <option>Grupo III - Extensão</option>
                    <option>
                      Grupo IV - Culturais, Artísticas, Sociais e Gestão
                    </option> */}
                          </select>
                        </label>
                        <br />
                        <label>
                          Atividade
                  <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            onChange={this.handleChange}
                          >
                            <option>Atividade - 1</option>
                            <option>Atividade - 2</option>
                            <option>Atividade - 3</option>
                          </select>
                        </label>
                        <br />
                        <label>
                          Professor(a) responsável:
                  <input
                            type="text"
                            name="nomeResponsavel"
                            onChange={this.handleChange}
                          />
                        </label>
                        <br />
                        <label>
                          Local da atividade:
                  <input
                            type="text"
                            name="localAtividade"
                            onChange={this.handleChange}
                          />
                        </label>
                        <br />
                        <label>
                          Período da atividade:
                  <input
                            type="date"
                            name="periodoAtividadeInicio"
                            onChange={this.handleChange}
                          />
                          até
                  <input
                            type="date"
                            name="periodoAtividadeFinal"
                            onChange={this.handleChange}
                          />
                        </label>
                        <label>
                          Carga-horária da atividade:
                  <input
                            type="text"
                            name="cargaHorariaAtividade"
                            onChange={this.handleChange}
                          />
                          horas
                </label>
                        <br />
                        <label>
                          Carga-horária de ACG solicitada:
                  <input
                            type="text"
                            name="cargaHorariaSolicitada"
                            onChange={this.handleChange}
                          />
                          horas
                </label>
                        <br />
                        <label>
                          Descrição da atividade:
                  <br />
                          <textarea
                            rows="4"
                            cols="50"
                            name="descricaoAtividade"
                            form="formSolicitacao"
                            onChange={this.handleChange}
                          >
                            Descreva aqui a atividade
                  </textarea>
                        </label>
                        <br />
                        <label>
                          Parecer do professor:
                  <br />
                          <textarea
                            rows="4"
                            cols="50"
                            name="parecerProfessor"
                            form="formSolicitacao"
                            onChange={this.handleChange}
                          >
                            Descreva aqui a atividade
                  </textarea>
                        </label>
                        <br />
                        <label>
                          Data:
                  <input type="date" name="data" onChange={this.handleChange} />
                        </label>
                        <label>
                          Anexar documentos comprobatórios:
                  <br />
                          <input
                            type="file"
                            name="documento"
                            onChange={this.handleChange}
                          />
                        </label>
                        <input type="submit" value="Enviar" />
                      </form>
                    </center>
                  </div>
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <Footer />
        </div>
      </center>
    );
  }
}
