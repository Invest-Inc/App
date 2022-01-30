import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import StyledText from './StyledText';

class News extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <TouchableOpacity 
            style={{...styles.container, ...this.props.style}}
            disabled={!this.props.onPress}
            onPress={this.props.onPress}
        >
            <View style={styles.icon}>
                <Ionicons name="newspaper" color="white" size={20}></Ionicons>
            </View>
            <View style={styles.details}>
                <StyledText.Footnote style={{marginBottom: 4}}>
                    Noticias • {this.props.date}
                </StyledText.Footnote>
                <StyledText.BodyBlack style={{marginBottom: 4}}>
                {this.props.title}
                </StyledText.BodyBlack>
            </View>
        </TouchableOpacity>
    }
}

class Operations extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <TouchableOpacity 
            style={{...styles.container, ...this.props.style}}
        >
            <View style={styles.icon}>
                <Ionicons name="hammer" color="white" size={20}></Ionicons>
            </View>
            <View style={styles.details}>
                <StyledText.Footnote style={{marginBottom: 4}}>
                    Operaciones • 6 de agosto del 2016
                </StyledText.Footnote>
                <View style={{marginBottom: 4, flexDirection: 'row', alignItems: 'baseline'}}>
                    <StyledText.BodyBlack>3.0</StyledText.BodyBlack>
                    <Ionicons name='star' size={20} color={'#FFCC00'}></Ionicons>
                    <Ionicons name='star' size={20} color={'#FFCC00'}></Ionicons>
                    <Ionicons name='star' size={20} color={'#FFCC00'}></Ionicons>
                </View>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'flex-start',
    }, 
    icon: {
        height: 44, 
        width: 44, 
        borderRadius: 22, 
        backgroundColor: 'black', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginRight: 4
    }, 
    details: {
        marginLeft: 4,
        flex: 1
    }
})

const StartupUpdate = {
    News, 
    Operations
}

export default StartupUpdate;