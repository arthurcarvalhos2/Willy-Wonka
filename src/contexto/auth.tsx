// auth.tsx

import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { IUser } from '../Types/user';


interface AuthContextType {
    authenticated: boolean;
    user: IUser;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signed: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<IUser>({
        id: "",
        foto: "",
        nome: "",
        email: "",
        senha: ""
       
    });
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const recoveredUser = localStorage.getItem("amigochocolate:user");

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }

        setLoading(false);
    }, []);

    const login = async (email: string, senha: string) => {
        console.log("email: ", email + "  senha: ", senha)
        try {
            const resposta = await axios.get(
                `http://localhost:3000/Usuario?email=${email}&senha=${senha}`);
                console.log("resposta auth: ", resposta.data)
            if (resposta.data.length !== 0) {
                setUser(resposta.data[0]);
                console.log("user auth : ", user)
                setSigned(true)

                localStorage.setItem("amigochocolate:user", JSON.stringify(resposta.data));
                navigation.navigate('Home');
            } 
            else {
                alert("Usuário não Encontrado")
            }
        } catch (err) {
            console.log("Erro ao enviar os dados: ", err);
        }
    };

    const logout = () => {
        setUser({
            id: "",
            foto: "",
            nome: "",
            email: "",
            senha: ""
        });
        setSigned(false)
        navigation.navigate("Login");
    };

    useEffect(() => {
        const clearStorage = () => {
            try {
                logout();
            } catch (error) {
                console.log(error);
            }
        };

        const id = setInterval(() => {
            clearStorage();
        }, 43200000);

        return () => clearInterval(id);
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, signed }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuth = () => useContext(AuthContext);
