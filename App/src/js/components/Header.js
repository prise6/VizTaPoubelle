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

  render() {
    return (
      <header class="hero-head">
        <div class="container has-text-centered">
          <div class="columns">
            <div class="column">
              <a href="http://www.lincoln.fr" class="drawer-logo" />
            </div>
            <div class="column">{this.renderGameInfo()}</div>
            <div class="column">
              <a href="https://github.com/prise6/VizTaPoubelle" target="_blank">
                <span class="icon is-medium">
                  <i class="fab fa-github fa-lg" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}