import React from 'react';
import { Image, Text, View, TouchableOpacity } from "react-native";
import Spacer from './Spacer';
import TextStyles from './TextStyles';

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
                borderRadius: 15
            }}
            source={{ uri: profilePictureURL }}
        ></Image>
        <Spacer width={8}></Spacer>
        <Text style={TextStyles.Body.semibold}>{name}</Text>
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
                height: 44,
                width: 44,
                borderRadius: 22
            }}
            source={{ uri: profilePictureURL }}
        ></Image>
        <Spacer width={8}></Spacer>
        <View>
            <Text style={TextStyles.Body.semibold}>{name}</Text>
            <Spacer height={2}></Spacer>
            <Text style={{...TextStyles.Subheadline.regular, color: '#979797'}}>{subtitle}</Text>
        </View>
    </View>
}

export function ProfileDetail({
    profilePictureURL,
    name,
    subtitle, 
    description
}){
    return <View
            style={{
                flexDirection: 'row',
                alignItems: 'flex-start'
            }}
        >
        <Image
            style={{
                height: 44,
                width: 44,
                borderRadius: 22
            }}
            source={{ uri: profilePictureURL }}
        ></Image>
        <Spacer width={8}></Spacer>
        <View
            style={{
                flex: 1
            }}
        >
            <Text style={TextStyles.Body.semibold}>{name}</Text>
            <Spacer height={2}></Spacer>
            <Text style={{...TextStyles.Subheadline.regular, color: '#979797'}}>{subtitle}</Text>
            <Spacer height={4}></Spacer>
            <Text style={TextStyles.Subheadline.regular}>{description}</Text>
        </View>
    </View>
}