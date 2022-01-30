import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import React, { createRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import StartupUpdate from '../components/StartupUpdate';
import StyledText from '../components/StyledText';
import User from '../components/User';




export default class StartupProfileScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: null, 
            employees: [], 
            updates: []
        };
    }
    async componentDidMount(){
        {
            const res = await fetch('http://api.investincgroup.com/api/2/startup/3');
            const data = await res.json();
            this.setState({data});
        }
        {
            const res = await fetch('http://api.investincgroup.com/api/2/startup/3/employees');
            const employees = await res.json();
            this.setState({employees});
        }
        {
            const res = await fetch('http://api.investincgroup.com/api/2/startup/13/updates');
            const updates = await res.json();
            this.setState({updates});
        }
    }
    render(){
        return <ScrollView>
            <View style={{
                height: 210, 
                backgroundColor: 'red',
                padding: 14, 
                marginBottom: 18, 
                justifyContent: 'flex-end', 
                alignItems: 'flex-end', 
            }}>
                <Image 
                    source={{uri: this.state.data?.header_picture_url}}
                    style={styles.heroBackground}
                ></Image>
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.8)', 'transparent'].reverse()}
                    style={styles.heroBackground}
                ></LinearGradient>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableHighlight
                        style={{
                            backgroundColor: 'rgb(0, 122, 255)', 
                            paddingVertical: 4, 
                            paddingHorizontal: 16, 
                            borderRadius: 16
                        }}
                    >
                        <StyledText.Body style={{color: 'white'}}>Invertir</StyledText.Body>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{
                            backgroundColor: 'rgb(240, 240, 240)', 
                            padding: 4, 
                            borderRadius: 16
                        }}
                    >
                        <Ionicons name='ellipsis-horizontal-circle' size={17}></Ionicons>
                    </TouchableHighlight>
                </View>
                <Image 
                    style={{
                        height: 100, 
                        width: 100, 
                        borderRadius: 50, 
                        backgroundColor: 'black', 
                        position: 'absolute', 
                        bottom: -30, 
                        left: 12
                    }}
                    source={{uri: this.state.data?.profile_picture_url}}
                ></Image>
            </View>
            <View style={{padding: 14}}>
                <StyledText.LargeTitle style={{marginBottom: 8}}>
                    {this.state.data?.name}
                </StyledText.LargeTitle>
                <StyledText.Headline style={{marginBottom: 8}}>
                    {this.state.data?.summary}
                </StyledText.Headline>
                <Video 
                    style={{
                        aspectRatio: 1.77, 
                        backgroundColor: 'green',
                        borderRadius: 16
                    }}
                    source={{
                        uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    }}
                    useNativeControls
                ></Video>
            </View>
            <View style={{padding: 14}}>
                <StyledText.Title1>Equipo</StyledText.Title1>
                {this.state.employees?.map(data => (
                    <User.CardDescription style={{paddingVertical: 12}}
                        name={data.User.name}
                        subtitle={data.role}
                        description={data.role_description}
                        profilePictureURL={data.User.profile_picture_url}
                    ></User.CardDescription>
                ))}
            </View>
            <View style={{padding: 14}}>
                <StyledText.Title1>Actualizaciones</StyledText.Title1>
                <StartupUpdate.News
                    onPress={()=>{
                        this.props.navigation.push('News')
                    }}
                    style={{
                        paddingVertical: 12
                    }}
                    date="30 de enero del 2022"
                    title="Rappi, la empresa que cambió la forma de comprar con el celular"
                >
                </StartupUpdate.News>
                <StartupUpdate.Operations
                    style={{
                        paddingVertical: 12
                    }}
                >
                </StartupUpdate.Operations>
            </View>
        </ScrollView>
    }
}

const styles = StyleSheet.create({
    heroBackground: {
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0
    }
})