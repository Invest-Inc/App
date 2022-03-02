import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text, TextInput, Modal, SafeAreaView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalOverlay from '../components/ModalOverlay';
import Spacer from '../components/Spacer';
import { StyledInput } from '../components/StyledInput';
import TextStyles from '../components/TextStyles';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default class StartupUpdateEditModal extends React.Component {
    constructor(props) {
        super(props);
        this._modalContainer = React.createRef();
        this.state = {
            fileName: undefined, 
            fileData: undefined
        }
    }
    open() {
        this._modalContainer?.current?.open?.();
    }
    openWithData(data){
        this.setState({data})
        this.open();
    }
    close() {
        this._modalContainer?.current?.close?.();
    }

    async loadFile(){
        try{
            const documentData = await DocumentPicker.getDocumentAsync();
            if(documentData.type == 'cancel') return;
            const data = await FileSystem.readAsStringAsync(documentData.uri)
            this.setState({
                fileName: documentData.name, 
                fileData: data
            });
        } catch(e){
            alert(e)
        }
    }
    async submit(){

    }
    async delete(){
        
    }

    render() {
        return <ModalOverlay
            ref={this._modalContainer}
        >
            <KeyboardAwareScrollView
                style={{
                    minHeight: '100%',
                    padding: 14
                }}
            >
                <Text style={TextStyles.Title1.bold}>Actualización de startup</Text>
                <Spacer height={4}></Spacer>
                <Text style={TextStyles.Body.regular}>
                    Las actualizaciones de startups ayudan a tus inversionistas y gente interesada en tu startup saber cómo va evolucionando. Asegúrate de tener datos concisos y verídicos siguiendo el formato de Invest Inc. Si lo prefieres, adicionalmente puedes incluir un enlace con información más detallada.
                </Text>
                <Spacer height={16}></Spacer>
                <StyledInput
                    label="Título"
                    placeholder="Reporte"
                ></StyledInput>
                <StyledInput
                    label="Fecha"
                    placeholder="DD/MM/AAAA"
                ></StyledInput>
                <StyledInput
                    label="Descripción"
                    placeholder="Lorem ipsum dolor sit amet"
                ></StyledInput>
                <StyledInput
                    label="URL con datos adicionales"
                    placeholder="https://example.com"
                ></StyledInput>
                <Spacer height={10}></Spacer>
                <Text style={TextStyles.Headline.semibold}>Archivo con datos</Text>
                <Spacer height={4}></Spacer>
                <Text style={TextStyles.Body.regular}>
                    Sube aquí un archivo .json con los datos siguiendo la estructura de Invest Inc. G
                </Text>
                <Spacer height={10}></Spacer>
                <TouchableOpacity
                    onPress={this.loadFile.bind(this)}
                >
                    <Text style={{...TextStyles.Body.semibold}}>{ this.state.fileName || "Adjuntar archivo" }</Text>
                </TouchableOpacity>
                <Spacer height={33}></Spacer>
                {
                    this.state.data && <TouchableOpacity
                        onPress={this.delete.bind(this)}
                        style={{
                            paddingVertical: 14
                        }}
                    >
                        <Text style={{ ...TextStyles.Body.regular, color: '#FF3B30' }}>
                            Eliminar actualización
                        </Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    style={{
                        paddingVertical: 14
                    }}
                    onPress={this.submit.bind(this)}
                >
                    <Text style={{ ...TextStyles.Body.bold, color: '#007AFF' }}>Guardar</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </ModalOverlay>
    }
}

