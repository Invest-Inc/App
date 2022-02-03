import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, ActionSheetIOS, Keyboard } from 'react-native';
import NativeActionSheetManager from 'react-native/Libraries/ActionSheetIOS/NativeActionSheetManager';


export default class ToolbarFormat extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <View style={styles.container}>
            <ScrollView horizontal contentContainerStyle={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={styles.button}>
                    <Ionicons name="add-circle-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons name="format-header-pound" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons name="format-bold" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons name="format-italic" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons name="format-underline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons name="format-strikethrough" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons name="format-quote-open" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons name="format-list-bulleted" size={24} color="black" />
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={styles.button}
                onPress={()=>{
                    Keyboard.dismiss();
                }}
            >
                <MaterialCommunityIcons name="keyboard-close" size={30} color="black" />
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50, 
        alignItems: 'center', 
        flexDirection: 'row'
    }, 
    button: {
        padding: 8
    }
})