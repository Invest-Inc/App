import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StyledText from '../components/StyledText';
import Spacer from '../components/Spacer';
import { Ionicons } from '@expo/vector-icons';

function CurricularExperience({
    type, 
    startDate, 
    endDate, 
    organization, 
    description, 
    name
}){
    let icon;
    switch(type){
        case 'work':
            icon = 'briefcase';
            break;
        case 'education':
            icon = 'school';
            break;
        case 'award':
            icon = 'trophy';
            break;
    }
    return <View
        style={{
            paddingVertical: 12, 
            flexDirection: 'row', 
            flex: 1
        }}
    >
        <View style={curricularStyle.iconContainer}>
            <Ionicons name={icon} color='white' size={20}></Ionicons>
        </View>
        <Spacer width={8}></Spacer>
        <View style={{flex: 1}}>
            <StyledText.BodyBlack>{organization}</StyledText.BodyBlack>
            <Spacer height={2}></Spacer>
            <StyledText.Body>{name}</StyledText.Body>
            <Spacer height={2}></Spacer>
            <StyledText.Footnote style={{color: 'grey'}}>ene. 2020 - jun. 2022</StyledText.Footnote>
            <Spacer height={4}></Spacer>
            <StyledText.Subheadline>{description}</StyledText.Subheadline>
        </View>
    </View>
}

const curricularStyle = StyleSheet.create({
    iconContainer: {
        height: 44, 
        width: 44, 
        borderRadius: 22, 
        backgroundColor: 'black',
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center'
    }
})

export default class ProfileUserScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: {},
            experience: {}
        }
    }
    async componentDidMount(){
        const username = this.props.route.params.username;
        if(username == undefined){
            this.props.navigation.goBack();
        }

        {
            const res = await fetch(`http://api.investincgroup.com/api/2/user/${username}`);
            const data = await res.json();
            this.setState({data});
        }{
            const res = await fetch(`http://api.investincgroup.com/api/2/user/${username}/curriculum`);
            const data = await res.json();
            const experience = {};
            data.forEach(d => {
                if(experience[d.type] == undefined){
                    experience[d.type] = [d]
                } else {
                    experience[d.type].push(d)
                }
            })
            this.setState({experience});
        }
    }
    render(){
        return <ScrollView>
            <View style={styles.heroContainer}>
                <Image
                    source={{uri: this.state.data?.header_picture_url}}
                    style={styles.heroBackground}
                    resizeMode='cover'
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
            </View>
            {
                Object.keys(this.state.experience).map(type => {
                    let sectionTitle;
                    switch(type){
                        case 'education':
                            sectionTitle = 'Educación';
                            break;
                        case 'work':
                            sectionTitle = 'Experiencia laboral';
                            break;
                        case 'award':
                            sectionTitle = 'Reconocimientos';
                            break;
                        default: 
                            sectionTitle = type;
                    }
                    return <View style={styles.section}>
                        <StyledText.Title1>{sectionTitle}</StyledText.Title1>
                        {
                            this.state.experience[type].map(experience => (
                                <CurricularExperience
                                    organization={experience.organization}
                                    name={experience.name}
                                    type={type}
                                    description={experience.description}
                                ></CurricularExperience>
                            ))
                        }
                    </View>
                })
            }


            
            
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