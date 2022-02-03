import React, { createRef } from 'react';
import { SafeAreaView, ScrollView, TextInput, View, KeyboardAvoidingView , StyleSheet } from 'react-native';
import Profile from '../components/Profile';
import Spacer from '../components/Spacer';
import StyledText from '../components/StyledText';

export default class UpdateOperations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBodyEditFocused: false
        }
    }
    render() {
        return <SafeAreaView style={{height: '100%'}}>
            <ScrollView>
                <View style={{ padding: 14 }}>
                    <Profile.SmallBaddge
                        profilePictureURL="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/wcz8emhdm7d7ac4bnwcq"
                        name="Rappi"
                    ></Profile.SmallBaddge>
                    <Spacer height={4}></Spacer>
                    <StyledText.ScreenTitle>
                        Reporte de operaciones Q2 2016
                    </StyledText.ScreenTitle>
                    <Spacer height={8}></Spacer>
                    <StyledText.Subheadline style={{ color: 'grey' }}>
                        30 de enero del 2022
                    </StyledText.Subheadline>
                    <Spacer height={8}></Spacer>
                    <StyledText.Body>
                        Resumen descriptivo de este documento
                    </StyledText.Body>
                </View>

                
            </ScrollView>
        </SafeAreaView>
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 30, 
        backgroundColor: 'green'
    }
})