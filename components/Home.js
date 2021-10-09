import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios'

const api = axios.create({
  baseURL: `http://localhost:3000`
})

const Home = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSignUp = () => {
    props.navigation.navigate('SignUp');
  }
  const onForgotPass = () => {
    props.navigation.navigate('ForgotPass')
  }

  const onSubmitHandler = () => {
    setIsLoading(true);
    api.post('/api/auth/login', {
      'Email': email,
      'Password': password
    })
      .then(function (response) {
        if (response.status != 200) {
          setIsError(true);
          setMessage('Username/Password incorrect');
        }
        else {
          //add authentication
          if (response.data.Role == 'admin') {
            props.navigation.navigate('Admin');
            setTimeout(() => { setIsLoading(false); }, 3000);
          }
          else if (response.data.Role == 'advisor') {
            props.navigation.navigate('Advisor');
            setTimeout(() => { setIsLoading(false); }, 3000);
          }
          else {
            props.navigation.navigate('Student');
            setTimeout(() => { setIsLoading(false); }, 3000);
          }
        }
      })
      .catch(function (error) {
        setTimeout(() => { setIsLoading(false); }, 1000);
        console.log(error);
        setIsError(true);
        setMessage('Username/Password incorrect');
      });
  };

  if (isLoading) {
    return (
      <View style={styles.load}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

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
      </View>
      <Text style={[styles.message, { color: isError ? 'red' : '#F5F5F5' }]}>{message}</Text>
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

//Image styling components
const width = Dimensions.get('window').width;
const imgWidth = Dimensions.get('window').width * 0.5;
const ratio = imgWidth / 3146

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontWeight: 'bold',
  },
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
    width: "65%",
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
    width: "50%",
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
    width: imgWidth,
    height: ratio * 1071,
    marginBottom: 30,
  }
});

export default Home;