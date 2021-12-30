import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfileScreen from './screens/user';
import BusinessProfileScreen from './screens/business';
import BusinessNewsScreen from './screens/businessNews';

const Stack = createNativeStackNavigator();


export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='User'
					component={UserProfileScreen}
					initialParams={{username: "edvilme"}}

				></Stack.Screen>
				<Stack.Screen 
					name="Business" 
					component={BusinessProfileScreen}
				></Stack.Screen>
				<Stack.Screen
					name='BusinessNews'
					component={BusinessNewsScreen}
				></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}