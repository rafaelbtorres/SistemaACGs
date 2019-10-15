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
    <div style={{ height: 100, overflow: "show", padding: 20 }}>
      <a
        href="/solicitacao"
        style={{
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
  );
};
export default function SectionBasics() {
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
                    tabIcon: People
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
