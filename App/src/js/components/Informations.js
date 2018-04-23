import React from "react";

export default class Informations extends React.Component {
	getInfos() {
		return { __html: this.props.informations };
	}

	render() {
		return this.props.hidden ? null : (
			<div class="column is-one-third-desktop is-one-quarter-tablet">
				<p dangerouslySetInnerHTML={this.getInfos()} />
			</div>
		);
	}
}