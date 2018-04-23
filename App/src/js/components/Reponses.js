import React from "react";

export default class Reponses extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			prix: props.propositions.length - 1
		};
	}

	changePrix(correct) {
		if (!correct) {
			this.setState((prevState, props) => ({
				prix: prevState.prix > 0 ? prevState.prix - 1 : 0
			}));
		} else {
			this.props.changePoints(this.state.prix);
		}
	}

	render() {
		const { propositions } = this.props;
		const buttons = propositions.map((proposition, idx) => {
			return [
					<Reponse
						key={idx}
						proposition={proposition}
						changeStateHidden={this.props.changeStateHidden}
						changePrix={this.changePrix.bind(this)}
					/>
			];
		});

		return buttons;
	}
}

export class Reponse extends React.Component {
	constructor() {
		super();
		this.state = {
			class: "reponses button is-medium is-success is-outlined"
		};
	}

	handleClick(e) {
		if (this.props.proposition.reponse === true) {
			this.setState((prevState, props) => ({
				class: prevState.class + " " + "is-inverted"
			}));
			this.props.changePrix(true);
			this.props.changeStateHidden();
		} else {
			this.setState((prevState, props) => ({
				class: prevState.class + " " + "is-danger"
			}));
			this.props.changePrix(false);
		}
	}

	render() {
		const { phrase, reponse } = this.props.proposition;
		return (
			<a onClick={this.handleClick.bind(this)} class={this.state.class}>
				{phrase}
			</a>
		);
	}
}