import React, { Component, useState } from 'react';
import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const API_URL = Platform.OS === 'web' ? 'http://localhost:19006' : 'http://10.106.16.51:19006';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const onChangeHandler = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const onLoggedIn = token => {
    fetch(`${API_URL}/private`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(async res => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            setMessage(jsonRes.message);
          }
        } catch (err) {
          console.log(err);
        };
      })
      .catch(err => {
        console.log(err);
      });
  }

  const onSubmitHandler = () => {
    const payload = {
      email,
      password,
    };
    fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async res => {
        try {
          const jsonRes = await res.json();
          if (res.status !== 200) {
            setIsError(true);
            setMessage(jsonRes.message);
          } else {
            onLoggedIn(jsonRes.token);
            setIsError(false);
            setMessage(jsonRes.message);
          }
        } catch (err) {
          console.log(err);
        };
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getMessage = () => {
    const status = isError ? `Error: ` : `Success: `;
    return status + message;
  }

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
          onChangeText={setEmail} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={setPassword} />
        <Text style={[styles.message, { color: isError ? 'red' : 'green' }]}>{message ? getMessage() : null}</Text>
      </View>
      <View style={styles.buttonsform}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btntext}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onSubmitHandler}>
          <Text style={styles.btntext}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F',
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
    color: "black",
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
  btntext: {
    color: "white",
    fontWeight: 'bold',
  },
  img: {
    width: '30%',
    height: '25%',
    marginBottom: 50,
  }
});

export default Home;