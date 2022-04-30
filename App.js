import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider as PaperProvider } from 'react-native-paper';

import Home from './components/Home';
import Student from './components/Student';
import stuCopy from './components/stuCopy';
import Advisor from './components/Advisor';
import Admin from './components/Admin';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import ForgotPass from './components/ForgotPass';
import PlanCreation from './components/PlanCreation';
import PlanViewing from './components/PlanViewing';

const App = () => {
  return (
    <>
      <View style={styles.container}>
      <PaperProvider>
          <Header />
          <AppContainer />
          <Footer />
        </PaperProvider>
      </View>
    </>
    /*This styling applies to all pages*/
    /*NOTE: IF you do not want all pages to have an element, do not add it here. Add it to the specific page.*/
  );
};

const AppNavigator = createStackNavigator({
  /*Other screens will be added to this list if necessary*/
  Home: {
    screen: Home
  },
  Student: {
    screen: Student
  },
  stuCopy: {
    screen: stuCopy
  },
  Advisor: {
    screen: Advisor
  },
  Admin: {
    screen: Admin
  },
  SignUp: {
    screen: SignUp
  },
  ForgotPass: {
    screen: ForgotPass
  },
  PlanCreation: {
    screen: PlanCreation
  },
  PlanViewing:{
    screen: PlanViewing
  }
}, {

  initialRouteName: "Home"
  /*This sets the Home page as the base page*/
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
