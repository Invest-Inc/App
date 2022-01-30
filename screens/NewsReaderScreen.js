import React, { createRef } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Profile from '../components/Profile';
import StyledText from '../components/StyledText';

export default class NewsReaderScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <SafeAreaView>
            <ScrollView>
                <View style={{padding: 14}}>
                    <Profile.SmallBaddge 
                        profilePictureURL="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/wcz8emhdm7d7ac4bnwcq"
                        name="Rappi"
                    ></Profile.SmallBaddge>
                    <StyledText.ScreenTitle
                        style={{marginVertical: 4}}
                    >
                    Rappi, la empresa que cambió la forma de comprar con el celular
                    </StyledText.ScreenTitle>
                    <StyledText.Subheadline
                        style={{color: 'grey'}}
                    >
                        30 de enero del 2022 • 8 min de lectura
                    </StyledText.Subheadline>
                </View>

                <View style={{padding: 14}}>
                    <StyledText.Body>
                        Lorem ipsum dolor sit amet
                    </StyledText.Body>
                </View>
            </ScrollView>
        </SafeAreaView>
    }
}