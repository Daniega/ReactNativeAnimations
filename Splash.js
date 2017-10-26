import React, { Component } from 'react';
import {Animated, View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import { StackNavigator } from 'react-navigation';



export default class Splash extends Component{

	constructor(){
		super();
		this.animated = new Animated.Value(0);
	}


	fadeIn(){ //Fade text in
		Animated.timing(this.animated, {
			toValue: 1,
			duration: 2000,
		}).start();
	}

	render() {

		const opacity = this.animated.interpolate({ //interpolate opacity
			inputRange: [0,1],
			outputRange: [0,1]
		});

		return (
			<View style={splashStyle.headerStyle}>
				<Animated.Text style={[splashStyle.Title, {opacity}]} onLoad={this.fadeIn()}>
					Hello Moonsite!
				</Animated.Text>
				<Animated.Text style={[splashStyle.Subtitle, {opacity}]} onLoad={this.fadeIn()}>
					Powered by Daniel Gaishuber
				</Animated.Text>
			</View>
		);
	}
}


const splashStyle = StyleSheet.create({
	Title: {
		fontFamily: 'Segoe UI Light',
		fontSize: 40
	},

	Subtitle:{
		fontFamily: 'Segoe UI Light',
		fontSize: 15
	},

	headerStyle: {
		backgroundColor: 'lightblue',
		flex:1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	enterButtonText:{
		fontFamily: 'Segoe UI Light',		
		fontSize: 30,
		paddingTop: 50,
	},
});