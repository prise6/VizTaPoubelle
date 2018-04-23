import React from "react";

export default class Header extends React.Component {
  constructor() {
    super();
  }

  renderGameInfo() {
    if (this.props.levelNum > 0) {
      return (
        <h4>
          Niveau {this.props.levelNum} | {this.props.points} points
        </h4>
      );
    }
    return null;
  }

  renderButton() {
    if ((this.props.levelNum > 0) & (this.props.gameReady === true)) {
      return (
        <a class="button is-success is-outlined" onClick={this.props.changeLevel}>
          prochaine question &rarr;
        </a>
      );
    }
  }

  render() {
    return (
      <header class="hero-head">
        <div class="container has-text-centered">
          <div class="columns">
            <div class="column">
              <a href="http://www.lincoln.fr" class="drawer-logo"></a>
            </div>
            <div class="column">{this.renderGameInfo()}</div>
            <div class="column">{this.renderButton()}</div>
          </div>
        </div>
      </header>
    );
  }
}