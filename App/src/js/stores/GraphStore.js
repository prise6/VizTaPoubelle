import { loadJSON } from "../tools.js";
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import { getColor } from "../tools.js";
import Ch from "chartist";

class GraphStore extends EventEmitter {
	constructor() {
		super();
		this.graphs = [
			{
				nom: "graph_un",
				type: "ParisArrondissements",
				graph: {
					geojson_url:
						"./assets/json/arrondissement_paris_enrichis.json",
					legend: {
						colors: [
							"#fdd49e",
							"#fdbb84",
							"#fc8d59",
							"#ef6548",
							"#d7301f",
							"#990000"
						].reverse(),
						values: [200000, 150000, 80000, 40000, 20000, 0]
					},
					style: {
						hidden: feature => ({
							fillColor:
								feature.properties.c_arr == 15
									? "#990000"
									: "#000000",
							color: "#ffffff",
							weight: 1,
							fillOpacity: 0.8
						}),
						display: function(legend, feature) {
							return {
								fillColor: getColor(
									feature.properties.nb_hab,
									legend
								)
							};
						}
					},
					control: feature => {
						return (
							"<h4>Nombre d'habitants</h4>" +
							(feature
								? "<span><b>" +
								  feature.properties.nom +
								  "</b><br/>" +
								  feature.properties.nb_hab.toLocaleString() +
								  " habs</span>"
								: "selectionne un arr.")
						);
					}
				},
				jeu: {
					question: {
						phrase: "Cet arrondissement est ...",
						reponse: "Le 15eme arrondissement est le plus peuplé!"
					},
					propositions: [
						{
							phrase: "le plus peuplé",
							reponse: true
						},
						{
							phrase: "ayant le plus de poubelles",
							reponse: false
						},
						{
							phrase: "le plus beau",
							reponse: false
						},
						{
							phrase: "le plus cher",
							reponse: false
						}
					]
				},
				informations:
					"Le 15ème arrondissement de Paris est <strong> le plus peuplé </strong> avec 237 636 habitants, soit 10% de la population parisienne. Et pourtant..."
			},

			{
				nom: "graph_deux",
				type: "ParisArrondissements",
				graph: {
					geojson_url:
						"./assets/json/arrondissement_paris_enrichis.json",
					legend: {
						colors: [
							"#edf8fb",
							"#ccece6",
							"#99d8c9",
							"#66c2a4",
							"#2ca25f",
							"#006d2c"
						].reverse(),
						values: [1500, 1200, 900, 650, 400, 0]
					},
					style: {
						hidden: feature => ({
							fillColor:
								(feature.properties.c_arr == 16) |
								(feature.properties.c_arr == 12) |
								(feature.properties.c_arr == 19)
									? "#006d2c"
									: "#000000",
							color: "#ffffff",
							weight: 1,
							fillOpacity: 0.8
						}),
						display: function(legend, feature) {
							return {
								fillColor: getColor(
									feature.properties.nb_poub,
									legend
								)
							};
						}
					},
					control: feature => {
						return (
							"<h4>Nombre de poubelles</h4>" +
							(feature
								? "<span><b>" +
								  feature.properties.nom +
								  "</b><br/>" +
								  feature.properties.nb_poub.toLocaleString() +
								  " poubelles</span>"
								: "selectionne un arr.")
						);
					}
				},
				jeu: {
					question: {
						phrase: "Quel est un point commun de ces arrondissements ?",
						reponse: ""
					},
					propositions: [
						{
							phrase: "le passage de la Seine",
							reponse: false
						},
						{
							phrase: "beaucoup de poubelles !",
							reponse: true
						},
						{
							phrase: "les grands espaces verts",
							reponse: true
						}
					]
				},
				informations:
					"Paris compte plus de 22 000 poubelles de rues. <br/> Le 16, 19 et 12ème arrondissement couvrent <strong>25%</strong> des poubelles parisiennes. Et pourtant le 19ème n'est que le cinquième plus grand arrondissement. <br/>Le nombre de poubelles peut être lié aux espaces verts."
			},

			{
				nom: "graph_trois",
				type: "ParisArrondissements",
				graph: {
					geojson_url:
						"./assets/json/arrondissement_paris_enrichis.json",
					legend: {
						colors: [
							"#fdd49e",
							"#fdbb84",
							"#fc8d59",
							"#ef6548",
							"#d7301f",
							"#990000"
						].reverse(),
						values: [0.032, 0.027, 0.022, 0.017, 0.012, 0]
					},
					style: {
						hidden: feature => ({
							fillColor:
								feature.properties.c_arr == 1
									? "#990000"
									: "#000000",
							color: "#ffffff",
							weight: 1,
							fillOpacity: 0.8
						}),
						display: function(legend, feature) {
							return {
								fillColor: getColor(
									feature.properties.nb_poub_nb_hab,
									legend
								)
							};
						}
					},
					control: feature => {
						return (
							"<h4>poubelles / habs</h4>" +
							(feature
								? "<span><b>" +
								  feature.properties.nom +
								  "</b><br/>" +
								  feature.properties.nb_poub_nb_hab.toLocaleString() +
								  "poubelles / habs</span>"
								: "selectionne un arr.")
						);
					}
				},
				jeu: {
					question: {
						phrase: "Quel est le nombre d'habitants moyen pour une poubelle dans le 1er arrondissement ?",
						reponse: ""
					},
					propositions: [
						{
							phrase: "Environ 30",
							reponse: true
						},
						{
							phrase: "Environ 50",
							reponse: false
						},
						{
							phrase: "Environ 70",
							reponse: false
						}
					]
				},
				informations:
					"Le 1er arrondissement est le <strong>moins peuplé</strong> mais concentre beaucoup de poubelles : soit <strong>plus d'une poubelle pour 30 habitants</strong>.<br/> Le centre de Paris est globalement dans cette situation, sans doute grâce au tourisme."
			},

			{
				nom: "graph_quatre",
				type: "Chartist",
				graph: {
					json_url: "./assets/json/tonnage_dechets_tout_paris.json",
					options: {
						hidden: {
							low: 0,
							fullWidth: false,
							showArea: true
						},
						display: {
							low: 0
						}
					},
					type: {
						hidden: "Line",
						display: "Bar"
					}
				},
				jeu: {
					question: {
						phrase: "De quel type de déchets ce tonnage provient-il ?",
						reponse: ""
					},
					propositions: [
						{
							phrase: "ordures classiques",
							reponse: false
						},
						{
							phrase: "bacs verts",
							reponse: false
						},
						{
							phrase: "bacs jaunes",
							reponse: true
						}
					]
				},
				informations:
					"Ce sont bien les déchets bacs jaunes. Ici, est représenté le <strong/>tonnage par arrondissement et par habitant</strong> en kg.<br/>Dans le graphique précédent, nous pouvons penser à un effet grandes vacances."
			},

			{
				nom: "graph_cinq",
				type: "Chartist",
				graph: {
					json_url: "./assets/json/dans_ma_rue_decos_chartist.json",
					options: {
						hidden: {
							low: 0,
							fullWidth: false,
							showArea: true,
							axisX: {
								showLabel: false
							}
						},
						display: {
							low: 0,
							fullWidth: false,
							showArea: true,
							axisX: {
								showLabel: true
							}
						}
					},
					type: {
						hidden: "Bar",
						display: "Bar"
					}
				},
				jeu: {
					question: {
						phrase:
							"Où peut-on trouver le + d'élements de décos gratuits ?",
						reponse: ""
					},
					propositions: [
						{
							phrase: "Le fameux 15ième",
							reponse: false
						},
						{
							phrase: "Le 17ème",
							reponse: false
						},
						{
							phrase: "Le 11ème",
							reponse: false
						},
						{
							phrase: "Le 18ème",
							reponse: true
						}
					]
				},
				informations:
					"A l'aide de l'application <a href=\"https://www.paris.fr/dansmarue\">dansmarue</a>, <strong>le 18ème arrondissement</strong> recense le plus de <em>Meubles et éléments de décoration</em> en 2016 : plus de 1000 alertes par l'application."
			},
			{
				nom: "graph_six",
				type: "Chartist",
				graph: {
					json_url:
						"./assets/json/data_google_trend_mois_chartist.json",
					options: {
						hidden: {
							low: 0,
							fullWidth: false,
							showArea: true,
							axisY: {
								showLabel: false
							},
							axisX: {
								offset: 60,
								labelInterpolationFnc: function(value, index) {
									return index % 4 == 0 ? value : null;
								}
							}
						},
						display: {
							low: 0
						}
					},
					type: {
						hidden: "Line",
						display: "Line"
					}
				},
				jeu: {
					question: {
						phrase:
							"Voici la tendance d'une recherche Google au cours du temps. Quel était le sujet ?",
						reponse: ""
					},
					propositions: [
						{
							phrase: "Lincoln Paris",
							reponse: false
						},
						{
							phrase: "poubelles Paris",
							reponse: true
						},
						{
							phrase: "recyclage Paris",
							reponse: false
						}
					]
				},
				informations:
					"<strong>La recherche &laquo; poubelles Paris &raquo;</strong> au cours du temps. L'échelle est relative au mois ayant le plus de recherche.<br/> Les deux pics sont les grèves des éboueurs en octobre  2015 et juin 2016."
			}
		];
		this.currentGraph = null;
	}

