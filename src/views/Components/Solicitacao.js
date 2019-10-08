import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "components/Footer/Footer.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Solicitacao() {
  const classes = useStyles();
  return (
    <div>
      <Parallax image={require("assets/img/cor.PNG")}>
        <div className={classes.container}>
          <form id="formSolicitacao">
            <label>
              Nome do aluno:
              <input type="text" name="name" />
            </label>
            <label>
              Matrícula:
              <input type="text" name="name" />
            </label>
            <br />
            <label>
              Classificação da atividade
              <select className="form-control" id="exampleFormControlSelect1">
                <option>Grupo I - Ensino</option>
                <option>Grupo II - Pesquisa</option>
                <option>Grupo III - Extensão</option>
                <option>
                  Grupo IV - Culturais, Artísticas, Sociais e Gestão
                </option>
              </select>
            </label>
            <br />
            <label>
              Atividade
              <select className="form-control" id="exampleFormControlSelect1">
                <option>Atividade - 1</option>
                <option>Atividade - 2</option>
                <option>Atividade - 3</option>
              </select>
            </label>
            <br />
            <label>
              Professor(a) responsável:
              <input type="text" name="name" />
            </label>
            <br />
            <label>
              Local da atividade:
              <input type="text" name="name" />
            </label>
            <br />
            <label>
              Período da atividade:
              <input type="date" name="name" />
              até
              <input type="date" name="dataLimite" />
            </label>
            <label>
              Carga-horária da atividade:
              <input type="text" name="name" />
              horas
            </label>
            <br />
            <label>
              Carga-horária de ACG solicitada:
              <input type="text" name="name" />
              horas
            </label>
            <br />
            <label>
              Descrição da atividade:
              <br />
              <textarea
                rows="4"
                cols="50"
                name="comment"
                form="formSolicitacao"
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
                name="comment"
                form="formSolicitacao"
              >
                Descreva aqui a atividade
              </textarea>
            </label>
            <br />
            <label>
              Data:
              <input type="date" name="name" />
            </label>
            <label>
              Anexar documentos comprobatórios:
              <br />
              <input type="file" name="anexo" />
            </label>
            <input type="submit" value="Enviar" />
          </form>
        </div>
      </Parallax>
      <Footer />
    </div>
  );
}
