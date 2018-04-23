import React from "react";
import ReactDOM from "react-dom";
import L from "leaflet";
import { MapControl } from "react-leaflet";

export default class CustomControl extends MapControl {
  constructor() {
    super();

    this.state = {
      div: L.DomUtil.create("div", "info")
    };
  }

  setDivInner(html) {
    this.state.div.innerHTML = html;
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.html !== fromProps.html) {
      this.setDivInner(toProps.html);
    }
  }

  createLeafletElement(props) {
    const legend = L.control({ position: "topleft" });

    legend.onAdd = function(map) {
      return this.state.div;
    }.bind(this);

    this.setDivInner(this.props.html);

    return legend;
  }
}