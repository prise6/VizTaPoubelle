import React from "react";
import { Map, GeoJSON } from "react-leaflet";
import Choropleth from "react-leaflet-choropleth";
import { Control } from "leaflet";
import CustomControl from "./CustomControl.js";
import LegendControl from "./LegendControl.js";

export default class ParisArrondissements extends React.Component {
	constructor() {
		super();
		this.state = {
			feature: null,
			height: 200
		};
	}

	componentWillMount() {
		const height = document.getElementById('myHeroBody').clientHeight;
		console.log(height);
		this.setState({
			height: height > 500 ? height/1.5 : height/2
		})
	}

	componentDidMount() {

		this.refs.map.leafletElement.invalidateSize();
		this.refs.map.leafletElement.fitBounds(this.getBounds());
	}

	getCenter() {
		return [0, 0];
	}

	getZoom() {
		return 10;
	}

	getBounds() {
		return [[48.815766, 2.224169], [48.902156, 2.469703]];
	}

	getStyle() {
		return this.props.hidden === true
			? this.props.style.hidden
			: this.props.style.display.bind(null, this.props.legend);
	}

	getZoomControl() {
		return false;
	}

	getAttributionControl() {
		return "";
	}

	highlightFeature(e) {
		if (this.props.hidden === false) {
			var layer = e.target;
			layer.setStyle({
				weight: 2,
				fillOpacity: 1
			});

			if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
				layer.bringToFront();
			}

			this.setState({
				feature: layer.feature
			});
		}
	}

	resetHighlight(e) {
		if (this.props.hidden === false) {
			var layer = e.target;
			// this.refs.geojson.leafletElement.resetStyle(e.target);
			layer.setStyle({
				weight: 1,
				fillOpacity: 0.8
			});

			if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
				layer.bringToFront();
			}

			this.setState({
				feature: null
			});
		}
	}

	onEachFeature(feature, layer) {
		if (feature.properties && feature.properties.nom) {
			layer.bindTooltip(feature.properties.nom);
		}
		layer.on({
			mouseover: this.highlightFeature.bind(this),
			mouseout: this.resetHighlight.bind(this),
			click: this.highlightFeature.bind(this)
		});
	}

	renderControl() {
		const html = this.props.control(this.state.feature);
		return this.props.hidden === true ? null : (
			<div>
				<LegendControl legend={this.props.legend} />
				<CustomControl html={html} />
			</div>
		);
	}

	render() {
		const { geojsonFeatures } = this.props;

		return (
			<Map
				style={{ height: this.state.height }}
				center={this.getCenter()}
				zoom={this.getZoom()}
				className="mymap"
				bounds={this.getBounds()}
				ref="map"
				zoomControl={this.getZoomControl()}
				attributionControl={this.getAttributionControl()}
				dragging={false}
				scrollWheelZoom={false}
				doubleClickZoom={false}
			>
				{this.renderControl()}
				<GeoJSON
					ref="geojson"
					data={geojsonFeatures}
					style={this.getStyle()}
					onEachFeature={this.onEachFeature.bind(this)}
				/>
			</Map>
		);
	}
}