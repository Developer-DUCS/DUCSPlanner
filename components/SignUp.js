import React from 'react';
import { View, StyleSheet, ScrollView, Image, Text} from 'react-native';
import axios from 'axios';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {Button, Surface} from 'react-native-paper';


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
      <Surface style={styles.formContainer}>
      <View style={styles.formBuild}>
      <Image
           style={{width: "50%", height: "10%", resizeMode:"contain"  , marginTop: '3%', marginBottom: '2%', alignSelf: 'center' }}
          source={{uri:'https://drury.edu/wp-content/uploads/files/brand_lounge/PrimaryFullColor.png'}}
       />
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
        style={styles.btn}
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
        <Text style={styles.btnText}>Submit</Text>
      </Button>
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
    height: '100%',
    width: '75%',
    alignSelf: 'center'
  }
});

export default SignUp;