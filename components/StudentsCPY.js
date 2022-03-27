import React, { useState } from 'react';
import { Button, View, Text,Image, StyleSheet, Picker, TouchableOpacity, ActivityIndicator,ScrollView, ScrollViewComponent, FlatList} from 'react-native';
import { createAppContainer, SafeAreaView } from "react-navigation";
import { CardStyleInterpolators, createStackNavigator } from "react-navigation-stack";

import axios from 'axios'

const api = axios.create({
  baseURL: `http://localhost:3210`
})

const Student = (props) => {
  let courseCode = [];
  let newCourses = [];
  //let name = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [formValuesMajor, setFormValuesMajor] = useState([{}])
  const [formValuesMinor, setFormValuesMinor] = useState([{}])
  const [formValuesCert, setFormValuesCert] = useState([{}])


  const onSubmitHandler = () => {
    setIsLoading(true);
    //check validity of fields
    if ((formValuesMajor.length == 0 || formValuesCert.length == 0) || (formValuesMajor[0].major == undefined ||
      formValuesCert[0].cert == undefined)) {
      setTimeout(() => { setIsLoading(false); }, 1000);
      setIsError(true);
      setMessage('Incorrect Fields');
      return;
    }
    else {
      let pros = 0;
      let life = 0;
      //make coursecode list
      for (let a = 0; a < formValuesMajor.length; a++) {
        let majorCode = formValuesMajor[a].major.split(",")
        if (majorCode[1] == 'P') {
          pros = pros + 1;
        }
        else {
          life = life + 1
        }
        newCourses.push(majorCode[0]);
      }
      if (formValuesMinor[0].minor != undefined) {
        for (let b = 0; b < formValuesMinor.length; b++) {
          let minorCode = formValuesMinor[b].minor.split(",")
          if (minorCode[1] == 'P') {
            pros = pros + 1;
          }
          else {
            life = life + 1
          }
          newCourses.push(minorCode[0]);
        }
      }
      for (let c = 0; c < formValuesCert.length; c++) {
        let certCode = formValuesCert[c].cert.split(",")
        if (certCode[1] == 'P') {
          pros = pros + 1;
        }
        else {
          life = life + 1
        }
        newCourses.push(certCode[0]);
      }
      for (let d = 0; d < newCourses.length; d++) {
        courseCode.push("'" + newCourses[d] + "'");
      }
      if (pros == 0 || life == 0) {
        setTimeout(() => { setIsLoading(false); }, 1000);
        setIsError(true);
        setMessage('You must have one credential in the "Professional" category and one credential in the "Life" category.');
        return;
      }
    }
    api.post('/api/courses/courses', {
      'courseCode': courseCode,
    })
      .then(function (response) {
        if (response.status != 200) {
          setIsError(true);
        }
        else {
          if (response.status == 200) {
            setTimeout(() => { setIsLoading(false); }, 3000);
            let courseList = "";
            for (let x = 0; x < response.data.Courses.length; x++) {
              courseList = courseList + JSON.stringify(response.data.Courses[x]) + ";";
            }
            //console.log(courseList);
            localStorage.setItem("fetchCourseList", courseList);
            props.navigation.navigate('PlanCreation');
          }
        }
      })
      .catch(function (error) {
        setTimeout(() => { setIsLoading(true); }, 1000);
        console.log(error);
        setIsError(true);
        setMessage('API Error');
      });
  };

  if (isLoading) {
    return (
      <View style={styles.load}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  let addMajorFormFields = () => {
    setFormValuesMajor([...formValuesMajor, {}])
  }
  let addMinorFormFields = () => {
    setFormValuesMinor([...formValuesMinor, {}])
  }
  let addCertFormFields = () => {
    setFormValuesCert([...formValuesCert, {}])
  }
  let removeFormFieldsMajor = (i) => {
    let newFormValuesMajor = [...formValuesMajor];
    newFormValuesMajor.splice(i, 1);
    setFormValuesMajor(newFormValuesMajor)
  }
  let removeFormFieldsMinor = (i) => {
    let newFormValuesMinor = [...formValuesMinor];
    newFormValuesMinor.splice(i, 1);
    setFormValuesMinor(newFormValuesMinor)
  }
  let removeFormFieldsCert = (i) => {
    let newFormValuesCert = [...formValuesCert];
    newFormValuesCert.splice(i, 1);
    setFormValuesCert(newFormValuesCert)
  }
  let handleMajorChange = (i, e) => {
    let newFormValuesMajor = [...formValuesMajor];
    newFormValuesMajor[i][e.target.name] = e.target.value;
    setFormValuesMajor(newFormValuesMajor);
  }
  let handleMinorChange = (i, e) => {
    let newFormValuesMinor = [...formValuesMinor];
    newFormValuesMinor[i][e.target.name] = e.target.value;
    setFormValuesMinor(newFormValuesMinor);
  }
  let handleCertChange = (i, e) => {
    let newFormValuesCert = [...formValuesCert];
    newFormValuesCert[i][e.target.name] = e.target.value;
    setFormValuesCert(newFormValuesCert);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <View>
        <Text style={styles.txt1}>Welcome back !</Text>
        <Text style={styles.txt2}>Please choose your desired major, minor, or certificate options from the list below:</Text>
        <Text style={styles.txt3}>NOTE: choose at least three credentials:  one major and two certificates.  One certificate can be replaced with a second major or a minor. You must also have one credential in the "Professional" category and one credential in the "Life" category.</Text>
      </View>
    
      
    <View style={styles.MainContainer}>
      <Surface style= {styles.mainSurface}>
      

      <Surface style={styles.Majors}>
      <View style= {{width: '100%', alignItems: 'center'}}> 
        <Text style= {styles.MajMinorCert}> Major</Text>
        <Picker style={styles.pickerOpt}>
          <Picker.Item value= ""></Picker.Item>
        <Picker.Item label="Computer Science: Game Development" value="CSGD,P" />
        <Picker.Item label="Computer Science: Software Engineering" value="CSSE,P" />
        <Picker.Item label="Mathematics" value="MATH,L" />
        </Picker>
        <TouchableOpacity style={styles.btn} onPress={() => addMajorFormFields()}>
          <Text style={styles.btntext}>Add Major</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={(index) => removeFormFieldsMajor(index)}>
          <Text style={styles.btntext}>Remove Major</Text>
        </TouchableOpacity>
        
        </View>

        </Surface>

        <Surface style={styles.MinorSec}>
        <View style= {{width: '100%', alignItems: 'center'}}> 
        <Text style= {styles.MajMinorCert}> Minor</Text>
        <Picker style={styles.pickerOpt}>
          <Picker.Item value= ""></Picker.Item>
        <Picker.Item label="Animation" value="ANIM,P" />
        <Picker.Item label="Computer Science" value="CSCI,L" />
        <Picker.Item label="Criminology" value="CRIM,L" />
        <Picker.Item label="English" value="ENGL,L" />
        </Picker>
        <TouchableOpacity style={styles.btn} onPress={() => addMinorFormFields()}>
          <Text style={styles.btntext}>Add Minor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={(index) => removeFormFieldsMinor(index)}>
          <Text style={styles.btntext}>Remove Minor</Text>
        </TouchableOpacity>

        </View>
        </Surface>

        <Surface style={styles.cert}>
        
        <Text style= {styles.MajMinorCert}> Certificate</Text>
        <Picker style={styles.pickerOpt}>
          <Picker.Item value= ""></Picker.Item>
        <Picker.Item label="Interactive Design" value="INTD,P" />
        <Picker.Item label="International Immersion" value="INTL,L" />
        <Picker.Item label="Ancients Alive: The classics in COntext" value="ANCA,L" />
        </Picker>
        <TouchableOpacity style={styles.btn} onPress={() => addCertFormFields()}>
          <Text style={styles.btntext}>Add Certificate</Text>

          
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={(index) => removeFormFieldsCert(index)}>
          <Text style={styles.btntext}>Remove Certificate</Text>
        </TouchableOpacity>
        
        </Surface>
       
      
      </Surface>
      </View>

      <View style={styles.centered}>
        <Text style={[styles.message, { color: isError ? 'red' : '#F5F5F5' }]}>{message}</Text>
        <TouchableOpacity style={styles.btn2} onPress={onSubmitHandler}>
          <Text style={styles.btntext}>Submit</Text>
        </TouchableOpacity>  
      </View>
    
      </ScrollView>
      </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#F5F5F5',
    width: '100%',
    aspectRatio : 10/8,
  },

  pickerOpt:{

    width: '80%'

  },

  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: "2%"
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

  MainContainer:{
    paddingTop: '2%',
    paddingLeft: '0.72%',
    paddingRight: '0.72%',
    flexShrink: 1
  },



  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingVertical: 0
  },
   

  mainSurface:{
   
    flexDirection: 'row',
    width: '100%'

  },
  Majors:{
      
      width: '33.333333%',
      paddingRight: '0.05%',
      alignItems: 'center'
  },
  MinorSec:{
    
    alignItems: 'center',
    flex: 1,
    width: '33.333333%'
  },

  cert:{
      width: '33.3333333%',
      alignItems: 'center'
  },

  btn: {
    width: "45%",
    backgroundColor: "crimson",
    borderRadius: 25,
    height: 50,
    alignItems: "center",  
    justifyContent: "center",
    margin: 5,
    
  },
  btn2:{
      width: "46%",
      backgroundColor: "crimson",
      borderRadius: 25,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
     
      marginBottom: "0.9%",
      flexShrink: 1
    },

  btntext: {
    color: "white",
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  form2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    paddingVertical: 5
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
    width: '45%',
  },
  pickerSet:{
    width : '100%',
    flexDirection: "row",
    

  },
  InfoText: {
    width: '80%',
    flexDirection: "column",
    marginLeft: 5
  },
  txt1:{
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: "1%",
    width: '100%',
  },
  txt2:{
    width: '100%',
    paddingBottom: "0.8%",
  },
  txt3: {
    width: '100%',
    paddingBottom: "0.8%",
    
  },

  MajMinorCert:{

    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    flex: 1,
    paddingBottom: '1.3%'


  },
 
});

export default Student;