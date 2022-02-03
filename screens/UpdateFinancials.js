import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import StyledText from '../components/StyledText';
import Profile from '../components/Profile';
import Spacer from '../components/Spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FinancialTable from '../components/FinancialTable';

export default class UpdateFinancials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historicalData: []
        }
    }
    async componentDidMount(){
        const req4 = await fetch('http://api.investincgroup.com/api/2/updates/4');
        const json4 = await req4.json();
        const req5 = await fetch('http://api.investincgroup.com/api/2/updates/5');
        const json5 = await req5.json();
        const req6 = await fetch('http://api.investincgroup.com/api/2/updates/6');
        const json6 = await req6.json();
        this.setState({
            historicalData: [json4, json5]
            // historicalData: [json6]
        })
    }


    render() {
        return <SafeAreaView style={{ height: '100%' }} >
            <KeyboardAwareScrollView style={{ padding: 0, flex: 1 }}>
                <View style={{ padding: 14 }}>
                    <Profile.SmallBaddge
                        profilePictureURL="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/wcz8emhdm7d7ac4bnwcq"
                        name="Rappi"
                    ></Profile.SmallBaddge>
                    <Spacer height={4}></Spacer>
                    <StyledText.ScreenTitle>
                        Balance General Q2 2016
                    </StyledText.ScreenTitle>
                    <Spacer height={8}></Spacer>
                    <StyledText.Subheadline style={{ color: 'grey' }}>
                        30 de enero del 2022
                    </StyledText.Subheadline>
                    <Spacer height={8}></Spacer>
                    <StyledText.Body>
                        Resumen descriptivo de este documento
                    </StyledText.Body>
                    <Spacer height={8}></Spacer>
                    <TouchableOpacity onPress={()=>{
                        Linking.openURL('https://google.com')
                    }}>
                        <StyledText.Body style={{color: 'rgb(0, 122, 255)'}}>Abrir estado financiero</StyledText.Body>
                    </TouchableOpacity>
                </View>
                <FinancialTable data={this.state.historicalData} type='incomestatement'></FinancialTable>
                {/* <FinancialTable data={this.state.historicalData} type='balancesheet' editable={false}></FinancialTable> */}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    }
}

const styles = StyleSheet.create({
    rowTitleSection: {
        fontSize: 14, fontWeight: '900'
    },
    rowTitleHeading: {
        fontSize: 14, fontWeight: '700'
    },
    rowTitleItem: {
        fontSize: 14, fontWeight: '300', color: '#979797'
    }
});