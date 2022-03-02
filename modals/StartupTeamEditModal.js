import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text, TextInput, Modal, SafeAreaView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AuthenticationContext from '../AuthenticationContext';
import ModalOverlay from '../components/ModalOverlay';
import Spacer from '../components/Spacer';
import { StyledInput } from '../components/StyledInput';
import TextStyles from '../components/TextStyles';

export default class StartupTeamEditModal extends React.Component {
    static contextType = AuthenticationContext;
    constructor(props) {
        super(props);
        this.state = {
            data: {}, 
        }
        this._modalContainer = React.createRef();
        this.user_id = React.createRef();
        this.role = React.createRef();
        this.role_description = React.createRef();
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
    async submit(){
        if(!this.props.startup_id) return;
        const headers = {
            'Authorization': `Bearer ${this.context.authToken}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify({
            startup_id: this.props.startup_id, 
            user_id: this.state.data?.user_id,
            role: this.role.current.value || this.state.data?.role, 
            role_description: this.role_description.current.value || this.state.data?.role_description
        });
        try {
            let req = this.state.data?.startup_employee_id ?
                await fetch(`http://api.investincgroup.com/api/2/startup/${this.props.startup_id}/employees/${this.state.data?.user_id}`, {method: 'PUT', headers, body})
            :
                await fetch(`http://api.investincgroup.com/api/2/startup/${this.props.startup_id}/employees/`, {method: 'POST', headers, body})
        } catch (e) {
            console.log(e)
        }
        this.close();
        this.props.onSubmit?.();
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
                <Text style={TextStyles.Title1.bold}>Editar miembros del equipo</Text>
                <Spacer height={16}></Spacer>
                <StyledInput
                    ref={this.user_id}
                    label='Id de usuario (beta)'
                    placeholder='2'
                    defaultValue={this.state.data?.user_id}
                    editable={!this.state.data?.user_id}
                ></StyledInput>
                <Spacer height={16}></Spacer>
                <StyledInput
                    ref={this.role}
                    label='Rol'
                    placeholder='Emprendedor'
                    defaultValue={this.state.data?.role}
                ></StyledInput>
                <Spacer height={16}></Spacer>
                <StyledInput
                    ref={this.role_description}
                    label='Descripción'
                    placeholder='Lorem ipsum dolor sit amet'
                    defaultValue={this.state.data?.role_description}
                    multiline={true}
                    scrollEnabled={false}
                ></StyledInput>
                <Spacer height={33}></Spacer>
                {
                    this.state.data && <TouchableOpacity
                        onPress={this.delete.bind(this)}
                        style={{
                            paddingVertical: 14
                        }}
                    >
                        <Text style={{ ...TextStyles.Body.regular, color: '#FF3B30' }}>
                            Eliminar miembro
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
