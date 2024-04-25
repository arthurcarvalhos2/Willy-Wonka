import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyledView } from './styles';
import { TouchableOpacity, Text} from 'react-native';
import { routesType } from '../../Routes/routes';


export function EditGroup() {
    const route = useRoute();
    const navigation = useNavigation<routesType>();


    return (
        <StyledView>
            <TouchableOpacity onPress={() => { navigation.navigate("Home") }}>
                <Text>Acessar</Text>
            </TouchableOpacity>
        </StyledView>
    );
}