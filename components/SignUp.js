import React from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import axios from 'axios';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';


const SignUp = (props) => {
    const api = axios.create({
        baseURL: `http://localhost:3210`
    });
    const {control, setFocus, handleSubmit, watch} = useForm({
        defaultValues: {
          email: '',
          password: '',
          role: '',
        },
        mode: 'onChange',
      });

    return (    
    <View style={styles.containerStyle}>
    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
    <Image style={styles.img} source={require('../assets/RD Logos/drury.png')} />
      <FormBuilder
        control={control}
        setFocus={setFocus}
        formConfigArray={[
          {
            type: 'text',
            name: 'firstName',
            rules: {
              required: {
                value: true,
                message: 'First Name is required',
              },
            },
            textInputProps: {
              label: 'First Name',
            },
          },
          {
            type: 'text',
            name: 'lastName',
            rules: {
              required: {
                value: true,
                message: 'Last Name is required',
              },
            },
            textInputProps: {
              label: 'Last Name',
            },
          },
          {
            type: 'email',
            name: 'email',

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
            name: 'password',
            rules: {
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: 8,
                message: 'Password should be atleast 8 characters',
              },
              pattern: {
                  value:
                  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?!.*\s)/,
                  message:'Password must contain a uppercase letter, a lowercase letter, a number, a special character, and no whitespace'
              }
            },
            textInputProps: {
              label: 'Password',
            },
          },
          {
            type: 'password',
            name: 'confPassword',
            rules: {
              required: {
                value: true,
                message: 'Confirm Password is required',
              },
            validate: (value) => value == watch('password') || 'Passwords do not match',
            },
            textInputProps: {
              label: 'Confirm Password',
            },
        },
          {
            name: 'role',
            type: 'select',
            textInputProps: {
              label: 'Role',
            },
            rules: {
              required: {
                value: true,
                message: 'Role is required',
              },
            },
            options: [
              {
                value: 'Student',
                label: 'Student',
              },
              {
                value: 'Admin',
                label: 'Admin',
              },
              {
                value: 'Advisor',
                label: 'Advisor',
              },
            ],
          }
        ]}
      />
      <Button
        mode={'contained'}
        onPress={handleSubmit((values) => api.post('/api/auth/signup', {
          'Email': values.email,
          'Password': values.password,
          'ConfPassword': values.confPassword,
          'Fname': values.firstName,
          'Lname': values.lastName,
          'Role': values.role
        })
        .then(function (response) {
          console.log("sent");
          if (response.status != 201) {
            setIsError(true)
          }
          else {
            props.navigation.navigate('Home');
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        )}>
        Submit
      </Button>
    </ScrollView>
  </View>
);
}

//Image styling components
const width = Dimensions.get('window').width * .25;
const ratio = width / 3146

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
    },
    inputView: {
        width: "50%",
        backgroundColor: "white",
        borderRadius: 25,
        height: 30,
        marginBottom: 5,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "black",
    },
    img: {
        width: width,
        height: ratio * 1000,
        marginTop: 20,
        marginBottom: 5,
    },
    btn: {
        width: "50%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        padding: 14,
    },
    btntext: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,

    },
    fieldTxts: {
        width: '45%',
        height: '8%',
        paddingBottom: 20,
    },

    errors:{
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 3

    },
    errors2:{
        fontSize: 12,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 2

    },
    btnDiv:{
          width: '100%'  ,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10
    },
    containerStyle: {
        flex: 1,
      },
      scrollViewStyle: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
      },
      headingStyle: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 40,
      }
});

export default SignUp;