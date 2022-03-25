import * as React from 'react';
import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Finish from './components/Finish';
import Recording from './components/Recording';
import Reading from './components/Reading';
import Listening from './components/Listening';

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	padding: 20,
  	},
});

const Stack = createNativeStackNavigator();

function App() {
	const [readingScore, setReadingScore] = useState(0);
	const [listeningScore, setListeningScore] = useState(0);
	const [speakingScore, setSpeakingScore] = useState(0);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="ReadingTest">
				<Stack.Screen name="ReadingTest" component={Reading} initialParams={{ setReadingScore: setReadingScore }} />
				<Stack.Screen name="ListeningTest" component={Listening} initialParams={{ setListeningScore: setListeningScore }} />
				<Stack.Screen name="SpeakingTest" component={Recording} initialParams={{ setSpeakingScore: setSpeakingScore }}/>
				<Stack.Screen name="Finish" component={Finish} initialParams={{
					listeningScore: listeningScore,
					readingScore: readingScore,
					speakingScore: speakingScore
				}}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;