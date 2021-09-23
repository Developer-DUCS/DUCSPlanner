import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import Header from './components/Header';

const App = () => {
  return (
    <View style={styles.container}>
      <Header/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
});

export default App;
