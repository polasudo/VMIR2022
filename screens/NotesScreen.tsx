import { View, Text, ScrollView, ActivityIndicator, Keyboard, Pressable } from 'react-native';
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore";
import React, { useLayoutEffect, useState } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';
import { db } from '../config/firebaseConfig';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';

export type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Note'>,
    NativeStackNavigationProp<RootStackParamList>
>;

const NotesScreen = () => {
    const navigation = useNavigation<ModalScreenNavigationProp>();
    const [note, setNote] = useState({ note: '' })


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            tabBarLabel: ({ focused, color }) => (
                <Text style={{ color: focused ? "#EB6a7c" : color }}>
                    Note
                </Text>
            ),
        });
    }, []);

    // async function create() {
    //     await addDoc(noteDb, {
    //         note: note.note
    //     })
    //     console.log(note.note, "Podarilo sa")
    // }

    // function create () {
    //     setDoc(doc(db, "notes1"), {     
    //         note: note
    //     },{merge: true}).then(() => { 
    //     // Data saved successfully!
    //     console.log('data submitted');  

    //     }).catch((error) => { 
    //         // The write failed...
    //       console.log(error);
    //   });
    // };

    // async function create() {
    //     try{
    //         await addDoc(collection(db, "notes"), {
    //             note: note.note
    //         })
    //         console.log("document written", note.note)
    //     }
    //     catch(e){console.log(e);
    //     }
    //     };


    async function skuska() {
        const noteDb = collection(db, 'notes')
        await addDoc(noteDb, {
            note: note.note
        })
        console.log("document written", note.note)
    };

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ flexDirection: 'row', height: 80, marginVertical: 10, }}>
                <TextInput
                    style={{ height: 48, borderRadius: 8, overflow: "hidden", backgroundColor: "white", paddingLeft: 12, flex: 1, marginRight: 5 }}
                    placeholder="note to write"
                    value={note.note}
                    onChangeText={(text) => setNote({ ...note, note: text })}
                    multiline={true}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
            </View>
            <View style={{ height: 50, width: 50, alignSelf: "center" }}>
                <Button
                    style={{ height: 47, borderRadius: 8, backgroundColor: "blue", width: 40, alignItems: "center", justifyContent: "center" }}
                    onPress={skuska}
                    title="Add"
                >
                    {/* <Text> Add </Text> */}
                </Button>
            </View>
        </View>
    )
}

export default NotesScreen