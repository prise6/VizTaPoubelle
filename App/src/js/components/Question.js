import React from "react";

export default class Question extends React.Component {
	render() {
		if (this.props.hidden ) {
			return (
				<div class="columns">
					<div class="column">
						<h2 class="title">{this.props.question.phrase}</h2>
					</div>
				</div>
			);
		} else return null;
	}
}
