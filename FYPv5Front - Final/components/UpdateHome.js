import React, { useState } from 'react';
import { View, TextInput, Button, Modal } from 'react-native';
import { URL } from './config';

const UpdateHome= ({ productId, barcode,onUpdated }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newAmount, setNewAmount] = useState('');
  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');

  const updateAmount = async () => {
    try {
      const res = await fetch(URL + '/updateSpecificHome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify({ ourID: productId, name: newName, amount: newAmount, date: newDate }),
      });
  
      const data = await res.json();
  
      if (data.Success) {
        addBarcode();
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const addBarcode = async () => {
    try {
      const res = await fetch(URL + '/addBarcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify({ title: newName, amount: newAmount, barcode: barcode }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        setModalVisible(false);
  
        if (onUpdated) {
          onUpdated();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  // ...
  
  <Button title="Save" onPress={updateAmount} />
  

  return (
    <View>
      <Button title="Update" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <TextInput
          placeholder="Enter new date"
          onChangeText={text => setNewName(text)}
          value={newName}
        />
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

export default UpdateHome;
