import { Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { URL } from './config';
import { showMessage } from 'react-native-flash-message';

const DeletePantry = ({ productId, onDelete }) => {
  const [text, setText] = useState('');

  const callAPIDELETESPECIFIC = async () => {
    try {
      // Show the confirmation modal before making the API call
      Alert.alert(
        'Are you sure?',
        'Do you want to delete this item?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Confirm',
            onPress: async () => {
              const res = await fetch(
                URL+`/deleteSpecificPantry`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420"
                  },
                  body: JSON.stringify({ ourID: productId })
                }
              );
              const data = await res.json();
              console.log(data);
              if (data.deletedCount === 1) {
                showMessage({
                  message: 'Success',
                  description: 'Item deleted from pantry',
                  type: 'success',
                  backgroundColor: 'green',
                  color: 'white',
                  duration: 3000,
                });
              }
          
              // Call the onDelete callback function after successful deletion
              if (onDelete) {
                onDelete();
              }
            }
          }
        ]
      );

    } catch (err) {
      console.log(err);
      showMessage({
        message: 'Error',
        description: 'Failed to delete item from pantry',
        type: 'danger',
        backgroundColor: 'red',
        color: 'white',
        duration: 3000,
      });
    }
  };
  

  return (
    <Button title="Delete" onPress={callAPIDELETESPECIFIC} />
  );
};

export default DeletePantry;
