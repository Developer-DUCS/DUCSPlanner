import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Picker, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createAppContainer } from "react-navigation";
import { CardStyleInterpolators, createStackNavigator } from "react-navigation-stack";
import axios from 'axios'
import CredField from './CredField'

const api = axios.create({
  baseURL: `http://localhost:3210`
})

const Student = (props) => {
  const [name, setName] = useState('John Doe');
  const [courseCode, setCourseCode] = useState(['"CSGD"', '"CRIM"', '"INTD"']);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [fieldNum, setFieldNum] = useState(3);

  const onSubmitHandler = () => {
    setIsLoading(true);
    api.post('/api/courses/courses', {
      'courseCode': courseCode,

    
    })
      .then(function (response) {
        if (response.status != 200) {
          setIsError(true);
        }
        else {
          if(response.status == 200){
          console.log("i got a 200 status");
          console.log(response);
          }
          return (
            <View>
              <Text>Hey, it worked!</Text>
            </View>
          );
        }
      })
      .catch(function (error) {
        setTimeout(() => { setIsLoading(true); }, 1000);
        console.log(error);
        setIsError(true);
        setMessage('API Error');
      });
  };

  const onMajorAdd = () => {
    console.log('madeithere')
    return (<View style={styles.form}><CredField /></View>)
  }

  if (isLoading) {
    return (
      <View style={styles.load}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.InfoText}> 
        <Text style={styles.txt1}>Welcome Back {name}!</Text>
        <Text style={styles.txt2}>Please choose your desired major, minor, or certificate options from the list below:</Text>
        <Text style={styles.txt3}>NOTE: choose at least three credentials:  one major and two certificates.  One certificate can be replaced with a second major or a minor.</Text>
      </View>
      <View style={styles.form2}>
        <View style ={styles.pickerSet}> 
        <Picker style={styles.picker} placeholder='Major' >
          <Picker.Item label="Select Major" value="" />
          <Picker.Item label="Computer Science: Game Development" value="CSGD" />
          <Picker.Item label="Computer Science: Software Engineering" value="CSSE" />
          <Picker.Item label="Mathematics" value="MATH" />
        </Picker>
     
        
        <Picker style={styles.picker} placeholder='Minor'>
          <Picker.Item label="Select Minor" value="" />
          <Picker.Item label="Computer Science" value="CSCI" />
          <Picker.Item label="Criminology" value="CRIM" />
          <Picker.Item label="English" value="ENGL" />
        </Picker>
       
        
        <Picker style={styles.picker} placeholder='Certificate'>
          <Picker.Item label="Select Certificate" value="" />
          <Picker.Item label="Interactive Design" value="INTD" />
          <Picker.Item label="International Immersion" value="INTI" />
          <Picker.Item label="Ancients Alive: The Classics in Context" value="ANCA" />
        </Picker>
       </View> 
      </View>
      <View style={styles.form}>
        <TouchableOpacity style={styles.btn} onPress={onMajorAdd}>
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
        <Text style={[styles.message, { color: isError ? 'red' : '#F5F5F5' }]}>{message}</Text>
        <TouchableOpacity style={styles.btn} onPress={onSubmitHandler}>
          <Text style={styles.btntext}>Submit</Text>
        </TouchableOpacity>  
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: '100%',
    aspectRatio : 1,
    marginLeft: "0.5%"
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: "2%"
  },
  
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%"
  },
  btn: {
    width: "20%",
    backgroundColor: "crimson",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1%",
    flexShrink: 1
  },
  btntext: {
    color: "white",
    fontWeight: 'bold',
  },
  form2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  load: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontWeight: 'bold',
  },
  picker: {
    flex: 0.25,
    resizeMode: "contain",
    marginRight: '1%',
    
    
  },
  pickerSet:{
    width : '100%',
    flexDirection: "row",
    

  },
  InfoText: {
    width: "100%",
    flexDirection: "column"
    
  },
  txt1:{
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: "1%",
  },
  txt2:{
    width: '70%',
    paddingBottom: "0.8%",
  },
  txt3: {
    width: '70%',
    paddingBottom: "0.8%",
    
  },
});

export default Student;