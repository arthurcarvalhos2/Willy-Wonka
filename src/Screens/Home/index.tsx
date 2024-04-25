import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, ActivityIndicator , ImageBackground} from 'react-native';
import { routesType } from "../../Routes/routes";
import { StyledText, StyledTouchableOpacity, StyledView } from "./styles";
import { GroupCard } from "../../Components/GroupCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { IGrupo } from "../../Types/group";
import { useAuth } from "../../contexto/auth";


export function Home() {
    const [grupos, setGrupos] = useState<IGrupo[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [allGroupsLoaded, setAllGroupsLoaded] = useState(false);

    const { user } = useAuth();

    const navigation = useNavigation<routesType>();

    useEffect(() => {
        try {
            getGruposUsuario()
        } catch (error) {
            console.log("Erro ao enviar os dados: ", error);
        }
    }, [])

    async function getGruposUsuario() {
        console.log("Usuario: ", user)
        try {
            const apiUrl = `http://localhost:3000/Grupo?idUsuario=${user.id}`;
            const resposta = await axios.get(apiUrl);
            console.log("resposta: ", resposta)
            setGrupos(resposta.data)
        } catch (err) {
            alert(`Erro ao enviar os dados: ${err}`);
        }
    }

    async function loadMoreGroups() {
        if (loading || allGroupsLoaded) return;

        try {
            setLoading(true);
            const nextPageUrl = `http://localhost:3000/Grupo?idUsuario=${user.id}?page=${page + 1}`;
            const response = await axios.get(nextPageUrl);
            const newGroups = response.data;

            if (newGroups.length > 0) {
                setGrupos([...grupos, ...newGroups]);
                setPage(page + 1);
            } else {
                setAllGroupsLoaded(true);
            }
        } catch (error) {
            console.error("Erro ao carregar mais grupos:", error);
        } finally {
            setLoading(false);
        }
    }

    function isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }: any) {
        const paddingToBottom = 3;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    return (
        <StyledView>

            <ScrollView
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent) && !loading && !allGroupsLoaded) {
                        loadMoreGroups();
                    }
                }}
                scrollEventThrottle={400}
            >
                {grupos.map((grupo) => (
                    <GroupCard key={grupo.id} data={grupo} />
                ))}
                {loading && <ActivityIndicator size="large" />}
            </ScrollView>
        
        </StyledView>
    );
};