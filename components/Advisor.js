import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const Advisor = (props) => {
  let name = localStorage.getItem("fname") + " " + localStorage.getItem("lname");

  return (
    <View style={styles.container}>
      <Text style={styles.txt1}>Welcome back {name}!</Text>
      <Text style={styles.txt2}>Please choose your desired major, minor, or certificate options from the list below:</Text>
      <Text style={styles.txt3}>NOTE: choose at least three credentials:  one major and two certificates.  One certificate can be replaced with a second major or a minor.</Text>
    </View>
    /*This styling applies to the Advisor page*/
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  }
})
export default Advisor;