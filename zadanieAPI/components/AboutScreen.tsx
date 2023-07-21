import {
    ScrollView,
    Center,
    Skeleton,
    VStack,
    Text,
    View,
    Heading,
    useTheme,
    Button,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { Quotes, api } from '../https/api'
import Swiper from 'react-native-swiper'
import { StyleSheet, Image } from 'react-native'

import { NavigationProp } from '@react-navigation/native'
// import axios from 'axios'

interface RouterProps {
    navigation: NavigationProp<any, any>
}

const AboutScreen = ({ navigation }: RouterProps) => {
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '92bc5d9eeamshdc447ff1b9c98e9p1fc1d9jsnae17568cae4d',
    //         'X-RapidAPI-Host': 'webknox-jokes.p.rapidapi.com'
    //     }
    // };

    // const getAnother = async () =>{
    // fetch('https://webknox-jokes.p.rapidapi.com/jokes/random?minRating=8&maxLength=100', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    // }

    const theme = useTheme()
    const { getQuotes } = api()
    const [quotes, setQuotes] = useState<Quotes[] | null>(null)
    const [loading, setLoading] = useState(true)

    const styles = StyleSheet.create({
        wrapper: {
            height: 450,
        },
        text: {
            color: theme.colors.blue[500],
            fontSize: 25,
        },
        wrap: {
            margin: 20
        }
    })

    useEffect(() => {
        const loadQuotes = async () => {
            const results = await getQuotes()
            setQuotes(results)
            setLoading(false)
        }
        loadQuotes()
    }, [])

    return (
        <>
            <Heading style={styles.wrap}>
                Aplikacia vytvorena pomocou RapidApi, kde su pouzite viacere API
            </Heading>
            {/* <Button onPress={getAnother}>Click</Button> */}
            <ScrollView>
                {loading && (
                    <Center w="100%" mt={8}>
                        <VStack w="90%" space={4}>
                            <Skeleton.Text px="3" />
                            <Skeleton h="60" />
                        </VStack>
                    </Center>
                )}

                {!loading && (
                    <Swiper
                        style={styles.wrapper}
                        showsButtons={true}
                        showsPagination={false}
                    >
                        {quotes?.map((citat, index) => (
                            <View key={index}>
                                <VStack alignItems={'center'} space={2} mt={4}>
                                    <Heading style={styles.text}>Memečko</Heading>
                                    {/* <Text style={styles.wrap}>{citat.body}</Text> */}
                                    <Text style={styles.wrap}>{citat.setup}</Text>
                                    <Text style={styles.wrap}>{citat.punchline}</Text>
                                </VStack>
                            </View>
                        ))}
                    </Swiper>
                )}
            </ScrollView>
        </>
    )
}

export default AboutScreen