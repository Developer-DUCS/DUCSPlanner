import React from "react";
import { View, StyleSheet,Picker, ScrollView, } from 'react-native'
import { Text, Stack, Wrap ,Button, Paper, Surface} from "@react-native-material/core";


const stuCopy = () => (
   <ScrollView>
   <Stack m={6} spacing={5}>
       <View>
            <Text style={styles.txt1}>Welcome back</Text>
            <Text style={styles.txt2}>Please choose your desired major, minor, or certificate options from the list below:</Text>
            <Text style={styles.txt3}>NOTE: choose at least three credentials:  one major and two certificates.  One certificate can be replaced with a second major or a minor. You must also have one credential in the "Professional" category and one credential in the "Life" category.</Text>
        </View>
                    
            <Surface elevation={8}
                category= "large"
                spacing={5}
                style={{ width: "85%", alignSelf: 'center' }}
                
                >

                   <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 25, paddingBottom: '0.5%'}}>Major</Text>
                    <Picker style={styles.pickerMajor}>
                    <Picker.Item label = 'Please select a major' />
                    <Picker.Item label="Computer Science: Game Development" value="CSGD,P" />
                    <Picker.Item label="Computer Science: Software Engineering" value="CSSE,P" />
                    <Picker.Item label="Mathematics" value="MATH,L" />
                    </Picker>
                    <Button variant="outlined" color= 'white' title="Add Major" style={styles.majorButton}/>
                    <Button variant="outlined" color= 'white' title="Remove Major" style={styles.remButton}/>
            </Surface>

            <Surface elevation={8}
                category= "large"
                spacing={5}
                style={{ width: "85%", alignSelf: 'center' }}
                >

                   <Text style={{alignSelf: 'center',  fontWeight: 'bold', paddingBottom: '0.5%',fontSize: 25}}>Minor</Text>
                    <Picker style={styles.pickerMajor}>
                    <Picker.Item label = 'Please select a minor' />
                    <Picker.Item label="Animation" value="ANIM,P" />
                    <Picker.Item label="Computer Science" value="CSCI,L" />
                    <Picker.Item value="CRIM,L" label='Criminology'/>
                    <Picker.Item value="ENGL,L" label='English' />
                    </Picker>

                    <Button variant="outlined" color= 'white' title="Add Minor" style={styles.minorButton}/>
                    <Button variant="outlined" color= 'white' title="Remove Minor" style={styles.remButton}/>
            </Surface>
            
            <Surface elevation={8}
                category= "large"
                spacing={5}
                style={{ width: "85%", alignSelf: 'center' }}
                >

                   <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 25,paddingBottom: '0.5%'}}>Certificate</Text>
                    <Picker style={styles.pickerMajor}>
                    <Picker.Item label = 'Please select a certificate' />
                    <Picker.Item value="INTD,P" label='Interactive Design' />
                    <Picker.Item value="INTI,L" label='International Immersion'/>
                    <Picker.Item value="ANCA,L" label= 'Ancients Alive: The Classics in Context'/>
                    </Picker>

                    <Button variant="outlined" title="Add Certificate" color= 'white' style={styles.certificateButton} />
                    <Button variant="outlined" color= 'white' title="Remove Certificate" style={styles.remButton}/>
            </Surface>

            <Button variant="outlined" color= 'white' title="Submit" style={styles.SubmitButton} />

  </Stack>
  </ScrollView>
);


const styles = StyleSheet.create({
    
    txt1:{

        fontSize: 20,
        fontWeight: 'bold'

    },
   
    SubmitButton:{
        backgroundColor: 'crimson',
        width: '85%',
        color: 'white',
        alignSelf: 'center',
        

    },

    pickerMajor:{
        width: '80%',
        alignSelf: 'center'
    },
    
    majorButton:{
        backgroundColor: 'crimson',
        width: '80%',
        color: 'white',
        alignSelf: 'center',
        marginTop: '1%',
        
    },
    certificateButton:{
        backgroundColor: 'crimson',
        width: '80%',
        color: 'white',
        alignSelf: 'center',
        marginTop: '1%',
        
    },

    remButton:{
        backgroundColor: 'crimson',
        width: '80%',
        alignSelf: 'center',
        marginBottom: '0.5%'
    },

    minorButton:{
        backgroundColor: 'crimson',
        width: '80%',
        color: 'white',
        alignSelf: 'center',
        marginTop: '1%',
        
    },
    


    txt2: {
        fontSize: 15,
        paddingTop:  '1.2%'
      },
    
    txt3: {
        fontSize: 12,
        paddingTop: "1.2%"
      },

})

export default stuCopy;