import { LinearGradient } from 'expo-linear-gradient';
import React, { createRef } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import StyledText from '../components/StyledText';
import User from '../components/User';

export default class StartupProfile extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <ScrollView>
            <View style={{
                height: 210, 
                backgroundColor: 'red',
                padding: 14, 
                marginBottom: 18, 
                justifyContent: 'flex-end', 
                alignItems: 'flex-end'
            }}>
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
                    style={{
                        position: 'absolute', 
                        top: 0, 
                        bottom: 0, 
                        left: 0, 
                        right: 0
                    }}
                ></LinearGradient>
                <Text>Something</Text>
                <View style={{
                    height: 100, 
                    width: 100, 
                    borderRadius: 50, 
                    backgroundColor: 'black', 
                    position: 'absolute', 
                    bottom: -30, 
                    left: 12
                }}></View>
            </View>
            <View style={{padding: 14}}>
                <StyledText.LargeTitle style={{marginBottom: 8}}>Rappi</StyledText.LargeTitle>
                <StyledText.Headline style={{marginBottom: 8}}>Rappi is a consumer tech company that specializes in providing online delivery services.</StyledText.Headline>
                <View style={{
                    aspectRatio: 1.77, 
                    backgroundColor: 'green',
                    borderRadius: 16
                }}></View>
            </View>
            <View style={{padding: 14}}>
                <StyledText.Title1>Equipo</StyledText.Title1>
                <User.CardDescription style={{paddingVertical: 12}}
                    name="Simón Borrero"
                    subtitle="Co-Fundador y CEO"
                    description="Simón tuvo la brillante idea de crear un servicio de delivery hace algunos años. Actualmente es nuestro CEO"
                    profilePictureURL="https://media-exp1.licdn.com/dms/image/C4D03AQHYkzjv_UO76g/profile-displayphoto-shrink_800_800/0/1517494013310?e=1648684800&v=beta&t=goq1eJITMPsYIlLZW1S1yIb1bPteMz9l2_6psMRdkew"
                ></User.CardDescription>
                <User.CardDescription style={{paddingVertical: 12}}
                    name="Simón Borrero"
                    subtitle="Co-Fundador y CEO"
                    description="Simón tuvo la brillante idea de crear un servicio de delivery hace algunos años. Actualmente es nuestro CEO"
                    profilePictureURL="https://media-exp1.licdn.com/dms/image/C4D03AQHYkzjv_UO76g/profile-displayphoto-shrink_800_800/0/1517494013310?e=1648684800&v=beta&t=goq1eJITMPsYIlLZW1S1yIb1bPteMz9l2_6psMRdkew"
                ></User.CardDescription>
            </View>
            <View style={{padding: 14}}>
                <StyledText.Title1>Actualizaciones</StyledText.Title1>
            </View>
        </ScrollView>
    }
}