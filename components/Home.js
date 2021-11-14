import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const api = axios.create({
  baseURL: `http://localhost:3210`
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
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("fname", response.data.fname);
          localStorage.setItem("lname", response.data.lname);
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

      <Image
        style={{ width: "100%", height: "20%", resizeMode: "contain", marginTop: '2%', }}
        source={{ uri: 'https://drury.edu/wp-content/uploads/files/brand_lounge/PrimaryFullColor.png' }}
      />
      {/* <Image source={require('../assets/RD Logos/drury.png')} style={{width: "38%", height: "20%", flex: 1.9, marginTop: '0.3%'}} /> */}
      <View style={styles.loginFields}>
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
      <View style={styles.forgotPass}>
        <TouchableOpacity onPress={() => onForgotPass()}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

//Image styling components

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
    backgroundColor: '#F5F5F5',
    flexDirection: "column"
  },
  buttonsform: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  inputView: {
    width: "65%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
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
    width: '40%',
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

  loginFields: {
    flex: 2,
    width: '80%',
    justifyContent: 'center',
    marginLeft: '26%'
  },
  forgotPass: {
    flex: 0.5,
  },
});

export default Home;