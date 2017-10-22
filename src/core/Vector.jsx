// Libraries
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import ReactSVG from 'react-svg';
// Core
import Utilities from './Utilities';

export default class Vector extends React.Component {
	render() {
		const source = this.props.source;
		const svgStyles = [{
			alignSelf: "center",
		}];
		return (
			<ReactSVG className={Utilities.finalClassNamesForComponent(this, svgStyles)} path={source} />
		);
	}
}
