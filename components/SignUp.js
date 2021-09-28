import { text } from 'body-parser';
import { createPool } from 'mysql';
import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, Picker, TextInput } from 'react-native';

export default class Student extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={require('../assets/RD Logos/drury.png')} />
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText} placeholder='First Name...'>
                    </TextInput>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.inputText} placeholder='Last Name...'>
                    </TextInput>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.inputText} placeholder='Password...'>
                    </TextInput>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.inputText} placeholder='Confirm Password...'>
                    </TextInput>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.inputText} placeholder='Email...'
                    />
                </View>

                <View style={styles.inputView}>
                    <Picker placeholder='Role...'>
                        <Picker.Item label="Role" value="" />
                        <Picker.Item label="Student" value="Student" />
                        <Picker.Item label="Admin" value="Admin" />
                        <Picker.Item label="Advisor" value="Advisor" />'

                    </Picker>
                </View>

                <TouchableOpacity style={styles.btn} >
                    <Text style={styles.btntext}>Sign Up</Text>
                </TouchableOpacity>

            </View>

            /*This styling applies to the Student page*/
        )
    }
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
})