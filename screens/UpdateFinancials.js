import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import StyledText from '../components/StyledText';
import Profile, { ProfileSmall } from '../components/Profile';
import Spacer from '../components/Spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FinancialTable from '../components/FinancialTable';
import objectPath from 'object-path';

export default class UpdateFinancials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    async componentDidMount(){
        const updateId = this.props.route.params.updateId;
        try{
            const req = await fetch(`https://api.investincgroup.com/api/2/updates/${updateId}`);
            const data = await req.json();
            this.setState({data})
        } catch(e){

        }
    }


    render() {
        return <SafeAreaView style={{ height: '100%' }} >
            <KeyboardAwareScrollView style={{ padding: 0, flex: 1 }}>
                <View style={{ padding: 14 }}>
                    <ProfileSmall
                        profilePictureURL="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/wcz8emhdm7d7ac4bnwcq"
                        name="Rappi"
                    ></ProfileSmall>
                    <Spacer height={4}></Spacer>
                    <StyledText.ScreenTitle>
                        {this.state.data?.title}
                    </StyledText.ScreenTitle>
                    <Spacer height={8}></Spacer>
                    <StyledText.Subheadline style={{ color: 'grey' }}>
                        {new Date(this.state.data?.date).toLocaleDateString()}
                    </StyledText.Subheadline>
                    <Spacer height={8}></Spacer>
                    <StyledText.Body>
                        {this.state.data?.description}
                    </StyledText.Body>
                    <Spacer height={8}></Spacer>
                    <TouchableOpacity onPress={()=>{
                        Linking.openURL(this.state.data?.resource_url)
                    }}>
                        <StyledText.Body style={{color: 'rgb(0, 122, 255)'}}>Abrir estado financiero</StyledText.Body>
                    </TouchableOpacity>
                </View>
                <FinancialTable data={this.state.data?.data?.data} ></FinancialTable>


                {/* <FinancialTable data={[this.state.data]} type={this.state.data?.type || ''}></FinancialTable> */}
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