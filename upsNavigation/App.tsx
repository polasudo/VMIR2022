import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from "./navigator/MainNavigator";

const client = new ApolloClient({
  uri: 'https://public0215a1cec31aedbb.stepzen.net/api/kissed-cricket/__graphql',
  cache: new InMemoryCache(),
});

export default function App() {

  return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </ApolloProvider>
  );
}
