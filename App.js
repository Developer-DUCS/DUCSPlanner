import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from './components/home';
import Student from './components/student';
import Advisor from './components/advisor';
import Admin from './components/admin';
import Header from './components/Header';

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <AppContainer />
    </View>
    /*This styling applies to all pages*/
  );
};

const AppNavigator = createStackNavigator({
  /*Other screens will be added to this list if necessary*/
  Home: {
    screen: Home
  },
  Student: {
    screen: Student
  },
  Advisor: {
    screen: Advisor
  },
  Admin: {
    screen: Admin
  }
}, {
  initialRouteName: "Home"
  /*This sets the Home page as the base page*/
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
