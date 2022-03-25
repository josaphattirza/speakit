import * as React from 'react';
import {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Reading({navigation}){
    const [readingScore, setReadingScore] = useState(0);

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
			setReadingScore(readingScore + 1);
		}
		
		console.log("pressed");
		console.log("score");
		console.log(readingScore);
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
      		navigation.navigate('Listening',{
        		readingScore: readingScore
      		});
			// setShowScore(true);
		}
	};



	TouchableOpacity.defaultProps = { activeOpacity: 0.8 };


	return (
    <View style={[styles.container, {flexDirection: "column"}]}>
		{/* Progress Bar */}
      	<View style={styles.top}>
        	<Text>You scored {readingScore} out of {questions.length}</Text>
      	</View>
		
		{/* Questions */}
		<View style={styles.middle}>
			<Text>{questions[currentQuestion].questionText}</Text>
		</View>
		
		{/* Answer Options */}
		<View style={styles.bottom}>
			{/* {questions[currentQuestion].answerOptions.map((answerOption) => (<Button style={styles.button} onPress={() => 
			handleAnswerOptionClick(answerOption.isCorrect)} title={answerOption.answerText}></Button>))} */}

			{questions[currentQuestion].answerOptions.map((answerOption) => (<TouchableOpacity onPress={() => 
			handleAnswerOptionClick(answerOption.isCorrect)} style={styles.appButtonContainer}><Text style={styles.appButtonText}>{answerOption.answerText}</Text>
  			</TouchableOpacity>))}

			{/* {questions[currentQuestion].answerOptions.map((answerOption) => (<Text>{answerOption.answerText}</Text>))} */}
		</View>
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		backgroundColor: "#385477",
		padding: 20,
		margin: 10,
	},
	screenContainer: {
		flex: 1,
		justifyContent: "center",
		padding: 16
	},
	appButtonContainer: {
		backgroundColor: "darkorange",
		borderRadius: 25,
		paddingVertical: 12,
		paddingHorizontal: 25,
	},
	appButtonText: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
		alignSelf: "center",
		textTransform: "uppercase"
	},
	top: {
		flex: 0.3,
		backgroundColor: "#FFFFFF",
		borderWidth: 5,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	middle: {
		flex: 0.3,
		backgroundColor: "#EA8339",
		borderWidth: 5,
	},
	bottom: {
		flexDirection:'column',
		flex:0.3,
		marginBottom:10,
		justifyContent:'space-between', 
		paddingLeft: 20, 
		paddingRight: 20
	},
	space: {
		width: 20, // or whatever size you need
		height: 20,
	  },
	
  });

export default Reading;