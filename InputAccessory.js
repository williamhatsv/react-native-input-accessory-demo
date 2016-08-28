'use strict';
import React, {
   Component,
   PropTypes,
} from 'react';
import ReactNative, {
  View,
  DeviceEventEmitter,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
  Text
} from 'react-native';

const dismissKeyboard = require('dismissKeyboard');
const INPUT_ACCESSORY_HEIGHT = 40;

class InputAccessory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleHeight: Dimensions.get('window').height,
      opacity: 0
    };
  }

  componentWillMount() {
    //For some reason, this gives warnings? disable for now
    console.disableYellowBox = true;
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  componentWillUnmount(){
    let newSize = Dimensions.get('window').height
    this.setState({
      visibleHeight: newSize,
      hideKA: true,
      opacity: 0
    })
    // dismissKeyboardHandler();
  }

  keyboardWillShow (e) {
    var newSize = e.endCoordinates.screenY - this.props.offsetY - (INPUT_ACCESSORY_HEIGHT-1);
    // console.log('InputAccessory: keyboardWillShow: ', newSize);

    LayoutAnimation.configureNext({
      duration:400,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY
      },
    });

    this.setState({
      visibleHeight: newSize,
      hideKA: false,
      opacity:1,
    })
  }

  onLayout(e) {
    return false;
  }

  keyboardWillHide (e) {
    // console.log('InputAccessory: keyboardWillHide');
    let newSize = Dimensions.get('window').height
    this.setState({
      visibleHeight: Dimensions.get('window').height,
      hideKA: true,
      opacity:0,
    })
  }

  dismissKeyboardHandler() {
    LayoutAnimation.configureNext({
      duration:100,
      create: {
        type: LayoutAnimation.Types.linear,
      },
      update: {
        type: LayoutAnimation.Types.linear,
      },
    });

    let newSize = Dimensions.get('window').height
    this.setState({
      visibleHeight: newSize,
      hideKA: true,
      opacity:0,
    })
    console.log('InputAccessory: dismissKeyboard');
    dismissKeyboard();
  }

  render() {
      return (
        <View style={[s.InputAccessory,{opacity:this.state.opacity,top:this.state.visibleHeight-1}]} onLayout={(e)=>this.onLayout(e)}>
            <TouchableOpacity
              onPress={() => this.dismissKeyboardHandler()}>
              <Text style={[s.InputAccessoryButtonText]}>
                Done
              </Text>
            </TouchableOpacity>
        </View>
      )
  }
}

const screenHeight = Dimensions.get('window').height;
var s = StyleSheet.create({
  InputAccessory: {
    alignItems:'flex-end',
    backgroundColor:'#f4f4f4',
    borderColor: '#c0c0c0',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height:INPUT_ACCESSORY_HEIGHT,
    position:'absolute',
    top: screenHeight,
    left: 0,
    right: 0,
  },
  InputAccessoryButtonText: {
    fontSize: 17,
    color: '#db232e',
    backgroundColor:'transparent',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

module.exports = InputAccessory;
