import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "components/Footer/Footer.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import SectionBasics from "./Sections/SectionBasics2.js";
import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);


export default function Solicitacao() {
    const classes = useStyles();

    return (
        <div>
            <Parallax image={require("assets/img/cor.PNG")}>
                <div className={classes.container}>
                </div>
            </Parallax>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Escolha seu sabor favorito:
            <select value={this.state.value} onChange={this.handleChange}>
                        <option value="laranja">Laranja</option>
                        <option value="limao">Limão</option>
                        <option value="coco">Coco</option>
                        <option value="manga">Manga</option>
                    </select>
                </label>
                <input type="submit" value="Enviar" />
            </form>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <SectionBasics />
            </div>
            <Footer />
        </div>
    );
}

function handleChange(event) {
    this.setState({ value: event.target.value });
}

function handleSubmit(event) {
    alert('Seu sabor favorito é: ' + this.state.value);
    event.preventDefault();
}
