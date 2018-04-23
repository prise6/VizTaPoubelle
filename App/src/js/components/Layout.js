import React from "react";
import Game from "./Game.js";
import Footer from "./Footer.js";

export default class Layout extends React.Component {
  constructor() {
    super();
  }


  render() {
    return (
      <section class="hero is-link is-fullheight">
        <Game />
        <Footer />
      </section>
    );
  }
}
