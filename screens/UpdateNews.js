import React, { createRef } from 'react';
import { SafeAreaView, ScrollView, TextInput, View, KeyboardAvoidingView , StyleSheet } from 'react-native';
import Profile, { ProfileSmall } from '../components/Profile';
import Spacer from '../components/Spacer';
import StyledText from '../components/StyledText';

export default class UpdateNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBodyEditFocused: false, 
            data: {}
        }
    }
    async componentDidMount(){
        const updateId = this.props.route.params.updateId;
        try{
            const req = await fetch(`http://api.investincgroup.com/api/2/updates/${updateId}`);
            const data = await req.json();
            this.setState({data})
        } catch(e){

        }
    }

    render() {
        return <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={91}>
        <SafeAreaView style={{height: '100%'}}>
            <ScrollView>
                <View style={{ padding: 14 }}>
                    <ProfileSmall
                        profilePictureURL={this.state.data?.Startup?.profile_picture_url}
                        name={this.state.data?.Startup?.name}
                    ></ProfileSmall>
                    <Spacer height={4}></Spacer>
                    <StyledText.ScreenTitle>
                        {this.state.data.title}
                    </StyledText.ScreenTitle>
                    <Spacer height={10}></Spacer>
                    <StyledText.Subheadline style={{ color: 'grey' }}>
                        {new Date(this.state.data?.date).toLocaleDateString()} • 8 min de lectura
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