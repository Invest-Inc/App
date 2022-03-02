import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text, TextInput, Modal, SafeAreaView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spacer from '../components/Spacer';
import { StyledInput } from '../components/StyledInput';
import TextStyles from '../components/TextStyles';


export default function ProfileExperienceEditModal({
    data,
    onSubmit,
    onDelete
}) {
    const type = React.createRef(), 
        organization = React.createRef(), 
        start_date = React.createRef(), 
        end_date = React.createRef(), 
        name = React.createRef(), 
        description = React.createRef();

    return <KeyboardAwareScrollView
        style={{ padding: 14, height: '100%' }}
    >
        <Text style={TextStyles.Title1.bold}>Editar experiencia curricular</Text>
        <Spacer height={16}></Spacer>
        <StyledInput
            ref={type}
            label='Tipo de experiencia'
            placeholder='Trabajo'
            defaultValue={data?.type}
        ></StyledInput>
        <Spacer height={16}></Spacer>
        <StyledInput
            ref={organization}
            label='Organización'
            placeholder='Invest Inc'
            defaultValue={data?.organization}
        ></StyledInput>
        <Spacer height={16}></Spacer>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                flex: 1
            }}
        >
            <StyledInput
                ref={start_date}
                label='Fecha inicio'
                defaultValue={data?.start_date}
            ></StyledInput>
            <Spacer width={8}></Spacer>
            <StyledInput
                ref={end_date}
                label='Fecha fin'
                defaultValue={data?.end_date}
            ></StyledInput>
        </View>
        <Spacer height={16}></Spacer>
        <StyledInput
            ref={name}
            label='Nombre de la experiencia'
            defaultValue={data?.name}
        ></StyledInput>
        <Spacer height={16}></Spacer>
        <StyledInput
            ref={description}
            label='Descripción de la experiencia'
            multiline
            scrollEnabled={false}
            defaultValue={data?.description}
        ></StyledInput>
        <Spacer height={33}></Spacer>
        {
            data && <TouchableOpacity
                onPress={onDelete}
                style={{
                    paddingVertical: 14
                }}
            >
                <Text style={{ ...TextStyles.Body.regular, color: '#FF3B30' }}>Eliminar experiencia</Text>
            </TouchableOpacity>
        }
        <TouchableOpacity
            onPress={() => {
                onSubmit({
                    user_curricular_activity_id: data?.user_curricular_activity_id,
                    type: type.current.value || data?.value, 
                    organization: organization.current.value || data?.organization, 
                    start_date: start_date.current.value || data?.start_date, 
                    end_date: end_date.current.value || data?.end_date, 
                    name: name.current.value || data?.name, 
                    description: description.current.value || data?.description 
                })
            }}
            style={{
                paddingVertical: 14
            }}
        >
            <Text style={{ ...TextStyles.Body.bold, color: '#007AFF' }}>Guardar</Text>
        </TouchableOpacity>
    </KeyboardAwareScrollView>
}