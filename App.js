import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileStartupScreen from './screens/ProfileStartupScreen';
import ProfileUserScreen from './screens/ProfileUserScreen';
import MainFeedScreen from './screens/MainFeedScreen';
import LoginScreen from './screens/AuthLoginScreen';
import RegisterScreen from './screens/AuthRegisterScreen';
import UpdateNews from './screens/UpdateNews';
import UpdateOperations from './screens/UpdateOperations';
import UpdateFinancials from './screens/UpdateFinancials';
import AuthenticationContext from './AuthenticationContext';
import { Text } from 'react-native';

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
    <Stack.Screen
      name="Operations"
      component={UpdateOperations}
    ></Stack.Screen>
    <Stack.Screen
      name='Finances'
      component={UpdateFinancials}
    ></Stack.Screen>
  </Stack.Navigator>
)

/* export default function App() {
  return (
    <NavigationContainer>
      <AuthStack></AuthStack>
    </NavigationContainer>
  );
}

 */

export default class App extends React.Component {
  static contextType = AuthenticationContext;
  constructor(props) {
    super(props);
    this.state = {
      auth: {
        authToken: null,
        updateAuthToken: token => {
          alert(token);
          this.state.auth.authToken = token;
          this.forceUpdate();
        }
      }
    }
  }

  render() {
    return <AuthenticationContext.Provider value={this.state.auth}>
      <NavigationContainer>
        {this.state.auth.authToken ?
          <AppStack></AppStack> : <AuthStack></AuthStack>
        }
      </NavigationContainer>
    </AuthenticationContext.Provider>
  }
}