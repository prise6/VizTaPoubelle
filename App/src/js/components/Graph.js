import React from "react";
import ParisArrondissements from "./ParisArrondissements.js";
import Chartist from "./Chartist.js";
import Question from "./Question.js";
import Reponses from "./Reponses.js";
import Informations from "./Informations.js";

export default class Graph extends React.Component {
	constructor() {
		super();
		this.state = {
			hidden: true,
			alreadyPLayed: false
		};
	}

	changePoints(points) {
		if (this.state.alreadyPLayed === false) this.props.changePoints(points);
	}

	renderGraph() {
		const { level } = this.props;
		switch (level.type) {
			case "ParisArrondissements":
				return (
					<ParisArrondissements
						hidden={this.state.hidden}
						geojsonFeatures={level.graph.geojson.features}
						style={level.graph.style}
						control={level.graph.control}
						legend={level.graph.legend}
					/>
				);

			case "Chartist":
				return(
					<Chartist hidden={this.state.hidden} graph={level.graph}/>
				);

			default:
				return <h3>Problème</h3>;
		}
	}

	renderButtons() {
		if (this.state.hidden === true) {
			return (
				<Reponses
					changeStateHidden={this.changeStateHidden.bind(this)}
					changePoints={this.changePoints.bind(this)}
					propositions={this.props.level.jeu.propositions}
				/>
			);
		} else {
			return (
				<a class="button is-small is-success is-outlined" onClick={this.changeStateHidden.bind(this)}>
					&larr; retour
				</a>
			);
		}
	}

	changeStateHidden() {
		this.setState((prevState, props) => ({
			hidden: !prevState.hidden,
			alreadyPLayed: true
		}));
	}

	render() {
		return (
			<div>
				<Question
					question={this.props.level.jeu.question}
					hidden={this.state.hidden}
				/>

				<div class="columns reverse-column-order">
					<div class="column">{this.renderGraph()}</div>
					<Informations
						informations={this.props.level.informations}
						hidden={this.state.hidden}
					/>
				</div>
				<div class="columns">
					<div class="column">{this.renderButtons()}</div>
				</div>
			</div>
		);
	}
}