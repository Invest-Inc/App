import React, { createRef } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-web';
import AuthenticationContext from '../AuthenticationContext';
import { ProfileMedium } from '../components/Profile';
import Spacer from '../components/Spacer';
import TextStyles from '../components/TextStyles';

export default class MenuScreen extends React.Component{
    static contextType = AuthenticationContext;
    constructor(props){
        super(props);
        this.state = {
            me: {}, 
            startups: []
        }
    }
    async componentDidMount(){
        try{
            const req_me = await fetch('https://api.investincgroup.com/api/2/me', {
                headers: {
                    'Authorization': `Bearer ${this.context.authToken}`
                }
            });
            const me = await req_me.json();
            this.setState({me});
            const req_startups = await fetch('https://api.investincgroup.com/api/2/me/roles', {
                headers: {
                    'Authorization': `Bearer ${this.context.authToken}`
                }
            })
            const startups = await req_startups.json();
            this.setState({startups})
        } catch(e){
            console.log(e);
        }

    }
    render(){
        return <ScrollView contentContainerStyle={{padding: 14}}>
            <SafeAreaView>
                <Text style={TextStyles.Title1.bold}>Mi perfil</Text>
                <TouchableOpacity
                    style={{
                        paddingVertical: 14
                    }}
                    onPress={()=>{
                        this.props.navigation.push('User', {username: this.state.me?.username})
                    }}
                >
                    <ProfileMedium
                        name={this.state.me?.name}
                        subtitle={this.state.me?.username}
                        profilePictureURL={this.state.me?.profile_picture_url}
                    ></ProfileMedium>
                </TouchableOpacity>
                <Spacer height={16}></Spacer>
                <Text style={TextStyles.Title1.bold}>Mis startups</Text>
                {
                    this.state.startups.map(({Startup}) => (
                        <TouchableOpacity
                            style={{
                                paddingVertical: 14
                            }}
                            onPress={()=>{
                                this.props.navigation.push('Startup', {startupId: Startup.startup_id});
                            }}
                        >
                            <ProfileMedium
                                name={Startup.name}
                                subtitle='Startup'
                                profilePictureURL={Startup.profile_picture_url}
                            ></ProfileMedium>
                        </TouchableOpacity>
                    ))
                }
            </SafeAreaView>
        </ScrollView>
    }
}