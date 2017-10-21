// Libraries
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
// Core
import Bitmap from '../core/Bitmap';
import Container from '../core/Container';
import Layer from '../core/Layer';
import Text from '../core/Text';
import Vector from '../core/Vector';
// Layout
import FixedSpace from '../layout/FixedSpace';
import FlexibleSpace from '../layout/FlexibleSpace';
// Assets
import icon from './icon.svg';
import image from './image.gif';

export default class Prototype extends Component {
	render() {
		const styles = StyleSheet.create({
			app: {
				position: "absolute",
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			},
		});
		return (
			<Container styles={[styles.app]} orientation={Container.Orientation.Vertical}>
				<ToolBar><Button title="Foo"/><FixedSpace size={16} /><Button title="Bar"/><FlexibleSpace /><Button title="Submit"/></ToolBar>
				<Container>
					<Container orientation={Container.Orientation.Vertical}>
						<ToolBar><Button title="Top" /></ToolBar>
						<Container>
						</Container>
						<ToolBar><Button title="Bottom" /></ToolBar>
					</Container>
					<Container orientation={Container.Orientation.Vertical} verticalAlignment={Container.Alignment.Middle} wrapContents={true}>
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
						<Thumbnail />
					</Container>
				</Container>
			</Container>
		);
	}
}

class ToolBar extends Component {
	render() {
		const children = this.props.children;
		const styles = StyleSheet.create({
			toolbar: {
				height: 60,
				paddingLeft: 16,
				paddingRight: 16,
				boxShadow: "0 0 0.5px rgba(0, 0, 0, 0.2)",
			},
		});
		return (
			<Container styles={[styles.toolbar]} horizontalAlignment={Container.Alignment.Middle}>
				{children}
			</Container>
		);
	}
}

class Button extends Component {
	render() {
		const styles = StyleSheet.create({
			button: {
				paddingLeft: 16,
				paddingRight: 16,
				height: 40,
			},
			text: {
				color: "#FFF",
			},
			icon: {
				width: 12,
				height: 12,
			},
			layer: {
				backgroundColor: "#FF0088",
				borderRadius: 4,
			},
		});
		return (
			<Container styles={[styles.button]} sizeToFitContents={true}>
				<Text styles={[styles.text]}>Hello, world!</Text><FixedSpace size={16} /><Vector styles={[styles.icon]} source={icon} />
				<Layer styles={[styles.layer]}/>
			</Container>
		);
	}
}

class Thumbnail extends Component {
	render() {
		const styles = StyleSheet.create({
			image: {
				width: 498 / 2,
				height: 266 / 2,
			},
		});
		return (
			<Bitmap styles={[styles.image]} source={image} />
		);
	}
}
