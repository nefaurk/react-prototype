// Libraries
import React, {Component} from 'react';
import createClass from 'create-react-class';
import update from 'immutability-helper';
import {StyleSheet, css} from 'aphrodite/no-important';
import $ from 'jquery';
// Core
import Utilities from '../core/Utilities';
import Bitmap from '../core/Bitmap';
import Container from '../core/Container';
import Layer from '../core/Layer';
import Text from '../core/Text';
import Vector from '../core/Vector';
// Layout
import FixedSpace from '../layout/FixedSpace';
import FlexibleSpace from '../layout/FlexibleSpace';

// Global constants
const prototypeFolder = "/prototype";
const prototypeAssetsFolder = "/prototype/assets";
const prototypeFile = "/prototype/prototype.json";

export default class Editor extends Component {
	constructor(props) {
		super(props);
		const self = this;
		$.getJSON(prototypeFile, function(json) {
			self.updatePrototypeDef(json)
		});

		this.state = {
			componentClasses: this.props.componentClasses,
			prototypeDef: null,
		};
	}
	updatePrototypeDef(json) {
		if (json != null) {
			const prototypeDef = json;

			let customComponentClasses = {};
			if (prototypeDef != null) {
				const componentsDef = prototypeDef.components;
				customComponentClasses = this.createCustomComponentClasses(componentsDef);
			}
			const componentClasses = Object.assign(this.props.componentClasses, customComponentClasses);

			let state = this.state;
			state = update(state, {
				componentClasses: {$set: componentClasses},
				prototypeDef: {$set: prototypeDef},
			});
			this.setState(state);
		}
	}
	createCustomComponentClasses(componentsDef) {
		let customComponents = {};
		if (componentsDef != null) {
			for (let className in componentsDef) {
				const componentDef = componentsDef[className];
				const rootComponentClass = this.getComponentClass(componentDef.class);
				if (rootComponentClass == null) {
					console.log("ERROR: Unable to resolve component class: " + componentDef.class);
				} else {
					const children = this.recursivelyGeneratePrototype(componentDef.children);
					const componentClass = createClass({
						render: function() {
							return React.createElement(rootComponentClass, componentDef.props, children);
						},
					});
					customComponents[className] = componentClass;
				}
			}
		}
		return customComponents;
	}
	render() {
		const prototypeDef = this.state.prototypeDef;
		const prototype = this.prototypeFromPrototypeDef(prototypeDef);
		// const layerTree = this.layerTreeFromPrototypeDef(prototypeDef);
		const containerStyles = {
			position: "absolute",
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
		};
		return (
			<Container style={containerStyles}>
				{prototype}
			</Container>
		);
		// <LayerTree style={{
		// 	width: "25%",
		// 	height: "100%",
		// }} prototypeDef={prototypeDef} tree={layerTree} changeHandler={this.prototypeDefChangeHandler} />
	}
	prototypeFromPrototypeDef(prototypeDef) {
		if (prototypeDef != null) {
			return this.recursivelyGeneratePrototype(prototypeDef.layers);
		} else {
			return [];
		}
	}
	recursivelyGeneratePrototype(layerDefs) {
		let components = [];
		if (layerDefs != null) {
			for (let componentDef of layerDefs) {
				if (componentDef instanceof Object) {
					const key = Utilities.generateID();
					let props = componentDef.props;
					if (props == null) {
						props = {};
					}
					if (props.key == null) {
						props.key = key;
					}
					if (props.source != null) {
						props.source = this.resolvedAssetPath(props.source);
					}
					let children = [];
					if (componentDef.props != null && componentDef.props.children != null) {
						children = this.recursivelyGeneratePrototype(componentDef.props.children);
					}

					const componentClass = this.getComponentClass(componentDef.class);
					if (componentClass == null) {
						console.log("ERROR: Unable to resolve component class: " + componentDef.class);
					} else {
						const component = React.createElement(componentClass, props, children);
						components.push(component);
					}
				} else if (componentDef.constructor === String) {
					components.push(componentDef);
				}
			}
		}
		return components;
	}
	resolvedAssetPath(source) {
		let path = source;
		if (source.startsWith("http://") || source.startsWith("https://")) {
			// Do nothing
		} else {
			path = prototypeAssetsFolder + "/" + source;
		}
		return path;
	}
	getComponentClass(c) {
		const componentClasses = this.state.componentClasses;
		return componentClasses[c];
	}
	// layerTreeFromPrototypeDef(prototypeDef) {
	// 	if (prototypeDef != null) {
	// 		return this.recursivelyGenerateLayerTree(prototypeDef.layers);
	// 	} else {
	// 		return [];
	// 	}
	// }
	// recursivelyGenerateLayerTree(layerDefs) {
	// 	const topLevelLayers = [];
	// 	if (layerDefs != null) {
	// 		for (let componentDef of layerDefs) {
	// 			const className = componentDef.class;
	// 			const layer = {
	// 				type: className,
	// 			};
	// 			if (componentDef.props != null) {
	// 				if (componentDef.props.children != null) {
	// 					layer.children = this.recursivelyGenerateLayerTree(componentDef.props.children);
	// 				}
	// 			}
	// 			topLevelLayers.push(layer);
	// 		}
	// 	}
	// 	return topLevelLayers;
	// }
	// prototypeDefChangeHandler(prototypeDef) {
	// 	let state = this.state;
	// 	state = update(state, {
	// 		prototypeDef: {$set: prototypeDef},
	// 	});
	// 	this.setState(state);
	// }
}
Editor.defaultProps = {
	componentClasses: {
		"Bitmap": Bitmap,
		"Container": Container,
		"Layer": Layer,
		"Text": Text,
		"Vector": Vector,
		"FlexibleSpace": FlexibleSpace,
		"FixedSpace": FixedSpace,
	}
};

class LayerTree extends Component {
	render() {
		const tree = this.props.tree;
		const layerTreeStyles = [{
			backgroundColor: "#FAFAFA",
			padding: 16,
		}];
		const textAreaStyles = [{
			alignSelf: "stretch",
		}];
		const json = JSON.stringify(this.props.prototypeDef);

		return (
			<Container
				className={Utilities.combinedClassNamesForComponent(this, "layerTree")}
				style={Utilities.combinedStylesForComponent(this, layerTreeStyles)}
				orientation={Container.Orientation.Vertical}>
				<textarea ref="textArea" className={Utilities.finalClassNames(textAreaStyles)} value={json} onChange={this.handleChange} />
			</Container>
		);
	}
	handleChange(e) {
		const textArea = this.refs.textArea;
		const changeHandler = this.props.changeHandler;
		if (changeHandler != null) {
			const prototypeDef = JSON.parse(textArea.value);
			changeHandler(prototypeDef);
		}
	}
}
