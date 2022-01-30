import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import NewsReaderScreen from './screens/NewsReaderScreen';
import RegisterScreen from './screens/RegisterScreen';
import StartupProfileScreen from './screens/StartupProfileScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

class AuthenticationScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      screen: "login"
    }
  }
  async submit(d){
    let endpoint = this.state.screen == "login" ? "http://api.investincgroup.com/api/2/auth/login" : "http://api.investincgroup.com/api/2/auth/register";
    try{
      const res = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json"
        }, 
        method: "POST", 
        body: JSON.stringify(d)
      });
      const data = await res.json();
      alert(data);
    } catch(e){
      console.log(e)
      alert("error");
    }
  }
  renderLoginScreen(){
    return <LoginScreen
      onCancel={()=>{
        this.setState({screen: "register"})
      }}
      onSubmit={this.submit.bind(this)}
    ></LoginScreen>
  }
  renderRegisterScreen(){
    return <RegisterScreen
      onCancel={()=>{
        this.setState({screen: "login"})
      }}
      onSubmit={this.submit.bind(this)}
    ></RegisterScreen>
  }
  render(){
    if(this.state.screen == "login") return this.renderLoginScreen();
    if(this.state.screen == "register") return this.renderRegisterScreen();
  }
}

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Startup" component={StartupProfileScreen}></Stack.Screen>
        <Stack.Screen name="News" component={NewsReaderScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

