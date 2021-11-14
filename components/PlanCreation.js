import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Picker, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios'

const PlanCreation = (props) => {
    return (
        <View style={styles.container}>
            <Text>{localStorage.getItem("classNameList")}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default PlanCreation;