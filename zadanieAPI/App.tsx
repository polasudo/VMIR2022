import 'react-native-gesture-handler'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './components/HomeScreen'
import CreatorScreen from './components/CreatorScreen'
import AboutScreen from './components/AboutScreen'
import {
  Center,
  extendTheme,
  Heading,
  HStack,
  Icon,
  NativeBaseProvider,
  Pressable,
  Text,
  VStack,
} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const theme = extendTheme ({})

const CustomDrawer = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <Center>
        <Heading color={'blue.700'}>Meme Api Menu</Heading>
      </Center>
      <VStack my={3} mx={3} space={3}>
        {props.state.routeNames.map((name: string, index: number) => (
          <Pressable
            key={index}
            px={5}
            py={5}
            rounded="md"
            onPress={(event) => props.navigation.navigate(name)}
            bg={index === props.state.index ? 'gray.100' : 'transparent'}
          >
            <HStack p={1} space={4} alignItems="center">
              <Icon
                size={5}
                color={
                  index === props.state.index ? 'blue.700' : 'gray.700'
                }
                as={
                  <MaterialCommunityIcons
                    name={getIcon(name)}
                  ></MaterialCommunityIcons>
                }
              ></Icon>
              <Text
                fontWeight={500}
                color={
                  index === props.state.index ? 'blue.700' : 'gray.700'
                }
              >
                {name}
              </Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </DrawerContentScrollView>
  )
}
const Drawer = createDrawerNavigator();

const getIcon = (screenName: string) => {
  switch (screenName) {
    case 'Home':
      return 'home'
    case 'About':
      return 'information'
    case 'Ohio':
      return 'fire'
    default:
      return undefined
  }
}


export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator 
        drawerContent={(props) => <CustomDrawer {...props}/>}
        initialRouteName='Home'
        >
          <Drawer.Screen name='Home' component={HomeScreen} options={{
            title: 'Trending Memes',
            headerStyle:{
              backgroundColor: theme.colors.blueGray[700]
            },
            headerTintColor: theme.colors.white
          }}/>

          <Drawer.Screen name='About' component={AboutScreen} options={{
            title: 'About',
            headerStyle:{
              backgroundColor: theme.colors.blueGray[700]
            },
            headerTintColor: theme.colors.white
          }}/>

          <Drawer.Screen name='Ohio' component={CreatorScreen} options={{
            title: 'Ohio Memes',
            headerStyle:{
              backgroundColor: theme.colors.red[700]
            },
            headerTintColor: theme.colors.white
          }}/>

        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

