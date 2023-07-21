import { View, Text, Platform, Image} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';
import { Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';


export type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Google'>,
    NativeStackNavigationProp<RootStackParamList>
>;

const GoogleSignInScreen = () => {
    const navigation = useNavigation<ModalScreenNavigationProp>();
    const [userInfo, setUserInfo] = useState();
    const [authentication, setAuthentication] = useState<any>();
    const [requireRefresh, setRequireRefresh] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "700869572611-a8gpcikm3a4os4j70n5ev2g3c99bq1ej.apps.googleusercontent.com",
        iosClientId: "700869572611-dfn38v11lfft13cqn64fpto2ffqj154f.apps.googleusercontent.com",
        expoClientId: "700869572611-2lmgte4ko3fgknsa91urst0m3b13furj.apps.googleusercontent.com"
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            tabBarLabel: ({ focused, color }) => (
                <Text style={{ color: focused ? "#EB6a7c" : color }}>
                    Google
                </Text>
            ),
        });
    }, []);

    useEffect(() => {
        if (response?.type === "success") {
            //@ts-ignore
            setAuthentication(response.authentication);

            const persistAuth = async () => {
                await AsyncStorage.setItem("auth", JSON.stringify(response.authentication));
            };
            persistAuth();
        }
    }, [response]);


    useEffect(() => {
        const getPersistedAuth = async () => {
            const jsonValue = await AsyncStorage.getItem("auth");
            if (jsonValue != null) {
                const authFromJson = JSON.parse(jsonValue);
                setAuthentication(authFromJson);
                console.log(authFromJson);

                setRequireRefresh(!AuthSession.TokenResponse.isTokenFresh({
                    expiresIn: authFromJson.expiresIn,
                    issuedAt: authFromJson.issuedAt
                }));
            }
        };
        getPersistedAuth();
    }, []);

    const getUserData = async () => {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            //@ts-ignore
            headers: { Authorization: `Bearer ${authentication.accessToken}` }
        });

        userInfoResponse.json().then(data => {
            setUserInfo(data);
        });
    };

    const showUserData = () => {
        if (userInfo) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Welcome {userInfo['name']}</Text>
                    <Text>{userInfo['email']}</Text>
                </View>
            );
        }
    };

    const getClientId = () => {
        if (Platform.OS === "ios") {
            return "700869572611-dfn38v11lfft13cqn64fpto2ffqj154f.apps.googleusercontent.com";
        } else if (Platform.OS === "android") {
            return "700869572611-a8gpcikm3a4os4j70n5ev2g3c99bq1ej.apps.googleusercontent.com";
        } else {
            console.log("Invalid platform - not handled");
        }
    }

    const refreshToken = async () => {
        const clientId = getClientId();
        console.log(authentication);
        const tokenResult = await AuthSession.refreshAsync({
            clientId: clientId,
            //@ts-ignore
            refreshToken: authentication.refreshToken
        }, {
            tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token"
        });
        //@ts-ignore
        tokenResult.refreshToken = authentication.refreshToken;
        //@ts-ignore
        setAuthentication(tokenResult);
        await AsyncStorage.setItem("auth", JSON.stringify(tokenResult));
        setRequireRefresh(false);
    };

    if (requireRefresh) {
        return (
            <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
                <Text>Token requires refresh...</Text>
                <Button title="Refresh Token" onPress={refreshToken} />
            </View>
        )
    }

    const logout = async () => {
        await AuthSession.revokeAsync({
            //@ts-ignore
            token: authentication.accessToken
        }, {
            revocationEndpoint: "https://oauth2.googleapis.com/revoke"
        });

        setAuthentication(undefined);
        setUserInfo(undefined);
        await AsyncStorage.removeItem("auth");
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
            {showUserData()}
            <Button
                title={authentication ? "Get User Data" : "Login"}
                onPress={authentication ? getUserData : () => promptAsync({ useProxy: false, showInRecents: true })}
            />
            {authentication ? <Button title="Logout" onPress={logout} /> : undefined}
            <StatusBar style="auto" />
        </View>
    );
}

export default GoogleSignInScreen