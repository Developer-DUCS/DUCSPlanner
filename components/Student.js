import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default class Student extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Student Screen</Text>
      </View>
      /*This styling applies to the Student page*/
    )
  }
}