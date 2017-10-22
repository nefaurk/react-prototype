// Libraries
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
// Core
import Utilities from './Utilities';

export default class Bitmap extends Component {
	render() {
		const source = this.props.source;
		const imageStyles = [{
			alignSelf: "center",
		}];
		return (
			<img className={Utilities.finalClassNamesForComponent(this, imageStyles)} src={source} />
		);
	}
}
