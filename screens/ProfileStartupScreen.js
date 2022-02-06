import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Video } from 'expo-av';
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import Spacer from '../components/Spacer';
import StyledText from '../components/StyledText';
import StartupUpdate from '../components/StartupUpdate';
import { ProfileDetail } from '../components/Profile';
import TextStyles from '../components/TextStyles';

export default class ProfileStartupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            employees: [],
            updates: []
        };
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
                <Image
                    source={{ uri: this.state.data?.profile_picture_url }}
                    style={styles.profilePicture}
                ></Image>
            </View>
            <View style={styles.section}>
                <TextInput
                    style={TextStyles.LargeTitle.bold}
                    defaultValue={this.state.data?.name}
                    editable={false}
                ></TextInput>
                <Spacer height={8}></Spacer>
                <TextInput
                    style={TextStyles.Headline.semibold}
                    defaultValue={this.state.data?.summary}
                    multiline={true}
                    editable={false}
                ></TextInput>
                {/* // TODO: Update with icons */}
                <Spacer height={8}></Spacer>
                <StyledText.Headline style={{ fontWeight: '400', color: '#828282' }}>{this.state.data?.industry}</StyledText.Headline>
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
                            this.props.navigation.push('User', { username: data.User.username })
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
            </View>

            <View style={styles.section}>
                <StyledText.Title1>Actualizaciones</StyledText.Title1>
                {
                    this.state.updates?.map(update => (
                        <TouchableOpacity
                            style={{
                                paddingVertical: 14
                            }}
                            onPress={()=>{
                                switch(update.type){
                                    case 'news':
                                        return this.props.navigation.push('News', {updateId: update.startup_update_id})
                                    case 'incomestatement':
                                    case 'balancesheet':
                                        return this.props.navigation.push('Finances', {updateId: update.startup_update_id})
                                }
                            }}
                        >
                            <StartupUpdate
                                type={update.type}
                                name={
                                    {"news": "Noticias", "operations": "Operaciones", "incomestatement": "Resultados", "balancesheet": "Hoja de balance"}[update.type]
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