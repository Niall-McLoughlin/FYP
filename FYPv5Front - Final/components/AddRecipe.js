//AddRecipe.js

import { Button, Text, View, TextInput, StyleSheet, ImageBackground, Keyboard } from 'react-native';
import { useState } from 'react';
import { URL } from './config';
import { showMessage } from 'react-native-flash-message';

const AddRecipe = ({ onRecipeAdded }) => {
  const [name, setName] = useState('');
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [ingredient3, setIngredient3] = useState('');
  const [ingredient4, setIngredient4] = useState('');
  const [ingredient5, setIngredient5] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');

  const callAPIADD = async () => {
    try {
      const res = await fetch(
        URL + `/addRecipe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "69420"
          },
          body: JSON.stringify({
            title: name,
            ingredient1: ingredient1,
            ingredient2: ingredient2,
            ingredient3: ingredient3,
            ingredient4: ingredient4,
            ingredient5: ingredient5,
            description: description
          })
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setName('');
        setIngredient1('');
        setIngredient2('');
        setIngredient3('');
        setIngredient4('');
        setIngredient5('');
        setDescription('');
        Keyboard.dismiss();
        if (onRecipeAdded) {
          onRecipeAdded();
        }
        showMessage({
          message: 'Success',
          description: 'Item added to the recipe list',
          type: 'success',
          backgroundColor: 'green',
          color: 'white',
          duration: 3000,
        });
       
      } else {
        setText('Error: ' + data.message);
        console.log('Error:', data.message);
      }
    } catch (err) {
      setText('Error please Try Again');
      console.log(err);
      showMessage({
        message: 'Error',
        description: 'Failed to add item to the recipe list',
        type: 'danger',
        backgroundColor: 'red',
        color: 'white',
        duration: 3000,
      });
    }
  };
  

  return (
    <View style={styles.addCon}>
      <ImageBackground
        source={require("../assets/icon.png")}
        style={{ width: '100%', height: '100%' }}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Input Name Here"
          onChangeText={newText => setName(newText)}
          value={name}
        />
         <TextInput
          style={styles.textInput}
          placeholder="Description"
          onChangeText={newText => setDescription(newText)}
          value={description}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Ingredient 1"
          onChangeText={newText => setIngredient1(newText)}
          value={ingredient1}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Ingredient 2"
          onChangeText={newText => setIngredient2(newText)}
          value={ingredient2}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Ingredient 3"
          onChangeText={newText => setIngredient3(newText)}
          value={ingredient3}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Ingredient 4"
          onChangeText={newText => setIngredient4(newText)}
          value={ingredient4}
        />
               <TextInput
          style={styles.textInput}
          placeholder="Ingredient 5"
          onChangeText={newText => setIngredient5(newText)}
          value={ingredient5}
        />
       
        <View style={styles.buttonContainer}>
          <Button
            title="Add to Recipe List"
            onPress={async () => callAPIADD() }
          />
        </View>
        <Text style={styles.helperTextAdd}> {text}</Text>
      </ImageBackground>
    </View>
  );
};

export default AddRecipe;

const styles = StyleSheet.create({
  addCon: {
    height: '100%',
  },
  textInput: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#e4d0ff',
    backgroundColor: '#bbbbbb',
    borderRadius: 6,
  },
  buttonContainer: {
    margin: 10,
  },
  helperTextAdd: {
    color: '#19a7d9',
    fontSize: 16,
    textAlign: 'center',
  },
});
