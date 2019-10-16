/* eslint-disable react/jsx-key */
import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

//import styles from "assets/jss/material-kit-react/views/components.js";
const useStyles = makeStyles(styles => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: styles.spacing(1),
    marginRight: styles.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

const SampleFab = () => {
  const classes = useStyles();
  return classes;
};
export default class Avaliacao extends React.Component {
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    // const requestCurriculos = axios.get('/curriculo');
    // const requestGrupo = axios.get('/grupo');

    // const [curriculos, grupos] = await Promise.all([requestCurriculos, requestGrupo]);

    // const curriculos = [{ id: 1, ano: 2010 }, { id: 2, ano: 2018 }];
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
    periodoAtividadeInicio: "",
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
        />
        <br />
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
          label="Até"
          className={SampleFab.textField}
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
        <button
          variant="contained"
          color="#009349"
          className={SampleFab}
          endIcon={<Icon>Enviar</Icon>}
          type="submit"
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
        <input type="submit" value="Enviar" />
      </form>
    );
  }
}
