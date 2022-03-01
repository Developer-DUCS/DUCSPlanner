import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, ScrollViewComponent, FlatList } from 'react-native';
import { createAppContainer, SafeAreaView } from "react-navigation";
import { CardStyleInterpolators, createStackNavigator } from "react-navigation-stack";
import { Button, Surface, icon } from 'react-native-paper';

import axios from 'axios'
import { render } from 'react-dom';

const api = axios.create({
  baseURL: `http://localhost:3210`
})

const Student = (props) => {
  
  let CredentialList = [];
  let courseCode = [];
  let newCourses = [];
  let name = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [formValuesMajor, setFormValuesMajor] = useState([{}])
  const [formValuesMinor, setFormValuesMinor] = useState([{}])
  const [formValuesCert, setFormValuesCert] = useState([{}])
  //function to run once student page is opened to grab all drury credentials and put them in the drop down
  useEffect(() => {
    console.log('im in the effect')
    let credentialListener = () => {   
      console.log("I've hit the load event");
      setIsLoading(true);
      api.post('api/courses/providingCredentials', {
        'CredentialList' : CredentialList,})
      .then(function (response)
      {
        if (response.status != 200) {
          setIsError(true);
        }
        else {
          if (response.status == 200) {
            setTimeout(() => { setIsLoading(false); }, 3000);
            //console.log(response);
            //console.log(response.data);
            //console.log(response.data.Credentials[0]);
            //console.log(JSON.stringify(response.data));
            for (let x = 0; x < response.data.Credentials.length; x++) {
              console.log(x)
              console.log(response.data.Credentials[x]);
              //CredentialList.push(response.data.Credentials[x]);
              CredentialList = CredentialList + JSON.stringify(response.data.Credentials[x]) + ";";
              //courseList = courseList + JSON.stringify(response.data.Courses[x]) + ";";
            }
            console.log(CredentialList);
            localStorage.setItem("Credentials", CredentialList);//placed it in local storage will need a session solution instead eventually
            //return(CredentialList);
          }
          //return(CredentialList);
        }
      })
  //.catch(error)
  };
  //credentialListener() //test statment to see if the api functions correctly
  //console.log(CredentialList)
  },[]); //the empty array is so that the useEffect runs only once, probably bad code :( but couldn't get event listeners to work.


  //testing way to create new dropdown






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
  //experimenting with creating dynamic dropdown componenet
  /*const CredentialArray = () => {
    let CredsToUse = localStorage.getItem("Credentials");
    let newCreds = CredsToUse.split(";");
    let stuff =[]
    newCreds.pop();
    console.log(newCreds);
   for (let j = 0; j < newCreds.length; j++){
    stuff.push (JSON.parse(newCreds[j]));
    }
   console.log(stuff);
  
    console.log(newCreds);
    const data = {stuff};
    console.log(data.stuff[1])
  
    return (
      <div className = "Creds">
        {data.stuff.map((disciplines) => (
        <div key = {disciplines} className="user">{disciplines} </div>))}
      </div>
    )
  
  }*/
  

  return (

    <View style={styles.container}>
      <View>
        <Text style={styles.txt1}>Welcome back {name}!</Text>
        <Text style={styles.txt2}>Please choose your desired major, minor, or certificate options from the list below:</Text>
        <Text style={styles.txt3}>NOTE: choose at least three credentials:  one major and two certificates.  One certificate can be replaced with a second major or a minor. You must also have one credential in the "Professional" category and one credential in the "Life" category.</Text>
      </View>
      <View style={styles.form2}>
        <form>
          {formValuesMajor.map((element, index) => (
            <div className="form-inline" key={index}>
              <select name="major" id="major" onChange={e => handleMajorChange(index, e)}>
                <option value="">Please select a major</option>
                <optgroup label="Professional">
                  <option value="3,P">Computer Science: Game Development</option>
                  <option value="1,P">Computer Science: Software Engineering</option>
                </optgroup>
                <optgroup label="Life">
                  <option value="4,L">Mathematics</option>
                  <option value="5,L">Criminology</option>
                  <option value="6,L">English</option>
                </optgroup>
              </select>
            </div>
          ))}
        </form>
        <form>
          {formValuesMinor.map((element, index) => (
            <div className="form-inline" key={index}>
              <select name="minor" id="minor" onChange={e => handleMinorChange(index, e)}>
                <option value="">Please select a minor</option>
                <optgroup label="Professional">
                  <option value="">Not Valid Animation</option>
                </optgroup>
                <optgroup label="Life">
                  <option value="10,L">Computer Science</option>
                  <option value="">Not Valid Criminology</option>
                  <option value="">Not Valid English</option>
                </optgroup>
              </select>
            </div>
          ))}
        </form>
        <form>
          {formValuesCert.map((element, index) => (
            <div className="form-inline" key={index}>
              <select name="cert" id="cert" onChange={e => handleCertChange(index, e)}>
                <option value="">Please select a certificate</option>
                <optgroup label="Professional">
                  <option value="7,P">Interactive Design</option>
                </optgroup>
                <optgroup label="Life">
                  <option value="8,L">International Immersion</option>
                  <option value="9,L">Ancients Alive: The Classics in Context</option>
                </optgroup>
              </select>
            </div>
          ))}
        </form>
      </View>
      <View style={styles.form}>
        <Button style={styles.btn} onPress={() => addMajorFormFields()} uppercase={false}>
          <Text style={styles.btntext}>Add Major</Text>
        </Button>
        <Button style={styles.btn} onPress={() => addMinorFormFields()} uppercase={false}>
          <Text style={styles.btntext}>Add Minor</Text>
        </Button>
        <Button style={styles.btn} onPress={() => addCertFormFields()} uppercase={false}>
          <Text style={styles.btntext}>Add Certificate</Text>
        </Button>

      </View>
      <View style={styles.form}>
        <Button style={styles.btn} onPress={(index) => removeFormFieldsMajor(index)} uppercase={false}>
          <Text style={styles.btntext}>Remove Major</Text>
        </Button>
        <Button style={styles.btn} onPress={(index) => removeFormFieldsMinor(index)} uppercase={false}>
          <Text style={styles.btntext}>Remove Minor</Text>
        </Button>
        <Button style={styles.btn} onPress={(index) => removeFormFieldsCert(index)} uppercase={false}>
          <Text style={styles.btntext}>Remove Certificate</Text>
        </Button>
      </View>
      <View style={styles.centered}>
        <Text style={[styles.message, { color: isError ? 'red' : '#F5F5F5' }]}>{message}</Text>
        <Button onPress={() => onSubmitHandler()} style={styles.btn} uppercase={false}>
          <Text style={styles.btntext}>Submit</Text>
        </Button>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#F5F5F5',
    width: '100%',
    aspectRatio: 10 / 8,
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
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingVertical: 0,
    width: '100%'
  },
  btn: {
    width: "20%",
    backgroundColor: "crimson",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  btntext: {
    color: "white",
    fontWeight: 'bold',
  },
  form2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 150,
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
  txt1: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: "1%",
  },
  txt2: {
    width: '70%',
    paddingBottom: "0.8%",
  },
  txt3: {
    width: '70%',
    paddingBottom: "0.8%",
  }
});

export default Student;