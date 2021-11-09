import React from 'react';
import { Picker } from 'react-native';

const CertField = (props) => {
    return (
        <Picker placeholder='Certificate'>
            <Picker.Item label="Select A Certificate" value="" />
            <Picker.Item label="Interactive Design" value="INTD" />
            <Picker.Item label="International Immersion" value="INTI" />
            <Picker.Item label="Ancients Alive: The Classics in Context" value="ANCA" />
        </Picker>
    )
};
export default CertField;