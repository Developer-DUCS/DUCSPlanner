import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios'

const api = axios.create({
  baseURL: `http://localhost:3000`
})

const Home = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const onSignUp = () => {
    props.navigation.navigate('SignUp');
  }
  const onForgotPass = () => {
    props.navigation.navigate('ForgotPass')
  }

  const onSubmitHandler = () => {
    api.post('/api/auth/login', {
      'Email': email,
      'Password': password
    })
      .then(function (response) {
        if (response.status != 200) {
          setIsError(true);
          //return (<View style={styles.container}><Text>Username/Password Incorrect</Text></View>);
        }
        else {
          //add authentication
          if (response.data.Role == 'admin') {
            props.navigation.navigate('Admin');
          }
          else if (response.data.Role == 'advisor') {
            props.navigation.navigate('Advisor');
          }
          else {
            props.navigation.navigate('Student');
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsError(true);
        //return (<View style={styles.container}><Text>Username/Password Incorrect</Text></View>);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/RD Logos/drury.png')} style={styles.img} />
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
          secureTextEntry={true}
          placeholder="Password..." secureTextEntry={true}
          placeholderTextColor="#003f5c"
          onChangeText={setPassword} />
        <Text style={[styles.message, { color: isError ? 'red' : 'green' }]}>{message ? getMessage() : null}</Text>
      </View>
      <View style={styles.buttonsform}>
        <TouchableOpacity style={styles.btn} onPress={() => onSignUp()}>
          <Text style={styles.btntext}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onSubmitHandler}>
          <Text style={styles.btntext}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => onForgotPass()}>
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
    fontSize: 15
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
    width: '32.5%',
    height: '26%',
    marginBottom: 50,
  }
});

export default Home;