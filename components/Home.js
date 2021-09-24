import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
          <Button
          title="Go to Student"
          onPress={() => this.props.navigation.navigate('Student')}/>
          <Button
          title="Go to Advisor"
          onPress={() => this.props.navigation.navigate('Advisor')}/>
          <Button
          title="Go to Admin"
          onPress={() => this.props.navigation.navigate('Admin')}/>
      </View>
    )
  }
}