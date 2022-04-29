import React, { useState } from 'react';
import { View, StyleSheet, Picker, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios'
import "react-navigation";
import "react-navigation-stack";
import { Avatar, Button, Card, Title, Paragraph, Surface, Text } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import GLOBAL from './globals';


const api = axios.create({
  baseURL: `http://localhost:3210`
})


//Lists that are used while parsing course lists
const itemsFromBackend = [];
let listItems = [];
let itemPlace = [[],[],[],[],[],[],[],[]];
let tempList = [];

//List pointers
let tempNum = 0;
let pos = 0;

//Booleans used
let fetchTry = true;
let done = false;


const PlanCreation = (props) => {
  //const [message, setMessage] = useState('');
 // const [isError, setIsError] = useState(false);

  const onSubmit = () => { 
    //console.log(sem1Class.length);
    let sem1 = [];
    let sem2 = [];
    let sem3 = [];
    let sem4 = [];
    let sem5 = [];
    let sem6 = [];
    let sem7 = [];
    let sem8 = [];
    if (sem1Class.length == 0 || sem2Class.length == 0 || sem3Class.length == 0 || sem4Class.length == 0 || sem5Class.length == 0 || sem6Class.length == 0 || sem7Class.length == 0 || sem8Class.length == 0){
     // setIsError(true);
     // setMessage('One or more semesters are empty of courses! Please provide at least one course per semester for your plan creation.');
      alert('One or more semesters are empty of courses! Please provide at least one course per semester for your plan creation.');
      return;
    }
   if (thing.sem1 == ""){
    for (let i = 0; i < sem1Class.length; i++){
     
      //sem1.push(JSON.stringify(sem1Class[i].props.class));
      sem1.push(sem1Class[i].props.class.CoursePrefix +" "+ sem1Class[i].props.class.CourseCode)
    // sem1.push(thing.sem1);
    }
   }
    else{
      sem1.push(thing.sem1);
    }
  //if (sem2Class.length != 0){
    if(thing.sem2 == ""){
    for (let i = 0; i < sem2Class.length; i++){
     // sem2.push(JSON.stringify(sem2Class[i].props.class));
     sem2.push(sem2Class[i].props.class.CoursePrefix+ " "+ sem2Class[i].class.CourseCode);
     //sem2.push(thing.sem2);
     
     console.log(sem2);
     console.log(thing.sem2);

    } 
   }
   else{
     sem2.push(thing.sem2);
   }
   if (thing.sem3 == ""){
    for (let i = 0; i < sem3Class.length; i++){
      
      //sem3.push(JSON.stringify(sem3Class[i].props.class))
      sem3.push(sem3Class[i].props.class.CoursePrefix+ " "+ sem3Class[i].props.class.CourseCode);
      //sem3.push(thing.sem3);
    }}
    else{
      sem3.push(thing.sem3);
    }
    if (thing.sem4 == ""){
    for (let i = 0; i < sem4Class.length; i++){
     
      //sem4.push(JSON.stringify(sem4Class[i].props.class))
      sem4.push(sem4Class[i].props.class.CoursePrefix+" "+sem4Class[i].props.class.CourseCode);
      //sem4.push(thing.sem4);
    }}
    else{
      sem4.push(thing.sem4);
    }
    if (thing.sem5 == ""){
    for (let i = 0; i < sem5Class.length; i++){
      
      //sem5.push(JSON.stringify(sem5Class[i].props.class))
      sem5.push(sem5Class[i].props.class.CoursePrefix+ " "+sem5Class[i].props.class.CourseCode);
      //sem5.push(thing.sem5);
    }}
    else{
      sem5.push(thing.sem5);
    }
    if (thing.sem6 == ""){
    for (let i = 0; i < sem6Class.length; i++){
      //sem6.push(JSON.stringify(sem6Class[i].props.class))
      sem6.push(sem6Class[i].props.class.CoursePrefix+" "+sem6Class[i].props.class.CourseCode);
      //sem6.push(thing.sem6);
    }}
    else{
      sem6.push(thing.sem6);
    }
    if (thing.sem7 == ""){
    for (let i = 0; i < sem7Class.length; i++){
      //sem7.push(JSON.stringify(sem7Class[i].props.class))
      sem7.push(sem7Class[i].props.class.CoursePrefix+" "+sem7Class[i].props.class.CourseCode);
      //sem7.push(thing.sem7);
    }}
    else{
      sem7.push(thing.sem7);
    }
    if (thing.sem8 == ""){
    for (let i = 0; i < sem8Class.length; i++){
      //sem8.push(JSON.stringify(sem8Class[i].props.class)) //important
      sem8.push(sem8Class[i].props.class.CoursePrefix+" "+sem8Class[i].props.class.CourseCode);
      //sem8.push(thing.sem8);
    }
  }
    else{
      sem8.push(thing.sem8);
    }
    //console.log(JSON.stringify(sem1));
    let studentPlan = [JSON.stringify({'sem1':sem1}),JSON.stringify({'sem2':sem2}),JSON.stringify({'sem3':sem3}),JSON.stringify({'sem4':sem4}),JSON.stringify({'sem5':sem5}),JSON.stringify({'sem6':sem6}), JSON.stringify({'sem7':sem7}),JSON.stringify({'sem8':sem8})]

    console.log(studentPlan);
    //let id = GLOBAL.ID;
    //console.log(id);
    api.post('api/courses/create',
    { 'ID' : GLOBAL.ID ,
     'Plan': studentPlan})
     .then(function(response){
       console.log("sent save request");
       if (response.status != 200){
         console.log("the api is messed up");
         alert('Oops! there was an issue with saving your 4-year plan');
       }
       else{
         console.log("plan saved successfully");
         alert('Plan was saved successfully');
       }
     })
  
  }

  while (fetchTry) {
    //const itemsFromBackend = [];
    //let listItems = [];
    //let itemPlace = [[],[],[],[],[],[],[],[]];

    //let tempNum = 0;
    //let pos = 0;

    //let done = false;

    let classes = GLOBAL.COURSELIST;

    let classList = classes.split(";");
    //console.log(classList);
    classList.pop();

    for (let j = 0; j < classList.length; j++) {
      itemsFromBackend.push(JSON.parse(classList[j]));
    }

    itemsFromBackend.sort(function(a,b) {return a.CourseCode - b.CourseCode});

    let listSize = Math.ceil(itemsFromBackend.length/8);

    function checkPrereqs(backList,itemList) {
      let courseList = [];
      for (let j = 0; j < itemList.length; j++) {
        for (let i = 0; i < itemList[j].length; i++) {
          courseList.push([itemList[j][i].object.CoursePrefix,itemList[j][i].object.CourseCode]);
        }
      }
      let item = 0;
      for (let k = 0; k < courseList.length; k++) {
        for (let l = 0; l < backList.length; l++) {
          if (backList[l][0] == courseList[k][0] && backList[l][1] == courseList[k][1]) {
            item = item + 1;
          }
        }
      }
      if (item == backList.length) {
        return true;
      }
      else {
        return false;
      }
    }

    function pushItem(item,num) {
      itemPlace[num].push({
        label: item.CourseName,
        value: item.CoursePrefix + " " + item.CourseCode,
        object: item
      });
    }

    while (itemsFromBackend.length > 0 && !done) {
      let temp = pos;
      if (tempNum > 7) {
        done = true;
      }
      else if (itemPlace[tempNum].length == listSize || pos == itemsFromBackend.length) {
        tempNum = tempNum + 1;
        pos = 0;
      }
      else if (tempNum % 2 == 0) {
        if (itemsFromBackend[pos].Semester == "Fall" || itemsFromBackend[pos].Semester == "Both") {
          if (tempNum == 0 && itemsFromBackend[pos].HasPrereq == "No") {
            pushItem(itemsFromBackend[pos],tempNum);
            itemsFromBackend.splice(pos, 1);
            pos = 0;
          }
          else {
            if(checkPrereqs(itemsFromBackend[pos].Prereqs,itemPlace)) {
              pushItem(itemsFromBackend[pos],tempNum);
              itemsFromBackend.splice(pos, 1);
              pos = 0;
            }
            else {
              pos = pos + 1;
            }
          }
        }
        else {
          pos = pos + 1;
        }
      }
      else {
        if (itemsFromBackend[pos].Semester == "Spring" || itemsFromBackend[pos].Semester == "Both") {
          if(checkPrereqs(itemsFromBackend[pos].Prereqs,itemPlace)) {
            pushItem(itemsFromBackend[pos],tempNum);
            itemsFromBackend.splice(pos, 1);
            pos = 0;
          }
          else {
            pos = pos + 1;
          }
        }
        else {
          pos = pos + 1;
        }
      }
    }

    for (let j = 0; j < itemsFromBackend.length; j++) {
      listItems.push({
        label: itemsFromBackend[j].CourseName,
        value: itemsFromBackend[j].CoursePrefix + " " + itemsFromBackend[j].CourseCode,
        object: {CoursePrefix: itemsFromBackend[j].CoursePrefix,
                  CourseName: itemsFromBackend[j].CourseName,
                  CourseCode: itemsFromBackend[j].CourseCode,
                  Semester: itemsFromBackend[j].Semester,
                  CreditHours: itemsFromBackend[j].CreditHours}
      });
    }

    for (let k = 0; k < itemPlace.length; k++) {
      listItems.concat(itemPlace[k]);
    }

    console.log("Made it through");
    fetchTry = false;
  }

  //Adds courses to a 2-d list
  while (fetchTry) {

    //Grab courses and put them in a list
    let classes = localStorage.getItem("fetchCourseList");
    //let classes = GLOBAL.COURSELIST;
    let classList = classes.split(";");
    classList.pop();

    //Parse all the items in the course list
    for (let j = 0; j < classList.length; j++) {
      itemsFromBackend.push(JSON.parse(classList[j]));
    }

    //Sort the list
    itemsFromBackend.sort(function(a,b) {return a.CourseCode - b.CourseCode});
    
    //Determine the maximum course amount for each semester
    let listSize = Math.ceil(itemsFromBackend.length/8);

    //Check to see if any of a courses prereqs are in any previous semesters
    function checkPrereqs(backList,itemList,num) {
      let courseList = [];
      for (let j = 0; j < num; j++) {
        for (let i = 0; i < itemList[j].length; i++) {
          courseList.push([itemList[j][i].object.CoursePrefix,itemList[j][i].object.CourseCode]);
        }
      }
      let item = 0;
      for (let k = 0; k < courseList.length; k++) {
        for (let l = 0; l < backList.length; l++) {
          if (backList[l][0] == courseList[k][0] && backList[l][1] == courseList[k][1]) {
            item = item + 1;
          }
        }
      }
      if (item == backList.length) {
        return true;
      }
      else {
        return false;
      }
    }

    //Pushes each course into the correct spot in the 2-d list
    function pushItem(item,num) {
      itemPlace[num].push({
        label: item.CourseName,
        value: item.CoursePrefix + " " + item.CourseCode,
        object: item
      });
    }

    //Go through each course to see if it can be put into a semester
    while (itemsFromBackend.length > 0 && !done) {
      //let temp = pos;
      //checks to see if the loop has gone through each list in the 2-d list 
      if (tempNum > 7) {
        done = true;
      }
      //moves to the next list in the 2-d list
      else if (itemPlace[tempNum].length == listSize || pos == itemsFromBackend.length) {
        tempNum = tempNum + 1;
        pos = 0;
      }
      //Checks to see if a course is required
      else if (itemsFromBackend[pos].Required == 'No') {
        pos = pos + 1
      }
      //Fill out fall semesters
      else if (tempNum % 2 == 0) {
        if (itemsFromBackend[pos].Semester == "Fall" || itemsFromBackend[pos].Semester == "Both") {
          if (tempNum == 0 && itemsFromBackend[pos].HasPrereq == "No") {
            pushItem(itemsFromBackend[pos],tempNum);
            itemsFromBackend.splice(pos, 1);
            pos = 0;
          }
          else {
            if(checkPrereqs(itemsFromBackend[pos].Prereqs,itemPlace,tempNum)) {
              pushItem(itemsFromBackend[pos],tempNum);
              itemsFromBackend.splice(pos, 1);
              pos = 0;
            }
            else {
              pos = pos + 1;
            }
          }
        }
        else {
          pos = pos + 1;
        }
      }
      //Fill out spring semesters
      else {
        if (itemsFromBackend[pos].Semester == "Spring" || itemsFromBackend[pos].Semester == "Both") {
          if(checkPrereqs(itemsFromBackend[pos].Prereqs,itemPlace,tempNum)) {
            pushItem(itemsFromBackend[pos],tempNum);
            itemsFromBackend.splice(pos, 1);
            pos = 0;
          }
          else {
            pos = pos + 1;
          }
        }
        else {
          pos = pos + 1;
        }
      }
    }

    for (let j = 0; j < itemsFromBackend.length; j++) {
      listItems.push({
        label: itemsFromBackend[j].CourseName,
        value: itemsFromBackend[j].CoursePrefix + " " + itemsFromBackend[j].CourseCode,
        object: {CoursePrefix: itemsFromBackend[j].CoursePrefix,
                  CourseName: itemsFromBackend[j].CourseName,
                  CourseCode: itemsFromBackend[j].CourseCode,
                  Semester: itemsFromBackend[j].Semester,
                  CreditHours: itemsFromBackend[j].CreditHours}
      });
    }

    for (let k = 0; k < itemPlace.length; k++) {
      listItems.concat(itemPlace[k]);
    }

    tempList = JSON.parse(JSON.stringify(itemPlace));

    console.log(listItems);
    console.log(itemPlace);
    console.log(tempList);

    console.log("Made it through");
    fetchTry = false;
  }

  const [sem1Class, setSem1Class] = useState([]);
  const [sem2Class, setSem2Class] = useState([]);
  const [sem3Class, setSem3Class] = useState([]);
  const [sem4Class, setSem4Class] = useState([]);
  const [sem5Class, setSem5Class] = useState([]);
  const [sem6Class, setSem6Class] = useState([]);
  const [sem7Class, setSem7Class] = useState([]);
  const [sem8Class, setSem8Class] = useState([]);

  if(itemPlace[0].length > 0) {

    let val = itemPlace[0][0].value;
    setSem1Class([...sem1Class,
      <Surface style={styles.surface} nativeID={val} class={itemPlace[0][0].object} hide>
        <Text style={styles.surfacetext}>{val}</Text>

      </Surface>
    ]);
    console.log(itemPlace[0]);
    itemPlace[0].splice(0, 1);
  }

  if(itemPlace[1].length > 0) {
    setSem2Class([...sem2Class,

      <Surface style={styles.surface} class={itemPlace[1][0].object}>

        <Text style={styles.surfacetext}>{itemPlace[1][0].value}</Text>
      </Surface>
    ]);
    itemPlace[1].splice(0, 1);
  }

  if(itemPlace[2].length > 0) {
    setSem3Class([...sem3Class,

      <Surface style={styles.surface} class={itemPlace[2][0].object}>

        <Text style={styles.surfacetext}>{itemPlace[2][0].value}</Text>
      </Surface>
    ]);
    itemPlace[2].splice(0, 1);
  }

  if(itemPlace[3].length > 0) {
    setSem4Class([...sem4Class,

      <Surface style={styles.surface} class={itemPlace[3][0].object}>

        <Text style={styles.surfacetext}>{itemPlace[3][0].value}</Text>
      </Surface>
    ]);
    itemPlace[3].splice(0, 1);
  }

  if(itemPlace[4].length > 0) {
    setSem5Class([...sem5Class,

      <Surface style={styles.surface}>

        <Text style={styles.surfacetext}>{itemPlace[4][0].value}</Text>
      </Surface>
    ]);
    itemPlace[4].splice(0, 1);
  }

  if(itemPlace[5].length > 0) {
    setSem6Class([...sem6Class,

      <Surface style={styles.surface}>

        <Text style={styles.surfacetext}>{itemPlace[5][0].value}</Text>
      </Surface>
    ]);
    itemPlace[5].splice(0, 1);
  }

  if(itemPlace[6].length > 0) {
    setSem7Class([...sem7Class,

      <Surface style={styles.surface}>

        <Text style={styles.surfacetext}>{itemPlace[6][0].value}</Text>
      </Surface>
    ]);
    itemPlace[6].splice(0, 1);
  }

  if(itemPlace[7].length > 0) {
    setSem8Class([...sem8Class,

      <Surface style={styles.surface}>

        <Text style={styles.surfacetext}>{itemPlace[7][0].value}</Text>
      </Surface>
    ]);
    itemPlace[7].splice(0, 1);
  }

  const { control, setFocus, watch } = useForm({
    defaultValues: {
      sem1: '',
      sem2: '',
      sem3: '',
      sem4: '',
      sem5: '',
      sem6: '',
      sem7: '',
      sem8: ''
    },
    mode: 'onChange',
  });
  const thing = watch();
  console.log(thing);

  if (sem1Class.length > 0){
    console.log(sem1Class[0].props.class);
  }


  let addClassesSem1 = () => {
    setSem1Class([...sem1Class,
    <Surface style={styles.surface} >
      <Text style={styles.surfacetext}>{thing.sem1}</Text>
    </Surface>
    ]);
  }
  let addClassesSem2 = () => {
    setSem2Class([...sem2Class,
    <Surface style={styles.surface}>
      <Text style={styles.surfacetext}>{thing.sem2}</Text>
    </Surface>
    ]);
  }
  let addClassesSem3 = () => {
    setSem3Class([...sem3Class,
    <Surface style={styles.surface}>
      <Text style={styles.surfacetext}>{thing.sem3}</Text>
    </Surface>
    ]);
  }
  let addClassesSem4 = () => {
    setSem4Class([...sem4Class,
    <Surface style={styles.surface}>
      <Text style={styles.surfacetext}>{thing.sem4}</Text>
    </Surface>
    ]);
  }
  let addClassesSem5 = () => {
    setSem5Class([...sem5Class,
    <Surface style={styles.surface}>
      <Text style={styles.surfacetext}>{thing.sem5}</Text>
    </Surface>
    ]);
  }
  let addClassesSem6 = () => {
    setSem6Class([...sem6Class,
    <Surface style={styles.surface}>
      <Text style={styles.surfacetext}>{thing.sem6}</Text>
    </Surface>
    ]);
  }
  let addClassesSem7 = () => {
    setSem7Class([...sem7Class,
    <Surface style={styles.surface}>
      <Text style={styles.surfacetext}>{thing.sem7}</Text>
    </Surface>
    ]);
  }
  let addClassesSem8 = () => {
    setSem8Class([...sem8Class,
    <Surface style={styles.surface}>
      <Text style={styles.surfacetext}>{thing.sem8}</Text>
    </Surface>
    ]);
  }


  //control.sem1 = tempList[0];
  //addClassesSem1();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Card style={styles.card}>
            <Card.Title title="Freshman Fall Semester" />
            <Card.Content>
              <FormBuilder
                control={control}
                setFocus={setFocus}
                formConfigArray={[
                  {
                    name: 'sem1',
                    type: 'select',
                    textInputProps: {
                      label: 'Class',
                    },
                    options: listItems,
                  }
                ]}
              />
              <Button style={styles.btn} onPress={() => addClassesSem1()} uppercase={false}>
                <Text style={styles.btntxt}>Add Selected Class</Text>
              </Button>
              <View>
                {sem1Class}
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Title style={styles.cardtxt} title="Freshman Spring Semester" />
            <Card.Content>
              <FormBuilder
                style={styles.form}
                control={control}
                setFocus={setFocus}
                formConfigArray={[
                  {
                    name: 'sem2',
                    type: 'select',
                    textInputProps: {
                      label: 'Class',
                    },
                    options: listItems,
                  }
                ]}
              />
              <Button style={styles.btn} onPress={() => addClassesSem2()} uppercase={false}>
                <Text style={styles.btntxt}>Add Selected Class</Text>
              </Button>
              <View>
                {sem2Class}
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Title title="Sophomore Fall Semester" />
            <Card.Content>
              <FormBuilder
                control={control}
                setFocus={setFocus}
                formConfigArray={[
                  {
                    name: 'sem3',
                    type: 'select',
                    textInputProps: {
                      label: 'Class',
                    },
                    options: listItems,
                  }
                ]}
              />
              <Button style={styles.btn} onPress={() => addClassesSem3()} uppercase={false}>
                <Text style={styles.btntxt}>Add Selected Class</Text>
              </Button>
              <View>
                {sem3Class}
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Title title="Sophomore Spring Semester" />
            <Card.Content>
              <FormBuilder
                control={control}
                setFocus={setFocus}
                formConfigArray={[
                  {
                    name: 'sem4',
                    type: 'select',
                    textInputProps: {
                      label: 'Class',
                    },
                    options: listItems,
                  }
                ]}
              />
              <Button style={styles.btn} onPress={() => addClassesSem4()} uppercase={false}>
                <Text style={styles.btntxt}>Add Selected Class</Text>
              </Button>
              <View>
                {sem4Class}
              </View>
            </Card.Content>
          </Card>
        </View>
        <View style={styles.row}>
          <Card style={styles.card}>
            <Card.Title title="Junior Fall Semester" />
            <Card.Content>
              <FormBuilder
                control={control}
                setFocus={setFocus}
                formConfigArray={[
                  {
                    name: 'sem5',
                    type: 'select',
                    textInputProps: {
                      label: 'Class',
                    },
                    options: listItems,
                  }
                ]}
              />
              <Button style={styles.btn} onPress={() => addClassesSem5()} uppercase={false}>
                <Text style={styles.btntxt}>Add Selected Class</Text>
              </Button>
              <View>
                {sem5Class}
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Title style={styles.cardtxt} title="Junior Spring Semester" />
            <Card.Content>
              <FormBuilder
                control={control}
                setFocus={setFocus}
                formConfigArray={[
                  {
                    name: 'sem6',
                    type: 'select',
                    textInputProps: {
                      label: 'Class',
                    },
                    options: listItems,
                  }
                ]}
              />
              <Button style={styles.btn} onPress={() => addClassesSem6()} uppercase={false}>
                <Text style={styles.btntxt}>Add Selected Class</Text>
              </Button>
              <View>
                {sem6Class}
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Title title="Senior Fall Semester" />
            <Card.Content>
              <FormBuilder
                control={control}
                setFocus={setFocus}
                formConfigArray={[
                  {
                    name: 'sem7',
                    type: 'select',
                    textInputProps: {
                      label: 'Class',
                    },
                    options: listItems,
                  }
                ]}
              />
              <Button style={styles.btn} onPress={() => addClassesSem7()} uppercase={false}>
                <Text style={styles.btntxt}>Add Selected Class</Text>
              </Button>
              <View>
                {sem7Class}
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Title title="Senior Spring Semester" />
            <Card.Content>
              <FormBuilder
                control={control}
                setFocus={setFocus}
                formConfigArray={[
                  {
                    name: 'sem8',
                    type: 'select',
                    textInputProps: {
                      label: 'Class',
                    },
                    options: listItems,
                  }
                ]}
              />
              <Button style={styles.btn} onPress={() => addClassesSem8()} uppercase={false}>
                <Text style={styles.btntxt}>Add Selected Class</Text>
              </Button>
              <View>
                {sem8Class}
              </View>
            </Card.Content>
          </Card>
        </View>
        <View>
          <Button style={styles.btnSubmit} uppercase={false} onPress={() => onSubmit()} >
            <Text style={styles.btntxtSub}>Submit</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: 'crimson',
    width: '23%',
    margin: '10px',
    height: '100%',
    marginTop: '20px'
  },
  cardtxt: {
    color: 'rgba(255, 255, 255, 1.0)'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%',
    marginBottom: '20px'
  },
  surface: {
    marginTop: '10px',
    height: "40px",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 5
  },
  surfacetext: {
    color: 'black'
  },
  btn: {
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btntxt: {
    color: "black",
    fontWeight: 'bold',
  },
  field: {
    color: 'white'
  },
  btnSubmit: {
    backgroundColor: "crimson",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '20px',
    marginBottom: '20px',
  },
  btntxtSub: {
    color: "white",
    fontWeight: 'bold',
  },
});

export default PlanCreation;