import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import { Button, Surface, icon } from 'react-native-paper';
import axios from 'axios';
import SignUp from './SignUp';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GLOBAL from './globals'; 

const Home = (props) => {
  const api = axios.create({
    baseURL: `http://localhost:3210`
  });

  /* const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); */

  const { control, setFocus, handleSubmit } = useForm({
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
    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
      <Surface style={styles.formContainer}>
        <View style={styles.formBuild}>
          <Image
            style={{ width: "90%", height: "30%", resizeMode: "contain", marginTop: '3%', marginBottom: '2%', alignSelf: 'center' }}
            source={{ uri: 'https://drury.edu/wp-content/uploads/files/brand_lounge/PrimaryFullColor.png' }}
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
                  pattern: {
                    value:
                      /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
                    message: 'Email is invalid',
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
                if (response.status != 200) {
                  //setIsError(true)
                }
                else {
                  //console.log(JSON.stringify(response.data.userID));
                  var firstName = JSON.stringify(response.data.fname);
                  var lastName = JSON.stringify(response.data.lname);
                  var id = JSON.stringify(response.data.userID);
                 // console.log(JSON.stringify(response.data.userId));
                  GLOBAL.FIRSTNAME = firstName;
                  GLOBAL.LASTNAME = lastName;
                  GLOBAL.ID = id;
                  console.log(GLOBAL.ID);
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
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    aspectRatio: 10 / 8
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

  btnText: {
    color: 'white'
  },

  forgotpass: {
    color: 'blue'
  },

  formContainer: {
    width: '50%',
    height: '100%',
    alignSelf: 'center'
  },

  formBuild: {
    width: '75%',
    alignSelf: 'center'
  }
});

export default Home;