import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {HttpLink} from 'apollo-link-http';
import Login from './src/login';
import newLayout from './src/newLayout';
import SignInScreen from './src/SignInScreen';
import {homePage} from './src/homePage';
import {SecondComponent} from './src/homePage';
import Loading from './src/Loading';

import SignUpScreen from './src/SignUpScreen';
import Moreview from './src/Moreview';

const Stack = createStackNavigator();

const client = new ApolloClient({
  link: new HttpLink({uri: 'https://open-aardvark-64.hasura.app/v1/graphql'}),
  cache: new InMemoryCache(),
});
export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Loading" component={Loading} />

            <Stack.Screen name="Home" component={Login} />
            <Stack.Screen name="newLayout" component={newLayout} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen
              name="homePage"
              component={(homePage, SecondComponent)}
            />
            <Stack.Screen name="Moreview" component={Moreview} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
