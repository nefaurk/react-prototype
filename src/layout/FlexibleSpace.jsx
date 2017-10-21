import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

export default class FlexibleSpace extends Component {
	render() {
		const styleOverrides = this.props.styles;
		const styles = StyleSheet.create({
			flexibleSpace: {
				display: "inline-block",
				flexGrow: 1,
			},
		});
		let combinedStyles = [styles.flexibleSpace];

		if (styleOverrides != null) {
			combinedStyles = combinedStyles.concat(styleOverrides);
		}
		return (
			<div className={css(combinedStyles)} />
		);
	}
}
