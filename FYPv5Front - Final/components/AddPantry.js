


import { Button, Text, View, TextInput, StyleSheet, ImageBackground, Keyboard } from 'react-native';
import { useState } from 'react';
import { URL } from './config';
import { showMessage } from 'react-native-flash-message';

const AddPantry = ({ onItemAdded, onPantryItemChange }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const callAPIADD = async () => {
    try {
      const res = await fetch(
        URL + `/addPantry`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "69420"
          },
          body: JSON.stringify({ title: name, amount: amount, date: date })
        }
      );
      const data = await res.json();
      console.log(data);
      setDate('');
      setName('');
      setAmount('');
      Keyboard.dismiss();
      if (onItemAdded) {
        onItemAdded();
      }
      if (onPantryItemChange) {
        onPantryItemChange();
      }
      showMessage({
        message: 'Success',
        description: 'Item added to the shopping list',
        type: 'success',
        backgroundColor: 'green',
        color: 'white',
        duration: 3000,
      });

    } catch (err) {
      setText('Error please Try Again');
      console.log(err);
      showMessage({
        message: 'Error',
        description: 'Failed to add item to the shopping list',
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
          placeholder="Input Amount Here"
          onChangeText={newText => setAmount(newText)}
          value={amount}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Input date Here"
          onChangeText={newText => setDate(newText)}
          value={date}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Add to Shopping List"
            onPress={async () => callAPIADD()}
          />
        </View>
        <Text style={styles.helperTextAdd}> </Text>
      </ImageBackground>
    </View>
  );
};

export default AddPantry;




const styles = StyleSheet.create({

  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#311b6b',
  },
  addCon: {
    height: '100%',
    width: '100%'
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
  dataItem: {
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: '#dddddd',
    borderRadius: 6,
  },
  buttonContainer: {
    margin: 10,
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
  
