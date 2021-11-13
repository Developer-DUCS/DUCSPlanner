import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Picker, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios'
import MajorField from './MajorField';
import MinorField from './MinorField';
import CertField from './CertField';

const api = axios.create({
  baseURL: `http://localhost:3210`
})

const Student = (props) => {
  const [name, setName] = useState('John Doe');
  //const [courseCode, setCourseCode] = useState('CSGD', 'CRIM', 'INTD');
  const [courseCode, setCourseCode] = useState(['"CSGD"', '"CRIM"', '"INTD"']);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [majorFields, setMajorFields] = useState([<MajorField></MajorField>]);
  const [minorFields, setMinorFields] = useState([<MinorField></MinorField>]);
  const [certFields, setCertFields] = useState([<CertField></CertField>]);


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
          if (response.status == 200) {
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
    setMajorFields(majorFields.push(<View style={styles.form2}><MajorField></MajorField></View>));
  };

  const onMajorRemove = () => {
    majorFields.pop();
  };

  const onMinorAdd = () => {
    setMinorFields(minorFields.push(<View style={styles.form2}><MinorField></MinorField></View>));
    console.log(minorFields);
  };

  const onMinorRemove = () => {
    minorFields.pop();
  };

  const onCertAdd = () => {
    setCertFields(certFields.push(<View style={styles.form2}><CertField></CertField></View>));
  };

  const onCertRemove = () => {
    certFields.pop();
  };

  if (isLoading) {
    return (
      <View style={styles.load}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.txt1}>Welcome Back {name}!</Text>
        <Text style={styles.txt2}>Please choose your desired major, minor, or certificate options from the list below:</Text>
        <Text style={styles.txt3}>NOTE: choose at least three credentials:  one major and two certificates.  One certificate can be replaced with a second major or a minor.</Text>
      </View>
      <View style={styles.form2}>
        {majorFields}
        {minorFields}
        {certFields}
      </View>
      <View style={styles.form}>
        <TouchableOpacity style={styles.btn} onPress={onMajorAdd}>
          <Text style={styles.btntext}>Add Major</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onMinorAdd}>
          <Text style={styles.btntext}>Add Minor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onCertAdd}>
          <Text style={styles.btntext}>Add Certificate</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <TouchableOpacity style={styles.btn} onPress={onMajorRemove}>
          <Text style={styles.btntext}>Remove Major</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onMinorRemove}>
          <Text style={styles.btntext}>Remove Minor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onCertRemove}>
          <Text style={styles.btntext}>Remove Certificate</Text>
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
    paddingVertical: 0
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
});

export default Student;