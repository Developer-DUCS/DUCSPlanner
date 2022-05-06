import React from 'react';
import { StyleSheet, ScrollView, Text, Image } from 'react-native';
import axios from 'axios';
import { Box, TextInput, Button, Surface, VStack, Flex} from '@react-native-material/core';
import { Controller, useForm} from 'react-hook-form';
import GLOBAL from './globals'; 
const conf = require("../configuration/config.json")

const Home = (props) => {
  const api = axios.create({
    baseURL: conf.baseURL
  });

  /* const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); */

  const { control, watch, handleSubmit, setValue, formState: { errors }} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data) => api.post('/api/auth/login', {
              'Email': data.email,
              'Password': data.password,

            })
              .then(function (response) {
                //console.log("sent");
                if (response.status != 200) {
                  setIsError(true)
                }
                else {
                  //console.log(JSON.stringify(response.data.userID));
                  var id = JSON.stringify(response.data.userID);
                 // console.log(JSON.stringify(response.data.userId));
                  GLOBAL.FIRSTNAME = response.data.fname;
                  GLOBAL.LASTNAME = response.data.lname;
                  GLOBAL.ID = id;
                  //console.log(GLOBAL.ID);
                  props.navigation.navigate('Student');
                  //props.navigation.navigate('PlanViewing');
                  //props.navigation.navigate('PlanCreation');
                }

              })
              .catch(function (error) {
                console.log(error);

              })

  const onForgotPass = () => {
    props.navigation.navigate('ForgotPass')
  }
  const onSignUp = () => {
    props.navigation.navigate('SignUp');
  }


  return (
    <ScrollView>
      <Surface elevation={3}>
          <VStack spacing={10} mh={'15%'} p={10} h={'100%'} fill >
          <Flex h={100} m={10} center>
          <Image resizeMode="contain"
            style={{ width: "75%", height: "100%"}}
            source={{ uri: 'https://drury.edu/wp-content/uploads/files/brand_lounge/PrimaryFullColor.png' }}
          />
          </Flex>
          <Box>
            <Controller
                  control={control}
                  rules={{
                  required: true,
                  pattern: /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      variant='outlined'
                      label='Email'
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="email"
                />
            {errors.email && <Text>A valid email is required</Text>}
            </Box>
            <Box>
            <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        secureTextEntry={true}
                        variant='outlined'
                        label='Password'
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="password"
                  />
              {errors.password && <Text>Enter a good password</Text>}
              </Box>
          <Button title='Login' onPress={handleSubmit(onSubmit)} style={styles.btn}/>
          <Button title='Sign Up' onPress={() => onSignUp()} style={styles.btn}/>
          <Button title='Forgot password?' onPress={() => onForgotPass()} style={styles.btn}/>
        </VStack>
        </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    aspectRatio: 10 / 8
  },

  scrollViewStyle: {
    flex: 1,
    padding: '2%',
    justifyContent: 'center',
  },

  btn: {
    backgroundColor: 'crimson',
    marginBottom: '4%',
  },

  btnText: {
    color: 'white'
  },

  forgotpass: {
    color: 'blue'
  },

  formContainer: {
    width: '50%',
    height: '100%',
    alignSelf: 'center'
  },

  formBuild: {
    width: '75%',
    alignSelf: 'center'
  }
});

export default Home;