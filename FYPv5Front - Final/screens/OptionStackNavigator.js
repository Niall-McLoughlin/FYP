// OptionStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OptionScreen from './OptionScreen';
import AddRecipeScreen from './AddRecipeScreen';
import AddPantryScreen from './AddPantryScreen';
import { Button, Text, View, TextInput, StyleSheet, FlatList, ImageBackground } from 'react-native'

const Stack = createNativeStackNavigator();

const OptionStackNavigator = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen
          name="."
          component={NavScreen}
          
        />
         <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
         <Stack.Screen name="AddPantry" component={AddPantryScreen} />
        
    </Stack.Navigator>
  );
};



const NavScreen = ({ navigation }) => {
    return (
      <View>
     
          <View style={styles.buttonContainer}>
            <Button
              title="Add Recipe"
              onPress={() => navigation.navigate('AddRecipe')
              }
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Add Pantry Item"
              onPress={() => navigation.navigate('AddPantry')
              }
            />
          </View>
      </View>
  
    )
  }

export default OptionStackNavigator;
const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: "#311b6b",
    },
    textInput: {
      height: 40,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#e4d0ff",
      backgroundColor: "#bbbbbb",
      borderRadius: 6,
    },
    dataItem: {
      marginTop: 10,
      marginBottom: 30,
      marginLeft: 10,
      marginRight: 10,
      padding: 5,
      borderWidth: 1,
      borderColor: "blue",
      backgroundColor: "#dddddd",
      borderRadius: 6,
    },
    buttonContainer: {
      margin: 10
    },
    helperTextFetch: {
      fontSize: 12,
      textAlign: 'center',
      color: '#19a7d9',
    },
    helperTextAdd: {
  
      color: '#19a7d9',
      fontSize: 16,
      textAlign: 'center',
    },
    b: {
      width: 100,
      marginHorizontal: 8,
    },
    buttonItem: {
      padding: 8,
    },
    image: {
      width: 100,
      height: 100,
      margin: 20,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 24,
    },
    fetchAll: {
      marginBottom: 25,
    },
  });
  