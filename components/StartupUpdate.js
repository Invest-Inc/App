import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import StyledText from './StyledText';
import Spacer from './Spacer';
import TextStyles from './TextStyles';

export default function StartupUpdate({
    type, 
    name, 
    date, 
    title, 
    summary, 
    downvotes, 
    upvotes, 
    children
}){
    const icons = {
        'news': 'ios-newspaper', 
        'operations': 'settings', 
        'balancesheet': 'stats-chart', 
        'incomestatement': 'receipt'
    }


    return <View
        style={{
            flexDirection: 'row'
        }}
    >
        <View 
            style={{
                height: 44, 
                width: 44, 
                borderRadius: 22, 
                backgroundColor: 'black', 
                alignItems: 'center', 
                justifyContent: 'center'
            }}
        >
            <Ionicons name={icons[type]} size={17} color='white'></Ionicons>
        </View>
        <Spacer width={8}></Spacer>
        <View
            style={{
                flex: 1
            }}
        >
            <View 
                style={{
                    flex: 1, 
                    flexDirection: 'row', 
                    justifyContent: 'space-between'
                }}
            >
                <Text style={{...TextStyles.Footnone.semibold, color: 'grey'}}>{name}</Text>
                <Spacer width={2}></Spacer>
                <Text style={{...TextStyles.Footnone.regular, color: 'grey'}}>{date}</Text>
            </View>
            <Spacer height={4}></Spacer>
            <Text style={TextStyles.Body.black}>{title}</Text>
            <Spacer height={4}></Spacer>
            <View>
                {children}
            </View>
        </View>
    </View>
}