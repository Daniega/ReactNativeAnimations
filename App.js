import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, 
  Animated
} from 'react-native';
import Splash from './Splash'
import Menu from './Menu'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {component: <Splash />} //app first start with splash screen
  }

  componentDidMount(){
    this.timeoutHandle = setTimeout(() => { //splash screen will be showed for 2 seconds, then Menu
      this.setState({component: <Menu />})
    }, 2000);
  }

  componentWillUnmount(){
    clearTimeout(this.timeoutHandle)
  }

  render() {
    return (
      this.state.component //state changes between Splash screen and Menu, without navigator
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
