import React, { createRef } from 'react';
import { Image, SafeAreaView, View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import StyledText from '../components/StyledText';
import InvestIncLogo from '../assets/logo.png';
import { Ionicons } from '@expo/vector-icons';

export default class MainFeedScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <SafeAreaView>
            <ScrollView contentContainerStyle={{height: '100%'}}>
                <View style={styles.section}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Image 
                            source={InvestIncLogo}
                            resizeMode='contain' 
                            style={{height: 28, width: 137}}
                        ></Image>
                        <TouchableOpacity>
                            <Ionicons name='person-circle' size={40}></Ionicons>
                        </TouchableOpacity>
                    </View>
                    <StyledText.ScreenTitle>Hola Jonathan!</StyledText.ScreenTitle>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.push('Startup')
                    }}>
                        <StyledText.Title1>Rappi</StyledText.Title1>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    }
}

const styles = StyleSheet.create({

    section: {
        padding: 14
    }
})