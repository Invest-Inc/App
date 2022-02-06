import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { createRef } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default class ModalOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    open() {
        this.setState({ open: true })
    }
    close() {
        this.setState({ open: false })
    }

    render() {
        return this.state.open && <Modal transparent>
            <BlurView intensity={70} tint='light'
                style={{
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)'
                }}
            >
                <SafeAreaView style={{ padding: 20 }}>
                    <TouchableOpacity onPress={this.close.bind(this)}>
                        <Ionicons name='close' size={40}></Ionicons>
                    </TouchableOpacity>
                    {this.props.children}
                </SafeAreaView>
            </BlurView>
        </Modal>
    }
}