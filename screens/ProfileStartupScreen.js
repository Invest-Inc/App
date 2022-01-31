import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Video } from 'expo-av';
import { ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Spacer from '../components/Spacer';
import StyledText from '../components/StyledText';
import StartupUpdate from '../components/StartupUpdate';

function StartupEmployee({
    profilePictureURL, 
    name, 
    role, 
    roleDescription, 
    onPress
}){
    return <TouchableOpacity
        style={{
            paddingVertical: 12, 
            flexDirection: 'row'
        }}
        disabled={!onPress}
        onPress={onPress}
    >
        <Image
            style={startupEmployeeStyle.profilePicture}
            source={{uri: profilePictureURL}}
        ></Image>
        <Spacer width={8}></Spacer>
        <View style={{flex: 1}}>
            <StyledText.Body>
                {name}
            </StyledText.Body>
            <StyledText.SubheadlineBold style={{color: 'grey'}}>
                {role}
            </StyledText.SubheadlineBold>
            <Spacer height={8}></Spacer>
            <StyledText.Subheadline style={{color: 'grey'}}>
                {roleDescription}
            </StyledText.Subheadline>
        </View>
    </TouchableOpacity>
}

const startupEmployeeStyle = StyleSheet.create({
    profilePicture: {
        height: 44, 
        width: 44, 
        borderRadius: 22, 
        backgroundColor: 'black'
    }
})

export default class ProfileStartupScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: null, 
            employees: [], 
            updates: []
        };
    }
    async componentDidMount(){
        {
            const res = await fetch('http://api.investincgroup.com/api/2/startup/3');
            const data = await res.json();
            this.setState({data});
        }
        {
            const res = await fetch('http://api.investincgroup.com/api/2/startup/3/employees');
            const employees = await res.json();
            this.setState({employees});
        }
        {
            const res = await fetch('http://api.investincgroup.com/api/2/startup/13/updates');
            const updates = await res.json();
            this.setState({updates});
        }
    }
    render(){
        return <ScrollView>
            <View style={styles.heroContainer}>
                <Image
                    source={{uri: this.state.data?.header_picture_url}}
                    style={styles.heroBackground}
                ></Image>
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
                    style={styles.heroBackground}
                ></LinearGradient>
                <Image
                    source={{uri: this.state.data?.profile_picture_url}}
                    style={styles.profilePicture}
                ></Image>
            </View>
            <View style={styles.section}>
                <StyledText.LargeTitle>{this.state.data?.name}</StyledText.LargeTitle>
                <Spacer height={8}></Spacer>
                <StyledText.Headline>{this.state.data?.summary}</StyledText.Headline>
                {/* // TODO: Update with icons */}
                <Spacer height={8}></Spacer>
                <StyledText.Headline style={{fontWeight: '400', color: '#828282'}}>{this.state.data?.industry}</StyledText.Headline>
                <Spacer height={8}></Spacer>
                <Video 
                    style={{
                        aspectRatio: 1.77, 
                        backgroundColor: 'green',
                        borderRadius: 16
                    }}
                    source={{
                        uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    }}
                    useNativeControls
                ></Video>
            </View>
            <View style={styles.section}>
                <StyledText.Title1>Equipo</StyledText.Title1>
                {this.state.employees?.map(data => (
                    <StartupEmployee
                        profilePictureURL={data.User.profile_picture_url}
                        name={data.User.name}
                        role={data.role}
                        roleDescription={data.role_description}
                        onPress={()=>{
                            this.props.navigation.push('User', {username: data.User.username})
                        }}
                    ></StartupEmployee>
                ))}
            </View>

            <View style={styles.section}>
                <StyledText.Title1>Actualizaciones</StyledText.Title1>
                <StartupUpdate
                    style={{
                        paddingVertical: 12
                    }}
                    type='news'
                    onPress={()=>{
                        this.props.navigation.push('News')
                    }}
                ></StartupUpdate>
            </View>

        </ScrollView>
    }
}

const styles = StyleSheet.create({
    heroContainer: {
        height: 240, 
        padding: 14, 
        marginBottom: 18, 
        justifyContent: 'flex-end', 
        alignItems: 'center',

        backgroundColor: 'red'
    }, 
    heroBackground: {
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0
    }, 
    heroActionsContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    }, 
    profilePicture: {
        height: 100, 
        width: 100, 
        borderRadius: 50, 
        backgroundColor: 'black',
        position: 'absolute',
        bottom: -30, 
        left: 12
    }, 
    section: {
        padding: 14
    }
})