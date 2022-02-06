import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import TextStyles from './TextStyles';

export default function Button({
    backgroundColor, 
    textColor, 
    label, 
    onPress
}){
    return <TouchableOpacity
        style={{
            backgroundColor, 
            paddingVertical: 4, 
            paddingHorizontal: 8, 
            borderRadius: 32
        }}
        disabled={!onPress}
        onPress={onPress}
    >
        <Text style={{...TextStyles.Body.regular, color: textColor}}>{label}</Text>
    </TouchableOpacity>
}
