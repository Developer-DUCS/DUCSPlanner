import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Picker, TextInput, Dimensions } from 'react-native';
import axios from 'axios';
import * as yup from 'yup';
import { Formik } from 'formik';


const SignUp = (props) => {
    const api = axios.create({
        baseURL: `http://localhost:3210`
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

   
   // Create Validation Schema
    const  signUpValidation = yup.object().shape({
        firstName: yup.string().required('Enter your first name'),
        lastName: yup.string().required('Enter your last name'),
        email: yup.string().email('Please enter a valid email').required('Email address is required '),
        password: yup.string().min(8,({min})=>`Password must be at least ${min} characters and have one uppercase,Lowercase,number and special case character`).required('Password is required bro').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),
        confPassword: yup.string().required('Please confirm your password ').oneOf([yup.ref('password'), null], 'Passwords do not match')
        .required('Please select your role'),
        
      });



    const onSubmitHandler = () => {

        console.log("Submit button Clicked");
        console.log("sent");
        api.post('/api/auth/signup', {
            'Email': email,
            'Password': password,
            'ConfPassword': confPassword,
            'Fname': firstName,
            'Lname': lastName,
            'Role': role
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
    };

    return (

        <Formik
     initialValues={{ email: '', password: '', confPassword: '' , firstName: '', lastName: '', role: ''}}
     validateOnMount ={true}
     validationSchema= {signUpValidation}
        >
     {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (

        <View style={styles.container}>

            <Image style={styles.img} source={require('../assets/RD Logos/drury.png')} />
            
            <View style={styles.inputView}>
                <TextInput style={styles.inputText}

                //enforce validation schema
                    placeholder='First Name...'
                    onChangeText={setFirstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    
                    >
                        
                </TextInput>
               
              
                {(errors.firstName && touched.firstName)&&
                
                <Text style ={styles.errors}> {errors.firstName} </Text>
            }
            </View>

            <View style={styles.inputView}>
                <TextInput style={styles.inputText}
                    placeholder='Last Name...'
                    onChangeText={setLastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                    >
                </TextInput>

                {(errors.lastName && touched.lastName)&&
                
                <Text style ={styles.errors}> {errors.lastName} </Text>
            }
            </View>

            <View style={styles.inputView}>
                <TextInput style={styles.inputText}
                    placeholder='Password...' secureTextEntry={true}
                    onChangeText={setPassword}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    >
                </TextInput>

                {(errors.password && touched.password)&&
                
                <Text style ={styles.errors2}> {errors.password} </Text>
            }
            </View>

            <View style={styles.inputView}>
                <TextInput style={styles.inputText}
                    placeholder='Confirm Password...' secureTextEntry={true}
                    onChangeText={setConfPassword}
                    onChangeText={handleChange('confPassword')}
                    onBlur={handleBlur('confPassword')}
                    value={values.confPassword}
                    >
                </TextInput>
                {(errors.confPassword && touched.confPassword)&&
                
                <Text style ={styles.errors}> {errors.confPassword} </Text>
            }
            </View>

            <View style={styles.inputView}>
                <TextInput style={styles.inputText}
                    placeholder='Email...'
                    onChangeText={setEmail}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    >
                </TextInput>

                {(errors.email && touched.email)&&
                
                <Text style ={styles.errors}> {errors.email} </Text>
            }
            </View>

            <View style={styles.inputView}>
                <Picker placeholder='Role...'
                    onValueChange={setRole}>
                    <Picker.Item label="Role" value="" />
                    <Picker.Item label="Student" value="Student" />
                    <Picker.Item label="Admin" value="Admin" />
                    <Picker.Item label="Advisor" value="Advisor" />'

                </Picker>
            </View>
        <View style= {styles.btnDiv}>

            {/* Set Disabled Button to notValid */}

            
            <TouchableOpacity rounded disabled = {!isValid} style={[
                
                // Set Button to not submit if form data is invalid
                styles.btn,
                styles.shadowBtn,
                {
                    shadowColor: 'crimson',
                    backgroundColor: isValid? 'crimson' : '#5c5c5c'
                },
            
            ]}  
                
                >
                <Text style={styles.btntext}
                    onPress={onSubmitHandler}>Sign Up</Text>
            </TouchableOpacity>
            </View>
        </View>
        )}
        </Formik>
        /*This styling applies to the Student page*/
    )
}

//Image styling components
const width = Dimensions.get('window').width * .25;
const ratio = width / 3146

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F',
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
    }
});

export default SignUp;