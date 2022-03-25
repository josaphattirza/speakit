import { View, Text, StyleSheet } from "react-native";

export default function Finish({ route, navigation }) {
    const { readingScore, listeningScore, speakingScore } = route.params;
  
    return (
        <View style={[styles.container, { flexDirection: "column" }]}>
            <View style={styles.title}>
				<Text style={{fontSize: 20, color:"#FFFFFF"}}>RESULT</Text>
                <Text>{`Reading Score: ${readingScore}`}</Text>
                <Text>{`Listening Score: ${listeningScore}`}</Text>
                <Text>{`Speaking Score: ${speakingScore}%`}</Text>
      		</View>

        </View>
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text>Details Screen</Text>
            // <Text>{`Reading Score: ${readingScore}`}</Text>
            // <Text>{`Listening Score: ${listeningScore}`}</Text>
            // <Text>{`Speaking Score: ${speakingScore}%`}</Text>
        // </View>
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
		flex: 0.6,
		backgroundColor: "#EA8339",
		borderWidth: 5,
        borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		justifyContent: 'space-between',
		padding: 40,
		margin: 10,
		flexDirection: 'row',
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