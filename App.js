import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Flex = () => {
  return (
    <View style={[styles.container, {flexDirection: "column"}]}>
      <View style={{ flex: 1, backgroundColor: "red" }} />
      <View style={{ flex: 3, backgroundColor: "darkorange" }} />
      <View style={{ flex: 2, backgroundColor: "green" }} />
      <View style={{ flex: 1, flexDirection:"row"}}>
        <View style={{backgroundColor:"yellow",flex:1}}>
          <Button title={"Next"}/>
        </View>
        <View style={{backgroundColor:"grey",flex:1}}>
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

export default Flex;