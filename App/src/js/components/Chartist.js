import React from "react";
import ChartistGraph from "react-chartist";

export default class Chartist extends React.Component {
	getData() {
		console.log(this.props.graph);
		return this.props.hidden ? this.props.graph.json.hidden : this.props.graph.json.display;
	}

	getOptions() {
		return this.props.hidden ? this.props.graph.options.hidden : this.props.graph.options.display;
	}

	getType() {
		return this.props.hidden ? this.props.graph.type.hidden : this.props.graph.type.display;
	}

	componentDidUpdate(){
		// console.log(this.refs.myChartist);
		// window.tmp = this.refs.myChartist;
		// // this.refs.myChartist.chartist.detach();
		// 	// type: this.getType(),
		// 	// data: this.getData()
		// this.refs.myChartist.chartist.update();
	}

	render() {
		const data = this.getData();
		const options = this.getOptions();
		const type = this.getType();

		switch(type){
			case 'Line':
				return <div id="myChartist"><ChartistLine data={data} options={options} /></div>
				break;
			case 'Bar':
				return <div id="myChartist"><ChartistBar data={data} options={options} /></div>
				break;
		}

	}
}


export class ChartistLine extends React.Component {

	render(){
		let type = "Line";
		const {data, options} = this.props;

		return <ChartistGraph data={data} options={options} type={type}/>
	}

}


export class ChartistBar extends React.Component {

	render(){
		let type = "Bar";
		const {data, options} = this.props;

		return <ChartistGraph data={data} options={options} type={type}/>
	}

}