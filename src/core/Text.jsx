// Libraries
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
// Core
import Utilities from './Utilities';

export default class Text extends Component {
	render() {
		const children = this.props.children;
		const textStyles = [{
			display: "inline",
			alignSelf: "center",
			fontSize: 16,
			lineHeight: "1.25em",
			color: "#000",
			fontFamily: "SF-UI-Display-Regular, sans-serif",
		}];

		return (
			<span className={Utilities.finalClassNamesForComponent(this, "text", textStyles)}>
				{children}
			</span>
		);
	}
}
