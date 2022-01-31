import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import StyledText from './StyledText';
import Spacer from './Spacer';

export default function StartupUpdate({
    type, 
    date, 
    title, 
    summary, 
    onPress, 
    style
}){
    let typeText;
    let icon;
    switch(type){
        case 'news':
            typeText = 'noticias';
            icon = 'newspaper';
            break;
        case 'operations':
            typeText = 'operaciones';
            icon = 'hammer';
            break;
        default:
            typeText = type;
            icon = 'ellipsis-horizontal';
    }
    return <TouchableOpacity
        disabled={!onPress}
        onPress={onPress}
        style={{...styles.container, ...style}}
    >
        <View style={styles.iconContainer}>
            <Ionicons name={icon} color='white' size={20}></Ionicons>
        </View>        
        <Spacer width={8}></Spacer>
        <View>
            <StyledText.Footnote>
                {typeText} • 6 de agosto del 2016
            </StyledText.Footnote>
            <Spacer height={4}></Spacer>
            <StyledText.BodyBlack>
                Reporte de operaciones Q2 2016
            </StyledText.BodyBlack>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }, 
    iconContainer: {
        height: 44, 
        width: 44, 
        borderRadius: 22, 
        backgroundColor: 'black',
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center'
    }
})