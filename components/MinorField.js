import React from 'react';
import { Picker } from 'react-native';

const MinorField = (props) => {
    return (
        <Picker placeholder='Minor'>
            <Picker.Item label="Select A Minor" value="" />
            <Picker.Item label="Computer Science" value="CSCI" />
            <Picker.Item label="Criminology" value="CRIM" />
            <Picker.Item label="English" value="ENGL" />
        </Picker>
    )
};
export default MinorField;