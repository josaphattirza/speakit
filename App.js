import * as React from 'react';
import {useState} from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Finish from './components/Finish';
import Recording from './components/Recording';

function PlacementTest({navigation}){
	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

  	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

  	function handleAnswerOptionClick(isCorrect){
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
      		console.log("pressed")
			setCurrentQuestion(nextQuestion);
		} else {
      		navigation.navigate('Finish',{
        		finalScore: score,
      		});
			// setShowScore(true);
		}
	};

  return (
    <View style={[styles.container, {flexDirection: "column"}]}>
		{/* Progress Bar */}
      	<View style={{ flex: 1, backgroundColor: "red" }}>
        	<Text>You scored {score} out of {questions.length}</Text>
      	</View>
		
		{/* Questions */}
		<View style={{ flex: 3, backgroundColor: "darkorange" }}>
			<Text>{questions[currentQuestion].questionText}</Text>
		</View>
		
		{/* Answer Options */}
		<View style={{ flex: 2, backgroundColor: "green" }}>
			{questions[currentQuestion].answerOptions.map((answerOption) => (<Button onPress={() => 
			handleAnswerOptionClick(answerOption.isCorrect)} title={answerOption.answerText}></Button>))}
			{/* {questions[currentQuestion].answerOptions.map((answerOption) => (<Text>{answerOption.answerText}</Text>))} */}

		</View>

		{/* Buttons */}
		<View style={{ flex: 1, flexDirection:"row"}}>
			{/* Submit Button */}
			<View style={{backgroundColor:"yellow",flex:1}}>
				<Button title={"Next"}/>
			</View>

			{/* Skip Button */}
			<View style={{backgroundColor:"grey", flex:1, alignSelf:'stretch'}}>
				<Button title={"Skip"}/>
			</View>
		</View>
    </View>
  );
};

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
		<Stack.Navigator initialRouteName="PlacementTest">
			<Stack.Screen name="PlacementTest" component={PlacementTest} />
			<Stack.Screen name="SpeakingTest" component={Recording}/>
			<Stack.Screen name="Finish" component={Finish} />
		</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;