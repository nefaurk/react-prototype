// Libraries
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

export default class Text extends Component {
	render() {
		const styleOverrides = this.props.styles;
		const children = this.props.children;
		const styles = StyleSheet.create({
			text: {
				display: "inline",
				alignSelf: "center",
				color: "rgba(0, 0, 0, 1)",
			},
		});
		let combinedStyles = [styles.text];

		if (styleOverrides != null) {
			combinedStyles = combinedStyles.concat(styleOverrides);
		}
		return (
			<span className={css(combinedStyles)}>{children}</span>
		);
	}
}
