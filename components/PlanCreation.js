import React, { useState } from 'react';
import { View, StyleSheet, Picker, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios'
import { Avatar, Button, Card, Title, Paragraph, Surface, Text } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';

const itemsFromBackend = [];
let listItems = [];

let classes = localStorage.getItem("fetchCourseList");

let classList = classes.split(";");
console.log(classList);
classList.pop();

for (let j = 0; j < classList.length; j++) {
  itemsFromBackend.push(JSON.parse(classList[j]));
}

itemsFromBackend.sort(function(a,b) {return a.CourseCode - b.CourseCode});

for (let j = 0; j < itemsFromBackend.length; j++) {
  listItems.push({
      label: itemsFromBackend[j].CourseName,
      value: itemsFromBackend[j].CoursePrefix + itemsFromBackend[j].CourseCode
  });
}

let tempList = listItems

//let listSize = Math.ceil(itemsFromBackend.length/8);

const PlanCreation = (props) => {

  const [sem1Class, setSem1Class] = useState([]);
  const [sem2Class, setSem2Class] = useState([]);
  const [sem3Class, setSem3Class] = useState([]);
  const [sem4Class, setSem4Class] = useState([]);
  const [sem5Class, setSem5Class] = useState([]);
  const [sem6Class, setSem6Class] = useState([]);
  const [sem7Class, setSem7Class] = useState([]);
  const [sem8Class, setSem8Class] = useState([]);

  if(tempList.length > 0) {
    setSem1Class([...sem1Class,
      <Surface style={styles.surface}>
        <Text style={styles.surfacetext}>{tempList[0]}</Text>
      </Surface>
    ]);

    tempList.pop();
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

  let addClassesSem1 = () => {
    setSem1Class([...sem1Class,
    <Surface style={styles.surface}>
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
            <Card.Title title="Freshman Fall Semester" />
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
            <Card.Title style={styles.cardtxt} title="Freshman Spring Semester" />
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
            <Card.Title title="Sophomore Fall Semester" />
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
            <Card.Title title="Sophomore Spring Semester" />
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
          <Button style={styles.btnSubmit} uppercase={false}>
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