import React, { Component } from 'react';
import {Animated,
		 View,
		 Alert,
	  	Text,
	   	StyleSheet,
		TouchableNativeFeedback,
		Modal,
		TouchableHighlight,
		Dimensions,
		AppRegistry,
		TextInput,
} from 'react-native';

let deviceHeight = Dimensions.get('window').height //get device height
var deviceWidth = Dimensions.get('window').width //get device width

class Menu extends Component{

	constructor(props){
		super(props);
		this.state = {animated: new Animated.Value(-deviceHeight),
					 animatedInput: new Animated.Value(-deviceHeight),
					 animatedSpin: new Animated.Value(-deviceHeight),
					 animatedBox: new Animated.Value(0),
					 opacityA: new Animated.Value(0),
					  text: null,
		};
	}

	timePopupModal(){ //animation of the time popup modal
		Animated.parallel([
			Animated.timing(this.state.animated, {
			toValue: -(deviceHeight/2),
			duration:500, 
		}),
		Animated.timing(this.state.opacityA, {
			toValue: 0.5,
			duration:500
		})
		]).start();
		this.timoutHandle = setTimeout(() => { //3 sec that the modal is open 500ms+2500ms = 3000ms
			this.popdownButtonModal()
		}, 2500);
		// clearTimeout(this.timoutHandle);
	}

	popupButtonModal(){ //animation of the Button popup modal
		Animated.parallel([
			Animated.timing(this.state.animated, {
			toValue: -(deviceHeight/2),
			duration:500, 
		}),
		Animated.timing(this.state.opacityA, {
			toValue: 0.5,
			duration:500
		})
		]).start();
	}

	popdownButtonModal(){ //animation to close the time and button popup modal
		Animated.parallel([
			Animated.timing(this.state.animated, {
			toValue: deviceHeight,
			duration:500, 
			}),
			Animated.timing(this.state.opacityA, {
			toValue: 0,
			duration:500
			})
		]).start();
		this.resetModals(500);

	}

	resetModals(time){ //reset all modal states
		this.timoutHandle = setTimeout(() => {
			this.setState({animated : new Animated.Value(-deviceHeight),
						 animatedInput: new Animated.Value(-deviceHeight),
							animatedSpin:new Animated.Value(-deviceHeight),
							animatedBox: new Animated.Value(0),
							opacityA: new Animated.Value(0),
							text: null,});			
		}, time)
	}


	popupInputModal(){ //animation of the input popup modal

		Animated.parallel([
			Animated.timing(this.state.animatedInput, {
			toValue: -(deviceHeight/2),
			duration:500, 
		}),
		Animated.timing(this.state.opacityA, {
			toValue: 0.5,
			duration:500
		})
		]).start();
	}

	popdownInputModal(){ //get time from user to close input popup modal
		this.timoutHandle = setTimeout(() => {
			this.popdownInputModalOk()
		}, this.state.text*1000);
		// clearTimeout(this.timoutHandle);
	}

	popdownInputModalOk(){ //animation to close input popup modal
		Animated.parallel([
			Animated.timing(this.state.animatedInput, {
			toValue: deviceHeight,
			duration:500, 
			}),
			Animated.timing(this.state.opacityA, {
			toValue: 0,
			duration:500
			})
		]).start();
		this.resetModals(500);
	}

	popupSpinModal(){ //animation of spinner popup modal
		Animated.parallel([
			Animated.timing(this.state.animatedSpin, {
			toValue: -(deviceHeight/2),
			duration:500, 
		}),
		Animated.timing(this.state.opacityA, {
			toValue: 0.5,
			duration:500
		})
		]).start();
		this.timoutHandle = setTimeout(() => {
			this.boxSpin()
		}, 500);

	}

	popdownSpinModal(){ //animation to close spinner popup modal
		Animated.parallel([
			Animated.timing(this.state.animatedSpin, {
			toValue: deviceHeight,
			duration:500, 
		}),
		Animated.timing(this.state.opacityA, {
			toValue: 0,
			duration:500
		})
		]).start();
		
		this.resetModals(500);
	}

	boxSpin(){ //animation of the box spinner
		Animated.loop(
			Animated.timing(this.state.animatedBox, {
				toValue: 1,
				duration: 2000,
			})
		).start();
	}


