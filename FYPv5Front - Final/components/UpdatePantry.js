import React, { useState } from 'react';
import { View, TextInput, Button, Modal } from 'react-native';
import { URL } from './config';

const UpdatePantry = ({ productId, onUpdated }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newAmount, setNewAmount] = useState('');
  const [newDate, setNewDate] = useState('');

  const updateAmount = async () => {
    
  
    try {
      const res = await fetch(URL + '/updateSpecificPantry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify({ ourID: productId, amount: newAmount, date: newDate }),
      });
  
      
  
      const data = await res.json();
      
  
      if (data.modifiedCount === 1) {
        
        setModalVisible(false);
  
        if (onUpdated) {
         
          onUpdated();
        }
      }
    } catch (err) {
 
    }
  };

  return (
    <View>
      <Button title="Update" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <TextInput
          placeholder="Enter new amount"
          onChangeText={text => setNewAmount(text)}
          value={newAmount}
        />
        <TextInput
          placeholder="Enter new date"
          onChangeText={text => setNewDate(text)}
          value={newDate}
        />
        <Button title="Save" onPress={updateAmount} />
        <Button title="Cancel" onPress={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

export default UpdatePantry;
