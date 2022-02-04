import React, { createRef, useRef } from 'react';
import { Image, SafeAreaView, View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import InvestIncLogo from '../assets/logo.png';
import AuthenticationContext from '../AuthenticationContext';
import { StyledInput } from '../components/StyledInput';
import StyledText from '../components/StyledText';

class RegisterScreen extends React.Component{
    static contextType = AuthenticationContext;
    constructor(props){
        super(props);
        this.name = createRef();
        this.email = createRef();
        this.password = createRef();
        this.passwordConfirm = createRef();
        this.birthday = createRef();
        this.nationality = createRef();
        this.username = createRef();
        this.biography = createRef();
    }
    async submit(){
        // Clear errors
        ['name', 'email', 'password', 'passwordConfirm', 'birthday', 'nationality', 'username', 'biography'].forEach(key => {
            this[key].current.hideError();
        });
        // Check types
        let errors = false;
        ['name', 'email', 'password', 'passwordConfirm', 'birthday', 'nationality', 'username', 'biography'].forEach(key => {
            if(this[key].current.value == ''){
                errors = true;
                this[key].current.showError();
            }
        })
        if(errors) return alert("Ingresa todos los datos");
        // Check matching passwords
        if(this.password.value != this.passwordConfirm.value){
            this.passwordConfirm.showError();
            return alert("Las contraseñas no coinciden");
        }
        // Send request
        try {
            const req = await fetch('http://api.investincgroup.com/api/2/auth/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.name.current.value, 
                    email: this.email.current.value, 
                    password: this.password.current.value, 
                    birthday: this.birthday.current.value, 
                    nationality: this.nationality.current.value, 
                    biography: this.biography.current.value, 
                    username: this.username.current.value
                })
            });
            const data = await req.json();
            this.context.updateAuthToken(data);
        } catch (e) {
            alert("Ocurrió un error. Intenta de nuevo")
        }
    }
    render(){
        return <SafeAreaView style={{backgroundColor: 'white'}}>
            <KeyboardAwareScrollView>
                <View style={{height: '100%', padding: 20}}>
                    {/* Invest Inc Logo */}
                    <Image 
                        source={InvestIncLogo}
                        resizeMode='contain' 
                        style={{
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
                        Crea tu cuenta
                    </StyledText.Headline>
                    <StyledInput
                            label="Nombre completo"
                            placeholder="Jonathan Appleseed"
                            ref={this.name}
                        ></StyledInput>
                        <StyledInput
                            label="Correo electrónico"
                            placeholder="ana@example.com"
                            keyboardType="email-address"
                            textContentType="email-address"
                            autoCapitalize={false}
                            autoCorrect={false}
                            ref={this.email}
                        ></StyledInput>
                        <StyledInput
                            label="Contraseña"
                            placeholder="**********"
                            secureTextEntry={true}
                            ref={this.password}
                        ></StyledInput>
                        <StyledInput
                            label="Confirmar contraseña"
                            placeholder="**********"
                            secureTextEntry={true}
                            ref={this.passwordConfirm}
                        ></StyledInput>
                    {/* Heading */}
                    <StyledText.Headline style={{marginTop: 30, marginBottom: 10}}>
                        Cuéntanos sobre tí
                    </StyledText.Headline>
                    <StyledText.Subheadline style={{marginBottom: 15}}>
                        Esta información nos ayudará a brindarte una mejor experiencia y a personalizar tu perfil
                    </StyledText.Subheadline>
                    <StyledInput
                        label="Cumpleaños"
                        placeholder="28/01/1983"
                        ref={this.birthday}
                    ></StyledInput>
                    <StyledInput
                        label="Nacionalidad"
                        placeholder="Colombia"
                        ref={this.nationality}
                    ></StyledInput>
                    <StyledInput
                        label="Nombre de usuario"
                        placeholder="@appleseed"
                        autoCapitalize='false'
                        ref={this.username}
                    ></StyledInput>
                    <StyledInput
                        label="Biografía"
                        placeholder="Lorem ipsum..."
                        multiline={true}
                        ref={this.biography}
                    ></StyledInput>
                    {/* Heading */}
                    <StyledText.Headline style={{marginTop: 30, marginBottom: 10}}>
                        Identificación oficial
                    </StyledText.Headline>
                    <StyledText.Subheadline style={{marginBottom: 15}}>
                    Para poder realizar inversiones en la plataforma es necesario validar tu información con una identificación oficial
                    </StyledText.Subheadline>
                    <TouchableOpacity
                        style={{
                            marginTop: 40, 
                            padding: 16, 
                            borderColor: 'black', 
                            backgroundColor: 'black', 
                            borderWidth: 2, 
                            flex: 1, 
                            alignItems: 'center',
                        }}
                        onPress={this.submit.bind(this)}
                    >
                        <StyledText.Headline style={{color: 'white'}}>Registrar</StyledText.Headline>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center', 
                            marginTop: 20
                        }}
                        onPress={()=>{
                            this.props.navigation.navigate('Login')
                        }}
                    >
                        <StyledText.Body style={{color: 'rgb(0, 122, 255)'}}>Ya tengo una cuenta</StyledText.Body>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    }
}

export default RegisterScreen;