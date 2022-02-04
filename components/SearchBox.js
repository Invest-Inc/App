import { Image, SafeAreaView, View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Spacer from './Spacer';
import React from 'react';


export default class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this._input = React.createRef();
    }
    focus(){
        this._input.current.focus();
    }
    render() {
        return <View
            style={{
                backgroundColor: 'rgba(118, 118, 128, 0.12)',
                height: 36,
                borderRadius: 10,
                alignItems: 'center',
                flexDirection: 'row',
                padding: 8
            }}
        >
            <Ionicons name='search' size={17} color={'rgba(60, 60, 67, 0.6)'}></Ionicons>
            <Spacer width={4}></Spacer>
            <TextInput
                ref={this._input}
                placeholder='Buscar'
                style={{
                    fontSize: 17
                }}
                {...this.props}
            ></TextInput>
        </View>
    }
}