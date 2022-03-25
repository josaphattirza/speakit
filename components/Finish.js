import { View, Text, StyleSheet } from "react-native";

export default function Finish({ route, navigation }) {
    const { readingScore, listeningScore, speakingScore } = route.params;
  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>{`Reading Score: ${readingScore}`}</Text>
            <Text>{`Listening Score: ${listeningScore}`}</Text>
            <Text>{`Speaking Score: ${speakingScore}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
  });