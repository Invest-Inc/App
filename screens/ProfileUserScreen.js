import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text, TextInput, Modal, SafeAreaView, TouchableOpacity, Touchable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StyledText from '../components/StyledText';
import Spacer from '../components/Spacer';
import { Ionicons } from '@expo/vector-icons';
import AuthenticationContext from '../AuthenticationContext';
import Button from '../components/Button';
import CurricularExperience from '../components/CurricularExperience';
import TextStyles from '../components/TextStyles';
import ModalOverlay from '../components/ModalOverlay';
import ProfileExperienceEditModal from '../modals/ProfileExperienceEditModal';



export default class ProfileUserScreen extends React.Component {
    static contextType = AuthenticationContext;
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            data: {},
            experience: {}, 
            profileExperienceModalData: undefined
        }
        this.name = React.createRef();
        this.summary = React.createRef();

        this.profileExperienceModal = React.createRef();
    }
    async componentDidMount() { 
        const username = this.props.route.params.username;
        if (username == undefined) this.props.navigation.goBack();

        {
            const res = await fetch(`https://api.investincgroup.com/api/2/user/${username}`, {
                headers: {
                    'Authorization': `Bearer ${this.context.authToken}`
                }
            });
            const data = await res.json();
            this.setState({ data });
        } {
            const res = await fetch(`https://api.investincgroup.com/api/2/user/${username}/curriculum`);
            const data = await res.json();
            const experience = {};
            data.forEach(d => {
                if (experience[d.type] == undefined) {
                    experience[d.type] = [d]
                } else {
                    experience[d.type].push(d)
                }
            })
            this.setState({ experience });
        }

    }
    renderActionButton() {
        // If is current user
        if (this.state.data.is_current_user) {
            if (this.state.editMode) {
                return <Button label="Guardar" backgroundColor={'rgb(0, 122, 255)'} textColor={'white'} onPress={this.submitEdit.bind(this)}></Button>
            } else {
                return <Button label="Editar" backgroundColor={'rgb(0, 122, 255)'} textColor={'white'} onPress={this.startEdit.bind(this)}></Button>
            }
        } else {
            if (this.state.data.following) {
                return <Button label="Dejar de seguir" backgroundColor={'rgb(0, 122, 255)'} textColor={'white'} onPress={this.unfollow.bind(this)}></Button>
            } else {
                return <Button label="Seguir" backgroundColor={'rgb(0, 122, 255)'} textColor={'white'} onPress={this.follow.bind(this)}></Button>
            }
        }
    }
    async follow() {
        if (this.state.data.username == undefined) return;
        try {
            const req = await fetch(`https://api.investincgroup.com/api/2/user/${this.state.data.username}/follow`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.context.authToken}`
                }
            });
            const res = await req.json();
            if (res.message == "Success")
                this.setState({ data: { ...this.state.data, following: true } });
        } catch (e) {
            console.log(e)
        }
    }
    async unfollow() {
        if (this.state.data.username == undefined) return;
        try {
            const req = await fetch(`https://api.investincgroup.com/api/2/user/${this.state.data.username}/unfollow`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.context.authToken}`
                }
            });
            const res = await req.json();
            if (res.message == "Success")
                this.setState({ data: { ...this.state.data, following: false } })
        } catch (e) {
            console.log(e)
        }
    }
    startEdit() {
        this.setState({ editMode: true })
    }
    async submitEdit() {
        try {
            const req = await fetch(`https://api.investincgroup.com/api/2/me`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.context.authToken}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.data)
            });
            const res = await req.json();
            if (res.message == "Success") this.setState({ editMode: false })
        } catch (e) {
            console.log(e);
        }
    }
    async createExperience(data){
        try{
            const req = await fetch(`https://api.investincgroup.com/api/2/me/curriculum`, {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${this.context.authToken}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const res = await req.json();
            if(res.message == "Success") this.forceUpdate();
        } catch(e){
            console.log(e)
        }
    }
    
    async updateExperience(data){
        try{
            const req = await fetch(`https://api.investincgroup.com/api/2/me/curriculum/${data.user_curricular_activity_id}`, {
                method: 'PUT', 
                headers: {
                    'Authorization': `Bearer ${this.context.authToken}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const res = await req.json();
            if(res.message == "Success") this.forceUpdate();
        } catch(e){
            console.log(e)
        }
    }

    async deleteExperience(data){
        try{
            const req = await fetch(`https://api.investincgroup.com/api/2/me/curriculum/${data.user_curricular_activity_id}`, {
                method: 'DELETE', 
                headers: {
                    'Authorization': `Bearer ${this.context.authToken}`,
                },
            });
            const res = await req.json();
            alert(JSON.stringify(res));
        } catch(e){
            console.log(e)
        }
    }

    render() {
        return <ScrollView>
            <View style={styles.heroContainer}>
                <Image
                    source={{ uri: this.state.data?.header_picture_url }}
                    style={styles.heroBackground}
                    resizeMode='cover'
                ></Image>
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
                    style={styles.heroBackground}
                ></LinearGradient>
                {this.renderActionButton()}
                <Image
                    source={{ uri: this.state.data?.profile_picture_url }}
                    style={styles.profilePicture}
                ></Image>
            </View>
            <View style={styles.section}>
                <TextInput
                    ref={this.name}
                    style={TextStyles.LargeTitle.bold}
                    defaultValue={this.state.data?.name}
                    onChangeText={text => this.state.data.name = text}
                    multiline={true}
                    editable={this.state.editMode}
                    scrollEnabled={false}
                ></TextInput>
                <Spacer height={8}></Spacer>
                <TextInput
                    ref={this.summary}
                    style={TextStyles.Headline}
                    defaultValue={this.state.data?.summary}
                    onChangeText={text => this.state.data.summary = text}
                    multiline={true}
                    editable={this.state.editMode}
                    scrollEnabled={false}
                ></TextInput>
            </View>
            {
                this.state.data?.is_current_user && <TouchableOpacity style={styles.section}
                    onPress={()=>{
                        this.setState({profileExperienceModalData: undefined})
                        this.profileExperienceModal.current.open()
                    }}
                >
                    <Text style={{...TextStyles.Body.semibold, color: '#007AFF'}}>Agregar experiencia curricular...</Text>
                </TouchableOpacity>
            }
            {
                Object.keys(this.state.experience).map(type => {
                    let sectionTitle;
                    switch (type) {
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
                        <Text style={TextStyles.Title1.bold}>{sectionTitle}</Text>
                        {
                            this.state.experience[type].map(experience => (
                                <TouchableOpacity 
                                    style={{ paddingVertical: 8 }}
                                    disabled={!this.state.data?.is_current_user}
                                    onPress={()=>{
                                        this.setState({profileExperienceModalData: experience})
                                        this.profileExperienceModal.current.open();
                                    }}
                                >
                                    <CurricularExperience
                                        organization={experience.organization}
                                        name={experience.name}
                                        type={type}
                                        description={experience.description}
                                    ></CurricularExperience>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                })
            }


            <ModalOverlay
                ref={this.profileExperienceModal}
            >
                <ProfileExperienceEditModal
                    data={this.state.profileExperienceModalData}
                    onSubmit={data=>{
                        this.profileExperienceModal.current.close();
                        if(!data.user_curricular_activity_id)
                            this.createExperience(data);
                        else
                            this.updateExperience(data);
                    }}
                    onDelete={data=>{
                        this.profileExperienceModal.current.close();
                        this.deleteExperience(data);
                    }}
                ></ProfileExperienceEditModal>
            </ModalOverlay>

        </ScrollView>
    }
}


const styles = StyleSheet.create({
    heroContainer: {
        height: 240,
        padding: 14,
        marginBottom: 18,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
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