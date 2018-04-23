import React from "react";
import * as GraphActions from "../actions/GraphActions.js";
import GraphStore from "../stores/GraphStore.js";
import Header from "./Header.js";
import Graph from "./Graph.js";
import {FacebookShareButton, LinkedinShareButton, TwitterShareButton} from 'react-share';
import { FacebookIcon, LinkedinIcon, TwitterIcon} from 'react-share';

export default class Game extends React.Component {
	constructor(props) {
		super();
		this.state = {
			level_num: 0,
			points: 0,
			game_ready: false,
			game_ended: false,
			level: null
		};
	}

	componentWillMount() {
		GraphStore.on("change", this.setLevel.bind(this));
	}

	componentWillUnmount() {
		GraphStore.removeListener("change", this.setLevel.bind(this));
	}

	setLevel() {
		if(GraphStore.isEmpty()){
			this.setState({
				game_ready: false,
				game_ended: true
			})
		} else {
			this.setState((prevState, props) => ({
				level: GraphStore.getCurrentGraph(),
				game_ready: true,
				level_num: prevState.level_num + 1
			}));		
		}

	}

	changeLevel() {
		const level_num = this.state.level_num;
		GraphActions.changeLevel(level_num);
		this.setState((prevState, props) => ({
			game_ready: false
		}));
	}

	changePoints(points) {
		this.setState((prevState, props) => ({
			points: prevState.points + points
		}));
	}

	renderGraph() {
		const { game_ready, game_ended, level, level_num } = this.state;
		if (game_ready === true) {
			return (
				<Graph
					key="0"
					level={level}
					changePoints={this.changePoints.bind(this)}
				/>
			);
		} else if (game_ended === false && level_num > 0) {
			return <a class="button is-loading is-success"></a>;
		} else if (game_ended) {
			return [
				<h1 class="title">
				C'est la fin du Quizz !
				</h1>,
				<h2 class="subtitle">
				{this.state.points} pts
				</h2>,
				<FacebookShareButton url={'https://prise6.github.io/VizTaPoubelle-site/'}>
					<div class={'icon-share'}>
						<FacebookIcon size={32} round={true} />
					</div>
				</FacebookShareButton>,
					
				<LinkedinShareButton url={'https://prise6.github.io/VizTaPoubelle-site/'}>
					<div class={'icon-share'}>
						<LinkedinIcon size={32} round={true} />
					</div>
				</LinkedinShareButton>,

				<TwitterShareButton url={'https://prise6.github.io/VizTaPoubelle-site/'}>
					<div class={'icon-share'}>
						<TwitterIcon size={32} round={true} />
					</div>
				</TwitterShareButton>,
				<a href="." class="button is-success is-outlined">Recommencer</a>
			]
		}
	}

	renderButton() {
		const { game_ready, level, level_num } = this.state;
		if (level_num == 0) {
			return (
				<div>
					<h1 class="title">Viz' Ta Poubelle </h1>
					<h2 class="subtitle">En terme de poubelles parisiennes, tu t'y connais ?</h2>
					<a class="button is-large is-outlined is-success" onClick={this.changeLevel.bind(this)}>
						Envoyer les questions!
					</a>
				</div>
			);
		} else return null;
	}

	render() {
		return [
			<Header levelNum={this.state.level_num} points={this.state.points} gameReady={this.state.game_ready} changeLevel={this.changeLevel.bind(this)}/>,
			<div class="hero-body" id="myHeroBody">
				<div class="container has-text-centered">
					{this.renderButton()}
					
					{this.renderGraph()}
				</div>
			</div>
		];
	}
}