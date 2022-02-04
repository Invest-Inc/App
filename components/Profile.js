import React from 'react';
import { Image, Text, View, TouchableOpacity } from "react-native";
import Spacer from './Spacer';
import StyledText from './StyledText';

export function ProfileSmall({
    profilePictureURL,
    name
}) {
    return <View
        style={{
            flexDirection: 'row',
            alignItems: 'center'
        }}
    >
        <Image
            style={{
                height: 30,
                width: 30,
                borderRadius: 30
            }}
            source={{ uri: profilePictureURL }}
        ></Image>
        <Spacer width={8}></Spacer>
        <StyledText.BodySemiBold>{name}</StyledText.BodySemiBold>
    </View>
}

export function ProfileMedium({
    profilePictureURL,
    name,
    subtitle
}) {
    return <View
        style={{
            flexDirection: 'row',
            alignItems: 'center'
        }}
    >
        <Image
            style={{
                height: 30,
                width: 30,
                borderRadius: 30
            }}
            source={{ uri: profilePictureURL }}
        ></Image>
        <Spacer width={8}></Spacer>
        <View>
            <StyledText.BodySemiBold>{name}</StyledText.BodySemiBold>
            <Spacer height={2}></Spacer>
            <StyledText.Subheadline style={{color: '#979797'}}>{subtitle}</StyledText.Subheadline>
        </View>
    </View>
}