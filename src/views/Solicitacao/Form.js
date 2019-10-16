import React from "react";
// plugin that creates slider
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import GridItem from "components/Grid/GridItem.js";

import FormularioSolicitacao from "views/Solicitacao/FormComponent.js";

const useStyles = makeStyles(styles);

export default function FormularioS() {
  const classes = useStyles();
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <center>
            <GridItem container justify="center">
              <FormularioSolicitacao />
            </GridItem>
          </center>
        </div>
        <div className={classes.space50} />
      </div>
    </div>
  );
}
