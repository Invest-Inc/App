import React, { createRef } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";

export class StyledInput extends React.Component{
    constructor(props){
        super(props);
        this.input = createRef();
        this.state = {
            value: ""
        }
    }
    get value(){
        return this.state.value
    }

    render(){
        return <View
            style={{
                paddingVertical: 8
            }}
        >
            <Text style={{
                fontSize: 17, 
                fontWeight: '700'
            }}>{this.props.label}</Text>
            <TextInput
                {...this.props}
                ref={this.input}
                style={{
                    paddingVertical: 4,
                    fontSize: 17, 
                    fontWeight: '500',
                    color: 'grey',
                    borderBottomWidth: StyleSheet.hairlineWidth, 
                    borderBottomColor: 'grey'
                }}
                onChangeText={(value) => {
                    this.setState({value})
                }}
            ></TextInput>
        </View>
    }
}

