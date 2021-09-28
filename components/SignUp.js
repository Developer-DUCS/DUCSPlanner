import { text } from 'body-parser';
import { createPool } from 'mysql';
import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, Picker} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Student extends Component {
    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F' }}>
                <View style={{backgroundColor: 'white'}}>
                    <Image style={{height: 85, width: 320}} source={require('../assets/druryLogo.png')} />
                </View>
                <View style= {styles.div}>
                <View style= {styles.fieldTxt}>
                <TextInput placeholder= 'First Name'>
                </TextInput>
                </View>

                <View style= {styles.fieldTxt}>
                <TextInput placeholder= 'Last Name'>
                </TextInput>
                </View>

                <View style= {styles.fieldTxt}>
                <TextInput placeholder= 'Password'>
                </TextInput>
                </View>

                <View style= {styles.fieldTxt}>
                <TextInput placeholder= 'Confirm Password'>
                </TextInput>
                </View>

                <View style= {styles.fieldTxt}>
                <TextInput placeholder= 'Email' 
                />
                </View>
                
                <View style= {styles.fieldTxts}>
                <Picker placeholder= 'Role'>
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

            </View>
            
            /*This styling applies to the Student page*/
        )
    }
}

const styles = StyleSheet.create({
    fieldTxt: {
        justifyContent: 'center',
        width: '45%',
        backgroundColor: "white",
        borderColor: 'black',
        height: '8%',
        marginBottom: '2%',
        justifyContent: "center",
        padding: '2%'
    }, 
    img: {
        width: '60%',
        height: '25%',
        marginBottom: 50,
      },
      btn: {
        width: "50%",
        backgroundColor: "crimson",
        borderRadius: 25,
        height: '15%',
        alignItems: "center",
        justifyContent: "center",
        margin: 6,
        padding: 2,
      },
      div: {
          padding: 15,
          height: '65%',
          width: '55%',
          justifyContent: "center",
          alignItems: "center",
      },
      btntext:{
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          
      },
      fieldTxts: {
          width: '45%',
          height: '8%',
          paddingBottom: 20,
      },

      
     
})