	getCurrentGraph() {
		return this.currentGraph;
	}

	isEmpty(){
		return this.currentGraph === null;
	}

	changeLevel(level_num) {
		if(level_num < this.graphs.length)
			this.currentGraph = this.graphs[level_num];
		else {
			this.currentGraph = null;
			this.emit("change");
			return null;
		}

		switch (this.currentGraph.type) {
			case "ParisArrondissements":
				const geojson_url = this.currentGraph.graph.geojson_url;
				loadJSON(
					geojson_url,
					function(response) {
						this.currentGraph.graph.geojson = JSON.parse(response);
						this.emit("change");
						// setTimeout(() => {
						// }, 2000);
					}.bind(this)
				);

				break;
			case "Chartist":
				const json_url = this.currentGraph.graph.json_url;
				loadJSON(
					json_url,
					function(response) {
						this.currentGraph.graph.json = JSON.parse(response);
						this.emit("change");
						// setTimeout(() => {
						// }, 2000);
					}.bind(this)
				);

				break;
		}
	}

	handleActions(action) {
		switch (action.type) {
			case "CHANGE_LEVEL": {
				this.changeLevel(action.level_num);
				break;
			}
		}
	}
}

const graphStore = new GraphStore();
dispatcher.register(graphStore.handleActions.bind(graphStore));

export default graphStore;