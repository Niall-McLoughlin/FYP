
import { Button } from 'react-native';
import React, { useState } from 'react';
import { URL } from './config';
import { showMessage } from 'react-native-flash-message';

const DeleteShopping = ({ productId, onDelete }) => {
  const [text, setText] = useState('');

  const callAPIDELETESPECIFIC = async () => {
    try {
      const res = await fetch(
        URL+`/deleteSpecificShopping`,
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
      setText('Delete Successful!');
  
      // Call the onDelete callback function after successful deletion
      if (onDelete) {
        onDelete();
      }
  
    } catch (err) {
      console.log(err);
      showMessage({
        message: 'Error',
        description: 'Failed to delete item from shopping list',
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

export default DeleteShopping;
