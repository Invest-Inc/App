import React, { createRef } from 'react';
import { Image, SafeAreaView, View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProfileMedium } from '../components/Profile';
import SearchBox from '../components/SearchBox';
import StyledText from '../components/StyledText';

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.searchBox = React.createRef();
        this.state = {
            results: [], 
            q: ''
        }
    }
    componentDidMount() {
        this.searchBox.current.focus();
    }
    async search(q){
        if(q == '') return;
        try{
            const req = await fetch(`http://api.investincgroup.com/api/2/search?q=${q}`);
            const results = await req.json();
            this.setState({results});
            console.log(results)
        } catch(e){
            alert(e)
        }
    }
    render() {
        return <SafeAreaView>
            <View style={{
                paddingHorizontal: 14, 
                paddingVertical: 8, 
                borderBottomColor: '#979797', 
                borderBottomWidth: StyleSheet.hairlineWidth, 
                backgroundColor: 'white'
            }}>
                <SearchBox
                    ref={this.searchBox}
                    defaultValue={this.props.route?.params?.q}
                    onChangeText={(q)=>{
                        this.search(q);
                    }}
                ></SearchBox>
            </View>
            <ScrollView contentContainerStyle={{height: '100%'}}>
                    {
                        this.state.results?.map?.(result => (
                            <TouchableOpacity
                                style={{
                                    padding: 14, 
                                    borderBottomWidth: StyleSheet.hairlineWidth, 
                                    borderBottomColor: '#979797'
                                }}
                                onPress={()=>{
                                    if(result.type == 'user') return this.props.navigation.navigate('User', {username: result.username});
                                    if(result.type == 'startup') return this.props.navigation.navigate('Startup', {startupId: result.startup_id});
                                }}
                            >
                                <ProfileMedium
                                    name={result.name}
                                    profilePictureURL={result.profile_picture_url}
                                    subtitle={result.type == 'startup' ? 'Startup' : result.username}
                                ></ProfileMedium>
                            </TouchableOpacity>
                        ))
                    }
            </ScrollView>
        </SafeAreaView>
    }
}