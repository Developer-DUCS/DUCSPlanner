import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Picker, ScrollView, ActivityIndicator } from 'react-native'
import { FormBuilder } from 'react-native-paper-form-builder';
import { Text, Stack, Wrap, Button, Paper, Surface } from "@react-native-material/core";
import axios from 'axios'
import GLOBAL from 'globals';
import { useForm } from 'react-hook-form';

const api = axios.create({
    baseURL: `http://localhost:3210`
})

const stuCopy = (props) => {

    const { control, setFocus, watch } = useForm({
        defaultValues: {
            majorForm: '',
            minorForm: '',
            certForm: ''
        },
        mode: 'onChange',
    });

    const thing = watch();
    console.log(thing);

    let CredentialList = [];
    let courseCode = [];
    let newCourses = [];

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [formValuesMajor, setFormValuesMajor] = useState([{}])
    const [formValuesMinor, setFormValuesMinor] = useState([{}])
    const [formValuesCert, setFormValuesCert] = useState([{}])

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

    const onSubmitHandler = () => {
        setIsLoading(true);
        //check validity of fields
        console.log(formValuesMajor);
        if (!thing.certForm && !thing.majorForm && !thing.minorForm) {
            setTimeout(() => { setIsLoading(false); }, 1000);
            setIsError(true);
            return;
        }
        else {
            let pros = 0;
            let life = 0;
            console.log("this is the else");
            //make coursecode list
            let majorCode = thing.majorForm.split(",")
            if (majorCode[1] == 'P') {
                pros = pros + 1;
            }
            else {
                life = life + 1
            }
            newCourses.push(majorCode[0]);
            let minorCode = thing.minorForm.split(",")
            if (minorCode[1] == 'P') {
                pros = pros + 1;
            }
            else {
                life = life + 1
            }
            newCourses.push(minorCode[0]);
            let certCode = thing.majorForm.split(",")
            if (certCode[1] == 'P') {
                pros = pros + 1;
            }
            else {
                life = life + 1
            }
            newCourses.push(certCode[0]);
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
        console.log("Hitting API");
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
                        //localStorage.setItem("fetchCourseList", courseList);
                        GLOBAL.COURSELIST = courseList;
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

    return (
        < ScrollView >
            <Stack m={6} spacing={5}>
                <View>
                    <Text style={styles.txt1}>Welcome back</Text>
                    <Text style={styles.txt2}>Please choose your desired major, minor, or certificate options from the list below:</Text>
                    <Text style={styles.txt3}>NOTE: choose at least three credentials:  one major and two certificates.  One certificate can be replaced with a second major or a minor. You must also have one credential in the "Professional" category and one credential in the "Life" category.</Text>
                </View>

                <Surface elevation={8}
                    category="large"
                    spacing={5}
                    style={{ width: "85%", alignSelf: 'center' }}

                >
                    {formValuesMajor.map((element, index) => (
                        <FormBuilder

                            control={control}
                            setFocus={setFocus}
                            formConfigArray={[
                                {
                                    name: 'majorForm',
                                    type: 'select',
                                    textInputProps: {
                                        label: 'Major',
                                    },
                                    options: [
                                        {
                                            label: "Art History",
                                            value: "1,L",
                                        },
                                        {
                                            label: "Biochemistry",
                                            value: "2,L",
                                        },
                                        {
                                            label: "Biology (BA)",
                                            value: "3,L",
                                        },
                                        {
                                            label: "Biology (BS)",
                                            value: "4,L",
                                        },
                                        {
                                            label: "Chemistry",
                                            value: "5,L",
                                        },
                                        {
                                            label: "Clinical and Behavioral Neuroscience",
                                            value: "6,L",
                                        },
                                        {
                                            label: "Criminology",
                                            value: "7,L",
                                        },
                                        {
                                            label: "Economics",
                                            value: "8,L",
                                        },
                                        {
                                            label: "English",
                                            value: "9,L",
                                        },
                                        {
                                            label: "Environmental Biology",
                                            value: "10,L",
                                        },
                                        {
                                            label: "Exercise Physiology",
                                            value: "11,L",
                                        },
                                        {
                                            label: "Fine Arts",
                                            value: "12,L",
                                        },
                                        {
                                            label: "French",
                                            value: "13,L",
                                        },
                                        {
                                            label: "History",
                                            value: "14,L",
                                        },
                                        {
                                            label: "Mathematics",
                                            value: "15,L",
                                        },
                                        {
                                            label: "Mathematics Education",
                                            value: "16,L",
                                        },
                                        {
                                            label: "Music and Music Education",
                                            value: "17,L",
                                        },
                                        {
                                            label: "Philosophy and Religion",
                                            value: "18,L",
                                        },
                                        {
                                            label: "Physics",
                                            value: "19,L",
                                        },
                                        {
                                            label: "Political Science",
                                            value: "20,L",
                                        },
                                        {
                                            label: "Psychology",
                                            value: "21,L",
                                        },
                                        {
                                            label: "Sociology",
                                            value: "22,L",
                                        },
                                        {
                                            label: "Spanish",
                                            value: "23,L",
                                        },
                                        {
                                            label: "Theatre",
                                            value: "24,L",
                                        },
                                        {
                                            label: "Writing",
                                            value: "25,L",
                                        },
                                        {
                                            label: "Accounting",
                                            value: "1,P",
                                        },
                                        {
                                            label: "Animation",
                                            value: "2,P",
                                        },
                                        {
                                            label: "Architectural Studies",
                                            value: "3,P",
                                        },
                                        {
                                            label: "Architecture",
                                            value: "4,P",
                                        },
                                        {
                                            label: "Arts Administration",
                                            value: "5,P",
                                        },
                                        {
                                            label: "Computer Science: Game Development",
                                            value: "6,P",
                                        },
                                        {
                                            label: "Computer Science: Software Engineering",
                                            value: "7,P",
                                        },
                                        {
                                            label: "Cyber-risk Management",
                                            value: "8,P",
                                        },
                                        {
                                            label: "Digital Media",
                                            value: "9,P",
                                        },
                                        {
                                            label: "Elementary Education",
                                            value: "10,P",
                                        },
                                        {
                                            label: "Finance",
                                            value: "11,P",
                                        },
                                        {
                                            label: "Graphic and Digital Design",
                                            value: "12,P",
                                        },
                                        {
                                            label: "Health Science",
                                            value: "13,P",
                                        },
                                        {
                                            label: "Management",
                                            value: "14,P",
                                        },
                                        {
                                            label: "Marketing",
                                            value: "15,P",
                                        },
                                        {
                                            label: "Medical Technology",
                                            value: "16,P",
                                        },
                                        {
                                            label: "Middle School Language Arts Education",
                                            value: "17,P",
                                        },
                                        {
                                            label: "Middle School Mathematics Education",
                                            value: "18,P",
                                        },
                                        {
                                            label: "Middle School Science Education",
                                            value: "19,P",
                                        },
                                        {
                                            label: "Middle School Social Science Education",
                                            value: "20,P",
                                        },
                                        {
                                            label: "Multimedia Production and Journalism",
                                            value: "21,P",
                                        },
                                        {
                                            label: "Music Therapy",
                                            value: "22,P",
                                        },
                                        {
                                            label: "Organizational and Leadership Communication",
                                            value: "23,P",
                                        },
                                        {
                                            label: "Pre-Ministry and Community Engagement",
                                            value: "24,P",
                                        },
                                        {
                                            label: "Secondary Education",
                                            value: "25,P",
                                        },
                                        {
                                            label: "Strategic Communication",
                                            value: "26,P",
                                        }
                                    ],
                                }
                            ]}
                        />
                    ))}
                    <Button onPress={() => addMajorFormFields()} variant="outlined" color='white' title="Add Major" style={styles.majorButton} />
                    <Button onPress={(index) => removeFormFieldsMajor(index)} variant="outlined" color='white' title="Remove Major" style={styles.remButton} />
                </Surface>

                <Surface elevation={8}
                    category="large"
                    spacing={5}
                    style={{ width: "85%", alignSelf: 'center' }}
                >

                    {formValuesMinor.map((element, index) => (
                        <FormBuilder

                            control={control}
                            setFocus={setFocus}
                            formConfigArray={[
                                {
                                    name: 'minorForm',
                                    type: 'select',
                                    textInputProps: {
                                        label: 'Minor',
                                    },
                                    options: [
                                        {
                                            label: "Animal Studies",
                                            value: "26,L",
                                        },
                                        {
                                            label: "Art History",
                                            value: "27,L",
                                        },
                                        {
                                            label: "Asian Studies",
                                            value: "28,L",
                                        },
                                        {
                                            label: "Behavioral Neuroscience",
                                            value: "29,L",
                                        },
                                        {
                                            label: "Biology",
                                            value: "30,L",
                                        },
                                        {
                                            label: "Chemistry",
                                            value: "31,L",
                                        },
                                        {
                                            label: "Communication",
                                            value: "32,L",
                                        },
                                        {
                                            label: "Computer Science",
                                            value: "33,L",
                                        },
                                        {
                                            label: "Criminology",
                                            value: "34,L",
                                        },
                                        {
                                            label: "English",
                                            value: "35,L",
                                        },
                                        {
                                            label: "Environmental Sustainability",
                                            value: "36,L",
                                        },
                                        {
                                            label: "Exercise Physiology",
                                            value: "37,L",
                                        },
                                        {
                                            label: "Fine Arts",
                                            value: "38,L",
                                        },
                                        {
                                            label: "French",
                                            value: "39,L",
                                        },
                                        {
                                            label: "Global and Transnational Studies",
                                            value: "40,L",
                                        },
                                        {
                                            label: "History",
                                            value: "41,L",
                                        },
                                        {
                                            label: "Law and Society",
                                            value: "42,L",
                                        },
                                        {
                                            label: "Mathematics",
                                            value: "43,L",
                                        },
                                        {
                                            label: "Medieval and Renaissance Studies",
                                            value: "44,L",
                                        },
                                        {
                                            label: "Middle East Studies",
                                            value: "45,L",
                                        },
                                        {
                                            label: "Music",
                                            value: "46,L",
                                        },
                                        {
                                            label: "Physics",
                                            value: "47,L",
                                        },
                                        {
                                            label: "Philosophy and Religion",
                                            value: "48,L",
                                        },
                                        {
                                            label: "Political Science",
                                            value: "49,L",
                                        },
                                        {
                                            label: "Psychology",
                                            value: "50,L",
                                        },
                                        {
                                            label: "Sociology",
                                            value: "51,L",
                                        },
                                        {
                                            label: "Spanish",
                                            value: "52,L",
                                        },
                                        {
                                            label: "Theatre",
                                            value: "53,L",
                                        },
                                        {
                                            label: "Women and Gender Studies",
                                            value: "54,L",
                                        },
                                        {
                                            label: "Writing",
                                            value: "55,L",
                                        },
                                        {
                                            label: "Actuarial Science & Risk Management",
                                            value: "27,P",
                                        },
                                        {
                                            label: "Animation",
                                            value: "28,P",
                                        },
                                        {
                                            label: "Architecture and Design",
                                            value: "29,P",
                                        },
                                        {
                                            label: "Business Administration",
                                            value: "30,P",
                                        },
                                        {
                                            label: "Business and Entrepreneurship",
                                            value: "31,P",
                                        },
                                        {
                                            label: "Cyber-risk Management",
                                            value: "32,P",
                                        },
                                        {
                                            label: "Design in Society",
                                            value: "33,P",
                                        },
                                        {
                                            label: "Graphic & Digital Design",
                                            value: "34,P",
                                        },
                                        {
                                            label: "Health Science",
                                            value: "35,P",
                                        },
                                        {
                                            label: "Pre-Engineering",
                                            value: "36,P",
                                        },
                                        {
                                            label: "Pre-Ministry and Community Engagement",
                                            value: "37,P",
                                        },
                                        {
                                            label: "Special Education",
                                            value: "38,P",
                                        },
                                        {
                                            label: "Web Communication and Design",
                                            value: "39,P",
                                        },
                                    ],
                                }
                            ]}
                        />
                    ))}

                    <Button onPress={() => addMinorFormFields()} variant="outlined" color='white' title="Add Minor" style={styles.minorButton} />
                    <Button onPress={(index) => removeFormFieldsMinor(index)} variant="outlined" color='white' title="Remove Minor" style={styles.remButton} />
                </Surface>

                <Surface elevation={8}
                    category="large"
                    spacing={5}
                    style={{ width: "85%", alignSelf: 'center' }}
                >
                    {formValuesCert.map((element, index) => (
                        <FormBuilder

                            control={control}
                            setFocus={setFocus}
                            formConfigArray={[
                                {
                                    name: 'certForm',
                                    type: 'select',
                                    textInputProps: {
                                        label: 'Minor',
                                    },
                                    options: [
                                        {
                                            label: "Ancients Alive: The Classics In Context",
                                            value: "56,L",
                                        },
                                        {
                                            label: "Ethical Leadership",
                                            value: "57,L",
                                        },
                                        {
                                            label: "Get Out, Plug In: Intercultural Connections",
                                            value: "58,L",
                                        },
                                        {
                                            label: "Graphic Storytelling",
                                            value: "59,L",
                                        },
                                        {
                                            label: "Holistic Health and Well-Being",
                                            value: "60,L",
                                        },
                                        {
                                            label: "International Immersion",
                                            value: "61,L",
                                        },
                                        {
                                            label: "Life in Close-up: Film, History, and Society",
                                            value: "62,L",
                                        },
                                        {
                                            label: "Different is the New Normal: Celebrating Neurodiversity",
                                            value: "63,L",
                                        },
                                        {
                                            label: "Data Analytics: Big Problems, Big Data Solutions",
                                            value: "40,P",
                                        },
                                        {
                                            label: "Designing Solutions for Environmental Problems",
                                            value: "41,P",
                                        },
                                        {
                                            label: "Interactive Design",
                                            value: "42,P",
                                        },
                                        {
                                            label: "Learning to Lead and Leading to Learn: Facilitating Learning in the Professional Setting",
                                            value: "43,P",
                                        },
                                        {
                                            label: "Professional and Visual Communication",
                                            value: "44,P",
                                        },
                                        {
                                            label: "Sports Leadership: Going Beyond the Game",
                                            value: "45,P",
                                        },
                                        {
                                            label: "Justice Denied: Wrongful Convictions",
                                            value: "46,P",
                                        },
                                        {
                                            label: "The Activist’s Toolkit: Transforming Society through Civic Engagement",
                                            value: "47,P",
                                        },
                                    ],
                                }
                            ]}
                        />
                    ))}

                    <Button onPress={() => addCertFormFields()} variant="outlined" title="Add Certificate" color='white' style={styles.certificateButton} />
                    <Button onPress={(index) => removeFormFieldsCert(index)} variant="outlined" color='white' title="Remove Certificate" style={styles.remButton} />
                </Surface>

                <Button onPress={() => onSubmitHandler()} variant="outlined" color='white' title="Submit" style={styles.SubmitButton} />

            </Stack>
        </ScrollView >
    )
};


const styles = StyleSheet.create({

    txt1: {

        fontSize: 20,
        fontWeight: 'bold'

    },

    SubmitButton: {
        backgroundColor: 'crimson',
        width: '85%',
        color: 'white',
        alignSelf: 'center',


    },

    pickerMajor: {
        width: '80%',
        alignSelf: 'center'
    },

    majorButton: {
        backgroundColor: 'crimson',
        width: '80%',
        color: 'white',
        alignSelf: 'center',
        marginTop: '1%',

    },
    certificateButton: {
        backgroundColor: 'crimson',
        width: '80%',
        color: 'white',
        alignSelf: 'center',
        marginTop: '1%',

    },

    remButton: {
        backgroundColor: 'crimson',
        width: '80%',
        alignSelf: 'center',
        marginBottom: '0.5%'
    },

    minorButton: {
        backgroundColor: 'crimson',
        width: '80%',
        color: 'white',
        alignSelf: 'center',
        marginTop: '1%',

    },



    txt2: {
        fontSize: 15,
        paddingTop: '1.2%'
    },

    txt3: {
        fontSize: 12,
        paddingTop: "1.2%"
    },

})

export default stuCopy;