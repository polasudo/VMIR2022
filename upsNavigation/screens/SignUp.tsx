import React from 'react';
import { Pressable, TextInput, Text, View } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../config/firebaseConfig";
const auth = getAuth(app);

function SignUpScreen({ navigation }: any) {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    async function signUp() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, value.email, value.password);
            navigation.navigate('Sign In');
        } catch (error) {
            setValue({
                ...value,
                //@ts-ignore
                error: error.message,
            })
        }
    }

    return (
        <View style={{width:"100%", height: "100%"}}>
            <View style={{marginHorizontal: 4, height: "85%", display: "flex", justifyContent: "center"}}>
                <Text style={{fontSize: 10, fontWeight: "bold", textAlign: "center", color: "white"}}>
                    Sign Up
                </Text>

                <View>
                    <View style={{margin: 2}}>
                        <View style={{margin: 10}}>
                            <TextInput
                                style={{ backgroundColor: "white", paddingTop: 15, paddingHorizontal: 35, marginHorizontal: 12, paddingBottom: 0, width: "90%", borderRadius: 10, alignSelf: "center" }}
                                placeholder='Email'
                                value={value.email}
                                onChangeText={(text) => setValue({ ...value, email: text })}
                            />
                        </View>

                        <View>
                            <TextInput
                                placeholder="Password"
                                style={{ backgroundColor: "white", paddingTop: 15, paddingHorizontal: 35, marginHorizontal: 12, paddingBottom: 0, width: "90%", borderRadius: 10, alignSelf: "center" }}
                                onChangeText={(text) => setValue({ ...value, password: text })}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <Pressable style={{borderColor: "white", borderRadius: 24, padding: 3, margin: 4}}>
                        <Text style={{textAlign: "center", color: "white", fontWeight:"bold", fontSize: 12, lineHeight:15}} onPress={signUp}>Sign Up</Text></Pressable>
                </View>
                <Text style={{textAlign: "center", color: "white", fontWeight:"bold", fontSize:12, lineHeight:15}}>Have an account?
                    <Text onPress={() => navigation.navigate('Sign In')}>Sign In</Text></Text>
            </View>
        </View >
    );
}

export default SignUpScreen;