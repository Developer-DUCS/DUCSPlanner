import React from 'react';
import { Picker } from 'react-native';

const MajorField = (props) => {
    return (
        <Picker placeholder='Major' >
            <Picker.Item label="Select A Major" value="" />
            <Picker.Item label="Computer Science: Game Development" value="CSGD" />
            <Picker.Item label="Computer Science: Software Engineering" value="CSSE" />
            <Picker.Item label="Mathematics" value="MATH" />
        </Picker>
    )
};

export default MajorField;