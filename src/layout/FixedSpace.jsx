import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

export default class FixedSpace extends Component {
	static Variant = {
		horizontal: "horizontal",
		vertical: "vertical",
	}
	render() {
		const styleOverrides = this.props.styles;
		let variant = this.props.variant;
		const size = this.props.size;
		const styles = StyleSheet.create({
			fixedSpace: {
				display: "inline-block",
				flexShrink: 0,
			},
			horizontal: {
				width: size,
			},
			vertical: {
				height: size,
			}
		});
		let combinedStyles = [styles.fixedSpace];

		// Account for the variant and size
		if (variant == null) {
			variant = FixedSpace.Variant.Horizontal;
		}
		if (variant == FixedSpace.Variant.Horizontal) {
			combinedStyles.push(styles.horizontal);
		} else {
			combinedStyles.push(styles.vertical);
		}

		if (styleOverrides != null) {
			combinedStyles = combinedStyles.concat(styleOverrides);
		}
		return (
			<div className={css(combinedStyles)} />
		);
	}
}
