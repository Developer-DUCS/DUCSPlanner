import React, { useState,userEffect, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, ScrollViewComponent, FlatList } from 'react-native';
import axios from 'axios'
import "react-navigation";
import "react-navigation-stack";
import { Avatar, Button, Card, Title, Paragraph, Surface, Text } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import GLOBAL from './globals';

const PlanViewing = (props) => {
    

    let SemesterList = GLOBAL.PLANCOURSESLIST;
    //console.log(SemesterList);
      const [sem1Class, setSem1Class] = useState([]);
      const [sem2Class, setSem2Class] = useState([]);
      const [sem3Class, setSem3Class] = useState([]);
      const [sem4Class, setSem4Class] = useState([]);
      const [sem5Class, setSem5Class] = useState([]);
      const [sem6Class, setSem6Class] = useState([]);
      const [sem7Class, setSem7Class] = useState([]);
      const [sem8Class, setSem8Class] = useState([]);
    
      if(SemesterList[0].length > 0) {
        setSem1Class([...sem1Class,
          <Surface style={styles.surface} class={SemesterList[0][0]}> 
            <Text style={styles.surfacetext}>{SemesterList[0][0]}</Text>
          </Surface>
        ]);

        //console.log(SemesterList[0]);
        SemesterList[0].splice(0, 1);
      }
    
       if(SemesterList[1].length > 0) {
        setSem2Class([...sem2Class,
          <Surface style={styles.surface}class={SemesterList[1][0]}>
            <Text style={styles.surfacetext}>{SemesterList[1][0]}</Text>
          </Surface>
        ]);
        SemesterList[1].splice(0, 1);
      }
      else{
          console.log('no course name');
      } 
    
      if(SemesterList[2].length > 0) {
        setSem3Class([...sem3Class,
          <Surface style={styles.surface}class={SemesterList[2][0]}>
            <Text style={styles.surfacetext}>{SemesterList[2][0]}</Text>
          </Surface>
        ]);
        SemesterList[2].splice(0, 1);
      }
    
      if(SemesterList[3].length > 0) {
        setSem4Class([...sem4Class,
          <Surface style={styles.surface}class={SemesterList[3][0]}>
            <Text style={styles.surfacetext}>{SemesterList[3][0]}</Text>
          </Surface>
        ]);
        SemesterList[3].splice(0, 1);
      }
    
      if(SemesterList[4].length > 0) {
        setSem5Class([...sem5Class,
          <Surface style={styles.surface}class={SemesterList[4][0]}>
            <Text style={styles.surfacetext}>{SemesterList[4][0]}</Text>
          </Surface>
        ]);
        SemesterList[4].splice(0, 1);
      }
    
      if(SemesterList[5].length > 0) {
        setSem6Class([...sem6Class,
          <Surface style={styles.surface}class={SemesterList[5][0]}>
            <Text style={styles.surfacetext}>{SemesterList[5][0]}</Text>
          </Surface>
        ]);
        SemesterList[5].splice(0, 1);
      }
    
      if(SemesterList[6].length > 0) {
        setSem7Class([...sem7Class,
          <Surface style={styles.surface}class={SemesterList[6][0]}>
            <Text style={styles.surfacetext}>{SemesterList[6][0]}</Text>
          </Surface>
        ]);
        SemesterList[6].splice(0, 1);
      }
    
      if(SemesterList[7].length > 0) {
        setSem8Class([...sem8Class,
          <Surface style={styles.surface}class={SemesterList[7][0]}>
            <Text style={styles.surfacetext}>{SemesterList[7][0]}</Text>
          </Surface>
        ]);
        SemesterList[7].splice(0, 1);
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
      //console.log(thing);
      //console.log(sem1Class);
    
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
                  <View>
                    {sem1Class}
                  </View>
                </Card.Content>
              </Card>
              <Card style={styles.card}>
                <Card.Title style={styles.cardtxt} title="Freshman Spring Semester" />
                <Card.Content>
                  <View>
                    {sem2Class}
                  </View>
                </Card.Content>
              </Card>
              <Card style={styles.card}>
                <Card.Title title="Sophomore Fall Semester" />
                <Card.Content>
                  <View>
                    {sem3Class}
                  </View>
                </Card.Content>
              </Card>
              <Card style={styles.card}>
                <Card.Title title="Sophomore Spring Semester" />
                <Card.Content>
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
                  <View>
                    {sem5Class}
                  </View>
                </Card.Content>
              </Card>
              <Card style={styles.card}>
                <Card.Title style={styles.cardtxt} title="Junior Spring Semester" />
                <Card.Content>
                  <View>
                    {sem6Class}
                  </View>
                </Card.Content>
              </Card>
              <Card style={styles.card}>
                <Card.Title title="Senior Fall Semester" />
                <Card.Content>
                  <View>
                    {sem7Class}
                  </View>
                </Card.Content>
              </Card>
              <Card style={styles.card}>
                <Card.Title title="Senior Spring Semester" />
                <Card.Content>
                  <View>
                    {sem8Class}
                  </View>
                </Card.Content>
              </Card>
            </View>
            <View>
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
    
    export default PlanViewing;

