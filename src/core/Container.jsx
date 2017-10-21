// Libraries
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

export default class Container extends Component {
	static Orientation = {
		Horizontal: "row", // Default
		Vertical: "column",
	}
	static Alignment = {
		Beginning: "flex-start",
		Middle: "center",
		End: "flex-end",
		Stretch: "stretch", // Default
	}
	render() {
		const styleOverrides = this.props.styles;
		const children = this.props.children;
		let sizeToFitContents = this.props.sizeToFitContents;
		if (sizeToFitContents == null) {
			sizeToFitContents = false;
		}
		let wrapContents = this.props.wrapContents;
		if (wrapContents == null) {
			wrapContents = false;
		}
		let orientation = this.props.orientation;
		if (orientation == null) {
			orientation = Container.Orientation.Horizontal;
		}
		let horizontalAlignment = this.props.horizontalAlignment;
		if (horizontalAlignment == null) {
			horizontalAlignment = Container.Alignment.Stretch;
		}
		let verticalAlignment = this.props.verticalAlignment;
		if (verticalAlignment == null) {
			verticalAlignment = Container.Alignment.Stretch;
		}

		// Stupid flexbox...
		let flexDirection = orientation;
		if (wrapContents) {
			flexDirection = (orientation == Container.Orientation.Horizontal) ? Container.Orientation.Vertical : Container.Orientation.Horizontal;
		}

		const styles = StyleSheet.create({
			container: {
				display: "flex",
				alignSelf: (sizeToFitContents) ? "center" : "stretch",
				flexShrink: (sizeToFitContents) ? 0 : "auto",
				flexDirection: flexDirection,
				flexWrap: (wrapContents) ? "wrap" : "nowrap",
				position: "relative",
				overflow: "scroll",
			},
			horizontal: {
				height: (sizeToFitContents) ? "auto" : "100%",
				justifyContent: horizontalAlignment,
				alignContent: verticalAlignment,
			},
			vertical: {
				width: (sizeToFitContents) ? "auto" : "100%",
				justifyContent: verticalAlignment,
				alignContent: horizontalAlignment,
			},
		});
		let combinedStyles = [styles.container];
		combinedStyles.push((orientation == Container.Orientation.Horizontal) ? styles.horizontal: styles.vertical);

		if (styleOverrides != null) {
			combinedStyles = combinedStyles.concat(styleOverrides);
		}
		return (
			<div className={css(combinedStyles)}>
				{children}
			</div>
		);
	}
}
