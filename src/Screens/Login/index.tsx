import { Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from "../../contexto/auth";
import {
    StyledView,
    StyledTouchableOpacity,
    TextInputStyle,
    StyledText,
    StyledTouchableOpacityLogo,
    StyledViewLogo,
    StyledTextTitle,
    StyledViewInput
} from "./styles";
import { UserLoginType } from "../../Types/user";
import { useState } from "react";


export function Login() {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const navigation = useNavigation<routesType>();

    const { control, handleSubmit } = useForm<UserLoginType>({
        defaultValues: {
            email: '',
            senha: ''
        }
    });

    async function HandleOnClick(data: UserLoginType) {
        try {
            await login(data.email, data.senha)
        } catch (err) {
            alert(`Erro ao enviar os dados: ${err}`);
        }
    }

    return (
        <StyledView>
            <StyledTextTitle>
                Willy Wonka
                <MaterialCommunityIcons name="cookie-alert-outline" size={30} color="red" />
            </StyledTextTitle>

            <Controller
                control={control}
                name="email"
                rules={{ required: "Campo e-mail obrigatório" }}
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
                            secureTextEntry={!showPassword}
                        />
                        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    </View>
                )}
            />

            <StyledTouchableOpacity onPress={handleSubmit(HandleOnClick)}>
                <Text>Acessar</Text>
            </StyledTouchableOpacity>

            <StyledText onPress={() => navigation.navigate("SignUp")}>
            Realize seu Cadastro aqui
            </StyledText>

            <StyledText onPress={() => navigation.navigate("RecoverPassword")}>
                Esqueci minha senha
            </StyledText>

        </StyledView>
    )
}
