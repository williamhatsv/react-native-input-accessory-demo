# InputAccessory / Keyboard Accessory Demo for React Native

This is a messy, but working input accessory that adds a bar to the top of the keyboard with a "Done" button in React Native for iOS. 

The "Done" button allows users to dismiss the keyboard, which is not possible on keyboards that lack a "done" button such as a the numpad.

The Input Accessory could also be used to add a "Next/Previous" button to the keyboard.

You can see a working version in this live app: [Dododex Taming Calculator for Ark: Survival Evolved](https://itunes.apple.com/us/app/dododex-taming-calculator/id1071311292?mt=8)

## Usage
Simply add `<InputAccessory>` to the bottom of a view:
```javascript
import KeyboardAccessory from './InputAccessory';

(...)

var Example = React.createClass({
  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={s.fullScrollView} automaticallyAdjustContentInsets={false}>
         <TextInput defaultValue="100" placeholder="100" keyboardType="numeric" />
        </ScrollView>
        <InputAccessory/>
      </View>
    );
  }
});
```

## Issues

* Sliding animation does not exactly match the keyboards animation.
* Done button is sometimes delayed when you hit "Done"
* If a navigation state is changed, causing a transition, the keyboard accessory transition is close, but not perfect.
* If a user taps on an input that is lower on the screen, the keyboard (and input accessory) overlap it. This is an existing React Native problem without the Input Accessory.

## Contributing 

Please feel free to contribute any changes to this repository if you can make it any better. :)
