import React from 'react';
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Screens/Home";
import { Login } from "../Screens/Login";
import { RecoverPassword } from "../Screens/RecoverPassword";
import { SignUp } from '../Screens/SignUp';
import { RegistrationGroup } from '../Screens/RegistrationGroup';
import { EditGroup } from '../Screens/EditGroup/EditGroup';
import { useAuth, AuthProvider } from '../contexto/auth';
import { RoutesNavigationType } from '../Types/routes';
import { HomeButton } from '../Components/HomeButton';
import { MaterialCommunityIcons , Feather } from '@expo/vector-icons';
import { CustomHeader } from '../Components/header/Index';


const routes = createNativeStackNavigator();
const tab = createBottomTabNavigator();


export type routesType = NativeStackNavigationProp<RoutesNavigationType>

function TabNavigator() {
    return (
        <tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#000000',
                    height: 100
                },
                tabBarActiveTintColor: '#1D90F5',
                tabBarLabelStyle: {
                    fontSize: 16
                },
            
            }}>
            <tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerRight: () => <HomeButton />,
                    tabBarLabel: "Home",
                    tabBarIcon: () => {
                        return (
                            <MaterialCommunityIcons name="home-account" size={45} color="red" />
                        );
                    },
                }}
            />
            <tab.Screen
                name="RegistrationGroup"
                component={RegistrationGroup}
                options={{
                    tabBarLabel: 'Cadastrar Grupo',
                    tabBarIcon: () => {
                        return (
                            <MaterialCommunityIcons name="account-group" size={45} color="red" />
                        );
                    },
                }}
            />
        </tab.Navigator>
    )
}

function AuthenticatedRoutes() {
    return (
        <routes.Navigator initialRouteName='Tabs' screenOptions={{header: () => <CustomHeader />  }}>
            <routes.Screen
                name="Tabs"
                component={TabNavigator}
            />
            <routes.Screen
                name="EditGroup"
                component={EditGroup}
            />
        </routes.Navigator>
    )
}

function GuestRoutes() {
    return (
        <routes.Navigator initialRouteName='Login' screenOptions={{ headerShown: true }}>
            <routes.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <routes.Screen
                name="RecoverPassword"
                component={RecoverPassword}
                options={{ headerShown: false }}
            />
            <routes.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
            />
        </routes.Navigator>
    )
}

function AuthRoutes() {
    const { signed } = useAuth();

    const routes = signed ? <AuthenticatedRoutes /> : <GuestRoutes />

    return routes
}

export function Routes() {
    return (
        <AuthProvider>
            <AuthRoutes />
        </AuthProvider>
    )
}
