import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Footer = ({ title }) => {
    return (
        <View style={styles.footer}>
            <Image source={require('../Logos/RD Logos/Screen Shot 2021-08-30 at 9.16.36 AM.png')} style={styles.ducs} />
            <Text style={styles.text}>Copyright Drury University 2021</Text>
            <Image source={require('../Logos/RD Logos/Team Logos/applelogo.png')} style={styles.apple} />
        </View>
    );
};

Footer.defaultProps = {
    title: "PlanIt",
}

const styles = StyleSheet.create({
    footer: {
        height: 65,
        padding: 10,
        backgroundColor: 'crimson',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ducs: {
        paddingLeft: 100,
        width: 100,
        height: 50,
    },
    apple: {
        width: 50,
        height: 50,
    },
    text: {
        color: 'white',
        paddingTop: 15,
    }
});

export default Footer;