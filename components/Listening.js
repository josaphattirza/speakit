import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import { Audio } from "expo-av";
import * as Progress from 'react-native-progress';
// import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";

export default function Listening({ route, navigation }) {
    const [sound, setSound] = useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
    const { setListeningScore } = route.params;

	const questions = [{
		questionText: '他們在看什麼？',
		answerOptions: [
			{ answerText: '信', isCorrect: false },
			{ answerText: '照片', isCorrect: true },
			{ answerText: '電視', isCorrect: false },
			{ answerText: '手機', isCorrect: false },
		],
	}];

    async function playRecording() {
        const { sound } = await Audio.Sound.createAsync(require('../assets/Meghi.aac'));
		setSound(sound);
		await sound.playAsync();
    }

	useEffect(() => {
		return sound ? () => {
			console.log('Unloading sound');
			sound.unloadAsync();
		} : undefined;
	}, [sound]);

  	function handleAnswerOptionClick(isCorrect){
		if (isCorrect) {
			setListeningScore(prevScore => {
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
      		navigation.navigate('SpeakingTest');
			// setShowScore(true);
		}
	};

  	return (
    	<View style={[styles.container, {flexDirection: "column"}]}>
			<View style={styles.title}>
				<Text style={{fontSize: 40, color:"#FFFFFF", fontWeight:"bold"}}>LISTENING TEST</Text>
      		</View>

			{/* Progress Bar */}
			<View style={styles.top}>
			<Progress.Bar progress={0.5} width={280} height={30} animated color="#EA8339"/>
      		</View>
		
			{/* Questions */}
			<View style={styles.middle}>
				<Text style={{fontSize: 30, fontWeight: 'bold'}}>{questions[currentQuestion].questionText}</Text>
				<Icon name="play-outline" size={70} type="ionicon" onPress={playRecording} />
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
}

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
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
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
	middle: {
		flex: 0.4,
		backgroundColor: "#FFFFFF",
		// borderWidth: 5,
		// borderTopLeftRadius: 20,
		// borderTopRightRadius: 20,
		justifyContent: 'center',
        alignItems: 'center'
	},
	extraspace:{
		flex:0.02
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