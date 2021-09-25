import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Image source={require('../Logos/RD Logos/Product Logo/WhiteText/WhiteText.png')} style={styles.img} />
    </View>
  );
};

Header.defaultProps = {
  title: "PlanIt",
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: 'crimson',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 150,
  }
});

export default Header;