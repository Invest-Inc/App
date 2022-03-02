import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Video } from 'expo-av';
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import Spacer from '../components/Spacer';
import StyledText from '../components/StyledText';
import StartupUpdate from '../components/StartupUpdate';
import { ProfileDetail } from '../components/Profile';
import TextStyles from '../components/TextStyles';
import Button from '../components/Button';
import AuthenticationContext from '../AuthenticationContext';
import ModalOverlay from '../components/ModalOverlay';
import StartupTeamEditModal from '../modals/StartupTeamEditModal';
import StartupUpdateEditModal from '../modals/StartupUpdateEditModal';

export default class ProfileStartupScreen extends React.Component {
    static contextType = AuthenticationContext;
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            employees: [],
            updates: [],
            editMode: false
        };
        this.profileTeamModal = React.createRef();
        this.profileUpdateModal = React.createRef();

    }
    async componentDidMount() {
        const startupId = this.props.route.params.startupId || 3;
        {
            const res = await fetch(`http://api.investincgroup.com/api/2/startup/${startupId}`);
            const data = await res.json();
            this.setState({ data });
        }
        {
            const res = await fetch(`http://api.investincgroup.com/api/2/startup/${startupId}/employees`);
            const employees = await res.json();
            this.setState({ employees });
        }
        {
            const res = await fetch(`http://api.investincgroup.com/api/2/startup/${startupId}/updates`);
            const updates = await res.json();
            this.setState({ updates });
        }
    }

    renderActionButton() {
        if (this.state.data?.current_user_permissions == 'none') {
            if (this.state.following)
                return <Button label="Dejar de seguir" backgroundColor={'rgb(0, 122, 255)'} textColor={'white'} ></Button>
            else
                return <Button label="Seguir" backgroundColor={'rgb(0, 122, 255)'} textColor={'white'} ></Button>
        } else {
            if (this.state.editMode)
                return <Button label="Guardar" backgroundColor={'rgb(0, 122, 255)'} textColor={'white'} onPress={this.submitEdit.bind(this)}></Button>
            else
                return <Button label="Editar" backgroundColor={'rgb(0, 122, 255)'} textColor={'white'} onPress={this.startEdit.bind(this)}></Button>

        }
    }

    async unfollow() {

    }
    async follow() {

    }
    startEdit() {
        this.setState({ editMode: true })
    }

    async submitEdit() {
        try {
            const req = await fetch(`http://api.investincgroup.com/api/2/startup/${this.state.data.startup_id}`, {
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

    render() {
        return <ScrollView>
            <View style={styles.heroContainer}>
                <Image
                    source={{ uri: this.state.data?.header_picture_url }}
                    style={styles.heroBackground}
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
                    style={TextStyles.LargeTitle.bold}
                    defaultValue={this.state.data?.name}
                    editable={this.state.editMode}
                    scrollEnabled={false}
                    onChangeText={text => this.state.data.name = text}
                ></TextInput>
                <Spacer height={8}></Spacer>
                <TextInput
                    style={TextStyles.Headline.semibold}
                    defaultValue={this.state.data?.summary}
                    multiline={true}
                    editable={this.state.editMode}
                    scrollEnabled={false}
                    onChangeText={text => this.state.data.summary = text}
                ></TextInput>
                {/* // TODO: Update with icons */}
                <Spacer height={8}></Spacer>
                <Text style={{ ...TextStyles.Headline.semibold, color: '#828282' }}>
                    {this.state.data?.industry}
                </Text>
            </View>
            <View style={styles.section}>
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
                    <TouchableOpacity
                        onPress={() => {
                            if(!this.state.editMode) this.props.navigation.push('User', { username: data.User.username })
                            else this.profileTeamModal.current.openWithData(data);
                        }}
                        style={{
                            paddingVertical: 12
                        }}
                    >
                        <ProfileDetail
                            profilePictureURL={data.User.profile_picture_url}
                            name={data.User.name}
                            subtitle={data.role}
                            description={data.role_description}
                        ></ProfileDetail>
                    </TouchableOpacity>
                ))}
                {
                    this.state.data?.current_user_permissions?.permissions != 'None' && <TouchableOpacity
                        onPress={() => {
                            this.profileTeamModal.current.open();
                        }}
                    >
                        <Text style={{ ...TextStyles.Body.semibold, color: '#007AFF' }}>
                            Agregar miembro de equipo
                        </Text>
                    </TouchableOpacity>
                }
            </View>

            <View style={styles.section}>
                <StyledText.Title1>Actualizaciones</StyledText.Title1>
                {
                    this.state.updates?.map(update => (
                        <TouchableOpacity
                            style={{
                                paddingVertical: 14
                            }}
                            onPress={() => {
                                switch (update.type) {
                                    case 'news':
                                        return this.props.navigation.push('News', { updateId: update.startup_update_id })
                                    case 'incomestatement':
                                    case 'balancesheet':
                                        return this.props.navigation.push('Finances', { updateId: update.startup_update_id })
                                }
                            }}
                        >
                            <StartupUpdate
                                type={update.type}
                                name={
                                    { "news": "Noticias", "operations": "Operaciones", "incomestatement": "Resultados", "balancesheet": "Hoja de balance" }[update.type]
                                }
                                date={new Date(update.date).toLocaleDateString()}
                                title={update.title}
                            >
                                {
                                    update.type == 'news' && <StyledText.Subheadline>{update.description}</StyledText.Subheadline>
                                }
                            </StartupUpdate>
                        </TouchableOpacity>
                    ))
                }
                {
                    this.state.data?.current_user_permissions?.permissions != 'None' && <TouchableOpacity
                        onPress={() => {
                            this.profileUpdateModal.current.open();
                        }}
                    >
                        <Text style={{ ...TextStyles.Body.semibold, color: '#007AFF' }}>
                            Agregar nueva actualización
                        </Text>
                    </TouchableOpacity>
                }
            </View>

            <StartupTeamEditModal
                ref={this.profileTeamModal}
                startup_id={this.state.data?.startup_id}
                onSubmit={this.forceUpdate.bind(this)}
                onDelete={this.forceUpdate.bind(this)}
            ></StartupTeamEditModal>

            <StartupUpdateEditModal 
                ref={this.profileUpdateModal}
                startup_id={this.state.data?.startup_id}
            ></StartupUpdateEditModal>
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