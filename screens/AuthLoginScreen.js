import React, { createRef } from 'react';
import { Image, SafeAreaView, View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import InvestIncLogo from '../assets/logo.png';
import AuthenticationContext from '../AuthenticationContext';
import Spacer from '../components/Spacer';
import { StyledInput } from '../components/StyledInput';
import StyledText from '../components/StyledText';

class LoginScreen extends React.Component {
    static contextType = AuthenticationContext;
    constructor(props) {
        super(props);
        this.username = createRef();
        this.password = createRef();
    }
    async submit() {
        try {
            const req = await fetch('http://api.investincgroup.com/api/2/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.username.current.value,
                    password: this.password.current.value
                })
            });
            const data = await req.json();
            this.context.updateAuthToken(data);
        } catch (e) {
            alert("Ocurrió un error. Intenta de nuevo")
        }
    }

    render() {
        return <SafeAreaView style={{ backgroundColor: 'white' }}>
            <KeyboardAvoidingView behavior='padding'>
                <View style={{ height: '100%', padding: 20 }}>

                    {/* Invest Inc Logo */}
                    <Spacer height={40}></Spacer>
                    <Image
                        source={InvestIncLogo}
                        resizeMode='contain'
                        style={{
                            marginRight: 'auto',
                            height: 28,
                            width: 137
                        }}></Image>
                    <Spacer height={8}></Spacer>
                    {/* Title */}
                    <StyledText.ScreenTitle>
                        Bienvenido a la mejor forma de invertir
                    </StyledText.ScreenTitle>
                    <Spacer height={40}></Spacer>
                    {/* Heading */}
                    <StyledText.Headline>
                        Ingresa tus datos para iniciar sesión
                    </StyledText.Headline>
                    <Spacer height={10}></Spacer>
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
                                autoCorrect={false}
                            ></StyledInput>
                            <StyledInput
                                label="Contraseña"
                                placeholder="**********"
                                secureTextEntry={true}
                                ref={this.password}
                            ></StyledInput>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    padding: 16,
                                    borderColor: 'black',
                                    borderWidth: 2,
                                    flex: 1,
                                    marginRight: 10,
                                    alignItems: 'center'
                                }}
                                onPress={()=>{
                                    this.props.navigation.navigate('Register');
                                }}
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
                                onPress={this.submit.bind(this)}
                            >
                                <StyledText.Headline style={{ color: 'white' }}>Iniciar sesión</StyledText.Headline>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    }
}

export default LoginScreen;