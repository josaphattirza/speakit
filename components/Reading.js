import { useState } from "react/cjs/react.development";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import * as Progress from 'react-native-progress';
// import { useFonts } from "@expo-google-fonts/poppins";

export default function Reading({ route, navigation }){
    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
    const { setReadingScore } = route.params;

	const questions = [
		{
			questionText: '1. 叔叔是爸爸的...',
			answerOptions: [
				{ answerText: '媽媽', isCorrect: false },
				{ answerText: '兄弟', isCorrect: true },
				{ answerText: '姐姐', isCorrect: false },
				{ answerText: '妹妹', isCorrect: false },
			],
		},
		{
			questionText: '2.雅加達是印尼的...',
			answerOptions: [
				{ answerText: '家鄉', isCorrect: false },
				{ answerText: '首度', isCorrect: true },
				{ answerText: '文化', isCorrect: false },
				{ answerText: '食物', isCorrect: false },
			],
		},
	];

  	function handleAnswerOptionClick(isCorrect){
		if (isCorrect) {
			setReadingScore(prevScore => {
                console.log("Prev Score:", prevScore);
                return prevScore + 1;
            });
            setScore(prevScore => prevScore + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
      		console.log("pressed")
			setCurrentQuestion(nextQuestion);
		} else {
      		navigation.navigate('ListeningTest');
			// setShowScore(true);
		}
	};

  	return (
    	<View style={[styles.container, {flexDirection: "column"}]}>
			<View style={styles.title}>
				<Text style={{fontSize: 40, color:"#FFFFFF", fontWeight:"bold"}}>READING TEST</Text>
      		</View>

			{/* Progress Bar */}
			<View style={styles.top}>
				<Progress.Bar progress={0.25} width={280} height={30} animated color="#EA8339"/>
      		</View>
		
			{/* Questions */}
			<View style={styles.middle}>
				<Text style={{fontSize: 30, fontWeight: 'bold'}}>{questions[currentQuestion].questionText}</Text>
			</View>

			<View style={styles.extraspace}>

			</View>
		
			{/* Answer Options */}
			<View style={styles.bottom}>
				{questions[currentQuestion].answerOptions.map((answerOption, key) => (<TouchableOpacity key={key} onPress={() => 
				handleAnswerOptionClick(answerOption.isCorrect)} style={styles.appButtonContainer}><Text style={styles.appButtonText}>{answerOption.answerText}</Text></TouchableOpacity>))}
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
		fontSize: 22,
		color: "#fff",
		fontWeight: "bold",
		alignSelf: "center",
		textTransform: "uppercase"
	},
	title: {
		flex: 0.1,
		backgroundColor: "#385477",
		// borderWidth: 5,
		// borderTopLeftRadius: 20,
		// borderTopRightRadius: 20,
		justifyContent: 'center',
        alignItems: 'center'
	},
	top: {
		flex: 0.1,
		backgroundColor: "#385477",
		// borderWidth: 5,
		// borderTopLeftRadius: 20,
		// borderTopRightRadius: 20,
		justifyContent: 'center',
        alignItems: 'center'
	},
	extraspace:{
		flex:0.02
	},
	middle: {
		// fontFamily: 'Poppins_100Thin',
		flex: 0.4,
		backgroundColor: "#FFFFFF",
		// borderWidth: 5,
		justifyContent: 'center',
        alignItems: 'center'
		// font: "Poppins",
	},
	bottom: {
		flexDirection:'column',
		flex:0.38,
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