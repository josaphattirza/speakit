import * as React from 'react';
import {useState} from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Finish from './components/Finish';
import Recording from './components/Recording';
import Listening from './components/Listening';
import Reading from './components/Reading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
		<Stack.Navigator initialRouteName="Recording">
			<Stack.Screen name="Reading" component={Reading} />
			<Stack.Screen name="Recording" component={Recording}/>
			<Stack.Screen name="Listening" component={Listening}/>
			<Stack.Screen name="Finish" component={Finish} />
		</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;