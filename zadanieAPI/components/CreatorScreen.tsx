import {
    ScrollView,
    Center,
    Skeleton,
    VStack,
    Text,
    View,
    Heading,
    useTheme,
    Container,
  } from 'native-base'
  import React, { useEffect, useState } from 'react'
  import { TopMeme, api } from '../https/api'
  import Swiper from 'react-native-swiper'
  import { StyleSheet, Image } from 'react-native'
  
  import { NavigationProp } from '@react-navigation/native'
  
  interface RouterProps {
    navigation: NavigationProp<any, any>
  }

const CreatorScreen = ({ navigation }: RouterProps) => {
    const theme = useTheme()
    const { getTopMemes } = api()
    const [memes, setMemes] = useState<TopMeme[] | null>(null)
    const [loading, setLoading] = useState(true)
  
    const styles = StyleSheet.create({
      wrapper: {
        height: 450,
      },
      text: {
        color: theme.colors.blue[500],
        fontSize: 25,
      },
    })
  
    useEffect(() => {
      const loadMemes = async () => {
        const results = await getTopMemes()
        setMemes(results)
        setLoading(false)
      }
      loadMemes()
    }, [])

    return (
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
            {memes?.map((meme, index) => (
              <View key={index}>
                <VStack alignItems={'center'} space={2} mt={4}>
                  <Heading style={styles.text}>{meme.title}</Heading>
                  <Image
                    source={{ uri: meme.url }}
                    resizeMode="contain"
                    style={{ width: '90%', height: 300 }}
                  ></Image>
                </VStack>
              </View>
            ))}
          </Swiper>
        )}
      </ScrollView>
    )
  }

export default CreatorScreen