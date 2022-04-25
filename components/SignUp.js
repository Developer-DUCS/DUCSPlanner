import React from 'react';
import {StyleSheet, ScrollView, Image, Text, Picker} from 'react-native';
import axios from 'axios';
import {Box, TextInput, Button, Surface, VStack, Flex} from '@react-native-material/core';
import { Controller, useForm} from 'react-hook-form';


const SignUp = (props) => {
  const api = axios.create({
    baseURL: `http://localhost:3210`
  });

  const { control, watch, handleSubmit, setValue, formState: { errors }} = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confPassword: '',
      role: '',
    },
    mode: 'onChange',
  });


  
  const onSubmit = (data) => api.post('/api/auth/signup', {
    'Email': data.email,
    'Password': data.password,
    'ConfPassword': data.confPassword,
    'Fname': data.firstName,
    'Lname': data.lastName,
    'Role': data.role
  })
    .then(function (response) {
      console.log("sent");
      if (response.status != 201) {
        setIsError(true)
      }
      else {
        props.navigation.navigate('Home');
      }
    })
    .catch(function (error) {
      console.log(data)
      console.log(error);
    })

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
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                  variant='outlined'
                  label='First Name'
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="firstName"
              />
          {errors.firstName && <Text>First Name is required</Text>}
          </Box>
          <Box>
          <Controller
            control={control}
            rules={{
              required: true,
              
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput variant='outlined' label='Last Name'
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
          />
          {errors.lastName && <Text>Last Name is required</Text>}
          </Box>
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
                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?!.*\s)/,
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
              <Box>
            <Controller
                    control={control}
                    rules={{
                    required: true,
                    validate: (value) => value == watch('password') || 'Passwords do not match',
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        secureTextEntry={true}
                        variant='outlined'
                        label='Confirm Password'
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="confPassword"
                  />
              {errors.confPassword && <Text>Confirm Password is required</Text>}
              </Box>
              <Box>
            <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: {onChange, onBlur, value } }) => (
              <Picker
                label='Role'
                selectedValue={value}
                onValueChange={itemValue => setValue("role", itemValue)}>
                <Picker.Item label='Student' value={'student'}/>
                <Picker.Item label='Advisor' value={'advisor'}/>
                <Picker.Item label='Administrator' value={'administrator'}/>
              </Picker>
              )}
              name="role"
            />
            {errors.role && <Text>Role is required</Text>}
            </Box>
          <Button title='Submit' onPress={handleSubmit(onSubmit)} style={styles.btn}/>
        </VStack>
        </Surface>
    </ScrollView>
  )
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
    height: '115%',
    alignSelf: 'center'
  },

  formBuild: {
    height: '100%',
    width: '75%',
    alignSelf: 'center'
  }
});

export default SignUp;