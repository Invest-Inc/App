import React, { createRef } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Image } from "react-native";
import StyledText from './StyledText';

class CardDescription extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <View
            style={{
                flexDirection: 'row', 
                alignItems: 'flex-start',
                ...this.props.style
            }}
        >
            <Image
                style={{ 
                    width: 44, 
                    height: 44, 
                    borderRadius: 22, 
                    marginRight: 4
                }}
                source={{uri: this.props.profilePictureURL}}
            ></Image>
            <View
                style={{
                    marginLeft: 4, 
                    flex: 1
                }}
            >
                <StyledText.Body>
                    {this.props.name}
                </StyledText.Body>
                <StyledText.Subheadline style={{fontWeight: 'bold', color: 'grey'}}>
                    {this.props.subtitle}
                </StyledText.Subheadline>
                <StyledText.Subheadline style={{marginTop: 8, color: 'grey'}}>
                    {this.props.description}
                </StyledText.Subheadline>
            </View>
        </View>
    }
}

const User = {
    CardDescription
}

export default User;