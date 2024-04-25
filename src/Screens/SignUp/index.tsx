import { View, Text } from "react-native";
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
import axios from "axios";
import { UserSignUpType } from "../../Types/user";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export function SignUp() {
    const [newImage, setNewImage] = useState('');

    const navigation = useNavigation<routesType>();

    const { control, handleSubmit } = useForm<UserSignUpType>({
        defaultValues: {
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            foto: ''
        }
    });

    async function HandleOnClick(data: UserSignUpType) {

        data.foto = newImage;
        console.log("data: ", data)

        if (data.senha.toString != data.confirmarSenha.toString) {
            alert("As senhas não estão iguais!")
        }
        else {
            try {
                const resposta = await axios.post(
                    'http://localhost:3000/Usuario', {
                    nome: data.nome,
                    email: data.email,
                    senha: data.senha,
                    foto: data.foto
                },
              );
                    
                if (resposta.status == 201) {
                    alert(`Cadastro Finalizado`);
                    navigation.navigate("Login");
                }
            } catch (err) {
                alert(`Erro ao enviar os dados: ${err}`);
            }
        }
    }

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
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

    return (
        <StyledView>
            <StyledTextTitle>Cadastro</StyledTextTitle>

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
                rules={{ required: "Campo Nome obrigatório" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Informe seu Nome"
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
                name="email"
                rules={{ required: "Campo E-mail obrigatório" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Informe seu E-mail"
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
                name="senha"
                rules={{ required: "Campo Senha obrigatório" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Informe sua Senha"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            secureTextEntry
                        />
                        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="confirmarSenha"
                rules={{ required: "Obrigatório confirmar sua senha" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Confirme sua senha"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                            secureTextEntry
                        />
                        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    </View>
                )}
            />

            <StyledTouchableOpacity onPress={handleSubmit(HandleOnClick)}>
                <Text>Finalizar Cadastro</Text>
            </StyledTouchableOpacity>
        </StyledView>
    )
}