	render(){

		const {animated, animatedInput,animatedSpin, animatedBox, opacityA, text} = this.state;

		var rotateProp = this.state.animatedBox.interpolate({ //interpolation for the box in spinner popup modal
			inputRange: [0,1],
			outputRange: ['0rad', '10rad'],
		});


		//modal for the time and button popup
		var Modal = <Animated.View style={[styles.modal, {opacity:opacityA}, {transform: [{translateY: animated}]}]}>
						<TouchableHighlight onPress={this.popdownButtonModal.bind(this)} style={styles.modalCloseButton}>
							<Text style={styles.modalCloseButtonText}>
								Close modal
								</Text>
						</TouchableHighlight>
					</Animated.View> 

		//modal for the input from user popup
		var inputModal = <Animated.View style={[styles.inmodal,{opacity:opacityA}, {transform: [{translateY: animatedInput}]}]}>
							<View>
								<Text style={styles.modalOkButtonText}>Enter Seconds:</Text>
								<TextInput style={styles.textInputStyle} onChangeText={(text) => this.setState({text})} value={this.state.text} />
								<TouchableHighlight onPress={this.popdownInputModal.bind(this)} style={styles.modalOkButton}>
									<Text style={styles.modalOkButtonText}>
										Ok
										</Text>
								</TouchableHighlight>
							</View>
						</Animated.View>			

		//modal for the spin popup
		var spinModal = <Animated.View style={[styles.modalSpin, {opacity:opacityA}, {transform: [{translateY: animatedSpin}]}]}>
							<View style={styles.boxView}>
								<Animated.View style={[styles.box, {transform: [{rotate: rotateProp}]}]}></Animated.View>
							</View>
						<TouchableHighlight onPress={this.popdownSpinModal.bind(this)} style={styles.modalCloseButton}>
							<Text style={styles.modalCloseButtonText}>
								Close modal
								</Text>
						</TouchableHighlight>
						</Animated.View>

		return(
			<View style={styles.container}>
				{Modal}
				{inputModal}
				{spinModal}
				<TouchableHighlight style={{alignItems:'center', width:300,height:80, backgroundColor: 'red', justifyContent:'center'}}
					onPress={this.timePopupModal.bind(this)}>
					<Text style={{fontFamily: 'Segoe UI Light',	fontSize: 30,}}>
						3 Sec Popup Modal
					</Text>
				</TouchableHighlight>
				<TouchableHighlight style={{alignItems:'center', width:300,height:80, backgroundColor: 'dodgerblue', justifyContent:'center'}}
					onPress={this.popupInputModal.bind(this)}>
					<Text style={{fontFamily: 'Segoe UI Light',	fontSize: 30,}}>
						Input Popup Modal
					</Text>
				</TouchableHighlight>
				<TouchableHighlight style={{alignItems:'center', width:300,height:80, backgroundColor: 'green', justifyContent:'center'}} 
					onPress={this.popupButtonModal.bind(this)}>
					<Text style={{fontFamily: 'Segoe UI Light',	fontSize: 30,}}>
						Button Popup Modal
					</Text>
				</TouchableHighlight>
				<TouchableHighlight style={{alignItems:'center', width:300,height:80, backgroundColor: 'yellow', justifyContent:'center'}} 
					onPress={this.popupSpinModal.bind(this)}>
					<Text style={{fontFamily: 'Segoe UI Light',	fontSize: 30,}}>
						Spin Popup Modal
					</Text>
				</TouchableHighlight>
			</View>
		)
	}
	
}


const styles = StyleSheet.create({
	container: {
	  backgroundColor: 'lightblue',
	  flex: 1,
	  flexDirection: 'column',
	  justifyContent: 'center',
	  alignItems: 'center',
	},

	ButtonText:{
		fontFamily: 'Segoe UI Light',		
		fontSize: 30,
	},

	boxView:{
		height: deviceHeight/2,
		width:deviceWidth,
		alignItems:'center',
		justifyContent: 'center',
		
	},

	componentStyle:{
		alignItems:'center',
		width:100,
		height:50
	},

	box:{
		height:60,
		width:60,
		backgroundColor: 'rgb(255,255,255)',
		alignItems: 'center',
		justifyContent: 'center',
	},

	modal: {
		height: deviceHeight,
		width: deviceWidth,
		position: 'absolute',
		top:0,
		left:0,
		backgroundColor: 'rgb(0,0,0)',
		justifyContent: 'flex-end',
		zIndex: 5,
	},

	modalSpin:{
		height: deviceHeight,
		width: deviceWidth,
		position: 'absolute',
		top:0,
		left:0,
		backgroundColor: 'rgb(0,0,0)',
		justifyContent: 'flex-end',
		zIndex: 5,
	},

	inmodal:{
		height: deviceHeight,
		width: deviceWidth,
		position: 'absolute',
		top:0,
		left:0,
		backgroundColor: 'rgb(0,0,0)',
		justifyContent: 'flex-end',
		zIndex: 5,
	},

	modalCloseButton:{
		backgroundColor: 'rgba(0,0,0,1)',
		alignItems: 'center',
		height: 50,
		justifyContent: 'space-around',
	},

	modalCloseButtonText:{
		fontFamily: 'Segoe UI Light',				
		color: 'white',
	},

	modalInputBox:{
		height: 20,
		width:20,
	},

	modalOkButton:{
		backgroundColor:'rgba(0,30,200,1)',
		height:30,
		alignItems: 'center',
		justifyContent: 'center',
	},

	modalOkButtonText:{
		fontFamily: 'Segoe UI Light',		
		color: 'white',
		fontSize:20,		
	},

	textInputStyle:{
		backgroundColor:'white',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize:30,		
	}
  });

module.exports = Menu;

