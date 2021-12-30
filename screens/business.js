import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import Typography from '../components/typography';
import User from '../components/user';
import BusinessNews from '../components/businessNews';

const BusinessRoleCard = ({
    profilePictureURL,
    profileName,
    role,
    username,
    legalEntity_id,
    style,
    biography,
    onPress
}) =>
    <TouchableOpacity
        style={style}
        onPress={onPress}
    >
        <User.Tile
            profilePictureURL={profilePictureURL}
            profileName={profileName}
            role={role}
            username={username}
            legalEntity_id={legalEntity_id}
        ></User.Tile>
        <Text style={{ fontSize: 16, marginVertical: 16 }}>
            {biography}
        </Text>
    </TouchableOpacity>

export default class BusinessProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessID: this.props.route.params.businessID,
            profileName: "",
            tagline: "",
            summary: "",
            profilePictureURL: "",
            longSummary: "",
            news: [],
            roles: []
        }
    }

    async componentDidMount() {
        try {
            const resBusinessData = await fetch(`https://invest-inc.herokuapp.com/api/1/businesses/${this.state.businessID}`);
            const jsonBusinessData = await resBusinessData.json();
            this.setState({ ...jsonBusinessData })

            const resBusinessRoles = await fetch(`https://invest-inc.herokuapp.com/api/1/businesses/${this.state.businessID}/roles`);
            const jsonBusinessRoles = await resBusinessRoles.json();
            this.setState({ roles: jsonBusinessRoles });

            const resBusinessNews = await fetch(`https://invest-inc.herokuapp.com/api/1/businesses/${this.state.businessID}/news`);
            const jsonBusinessNews = await resBusinessNews.json();
            this.setState({ news: jsonBusinessNews })
        } catch (e) {
            alert(e)
        }
    }

    render() {
        return (
            <ScrollView>
                {/* Header */}
                <SafeAreaView style={{
                    padding: 24,
                    justifyContent: 'flex-end',
                    minHeight: '30vh',
                    backgroundColor: '#0B0145',
                }}>
                    <Image
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 50,
                            marginLeft: -5
                        }}
                        source={{ uri: this.state.profilePictureURL }}
                    ></Image>
                    <Typography.HeroTitle style={{
                        color: 'white',
                        marginVertical: 16
                    }}>
                        {this.state.profileName}
                    </Typography.HeroTitle>
                    <Typography.HeroParagraph style={{ color: 'white' }}>
                        {this.state.summary}
                    </Typography.HeroParagraph>
                </SafeAreaView>
                <View style={{
                    width: '100%',
                    padding: 24
                }}>
                    <Typography.SectionHeading style={{ marginVertical: 8 }}>Resumen</Typography.SectionHeading>
                    <Text
                        style={{
                            fontSize: 18,
                            lineHeight: 22
                        }}
                    >{this.state.longSummary}</Text>
                </View>
                <View style={{
                    width: '100%',
                    padding: 24
                }}>
                    <Typography.SectionHeading style={{ marginVertical: 8 }}>Equipo</Typography.SectionHeading>
                    {
                        this.state.roles.map(role => (
                            <BusinessRoleCard
                                style={{
                                    padding: 8,
                                    backgroundColor: 'white',
                                    marginVertical: 0.5
                                }}
                                profilePictureURL={role.User.profilePictureURL}
                                profileName={role.User.profileName}
                                role={role.role}
                                username={role.User.username}
                                legalEntity_id={role.User.legalEntity_id}
                                biography={role.User.biography}
                                onPress={() => {
                                    this.props.navigation.push("User", { username: role.User.username })
                                }}
                            >
                            </BusinessRoleCard>
                        ))
                    }
                </View>
                <View style={{ width: '100%', padding: 24 }}>
                    <Typography.SectionHeading style={{ marginVertical: 8 }}>Noticias</Typography.SectionHeading>
                    {
                        this.state.news.map(n => (
                            <TouchableOpacity
                                style={{
                                    padding: 8,
                                    backgroundColor: 'white',
                                    marginVertical: 0.5
                                }}
                                onPress={() => { this.props.navigation.navigate("BusinessNews", { id: n.id }) }}
                            >
                                <BusinessNews.Card
                                    businessProfileName={n.Business.profileName}
                                    businessProfilePictureURL={n.Business.profilePictureURL}
                                    pictureURL={n.pictureURL}
                                    title={n.title}
                                ></BusinessNews.Card>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}