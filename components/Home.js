import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default class Home extends Component {
  state = {
    email: "",
    password: ""
  }
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
      <View style={styles.container}>
        <Image source={require('../Logos/RD Logos/drury.jpg')} style={styles.img} />
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ email: text })} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ password: text })} />
        </View>
        <View style={styles.buttonsform}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'f5f5f5',
  },
  buttonsform: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputView: {
    width: "50%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "black"
  },
  forgot: {
    color: "blue",
    fontSize: 20
  },
  btn: {
    width: "100%",
    backgroundColor: "crimson",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    padding: 10,
  },
  loginText: {
    color: "white"
  },
  img: {
    width: '30%',
    height: '25%',
    marginBottom: 50,
  }
});