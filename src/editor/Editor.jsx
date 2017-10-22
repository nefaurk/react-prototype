// Libraries
import React, {Component} from 'react';
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
			prototypeDef: null,
		};
	}
	updatePrototypeDef(json) {
		const layers = json.layers;
		if (layers != null) {
			let state = this.state;
			state = update(state, {
				prototypeDef: {$set: layers},
			});
			this.setState(state);
		}
	}
	render() {
		const prototypeDef = this.state.prototypeDef;
		const layerTree = this.layerTreeFromPrototypeDef(prototypeDef);
		const prototype = this.prototypeFromPrototypeDef(prototypeDef);
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
	layerTreeFromPrototypeDef(prototypeDef) {
		const topLevelLayers = [];
		if (prototypeDef != null) {
			for (let componentDef of prototypeDef) {
				const className = componentDef.class;
				const layer = {
					type: className,
				};
				if (componentDef.props != null) {
					if (componentDef.props.children != null) {
						layer.children = this.layerTreeFromPrototypeDef(componentDef.props.children);
					}
				}
				topLevelLayers.push(layer);
			}
		}
		return topLevelLayers;
	}
	prototypeFromPrototypeDef(prototypeDef) {
		let components = [];
		if (prototypeDef != null) {
			for (let componentDef of prototypeDef) {
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
						children = this.prototypeFromPrototypeDef(componentDef.props.children);
					}
					const componentClass = this.getComponentClass(componentDef.class);
					const component = React.createElement(componentClass, props, children);
					components.push(component);
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
		const componentClasses = this.props.componentClasses;
		return componentClasses[c];
	}
	prototypeDefChangeHandler(prototypeDef) {
		let state = this.state;
		state = update(state, {
			prototypeDef: {$set: prototypeDef},
		});
		this.setState(state);
	}
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
	},
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
