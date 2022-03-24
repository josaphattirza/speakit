export default function Finish({ route, navigation }) {
    const { finalScore } = route.params;
  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>{JSON.stringify(finalScore)}</Text>
        </View>
    );
}