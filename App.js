import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileStartupScreen from './screens/ProfileStartupScreen';
import ProfileUserScreen from './screens/ProfileUserScreen';
import MainFeedScreen from './screens/MainFeedScreen';
import LoginScreen from './screens/AuthLoginScreen';
import RegisterScreen from './screens/AuthRegisterScreen';
import UpdateNews from './screens/UpdateNews';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Login'
      component={LoginScreen}
    ></Stack.Screen>
    <Stack.Screen
      name='Register'
      component={RegisterScreen}
    ></Stack.Screen>
  </Stack.Navigator>
)

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Feed'
      component={MainFeedScreen}
    ></Stack.Screen>
    <Stack.Screen
      name="Startup"
      component={ProfileStartupScreen}
      options={{
        headerTransparent: true,
        headerTitleStyle: {
          color: 'white'
        }
      }}
    ></Stack.Screen>
    <Stack.Screen
      name="User"
      component={ProfileUserScreen}
      options={{
        headerTransparent: true,
        headerTitleStyle: {
          color: 'white'
        }
      }}
    ></Stack.Screen>
    <Stack.Screen
      name="News"
      component={UpdateNews}
    ></Stack.Screen>
  </Stack.Navigator>
)

export default function App() {
  return (
    <NavigationContainer>
      {/* <AuthStack></AuthStack> */}
      <AppStack></AppStack>
    </NavigationContainer>
  );
}

