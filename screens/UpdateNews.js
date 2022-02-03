import React, { createRef } from 'react';
import { SafeAreaView, ScrollView, TextInput, View, KeyboardAvoidingView , StyleSheet } from 'react-native';
import Profile from '../components/Profile';
import Spacer from '../components/Spacer';
import StyledText from '../components/StyledText';

export default class UpdateNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBodyEditFocused: false
        }
    }
    render() {
        return <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={91}>
        <SafeAreaView style={{height: '100%'}}>
            <ScrollView>
                <View style={{ padding: 14 }}>
                    <Profile.SmallBaddge
                        profilePictureURL="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/wcz8emhdm7d7ac4bnwcq"
                        name="Rappi"
                    ></Profile.SmallBaddge>
                    <Spacer height={4}></Spacer>
                    <StyledText.ScreenTitle>
                        Rappi, la empresa que cambió la forma de comprar con el celular
                    </StyledText.ScreenTitle>
                    <Spacer height={10}></Spacer>
                    <StyledText.Subheadline style={{ color: 'grey' }}>
                        30 de enero del 2022 • 8 min de lectura
                    </StyledText.Subheadline>
                </View>

                <View style={{ padding: 14 }}>
                    <TextInput
                        placeholder='Start typing...'
                        style={{
                            fontSize: 17
                        }}
                        multiline={true}
                        scrollEnabled={false}
                    ></TextInput>
                </View>
            </ScrollView>
            {/* In the future we will support rtf (rich text formatting for news updates). Here is where the toolbar will go */}
        </SafeAreaView>
        </KeyboardAvoidingView>
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 30, 
        backgroundColor: 'green'
    }
})