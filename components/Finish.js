import * as React from 'react';
import {useState} from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Finish({ route, navigation }) {
    const { readingScore, listeningScore } = route.params;
  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>{JSON.stringify(readingScore)} {JSON.stringify(listeningScore)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
  });