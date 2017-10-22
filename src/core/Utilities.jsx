// Libraries
import {StyleSheet, css} from 'aphrodite/no-important';

let _lastID = 0;

export default class Utilities {
	static generateID() {
		const id = _lastID;
		_lastID++;
		return id;
	}
	static getEmbeddedClassNames(className) {
		let classNames = [];
		if (className != null) {
			if (className.constructor === String) {
				classNames.push(className);
			} else if (className instanceof Array) {
				for (let element of className) {
					classNames = classNames.concat(this.getEmbeddedClassNames(element));
				}
			}
		}
		return classNames;
	}
	static getEmbeddedStyles(style) {
		let styles = [];
		if (style != null) {
			if (style instanceof Array) {
				for (let element of style) {
					const result = this.getEmbeddedStyles(element);
					styles = styles.concat(result);
				}
			} else if (style instanceof Object) {
				styles.push(style);
			}
		}
		return styles;
	}
	static combinedClassNamesForComponent(component) {
		let argumentsToPass = Array.prototype.splice.call(arguments, 1);
		argumentsToPass.push(component.props.className);
		return this.combinedClassNames.apply(this, argumentsToPass);
	}
	static combinedClassNames() {
		const args = Array.from(arguments);
		const classNames = this.getEmbeddedClassNames(args);
		return classNames;
	}
	static combinedStylesForComponent(component) {
		let argumentsToPass = Array.prototype.splice.call(arguments, 1);
		argumentsToPass.push(component.props.style);
		return this.combinedStyles.apply(this, argumentsToPass);
	}
	static combinedStyles() {
		const args = Array.from(arguments);
		const styles = this.getEmbeddedStyles(args);
		return styles;
	}
	static finalClassNamesForComponent(component) {
		let argumentsToPass = Array.prototype.splice.call(arguments, 1);
		argumentsToPass = argumentsToPass.concat(this.getEmbeddedClassNames(component.props.className));
		argumentsToPass = argumentsToPass.concat(this.getEmbeddedStyles(component.props.style));
		// console.log("Styling:", argumentsToPass);
		return this.finalClassNames.apply(this, argumentsToPass);
	}
	static finalClassNames() {
		const args = Array.from(arguments);
		let classNames = this.getEmbeddedClassNames(args);
		const styles = this.getEmbeddedStyles(args);

		const numStyles = styles.length;
		let styleSheetDef = {};
		for (let i = 0; i < numStyles; i++) {
			styleSheetDef["style" + i] = styles[i];
		}
		const styleSheet = StyleSheet.create(styleSheetDef);
		const styleSheetStyles = [];
		for (let i = 0; i < numStyles; i++) {
			styleSheetStyles.push(styleSheet["style" + i]);
		}

		classNames.push(css(styleSheetStyles));
		return classNames.join(" ");
	}
}
