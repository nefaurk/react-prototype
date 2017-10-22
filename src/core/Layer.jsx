// Libraries
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
// Core
import Utilities from './Utilities';

export default class Layer extends Component {
	render() {
		const layerStyles = [{
			display: "inline-block",
			position: "absolute",
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			backgroundColor: "rgba(0, 0, 0, 0)",

			zIndex: -1,
		}];
		return (
			<div className={Utilities.finalClassNamesForComponent(this, layerStyles)} />
		);
	}
}
