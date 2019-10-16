import React from "react";
// plugin that creates slider
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

import People from "@material-ui/icons/People";

import GridItem from "components/Grid/GridItem.js";

import NavPills from "components/NavPills/NavPills.js";
import School from "@material-ui/icons/School";

const useStyles = makeStyles(styles);

// eslint-disable-next-line no-unused-vars
export const Discente = props => {
  return (
    <div>
      <div style={{ height: 20, overflow: "show", padding: 20 }}>
        <a
          href="/solicitacao"
          style={{
            textDecoration: "none",
            background: "#009349",
            padding: 10,
            borderRadius: 10,
            cursor: "pointer",
            border: "#009349 solid 2px",
            color: "white"
          }}
        >
          Solicitar
        </a>
      </div>
      <div style={{ height: 20, overflow: "show", padding: 20 }}>
        <a
          href="/listar"
          style={{
            textDecoration: "none",
            background: "#009349",
            padding: 10,
            borderRadius: 10,
            cursor: "pointer",
            border: "#009349 solid 2px",
            color: "white"
          }}
        >
          Exibir
        </a>
      </div>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
export const Coordenador = props => {
  return (
    <div>
      <div style={{ height: 20, overflow: "show", padding: 20 }}>
        <a
          href="/avaliar"
          style={{
            textDecoration: "none",
            background: "#009349",
            padding: 10,
            borderRadius: 10,
            cursor: "pointer",
            border: "#009349 solid 2px",
            color: "white"
          }}
        >
          Avaliar
        </a>
      </div>
      <div style={{ height: 20, overflow: "show", padding: 20 }}>
        <a
          href="/listar"
          style={{
            textDecoration: "none",
            background: "#009349",
            padding: 10,
            borderRadius: 10,
            cursor: "pointer",
            border: "#009349 solid 2px",
            color: "white"
          }}
        >
          Excluir avaliações
        </a>
      </div>
    </div>
  );
};
export default function MenuPrincipal() {
  const classes = useStyles();
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <center>
            <h2>Qual o seu perfil?</h2>

            <GridItem container justify="center">
              <NavPills
                color="primary"
                tabs={[
                  {
                    tabButton: "Discente",
                    tabIcon: School,
                    tabContent: <Discente />
                  },
                  {
                    tabButton: "Coordenador",
                    tabIcon: People,
                    tabContent: <Coordenador />
                  }
                ]}
              />
            </GridItem>
          </center>
        </div>
        <div className={classes.space50} />
      </div>
    </div>
  );
}
