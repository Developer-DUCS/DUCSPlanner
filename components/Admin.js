import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default class Admin extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Admin Screen</Text>
      </View>
      /*This styling applies to the Admin page*/
    )
  }
}