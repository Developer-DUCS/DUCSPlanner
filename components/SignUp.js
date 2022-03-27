import React from 'react';
import {StyleSheet, ScrollView, Image, Text, Picker} from 'react-native';
import axios from 'axios';
import { Wrap, Box, TextInput, Button, Surface, VStack, Flex} from '@react-native-material/core';
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
                    name="confirmPassword"
                  />
              {errors.confirmPassword && <Text>Confirm Password is required</Text>}
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
          <Button title='Submit' onPress={handleSubmit(onSubmit)}/>
        </VStack>
        </Surface>
    </ScrollView>
  )
  // return (
  //   <ScrollView contentContainerStyle={styles.scrollViewStyle}>
  //     <Surface style={styles.formContainer}>
  //       <View style={styles.formBuild}>
  //         <Image
  //           style={{ width: "50%", height: "10%", resizeMode: "contain", marginTop: '7%', marginBottom: '2%', alignSelf: 'center' }}
  //           source={{ uri: 'https://drury.edu/wp-content/uploads/files/brand_lounge/PrimaryFullColor.png' }}
  //         />
  //         <FormBuilder
  //           control={control}
  //           setFocus={setFocus}
  //           formConfigArray={[
  //             {
  //               type: 'text',
  //               name: 'firstName',
  //               rules: {
  //                 required: {
  //                   value: true,
  //                   message: 'First Name is required',
  //                 },
  //               },
  //               textInputProps: {
  //                 label: 'First Name',
  //               },
  //             },
  //             {
  //               type: 'text',
  //               name: 'lastName',
  //               rules: {
  //                 required: {
  //                   value: true,
  //                   message: 'Last Name is required',
  //                 },
  //               },
  //               textInputProps: {
  //                 label: 'Last Name',
  //               },
  //             },
  //             {
  //               type: 'email',
  //               name: 'email',

  //               rules: {
  //                 required: {
  //                   value: true,
  //                   message: 'Email is required',
  //                 },
  //                 pattern: {
  //                   value:
  //                     /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
  //                   message: 'Email is invalid',
  //                 },
  //               },
  //               textInputProps: {
  //                 label: 'Email',
  //               },
  //             },
  //             {
  //               type: 'password',
  //               name: 'password',
  //               rules: {
  //                 required: {
  //                   value: true,
  //                   message: 'Password is required',
  //                 },
  //                 minLength: {
  //                   value: 8,
  //                   message: 'Password should be atleast 8 characters',
  //                 },
  //                 pattern: {
  //                   value:
  //                     /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?!.*\s)/,
  //                   message: 'Password must contain a uppercase letter, a lowercase letter, a number, a special character, and no whitespace'
  //                 }
  //               },
  //               textInputProps: {
  //                 label: 'Password',
  //               },
  //             },
  //             {
  //               type: 'password',
  //               name: 'confPassword',
  //               rules: {
  //                 required: {
  //                   value: true,
  //                   message: 'Confirm Password is required',
  //                 },
  //                 validate: (value) => value == watch('password') || 'Passwords do not match',
  //               },
  //               textInputProps: {
  //                 label: 'Confirm Password',
  //               },
  //             },
  //             {
  //               name: 'role',
  //               type: 'select',
  //               textInputProps: {
  //                 label: 'Role',
  //               },
  //               rules: {
  //                 required: {
  //                   value: true,
  //                   message: 'Role is required',
  //                 },
  //               },
  //               options: [
  //                 {
  //                   value: 'Student',
  //                   label: 'Student',
  //                 },
  //                 {
  //                   value: 'Admin',
  //                   label: 'Admin',
  //                 },
  //                 {
  //                   value: 'Advisor',
  //                   label: 'Advisor',
  //                 },
  //               ],
  //             }
  //           ]}
  //         />
  //         <Button
  //           style={styles.btn}
  //           mode={'contained'}
  //           onPress={handleSubmit((values) => api.post('/api/auth/signup', {
  //             'Email': values.email,
  //             'Password': values.password,
  //             'ConfPassword': values.confPassword,
  //             'Fname': values.firstName,
  //             'Lname': values.lastName,
  //             'Role': values.role
  //           })
  //             .then(function (response) {
  //               console.log("sent");
  //               if (response.status != 201) {
  //                 setIsError(true)
  //               }
  //               else {
  //                 props.navigation.navigate('Home');
  //               }
  //             })
  //             .catch(function (error) {
  //               console.log(error);
  //             })
  //           )}>
  //           <Text style={styles.btnText}>Submit</Text>
  //         </Button>
  //       </View>
  //     </Surface>
  //   </ScrollView>
  // );
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