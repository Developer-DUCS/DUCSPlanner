import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Picker, TouchableOpacity, AsyncStorage } from 'react-native';


const CredField = (props) => {
    return (
        <View style={styles.form2}>
            <Picker placeholder='Major' >
                <Picker.Item label="Select A Major" value="" />
                <Picker.Item label="Computer Science: Game Development" value="CSGD" />
                <Picker.Item label="Computer Science: Software Engineering" value="CSSE" />
                <Picker.Item label="Mathematics" value="MATH" />
            </Picker>
        </View>
    )
};
export default CredField;