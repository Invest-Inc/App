import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import Typography from '../components/typography';

function SocialProfileIcon({
	provider, url
}){
	return(
		<TouchableOpacity
			style={{
				alignItems: 'center',
				marginVertical: 5,
				marginHorizontal: 10
			}}
			onPress={async ()=>{
				if(url) await Linking.openURL(url)
			}}
		>
			<MaterialCommunityIcons name={provider} size={32} color={"rgba(136, 0, 255, 1)"}></MaterialCommunityIcons>
		</TouchableOpacity>
	)
}

function InvestmentCard({
    businessProfileImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Rappi_logo.svg/200px-Rappi_logo.svg.png",
    date = "26 nov. 2021",
    amount = 200, 
    businessName = "Rappi, Inc",
    businessSummary = "Lorem ipsum dolor sit amet"
}){
    return(
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                {/* Business Profile Picture */}
                <Image
                    style={{
                        height: 48, 
                        width: 48,
                        borderRadius: 24,
                        backgroundColor: 'white',
                        marginLeft: -2
                    }}
                    source={{uri: businessProfileImg}}
                ></Image>
                {/* Investment amount and date */}
                <View style={{alignItems: 'flex-end'}}>
                    <Text>{date}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 18}}>${amount}</Text>
                        <Text style={{fontWeight: '100'}}> USD</Text>
                    </View>
                </View>
            </View>
            <Text
                style={{
                    marginVertical: 10,
                    fontSize: 20, 
                    fontWeight: '600'
                }}
            >{businessName}</Text>
            <Text
                style={{
                    fontSize: 14
                }}
            >{businessSummary}</Text>
        </View>
    )
}

export default class UserProfileScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: this.props.route.params.username || "",
            profiles: [],
            investments: [],
            profileName: "", 
            biography: "",
            profilePictureURL: ""
        }
    }
    
    async componentDidMount(){
        try{
            const resUserData = await fetch(`https://invest-inc.herokuapp.com/api/1/users/${this.state.username}`);
            const jsonUserData = await resUserData.json();
            this.setState({
                profileName: jsonUserData?.profileName,
                biography: jsonUserData?.biography,
                profilePictureURL: jsonUserData?.profilePictureURL
            })
        } catch(e){
            alert(1)
            alert(e)
        }
        try{
            const resUserProfiles = await fetch(`https://invest-inc.herokuapp.com/api/1/users/${this.state.username}/profiles`);
            const jsonUserProfiles = await resUserProfiles.json();
            this.setState({profiles: jsonUserProfiles})
        } catch(e){
            alert(2)
            alert(e)
        }
        try{
            const resUserInvestments = await fetch(`https://invest-inc.herokuapp.com/api/1/users/${this.state.username}/investments`);
            const jsonUserInvestments = await resUserInvestments.json();
            this.setState({
                investments: jsonUserInvestments
                    ?.sort((a, b) => new Date(b.date) - new Date(a.date))
                    ?.map(inv => ({
                        businessProfileImg: inv.Business.profilePictureURL,
                        businessName: inv.Business.profileName, 
                        businessSummary: inv.Business.summary, 
                        amount: inv.valueUSD, 
                        date: new Date(inv.date).toLocaleDateString(),
                        businessID: inv.Business.legalEntity_id
                    }))
            })            
        } catch(e){
            alert(3)
            alert(e)
        }
    }

    render(){
        return(
            <ScrollView>
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    {/* Profile picture */}
                    <Image 
                        source={{uri: this.state.profilePictureURL}}
                        style={{
                            height: 160,
                            width: 160,
                            borderRadius: 80,
                            marginVertical: 10
                        }}	
                    ></Image>
                    {/* Profile name */}
                    <Typography.HeroTitle>{this.state.profileName}</Typography.HeroTitle>
                    {/* Profile Summary */}
                    <Typography.HeroParagraph
                        style={{
                            padding: 6, 
                            textAlign: 'center'
                        }}
                    >{this.state.biography}</Typography.HeroParagraph>
                    {/* Social profiles */}
                    <View
                        style={{
                            flexDirection: 'row',
                            padding: 10,
                            width: '100%',
                            justifyContent: 'center'
                        }}
                    >
                        {this.state.profiles?.map?.(({provider, url}) => 
                            <SocialProfileIcon provider={provider} url={url}></SocialProfileIcon>
                        )}
                    </View>
                    {/* Investments */}
                    <View style={{
                        width: '100%',
                        justifyContent: 'flex-start', 
                    }}>
                        <Typography.SectionHeading style={{
                            marginVertical: 8, 
                            marginHorizontal: 16
                        }}>Inversiones</Typography.SectionHeading>
                        <View
                            style={{
                                flexDirection: 'row', 
                                flexWrap: 'wrap',
                                justifyContent: 'space-evenly',
                                padding: 8
                            }}
                        >
                            {
                                this.state.investments?.map?.((item)=>
                                    <TouchableOpacity
                                        style={{
                                            padding: 10, 
                                            backgroundColor: 'snow', 
                                            flexBasis: 150, 
                                            flex: 1, 
                                            margin: 4
                                        }}
                                        onPress={()=>{
                                            this.props.navigation.navigate("Business", {businessID: item.businessID})
                                        }}
                                    >
                                        <InvestmentCard
                                        {...item}
                                        ></InvestmentCard>
                                    </TouchableOpacity>
                                )
                            }
                        </View>


                        
                    </View>
                </View>
            </ScrollView>
        )
    }
}