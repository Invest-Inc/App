import React, { createRef } from 'react';
import { Image, SafeAreaView, View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import InvestIncLogo from '../assets/logo.png';
import { StyledInput } from '../components/StyledInput';
import StyledText from '../components/StyledText';

class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.username = createRef();
        this.password = createRef();
    }
    render(){
        return <KeyboardAvoidingView behavior='padding'>
            <SafeAreaView>
                <View style={{height: '100%', padding: 20}}>
                    {/* Invest Inc Logo */}
                    <Image 
                        source={InvestIncLogo}
                        resizeMode='contain' 
                        style={{
                            marginTop: 40, 
                            marginBottom: 20, 
                            marginRight: 'auto',
                            height: 28, 
                            width: 137
                        }}></Image>
                    {/* Title */}
                    <StyledText.ScreenTitle>
                        Bienvenido a la mejor forma de invertir
                    </StyledText.ScreenTitle>
                    {/* Heading */}
                    <StyledText.Headline style={{marginTop: 30, marginBottom: 10}}>
                        Ingresa tus datos para iniciar sesión
                    </StyledText.Headline>
                    <View style={{
                        flex: 1, 
                        justifyContent: 'space-between'
                    }}>
                        <View>
                            <StyledInput
                                label="Usuario o correo"
                                placeholder="ana@example.com"
                                keyboardType="email-address"
                                textContentType="email-address"
                                ref={this.username}
                                autoCapitalize={false}
                                autoComplete={false}
                            ></StyledInput>
                            <StyledInput
                                label="Contraseña"
                                placeholder="**********"
                                secureTextEntry={true}
                                ref={this.password}
                            ></StyledInput>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                style={{
                                    padding: 16, 
                                    borderColor: 'black', 
                                    borderWidth: 2, 
                                    flex: 1,
                                    marginRight: 10, 
                                    alignItems: 'center'
                                }}
                                onPress={this.props.onCancel}
                            >
                                <StyledText.Headline>Registrarme</StyledText.Headline>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    padding: 16, 
                                    borderColor: 'black', 
                                    backgroundColor: 'black', 
                                    borderWidth: 2, 
                                    flex: 1, 
                                    marginLeft: 10,
                                    alignItems: 'center',
                                }}
                                onPress={()=>{
                                    this.props.onSubmit({
                                        "username": this.username.current.value, 
                                        "password": this.password.current.value
                                    })
                                }}
                            >
                                <StyledText.Headline style={{color: 'white'}}>Iniciar sesión</StyledText.Headline>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    }
}

export default LoginScreen;