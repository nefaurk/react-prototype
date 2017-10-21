// Libraries
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

export default class Bitmap extends Component {
	render() {
		const styleOverrides = this.props.styles;
		const source = this.props.source;
		const styles = StyleSheet.create({
			root: {
				alignSelf: "center",
			},
		});
		let combinedStyles = [styles.root];

		if (styleOverrides != null) {
			combinedStyles = combinedStyles.concat(styleOverrides);
		}
		return (
			<img className={css(combinedStyles)} src={source} />
		);
	}
}
