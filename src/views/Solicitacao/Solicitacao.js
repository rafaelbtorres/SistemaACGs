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

import FormularioSolicitacao from "views/Solicitacao/Form.js";

const useStyles = makeStyles(styles);

export default function Solicitacao() {
  const classes = useStyles();
  return (
    <div>
      <Parallax image={require("assets/img/cor.PNG")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <center>
                  <h1 className={classes.title}>
                    Solicitação de aproveitamento
                  </h1>
                  <h3 className={classes.subtitle}>
                    Preencha os campos abaixo para efetuar uma solicitação de
                    aproveitamento de horas de atividade complementar de curso.
                  </h3>
                </center>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <FormularioSolicitacao />
      </div>
      <Footer />
    </div>
  );
}
