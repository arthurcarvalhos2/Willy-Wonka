import React from 'react';
import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {
    StyledImage,
    StyledImageBorder,
    StyledTextTitle,
    StyledTouchableOpacity,
    StyledView,
    StyledViewImage,
    TextInputStyle
} from "./styles";
import axios from 'axios';
import { GroupRegistrationType } from '../../Types/group';
import { useAuth } from '../../contexto/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from 'date-fns';


export function RegistrationGroup() {
    const [newImage, setNewImage] = useState('');
    const [date, setDate] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const { user } = useAuth();

    const navigation = useNavigation<routesType>();

    const { control, handleSubmit, setValue } = useForm<GroupRegistrationType>({
        defaultValues: {
            nome: '',
            quantidade: "",
            foto: '',
            idUsuario: ""
        }
    });

    async function HandleOnClick(data: GroupRegistrationType) {
        console.log("UsuarioGrupo: ", user.id)
        try {

            const resposta = await axios.post(
                `http://localhost:3000/Grupo`, {
                    nome: data.nome,
                    quantidade: data.quantidade,
                    foto: data.foto,
                    idUsuario: user.id
            });

            if (resposta.status == 201) {
                alert(`Grupo criado com sucesso`);
                navigation.navigate("Home");
            }
        } catch (err) {
            alert(`Erro ao enviar os dados: ${err}`);
        }
    }

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {

            setValue('foto', newImage);
            setNewImage(result.assets[0].uri);
        }
    }

    async function convertToBase64(uri: any) {
        const fileUri = FileSystem.cacheDirectory + 'tempImage.jpg';
        await FileSystem.copyAsync({
            from: uri,
            to: fileUri,
        });
        const base64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return base64;
    }

    function toggleDatePicker() {
        setShowPicker(!showPicker)
    }


    return (
        <StyledView>
            <StyledTextTitle>Cadastro de Grupo</StyledTextTitle>

            <StyledImageBorder>
                <Controller
                    control={control}
                    name="foto"
                    render={({ field }) => (
                        <StyledViewImage>

                            {newImage ? <StyledImage source={{ uri: newImage }} /> : <MaterialCommunityIcons name="image-plus" size={24} color="black" onPress={pickImage} />}
                        </StyledViewImage>
                    )}
                />
            </StyledImageBorder>

            <Controller
                control={control}
                name="nome"
                rules={{ required: "Favor informar um Nome" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Nome do grupo"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="quantidade"
                rules={{ required: "Favor informar a quantidade de pessoas", }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Quantidade de pessoas"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    </View>
                )}
            />

            <StyledTouchableOpacity onPress={handleSubmit(HandleOnClick)}>
                <Text>Finalizar Cadastro do Grupo</Text>
            </StyledTouchableOpacity>
        </StyledView>
    )
}
