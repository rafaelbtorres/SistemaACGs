/* eslint-disable react/jsx-key */
import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

//import styles from "assets/jss/material-kit-react/views/components.js";
const useStyles = makeStyles();

const SampleFab = () => {
  const classes = useStyles();
  return classes;
};
export default class FormularioSolicitacao extends React.Component {
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    // const requestGrupos = axios.get('/grupo');
    // const requestAtividades = axios.get('/atividade');

    // const [grupos, atividades] = await Promise.all([requestGrupos, requestAtividades]);

    // const atividades = [{ id: 1, ano: 2010 }, { id: 2, ano: 2018 }];
    const grupos = [
      { id: 1, nome: "Grupo I - Atividades" },
      { id: 2, nome: "Grupo II - Pesquisa" }
    ];

    const atividades = [
      { id: 1, nome: "Atividade 1" },
      { id: 2, nome: "Atividade 2" }
    ];

    this.setState(state => ({ ...state, grupos }));
    this.setState(state => ({ ...state, atividades }));
  }

  state = {
    nome: "",
    matricula: "",
    grupo: "",
    atividade: "",
    nomeResponsavel: "",
    localAtividade: "",
    periodoAtividadeInicio: "00/00/00",
    periodoAtividadeFinal: "",
    cargaHorariaAtividade: "",
    cargaHorariaSolicitada: "",
    descricaoAtividade: "",
    data: "",
    documento: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    const solicitacao = {
      grupos: this.state.grupos,
      grupo: this.state.grupo,
      atividade: this.state.atividade,
      nome: this.state.nome,
      matricula: this.state.matricula,
      nomeResponsavel: this.state.nomeResponsavel,
      localAtividade: this.state.localAtividade,
      periodoAtividadeInicio: this.state.periodoAtividadeInicio,
      periodoAtividadeFinal: this.state.periodoAtividadeFinal,
      cargaHorariaAtividade: this.state.cargaHorariaAtividade,
      cargaHorariaSolicitada: this.state.cargaHorariaSolicitada,
      descricaoAtividade: this.state.descricaoAtividade,
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
      <form
        className={SampleFab.container}
        noValidate
        autoComplete="off"
        id="formSolicitacao"
        onSubmit={this.handleSubmit}
        style={{ width: '100%' }}
      >
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          style={{ width: '100%' }}
        >
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            style={{ width: '100%' }}
          >

            <TextField
              id="nome"
              label="Nome do Aluno"
              className={SampleFab.textField}
              type="text"
              name="nome"
              autoComplete="Nome"
              margin="normal"
              variant="outlined"
              onChange={e => this.setState({ nome: e.target.value })}
              style={{ width: '70%' }}
            />
            <br />
            <TextField
              id="matricula"
              label="Matrícula"
              className={SampleFab.textField}
              type="text"
              name="matricula"
              autoComplete="Matricula"
              margin="normal"
              variant="outlined"
              onChange={e => this.setState({ matricula: e.target.value })}
              style={{ width: '25%' }}
            />
            <br />
          </Grid>

          <TextField
            id="campoGrupos"
            select
            label="Grupo"
            className="form-control"
            onChange={e => this.setState({ grupo: e.target.value })}
            value={this.state.grupo}
            helperText="Por favor seleciona o grupo."
            margin="normal"
          >
            {this.state.grupos.map((grupo, index) => (
              <option key={index} value={grupo.id}>
                {grupo.nome}
              </option>
            ))}
          </TextField>
          <br />
          <TextField
            id="campoAtividades"
            select
            label="Atividade"
            className="form-control"
            onChange={e => this.setState({ atividade: e.target.value })}
            value={this.state.atividade}
            helperText="Por favor seleciona uma atividade."
            margin="normal"
          >
            {this.state.atividades.map((atividade, index) => (
              <option key={index} value={atividade.id}>
                {atividade.nome}
              </option>
            ))}
          </TextField>
          <br />
          <TextField
            id="outlined-email-input"
            label="Professor(a) responsável"
            className={SampleFab.textField}
            type="text"
            name="nomeResponsavel"
            autoComplete="nomeResponsavel"
            margin="normal"
            variant="outlined"
            onChange={e => this.setState({ nomeResponsavel: e.target.value })}
          />
          <br />
          <TextField
            id="outlined-email-input"
            label="Local da atividade"
            className={SampleFab.textField}
            type="text"
            name="localAtividade"
            autoComplete="localAtividade"
            margin="normal"
            variant="outlined"
            onChange={e => this.setState({ localAtividade: e.target.value })}
          />
          <br />
          <TextField
            id="periodoAtividadeInicio"
            value={this.state.periodoAtividadeInicio}
            label="Período da atividade"
            className={SampleFab.textField}
            type="date"
            
            name="periodoAtividadeInicio"
            autoComplete="periodoAtividadeInicio"
            margin="normal"
            variant="outlined"
            onChange={e =>
              this.setState({
                periodoAtividadeInicio: e.target.value
              })
            }
          />
          <TextField
            id="periodoAtividadeFinal"
            style={{ padding: '5%' }}
            label="Até"
            className={SampleFab.textField}
            value={this.state.periodoAtividadeInicio}
            type="date"
            name="periodoAtividadeFinal"
            autoComplete="periodoAtividadeFinal"
            margin="normal"
            variant="outlined"
            onChange={e =>
              this.setState({
                periodoAtividadeFinal: e.target.value
              })
            }
          />
          <br />
          <TextField
            id="cargaHorariaAtividade"
            label="Carga-horária da atividade"
            className={SampleFab.textField}
            type="number"
            name="cargaHorariaAtividade"
            autoComplete="cargaHorariaAtividade"
            margin="normal"
            variant="outlined"
            onChange={e =>
              this.setState({
                cargaHorariaAtividade: e.target.value
              })
            }
          />
          <br />
          <TextField
            id="cargaHorariaSolicitada"
            label="Carga-horária solicitada"
            className={SampleFab.textField}
            type="number"
            name="cargaHorariaSolicitada"
            autoComplete="cargaHorariaSolicitada"
            margin="normal"
            variant="outlined"
            onChange={e =>
              this.setState({
                cargaHorariaSolicitada: e.target.value
              })
            }
            InputProps={{
              className: SampleFab.teste
            }}
          />
          <br />
          <TextField
            id="descricaoAtividade"
            label="Descrição da atividade"
            multiline
            rows="4"
            className={SampleFab.textField}
            margin="normal"
            variant="outlined"
            form="formSolicitacao"
            onChange={e =>
              this.setState({
                descricaoAtividade: e.target.value
              })
            }
          />
          <br />
          <TextField
            id="documento"
            label="Comprovante"
            className={SampleFab.textField}
            type="file"
            name="documento"
            margin="normal"
            variant="outlined"
            onChange={e =>
              this.setState({
                documento: e.target.value
              })
            }
          />
          <br />
          <Button
            variant="contained"
            color="#009349"
            className={SampleFab}
          >

            <input value="Enviar" style={{ display: 'none' }} />

          </Button>
          <button
            variant="contained"
            color="#009349"
            className={SampleFab}
            endIcon={<Icon>Enviar</Icon>}
            type="submit"
           // onClick={handleSubmit}
          >
            Enviar
        </button>
          <Button
            variant="contained"
            color="#009349"
            className={SampleFab}
            href="/"
          >
            Voltar
        </Button>
        </Grid>
      </form>
    );
  }
}
