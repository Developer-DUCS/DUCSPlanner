import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default class Home extends Component {
  render() {
    return (
      /*<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
          /*<Button
          title="Go to Student"
          onPress={() => this.props.navigation.navigate('Student')}/>
          <Button
          title="Go to Advisor"
          onPress={() => this.props.navigation.navigate('Advisor')}/>
          <Button
          title="Go to Admin"
          onPress={() => this.props.navigation.navigate('Admin')}/>
      </View>
      This styling is just for the home page with the buttons taking you to 
      different pages (I had to comment out the entire view because I couldn't 
      just comment out the buttons, feel free to uncomment the view to test 
      out navigation)
      */
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>Add Login Here</Text>
      </View>
    )
  }
}