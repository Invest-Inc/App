import React from 'react';
import { Image, Text, View } from "react-native";
import StyledText from './StyledText';

class SmallBaddge extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
                style={{
                    height: 30, 
                    width: 30, 
                    borderRadius: 15, 
                    marginRight: 4, 
                    marginLeft: -2
                }}
                source={{uri: this.props.profilePictureURL}}
            ></Image>
            <StyledText.Headline style={{marginLeft: 4}}>{this.props.name}</StyledText.Headline>
        </View>
    }
}

const Profile = {
    SmallBaddge
}

export default Profile;