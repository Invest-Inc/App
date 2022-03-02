import { Ionicons } from '@expo/vector-icons';
import React, { createRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export class StyledInput extends React.Component {
    /**
     * 
     * @param {import('react-native').TextInputProps} props 
     */
    constructor(props) {
        super(props);
        this.input = createRef();
        this.state = {
            value: "", 
            trailingIcon: ""
        }
    }
    get value() {
        return this.state.value
    }
    showError(){
        this.setState({
            trailingIcon: 'warning'
        })
    }
    hideError(){
        this.setState({
            trailingIcon: ''
        })
    }
    render() {
        return <TouchableOpacity
            onPress={()=>{
                this.input.current.focus();
            }}
            style={{
                paddingVertical: 8, 
                flexGrow: 1, 
                flexShrink: 0
            }}
            disabled={this.props.editable == false}
        >
            <Text style={{
                fontSize: 17,
                fontWeight: '700'
            }}>{this.props.label}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center', 
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: 'grey', 
                    flexGrow: 1, 
                    paddingVertical: 4,
                }}
            >
                <TextInput
                    {...this.props}
                    ref={this.input}
                    style={{
                        fontSize: 17,
                        fontWeight: '500',
                        color: 'grey',                 
                    }}
                    onChangeText={(value) => {
                        this.setState({ value });
                        this.props.onChangeText?.(value);
                    }}
                ></TextInput>
                <Ionicons name={this.state.trailingIcon} size={14}></Ionicons>
            </View>
        </TouchableOpacity>
    }
}

