import { text } from 'body-parser';
import { createPool } from 'mysql';
import React, { Component, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, Picker, TextInput } from 'react-native';
import axios from 'axios'

const SignUp = (props) => {
        const api = axios.create({
        baseURL: `http://localhost:3000`
      });
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [role, setRole] = useState('');
      const [isError, setIsError] = useState(false);
      const [message, setMessage] = useState('');

      const onSubmitHandler = () => {
        api.post('/api/auth/signup', {
          'Email': email,
          'Password': password,
          'Fname': firstName,
          'Lname': lastName,
          'Role':role
        })
          .then(function (response) {
            if (response.status != 200) {
              setIsError(true)
            }
            else {
                props.navigation.navigate('Home');
            }
          })
          .catch(function (error) {
            console.log(error);
          })};
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={require('../assets/RD Logos/drury.png')} />
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                    placeholder='First Name...'
                    onChangeText={setFirstName}>
                    </TextInput>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                    placeholder='Last Name...'
                    onChangeText={setLastName}>
                    </TextInput>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                    placeholder='Password...'>
                    </TextInput>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                    placeholder='Confirm Password...'
                    onChangeText={setPassword}>
                    </TextInput>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.inputText}
                    placeholder='Email...'
                    onChangeText={setEmail}>
                    </TextInput>
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

                <TouchableOpacity style={styles.btn} >
                    <Text style={styles.btntext}
                    onPress={onSubmitHandler}>Sign Up</Text>
                </TouchableOpacity>

            </View>

            /*This styling applies to the Student page*/
        )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F',
    },
    inputView: {
        width: "25%",
        backgroundColor: "white",
        borderRadius: 25,
        height: 30,
        marginBottom: 10,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "black",
    },
    img: {
        width: '22.5%',
        height: '18%',
        marginBottom: 25,
    },
    btn: {
        width: "25%",
        backgroundColor: "crimson",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        padding: 10,
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
});

export default SignUp;