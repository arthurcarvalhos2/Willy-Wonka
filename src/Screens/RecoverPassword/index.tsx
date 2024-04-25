import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { routesType } from "../../Routes/routes";
import { Controller, useForm } from "react-hook-form";
import { StyledText, StyledTouchableOpacity, StyledView, StyledViewButton, TextInputStyle } from "./styles";

type RecoverPasswordType = {
    email: string;
}

export function RecoverPassword() {
    const navigation = useNavigation<routesType>();

    const { control, handleSubmit, formState: { errors } } = useForm<RecoverPasswordType>({
        defaultValues: {
            email: ''
        }
    });

    function HandleOnClick(data: RecoverPasswordType) {
        navigation.navigate("Login");
    }

    return (
        <StyledView>
            <StyledText>Esqueceu a Senha?</StyledText>
            <Controller
                control={control}
                name="email"
                rules={{ required: "Campo obrigatório" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Informe o e-mail cadastrado"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{color: 'red'}}>{error.message}</Text>}
                    </View>
                )}
            />

                <StyledTouchableOpacity onPress={handleSubmit(HandleOnClick)}>
                    <Text>Enviar Email</Text>
                </StyledTouchableOpacity>

            <StyledViewButton>
                <StyledTouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                    <Text>Voltar para o Login</Text>
                </StyledTouchableOpacity>
            </StyledViewButton>

        </StyledView>
    )
}