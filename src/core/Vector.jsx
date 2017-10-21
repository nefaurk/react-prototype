// Libraries
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import ReactSVG from 'react-svg';

export default class Vector extends React.Component {
	render() {
		const styleOverrides = this.props.styles;
		const source = this.props.source;
		const styles = StyleSheet.create({
			vector: {
				alignSelf: "center",
			},
		});
		let combinedStyles = [styles.vector];

		if (styleOverrides != null) {
			combinedStyles = combinedStyles.concat(styleOverrides);
		}
		return (
			<ReactSVG className={css(combinedStyles)} path={source} />
		);
	}
}
