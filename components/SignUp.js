import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Student extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>SignUp Screen</Text>
            </View>
            /*This styling applies to the Student page*/
        )
    }
}