import React, { createRef } from 'react';
import { Image, SafeAreaView, View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import StyledText from '../components/StyledText';
import InvestIncLogo from '../assets/logo.png';
import { Ionicons } from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import AuthenticationContext from '../AuthenticationContext';
import SearchBox from '../components/SearchBox';



export default class MainFeedScreen extends React.Component{
    static contextType = AuthenticationContext;
    constructor(props){
        super(props);
        this.state = {
            me: null
        }
    }
    async componentDidMount(){
        try{
            const req = await fetch('http://api.investincgroup.com/api/2/me', {
                headers: {
                    'Authorization': `Bearer ${this.context.authToken}`
                }
            });
            const me = await req.json();
            this.setState({me})
        } catch(e){
            console.log(e)
            alert("Error")
        }
    }
    render(){
        return <SafeAreaView>
            <ScrollView contentContainerStyle={{height: '100%'}}
            >
                <View style={styles.section}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Image 
                            source={InvestIncLogo}
                            resizeMode='contain' 
                            style={{height: 28, width: 137}}
                        ></Image>
                        <TouchableOpacity
                            onPress={()=>{
                                this.props.navigation.navigate('User', {username: this.state.me?.username})
                            }}
                        >
                            <Ionicons name='person-circle' size={40}></Ionicons>
                        </TouchableOpacity>
                    </View>
                    <StyledText.ScreenTitle>¡Hola {this.state.me?.name}!</StyledText.ScreenTitle>
                    <Spacer height={14}></Spacer>
                    <SearchBox
                        onChangeText={(q) => {
                            this.props.navigation.navigate('Search', {q})
                        }}
                    ></SearchBox>
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