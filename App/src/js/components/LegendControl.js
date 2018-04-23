import React from "react";
import ReactDOM from "react-dom";
import L from "leaflet";
import { MapControl } from "react-leaflet";
import { getColor } from "../tools.js";

export default class LegendControl extends MapControl {
  createLeafletElement(props) {
    const legend = L.control({ position: "topright" });

    legend.onAdd = function(map) {
      let div = L.DomUtil.create("div", "info legend");
      let grades = props.legend.values;
      let colors = props.legend.colors;

      if(grades[1]>100000) {
        grades = grades.map((grade) => {
          return (grade/1000).toLocaleString() + 'K';
        })
      } else {
        grades = grades.map((grade) => {
          return grade.toLocaleString();
        })
      }

      for (var i = grades.length - 1; i >= 0; i--) {
        div.innerHTML +=
          '<i style="background:' +
          colors[i] +
          '"></i>' +
          grades[i] +
          (i > 0 ? " &ndash; " + grades[i - 1] + "<br>" : "+");
      }

      return div;
    };

    return legend;
  }
}