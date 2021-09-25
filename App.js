import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from './components/Home';
import Student from './components/Student';
import Advisor from './components/Advisor';
import Admin from './components/Admin';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <View style={styles.container}>
        <Header />
        <AppContainer />
        <Footer />
      </View>
    </>
    /*This styling applies to all pages*/
    /*NOTE: IF you do not want all pages to have an element, do not add it here. Add it to the specific page.*/
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
