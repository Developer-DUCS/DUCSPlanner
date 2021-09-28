import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Footer = ({ title }) => {
    return (
        <View style={styles.footer}>
            <Image source={require('../assets/RD Logos/DevDUCS.png')} style={styles.ducs} />
            <Text style={styles.text}>Copyright Drury University 2021</Text>
            <Image source={require('../assets/RD Logos/Team Logos/applelogo.png')} style={styles.apple} />
        </View>
    );
};

Footer.defaultProps = {
    title: "PlanIt",
}

const styles = StyleSheet.create({
    footer: {
        height: 40,
        padding: 5,
        backgroundColor: 'crimson',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ducs: {
        flexBasis: 0,
        height: 30,
        width: 50,
        paddingLeft: 80
    },
    apple: {
        flexBasis: 0,
        height: 30,
        width: 30,
        paddingRight: 30
    },
    text: {
        color: 'white',
        alignSelf: 'center'
    }
});

export default Footer;