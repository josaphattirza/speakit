import { useState, useEffect } from "react/cjs/react.development";
import { StyleSheet, Text, View, Button, TouchableOpacity, LogBox } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import { Icon } from "react-native-elements";

const INFERENCE_ENDPOINT = "http://35.247.34.211:5000/predict";

export default function Recording({ route, navigation }) {
    const { setSpeakingScore } = route.params;
    const [recording, setRecording] = useState();
    const [sound, setSound] = useState();
    const [audioURI, setAudioURI] = useState('');

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            }); 
            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync({
                android: {
                    extension: '.m4a',
                    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
                    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
                    // sampleRate: 44100,
                    sampleRate: 48000,
                    // bitRate: 128000,
                    bitRate: 48000,
                    numberOfChannels: 1
                },
                ios: {
                    extension: '.wav',
                    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
                    // sampleRate: 44100,
                    sampleRate: 48000,
                    numberOfChannels: 1,
                    // bitRate: 128000,
                    bitRate: 48000,
                    linearPCMBitDepth: 16
                }
            });
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioURI(uri);
        console.log('Recording stopped and stored at', uri);
    }
    
    async function playRecording() {
        console.log('Loading sound');
        const { sound } = await Audio.Sound.createAsync({ uri: audioURI });
        setSound(sound);
    
        console.log('Playing sound..');
        await sound.playAsync();
    }
    
    async function Submit() {
        try {
            const info = await FileSystem.getInfoAsync(audioURI);
            console.log(`File info: ${JSON.stringify(info)}`);
            const uri = info.uri;
            const base64String = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64
            });
            const response = await axios.post(INFERENCE_ENDPOINT, {
                data: 'data:audio/webm;codecs=opus;base64,' + base64String
            });
            console.log(response.data);
            const speakingScore = response.data["score"];
            console.log(speakingScore);
            setSpeakingScore(speakingScore);
            navigation.navigate('Finish',{
                speakingScore: Math.round(speakingScore * 10) / 10
            });
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading sound');
                sound.unloadAsync();
            } : undefined;
        }, [sound]);
    
    return (
        <View style={[styles.container, {flexDirection: "column"}]}>
            <View style={styles.title}>
				<Text style={{fontSize: 40, color:"#FFFFFF", fontWeight:"bold"}}>SPEAKING TEST</Text>
      		</View>

			{/* Progress Bar */}
			<View style={styles.top}>
            <Progress.Bar progress={0.75} width={280} height={30} animated color="#EA8339"/>
      		</View>
		
			{/* Questions */}
			<View style={styles.middle}>
                <Text style={{fontSize: 15, textAlign:"center"}}>Press the 'Mic' button to record and 'Play' button to listen before submitting</Text>
                <Text style={{fontSize: 15, textAlign:"center"}}>Please record yourself reading this sentence</Text>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>牛肉麵很好吃</Text>
                <View style={{flexDirection:"row"}}>
                    <Icon reverse name={recording ? "mic-off-outline" : "mic-outline"} type="ionicon" size={35} onPress={recording ? stopRecording : startRecording} />
                    <Icon reverse name="play-outline" type="ionicon" size={35} onPress={playRecording} />
                </View>
			</View>
		
			{/* Answer Options */}
			<View style={styles.bottom}>
                <TouchableOpacity style={styles.appButtonContainer}
                    title='Submit'
                    onPress={Submit}
                >
                <Text style={styles.appButtonText}>Submit</Text>
                </TouchableOpacity>
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
		flex: 0.6,
		backgroundColor: "#FFFFFF",
		borderWidth: 5,
        borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		justifyContent: 'space-between',
		padding: 40,
		margin: 10,
        alignItems: 'center'
	},
	bottom: {
		flexDirection:'column',
		flex:0.2,
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

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);