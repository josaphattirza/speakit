import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Finish({ route, navigation }) {
    const { readingScore, listeningScore, speakingScore } = route.params;

    const readFinalScore = (readingScore / 2) * 100;
    const listenFinalScore = (listeningScore) * 100;

    const totalFinalScore = (0.4 * readFinalScore) + (0.4 * listenFinalScore) + (0.2 * speakingScore);
    console.log("Final score:", totalFinalScore);
    let initialLevel;
    if (totalFinalScore > 75) {
        initialLevel = "Advanced";
    } else if (totalFinalScore > 50) {
        initialLevel = "Intermediate";
    } else {
        initialLevel = "Beginner";
    }
  
    return (
        <View style={[styles.container, { flexDirection: "column" }]}>
            <View style={styles.middle}>
			    <Text style={{fontSize: 30, color:"#FFFFFF", fontWeight:"bold"}}>RESULT</Text>
                <Text style={{fontSize: 15, color:"#FFFFFF"}}>{`Reading Score: ${readFinalScore}`}</Text>
                <Text style={{fontSize: 15, color:"#FFFFFF"}}>{`Listening Score: ${listenFinalScore}`}</Text>
                <Text style={{fontSize: 15, color:"#FFFFFF"}}>{`Speaking Score: ${speakingScore}`}</Text>
                <Text style={{fontSize: 30, color:"#FFFFFF", fontWeight:"bold", textAlign: 'center',}}>Your Assigned Level:</Text>
                <Text style={{fontSize: 30, color:"#FFFFFF", fontWeight:"bold"}}>{initialLevel}</Text>
      		</View>

            <View style={styles.bottom}>
                <TouchableOpacity style={styles.appButtonContainer}
                        title='Sign Up'
                    >
                    <Text style={styles.appButtonText}>Sign Up</Text>
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
		fontSize: 18,
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
		flex: 0.9,
        flexDirection: 'column',
		backgroundColor: "#EA8339",
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
		flex:0.1,
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