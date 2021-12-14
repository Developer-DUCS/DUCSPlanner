import React from 'react';
import { useState } from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {Button, Surface, icon} from 'react-native-paper';
import axios from 'axios';
import SignUp from './SignUp';

const Home= (props) => {
  const api = axios.create({
  baseURL: `http://localhost:3210`
});
  
  /* const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); */
  
  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      Email: '',
      Password: '',
    },
    mode: 'onChange',
  });

  const onForgotPass = () => {
    props.navigation.navigate('ForgotPass')
  }
  const onSignUp = () => {
    props.navigation.navigate('SignUp');
  }

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
      <Surface style={styles.formContainer}>
      <View style={styles.formBuild}>
      <Image
           style={{width: "90%", height: "30%", resizeMode:"contain"  , marginTop: '3%', marginBottom: '2%', alignSelf: 'center' }}
          source={{uri:'https://drury.edu/wp-content/uploads/files/brand_lounge/PrimaryFullColor.png'}}
       /> 

       
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: 'email',
              name: 'Email',
              

              rules: {
                required: {
                  value: true,
                  message: 'Email is required',
                },
              },
              textInputProps: {
                label: 'Email',
              },
              
            },
            {
              type: 'password',
              name: 'Password',
              rules: {
                required: {
                  value: true,
                  message: 'Password is required',
                },
                minLength: {
                  value: 5,
                  message: 'Enter valid password',
                },
              },
              textInputProps: {
                label: 'Password',
              },
            },
          ]}
        />

       
        <Button
        style={styles.btn}
        mode={'contained'}
        onPress={handleSubmit((values) => api.post('/api/auth/login', {
          'Email': values.Email,
          'Password': values.Password,
          
        })
        .then(function (response) {
          console.log("sent");
          if (response.status != 201) {
            setIsError(true)
          }
          else {
            props.navigation.navigate('Student');
          }
          
        })
        .catch(function (error) {
          console.log(error);
          
        })
        
        )}>

        <Text style={styles.btnText}> Log In </Text>

        </Button>

        <Button
        onPress={() => onSignUp()}
        style={styles.btn}
        >
          <Text style={styles.btnText}>Sign Up</Text>

        </Button>

        <Button onPress={() => onForgotPass()} > <Text style={styles.forgotpass}> Forgot password? </Text> </Button>
        </View>
        </Surface>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    aspectRatio: 10/8
  },

  scrollViewStyle: {
    flex: 1,
    padding: '2%',
    justifyContent: 'center',
  },

  btn: {
    backgroundColor: 'crimson',
    marginBottom: '4%',
  },

  btnText:{
    color: 'white'
  },

  forgotpass:{
    color: 'blue'
  },

  formContainer:{
    width: '50%',
    height: '100%',
    alignSelf: 'center'
  },

  formBuild:{
    width: '75%',
    alignSelf: 'center'
  }
});

export default Home;