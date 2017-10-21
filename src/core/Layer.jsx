// Libraries
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

export default class Layer extends Component {
	render() {
		const styleOverrides = this.props.styles;
		const styles = StyleSheet.create({
			layer: {
				display: "inline-block",
				position: "absolute",
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				backgroundColor: "rgba(0, 0, 0, 0)",

				zIndex: -1,
			},
		});
		let combinedStyles = [styles.layer];

		if (styleOverrides != null) {
			combinedStyles = combinedStyles.concat(styleOverrides);
		}
		return (
			<div className={css(combinedStyles)} />
		);
	}
}
