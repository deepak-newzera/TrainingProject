/* eslint-disable no-alert */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {from, HttpLink} from '@apollo/client';
import {onError} from '@apollo/client/link/error';

import Profile from './screens/Profile';
import Story from './screens/Story';

const Stack = createNativeStackNavigator();

const errorLink = onError(({graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({uri: 'http://localhost:6969/graphql'}),
]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

const App: () => Node = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={Profile} name="Profile" />
          <Stack.Screen component={Story} name="Story" />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
