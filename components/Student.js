import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { createAppContainer } from "react-navigation";
import { CardStyleInterpolators, createStackNavigator } from "react-navigation-stack";

const Student = (props) => {
  const [name, setName] = useState('Colby Bogle');

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.txt1}>Welcome Back {name}!</Text>
        <Text style={styles.txt2}>Please choose your desired major, minor, or certificate options from the list below:</Text>
        <Text style={styles.txt3}>NOTE: choose at least three credentials:  one major and two certificates.  One certificate can be replaced with a second major or a minor.</Text>
      </View>
      <View style={styles.form2}>
        <Picker placeholder='Major' >
          <Picker.Item label="Select A Major" value="" />
          <Picker.Item label="Computer Science: Game Development" value="CSGD" />
          <Picker.Item label="Computer Science: Software Engineering" value="CSSE" />
          <Picker.Item label="Mathematics" value="MATH" />
        </Picker>
        <Picker placeholder='Minor'>
          <Picker.Item label="Select A Minor" value="" />
          <Picker.Item label="Computer Science" value="CSCI" />
          <Picker.Item label="Criminology" value="CRIM" />
          <Picker.Item label="English" value="ENGL" />
        </Picker>
        <Picker placeholder='Certificate'>
          <Picker.Item label="Select A Certificate" value="" />
          <Picker.Item label="Interactive Design" value="INTD" />
          <Picker.Item label="International Immersion" value="INTI" />
          <Picker.Item label="Ancients Alive: The Classics in Context" value="ANCA" />
        </Picker>
      </View>
      <View style={styles.form}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btntext}>Add Major</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btntext}>Add Minor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btntext}>Add Certificate</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.centered}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btntext}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100
  },
  txt1: {
    fontWeight: 'bold',
    fontSize: 25,
    padding: 15
  },
  txt2: {
    fontSize: 20,
    padding: 15,
    paddingTop: 0
  },
  txt3: {
    fontSize: 15,
    padding: 15,
    paddingTop: 0
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  btn: {
    width: "20%",
    backgroundColor: "crimson",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    paddingVertical: 10,
  },
  btntext: {
    color: "white",
    fontWeight: 'bold',
  },
  form2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    paddingVertical: 20
  },
});

export default Student;