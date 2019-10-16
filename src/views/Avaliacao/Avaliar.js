import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

// sections for this page
import styles from "assets/jss/material-kit-react/views/components.js";

import Exibir from "views/Avaliacao/Listar.js";

const useStyles = makeStyles(styles);

export default function Avaliar() {
  const classes = useStyles();
  return (
    <div>
      <Parallax image={require("assets/img/cor.PNG")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <center>
                  <h1 className={classes.title}>Avaliar solicitações</h1>
                  <h3 className={classes.subtitle}>
                    Selecione uma solicitação para começar a avaliar.
                  </h3>
                </center>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <Exibir />
        <center>
          <div
            style={{
              height: 25,
              overflow: "show",
              padding: 50,
              backgroundColor: "#009349"
            }}
          >
            <a
              href="/"
              style={{
                textDecoration: "none",
                background: "#ffffff ",
                padding: 10,
                borderRadius: 10,
                cursor: "pointer",
                border: "#ffffff  solid 2px",
                color: "#009349"
              }}
            >
              <b>Voltar</b>
            </a>
          </div>
        </center>
      </div>
      <Footer />
    </div>
  );
}
