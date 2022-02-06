import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Spacer from './Spacer';
import TextStyles from './TextStyles';

const icons = {
    "education": <Ionicons name='school' color='white' size={17}></Ionicons>, 
    "work": <Ionicons name='briefcase' color='white' size={17}></Ionicons>, 
    "award": <Ionicons name='medal' color='white' size={17}></Ionicons>, 
}

export default function CurricularExperience({
    organization, 
    name,
    description,  
    type, 
    dates
}){
    return <View style={styles.container}>
        <View style={styles.iconContainer}>
            {icons[type]}
        </View>
        <Spacer width={8}></Spacer>
        <View style={{flex: 1}}>
            <Text style={TextStyles.Body.black}>{organization}</Text>
            <Spacer height={4}></Spacer>
            <Text style={TextStyles.Body.regular}>{name}</Text>
            <Spacer height={2}></Spacer>
            <Text style={TextStyles.Footnone.regular}>Nov. 18 2020 - Feb. 3 2022</Text>
            <Spacer height={4}></Spacer>
            <Text style={TextStyles.Body.regular}>{description}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        flex: 1
    }, 
    iconContainer: {
        height: 44, 
        width: 44, 
        borderRadius: 22, 
        backgroundColor: '#7E7E7E', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})