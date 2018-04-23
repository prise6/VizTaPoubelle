import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout.js";
import css from  '../css/index.css';
import sass from '../css/mystyle.scss';

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);
 
// class Pie extends React.Component {
//   render() {
 
//     var data = {
//       labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
//       series: [
//         [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
//       ]
//     };
 
//     var options = {
//       high: 10,
//       low: -10,
//       axisX: {
//         labelInterpolationFnc: function(value, index) {
//           return index % 2 === 0 ? value : null;
//         }
//       }
//     };
 
//     var type = 'Bar'
 
//     return (
//       <div>
//         <ChartistGraph data={data} options={options} type={type} />
//       </div>
//     )
//   }
// }
 
// ReactDOM.render(<Pie />, document.body)


// L = require('leaflet');
// var map = L.map('mapid', {
// 	'center': [0, 0],
// 	'zoom': 0,
// 	'zoomControl': false,
// 	'attributionControl': false
// })

// var layer = null;

// loadJSON("js/arrondissement_paris_enrichis.json", function(response) {
// 	var geojson = JSON.parse(response);
// 	console.log(geojson);
// 	var myStyle = {
// 		"color": "#ff7800",
// 		"weight": 1,
// 		"opacity": 0.65
// 	};
// 	layer = L.geoJSON(geojson.features, {
// 		style: myStyle
// 	}).addTo(map);
// 	window.layer = layer;
// 	map.fitBounds(layer.getBounds());

// });

// // lat puis long
// bounds = [
// 	[48.815766, 2.224169],
// 	[48.902156, 2.469703],
// ]

